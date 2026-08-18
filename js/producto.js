document.addEventListener('DOMContentLoaded', () => {
  // 1. Get Product ID from URL
  const params = new URLSearchParams(window.location.search);
  let productIdStr = params.get('id');
  
  if (window.PRODUCT_ID_OVERRIDE) {
    productIdStr = window.PRODUCT_ID_OVERRIDE.toString();
  } else if (!productIdStr) {
    const pathParts = window.location.pathname.split('/').filter(p => p);
    const prodIdx = pathParts.indexOf('producto');
    if (prodIdx !== -1 && prodIdx + 1 < pathParts.length) {
      productIdStr = pathParts[prodIdx + 1];
    }
  }
  const productId = parseInt(productIdStr);

  if (!productId || isNaN(productId)) {
    window.location.href = '/productos';
    return;
  }

  // 2. Find product in premiumProducts array
  let currentProduct = null;
  for (let p of premiumProducts) {
    if (p.id === productId) {
      currentProduct = p;
      break;
    }
    if (p.subProducts) {
      for (let sub of p.subProducts) {
        if (sub.id === productId) {
          currentProduct = sub;
          break;
        }
      }
    }
    if (currentProduct) break;
  }

  if (!currentProduct) {
    alert("Producto no encontrado");
    window.location.href = 'productos';
    return;
  }

  // 3. Inject data into DOM
  document.getElementById('detail-title').textContent = currentProduct.title;
  document.getElementById('detail-image').src = currentProduct.image;
  
  const priceEl = document.getElementById('detail-price');
  const totalEl = document.getElementById('detail-total');
  priceEl.textContent = typeof formatPriceText === 'function' ? formatPriceText(currentProduct.priceText) : currentProduct.priceText;
  totalEl.textContent = typeof formatPriceText === 'function' ? formatPriceText(currentProduct.priceText) : currentProduct.priceText;
  
  // Handle Dynamic Description
  if (currentProduct.description) {
    document.getElementById('default-es-box').style.display = 'none';
    document.getElementById('default-en-box').style.display = 'none';
    const dynBox = document.getElementById('dynamic-desc-box');
    dynBox.style.display = 'block';
    
    // Convert literal \n to <br> and make headers bold
    const formattedDesc = currentProduct.description
      .replace(/\\n/g, '<br>')
      .replace(/CARACTERÍSTICAS DEL SERVICIO/g, '<br><strong>CARACTERÍSTICAS DEL SERVICIO</strong>')
      .replace(/CALIDAD Y ENTREGA/g, '<br><strong>CALIDAD Y ENTREGA</strong>')
      .replace(/SOPORTE/g, '<br><strong>SOPORTE</strong>');
      
    document.getElementById('dynamic-desc-body').innerHTML = formattedDesc;
  }

  const stockBadge = document.getElementById('detail-stock');
  if (currentProduct.badge === 'Out of stock') {
    stockBadge.innerHTML = '<i class="fa-solid fa-xmark-circle"></i> Out of stock';
    stockBadge.className = 'detail-stock-badge out-of-stock';
    document.getElementById('btn-buy-now').disabled = true;
    document.getElementById('btn-buy-now').style.opacity = '0.5';
    document.getElementById('btn-buy-now').style.cursor = 'not-allowed';
  } else {
    // If it has a specific stock like "149 in stock", show it, else generic "In stock"
    const stockText = currentProduct.badge.includes('products') ? 'In stock' : currentProduct.badge;
    stockBadge.innerHTML = `<i class="fa-solid fa-check-circle"></i> ${stockText}`;
    stockBadge.className = 'detail-stock-badge';
  }

  // 4. Quantity & Variants Logic
  const qtyInput = document.getElementById('qty-input');
  const btnMinus = document.getElementById('qty-minus');
  const btnPlus = document.getElementById('qty-plus');

  // Parse base price to number for math
  const parsePriceNum = (str) => {
    const match = str.match(/ARS ([\d\.,]+)/);
    if(match) {
      // replace dots, then replace comma with dot, then parse float
      let clean = match[1].replace(/\./g, '').replace(',', '.');
      return parseFloat(clean);
    }
    return 0;
  };
  
  let basePriceNum = parsePriceNum(currentProduct.priceText);

  // Handle Variants
  const variantsContainer = document.getElementById('variants-container');
  const variantsList = document.getElementById('variants-list');
  let currentVariant = null;

  if (currentProduct.variants && currentProduct.variants.length > 0) {
    variantsContainer.style.display = 'block';
    
    const renderVariants = () => {
      variantsList.innerHTML = '';
      currentProduct.variants.forEach((v, index) => {
        const isSelected = currentVariant === v;
        const box = document.createElement('div');
        box.className = `variant-box ${isSelected ? 'selected' : ''}`;
        
        box.innerHTML = `
          <div class="variant-radio">
            <div class="variant-radio-inner" style="opacity: ${isSelected ? '1' : '0'}"></div>
          </div>
          <div class="variant-info">
            <div class="variant-name">${v.name} ${v.discountBadge ? `<span style="color:var(--color-success); font-weight:800; font-size:0.8em; margin-left:0.5rem">${v.discountBadge}</span>` : ''}</div>
            <div class="variant-desc-text">${v.desc || ''}</div>
            <div class="variant-stock"><i class="fa-solid fa-infinity"></i> En stock</div>
          </div>
          <div class="variant-price">
            ${v.originalPriceText ? `<span style="text-decoration:line-through; font-size:0.8em; opacity:0.6; display:block; text-align:right;">${typeof formatPriceText === 'function' ? formatPriceText(v.originalPriceText) : v.originalPriceText}</span>` : ''}
            ${typeof formatPriceText === 'function' ? formatPriceText(v.priceText) : v.priceText}
          </div>
        `;
        
        box.addEventListener('click', () => {
          currentVariant = v;
          basePriceNum = currentVariant.priceNum || parsePriceNum(currentVariant.priceText);
          priceEl.textContent = typeof formatPriceText === 'function' ? formatPriceText(currentVariant.priceText) : currentVariant.priceText;
          
          if (currentVariant.minQty) {
            qtyInput.min = currentVariant.minQty;
            if (parseInt(qtyInput.value) < currentVariant.minQty) {
              qtyInput.value = currentVariant.minQty;
            }
          } else {
            qtyInput.min = 1;
          }
          
          updateQuantity(parseInt(qtyInput.value));
          renderVariants();
        });
        
        variantsList.appendChild(box);
      });
    };

    // Initialize first variant
    currentVariant = currentProduct.variants[0];
    basePriceNum = currentVariant.priceNum || parsePriceNum(currentVariant.priceText);
    priceEl.textContent = typeof formatPriceText === 'function' ? formatPriceText(currentVariant.priceText) : currentVariant.priceText;
    
    if (currentVariant.minQty) {
      qtyInput.min = currentVariant.minQty;
      qtyInput.value = currentVariant.minQty;
    }
    
    renderVariants();
  }

  const updateQuantity = (newQty) => {
    const minQ = currentVariant && currentVariant.minQty ? currentVariant.minQty : 1;
    if (newQty < minQ) newQty = minQ;
    qtyInput.value = newQty;
    
    // Update total price with discount logic
    let finalBasePrice = basePriceNum;
    let hasDiscount = false;
    let originalBaseNum = currentVariant && currentVariant.originalPriceNum ? currentVariant.originalPriceNum : basePriceNum;
    let discountText = currentVariant && currentVariant.discountBadge ? currentVariant.discountBadge : '(-25%)';
    
    // 25% discount if qty is 1000 or more
    if (newQty >= 1000) {
      finalBasePrice = basePriceNum * 0.75;
      hasDiscount = true;
      originalBaseNum = basePriceNum;
      discountText = '(-25%)';
    } else if (currentVariant && currentVariant.originalPriceNum) {
      hasDiscount = true;
    }
    
    const newTotal = finalBasePrice * newQty;
    
    if (hasDiscount) {
      const originalTotal = originalBaseNum * newQty;
      
      totalEl.innerHTML = `<span style="text-decoration: line-through; opacity: 0.6; font-size: 0.8em; margin-right: 0.5rem">${typeof formatPriceNumber === 'function' ? formatPriceNumber(originalTotal) : 'ARS ' + originalTotal}</span>${typeof formatPriceNumber === 'function' ? formatPriceNumber(newTotal) : 'ARS ' + newTotal} <span style="color:var(--color-success); font-size: 0.8em; margin-left: 0.5rem">${discountText}</span>`;
    } else {
      totalEl.textContent = typeof formatPriceNumber === 'function' ? formatPriceNumber(newTotal) : `ARS ${newTotal}`;
    }
  };

  btnMinus.addEventListener('click', () => updateQuantity(parseInt(qtyInput.value) - 1));
  btnPlus.addEventListener('click', () => updateQuantity(parseInt(qtyInput.value) + 1));
  qtyInput.addEventListener('change', () => updateQuantity(parseInt(qtyInput.value) || 1));
  qtyInput.addEventListener('input', () => {
    // optional real-time feedback, usually change is enough, but input makes it instantaneous
    const val = parseInt(qtyInput.value);
    if (!isNaN(val)) updateQuantity(val);
  });

  // Buy Now Logic
  document.getElementById('btn-buy-now').addEventListener('click', (e) => {
    e.preventDefault();
    try {
      if(currentProduct.badge === 'Out of stock') return;
      
      const itemQuantity = parseInt(qtyInput.value);
      if (typeof cartManager !== 'undefined') {
        cartManager.addItem(currentProduct, itemQuantity, currentVariant);
      } else if (window.cartManager) {
        window.cartManager.addItem(currentProduct, itemQuantity, currentVariant);
      } else {
        alert("Error: cartManager no está cargado");
        return;
      }
      
      // Abrir el carrito
      const cartDrawer = document.getElementById('cart-drawer');
      const cartOverlay = document.getElementById('cart-overlay');
      if (cartDrawer) cartDrawer.classList.add('open');
      if (cartOverlay) cartOverlay.classList.add('open');
      
    } catch(err) {
      console.error("Error al añadir al carrito:", err);
      alert("Ocurrió un error al procesar tu producto: " + err.message);
    }
  });
  
  // ----------------------------------------------------
  // Reviews Logic
  // ----------------------------------------------------
  const tabReviews = document.getElementById('tab-reviews');
  if (tabReviews && typeof reviewsDatabase !== 'undefined') {
    // Simple pseudo-random generator based on product ID
    let seed = currentProduct.id;
    const random = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    // Determine number of reviews (3 or 4)
    const numReviews = Math.floor(random() * 2) + 3;
    
    // Pick unique reviews based on category
    let availableReviews = reviewsDatabase.filter(r => r.category === currentProduct.category);
    // Fallback to General if not enough reviews found for the specific category
    if (availableReviews.length < 5) {
      availableReviews = availableReviews.concat(reviewsDatabase.filter(r => r.category === 'General'));
    }
    
    // Shuffle with our seed
    for (let i = availableReviews.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [availableReviews[i], availableReviews[j]] = [availableReviews[j], availableReviews[i]];
    }
    
    const selectedReviews = [];
    const usedTexts = new Set();
    
    for (const review of availableReviews) {
      if (!usedTexts.has(review.text)) {
        selectedReviews.push(review);
        usedTexts.add(review.text);
      }
      if (selectedReviews.length === numReviews) break;
    }

    tabReviews.innerHTML = '';
    selectedReviews.forEach(review => {
      const starsHTML = '⭐'.repeat(review.rating);
      
      const reviewHTML = `
        <div class="review-box" style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 1.5rem; margin-bottom: 1rem;">
          <div class="review-header" style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <div style="width: 36px; height: 36px; border-radius: 50%; background: ${review.avatarColor}; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1rem;">
                ${review.avatarText}
              </div>
              <div>
                <div style="font-weight: 600; font-size: 0.95rem;">${review.name}</div>
                <div style="font-size: 0.75rem; color: var(--color-text-muted);">${starsHTML}</div>
              </div>
            </div>
            <span class="review-date" style="font-size: 0.8rem; color: var(--color-text-muted);">${review.date}</span>
          </div>
          <p style="font-size: 0.9rem; line-height: 1.5; color: #ddd; margin-bottom: 0.75rem;">${review.text}</p>
          ${review.verified ? '<div class="review-verified" style="font-size: 0.8rem; color: #00ff66;"><i class="fa-solid fa-check-circle"></i> Comprador verificado</div>' : ''}
        </div>
      `;
      tabReviews.innerHTML += reviewHTML;
    });
  }

  // Tabs Logic
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      
      btn.classList.add('active');
      const targetId = `tab-${btn.dataset.target}`;
      document.getElementById(targetId).classList.add('active');
    });
  });

  // ----------------------------------------------------
  // Related Products (Cross-Selling)
  // ----------------------------------------------------
  const relatedGrid = document.getElementById('related-grid');
  if (relatedGrid && currentProduct) {
    let related = [];
    let allProducts = [];
    
    // Flatten products array
    if (typeof premiumProducts !== 'undefined') {
      premiumProducts.forEach(p => {
        if(p.subProducts) {
          allProducts = allProducts.concat(p.subProducts.map(sub => ({...sub, category: p.category})));
        } else {
          allProducts.push(p);
        }
      });

      // Filter by same category, exclude current
      related = allProducts.filter(p => p.category === currentProduct.category && p.id !== currentProduct.id);
      
      // If less than 4, fill with others
      if (related.length < 4) {
        const others = allProducts.filter(p => p.id !== currentProduct.id && !related.includes(p));
        related = related.concat(others.slice(0, 4 - related.length));
      }
      
      related = related.slice(0, 4);

      const createCardHTML = (product) => `
        <div class="premium-badge" style="${product.badge === 'Out of stock' ? 'background: rgba(255,0,0,0.3); color: #ff6b6b;' : ''}">${product.badge}</div>
        <div class="premium-image-wrapper">
          <img src="${product.image}" alt="${product.title} image" style="width:100%; height:100%; object-fit: cover;">
        </div>
        <div class="premium-delivery">
          <i class="fa-solid fa-bolt"></i> Entrega inmediata
        </div>
        <div class="premium-title">${product.title}</div>
        <div class="premium-price">${typeof formatPriceText === 'function' ? formatPriceText(product.priceText) : product.priceText}</div>
      `;

      relatedGrid.innerHTML = '';
      related.forEach(product => {
        const card = document.createElement('a');
        card.href = `/${product.slug}`;
        card.className = 'premium-card';
        card.innerHTML = createCardHTML(product);
        relatedGrid.appendChild(card);
      });
    }
  }
});
