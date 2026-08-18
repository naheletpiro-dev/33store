// Formateador de moneda (ARS o USD dinámicamente)
const formatARS = (amount) => {
  if (typeof formatPriceNumber === 'function') {
    return formatPriceNumber(amount);
  }
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0
  }).format(amount);
};

// El estado del carrito ahora lo maneja cartManager.js
let currentCategory = 'all';

// Elementos del DOM
document.addEventListener('DOMContentLoaded', () => {
  const productGrid = document.getElementById('product-grid');
  const categoryBtns = document.querySelectorAll('.category-btn');
  const cartBtn = document.getElementById('cart-btn');
  const closeCartBtn = document.getElementById('close-cart');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalEl = document.getElementById('cart-total-amount');
  const cartBadge = document.getElementById('cart-badge');
  const toastContainer = document.getElementById('toast-container');

  // Renderizar Productos
  const renderProducts = (category = 'all') => {
    if (!productGrid) return;
    productGrid.innerHTML = '';
    
    const filteredProducts = category === 'all' 
      ? products 
      : products.filter(p => p.category === category);

    filteredProducts.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <div class="product-icon"><i class="${product.icon}"></i></div>
        <h3 class="product-title">${product.title}</h3>
        <p class="product-desc">${product.description}</p>
        <div class="product-footer">
          <div class="product-price">${formatARS(product.price)}</div>
          <button class="btn-add" data-id="${product.id}">
            <i class="fa-solid fa-plus"></i> Añadir
          </button>
        </div>
      `;
      productGrid.appendChild(card);
    });

    // Añadir listeners a los nuevos botones
    document.querySelectorAll('.btn-add').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.dataset.id);
        addToCart(id);
      });
    });
  };

  // Filtrado por Categorías
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      categoryBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const category = e.target.dataset.category;
      renderProducts(category);
    });
  });

  // Lógica del Carrito
  const addToCart = (id) => {
    // Buscar en el arreglo global correcto (premiumProducts suele ser el estándar)
    let allProducts = [];
    if (typeof premiumProducts !== 'undefined') allProducts = premiumProducts;
    else if (typeof products !== 'undefined') allProducts = products;
    
    const product = allProducts.find(p => p.id === id);
    if (product) {
      cartManager.addItem(product, 1);
      showToast(`¡${product.title} añadido!`);
    }
  };

  const removeFromCart = (index) => {
    cartManager.removeItem(index);
  };

  const updateCartUI = () => {
    const cart = cartManager.getCart();
    const totalItems = cartManager.getTotalItems();
    
    if (cartBadge) {
      cartBadge.textContent = totalItems;
      if (totalItems > 0) {
        cartBadge.style.display = 'flex';
      } else {
        cartBadge.style.display = 'none';
      }
    } else {
      // Intentar con cart-count (usado en producto.html)
      const altBadge = document.querySelector('.cart-count');
      if (altBadge) {
        altBadge.textContent = totalItems;
      }
    }

    if (!cartItemsContainer) return; // Si no hay contenedor, no renderizamos los ítems

    cartItemsContainer.innerHTML = '';
    let total = cartManager.getTotal();

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p style="color: var(--color-text-muted); text-align: center; margin-top: 2rem;">Tu carrito está vacío</p>';
    } else {
      cart.forEach((item, index) => {
        const qty = item.quantity || 1;
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        const cartItemImg = item.image ? `<img src="${item.image}" alt="${item.title}" style="width:40px; height:40px; object-fit:cover; border-radius:8px; border:1px solid rgba(255,255,255,0.1);">` : `<i class="${item.icon || 'fa-solid fa-box'}"></i>`;
        cartItem.innerHTML = `
          <div class="cart-item-icon" style="flex-shrink:0;">${cartItemImg}</div>
          <div class="cart-item-info" style="min-width:0; flex-grow:1;">
            <div class="cart-item-title" style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${item.title}</div>
            <div class="cart-item-price">${formatARS(item.price * qty)}</div>
            <div class="cart-qty-controls" style="display:flex; align-items:center; gap:0.5rem; margin-top:0.5rem;">
              <button class="cart-qty-minus" data-index="${index}" style="background:rgba(255,255,255,0.1); border:none; color:white; width:22px; height:22px; border-radius:4px; cursor:pointer;">-</button>
              <span style="font-size:0.85rem;">${qty}</span>
              <button class="cart-qty-plus" data-index="${index}" style="background:rgba(255,255,255,0.1); border:none; color:white; width:22px; height:22px; border-radius:4px; cursor:pointer;">+</button>
              <button class="cart-item-remove" data-index="${index}" style="margin-left:auto; background:transparent; border:none; color:#ff6b6b; cursor:pointer; font-size:0.85rem;"><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>
        `;
        cartItemsContainer.appendChild(cartItem);
      });

      document.querySelectorAll('.cart-qty-minus').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(e.currentTarget.dataset.index);
          const currentQty = cartManager.getCart()[idx].quantity;
          cartManager.updateQuantity(idx, currentQty - 1);
        });
      });
      document.querySelectorAll('.cart-qty-plus').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(e.currentTarget.dataset.index);
          const currentQty = cartManager.getCart()[idx].quantity;
          cartManager.updateQuantity(idx, currentQty + 1);
        });
      });
      document.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
          cartManager.removeItem(parseInt(e.currentTarget.dataset.index));
        });
      });
    }

    if (cartTotalEl) cartTotalEl.textContent = formatARS(total);
    const cartTotalPriceAlt = document.getElementById('cart-total-price');
    if (cartTotalPriceAlt) cartTotalPriceAlt.textContent = formatARS(total);
  };
  
  // Suscribirse a cambios en el carrito
  if (typeof cartManager !== 'undefined') {
    cartManager.subscribe(updateCartUI);
  }

  // UI del Carrito (Abrir/Cerrar)
  const toggleCart = () => {
    if(cartDrawer) cartDrawer.classList.toggle('open');
    if(cartOverlay) cartOverlay.classList.toggle('open');
  };

  if(cartBtn) cartBtn.addEventListener('click', toggleCart);
  else {
    // Intentar con cart-toggle
    const altCartBtn = document.getElementById('cart-toggle');
    if (altCartBtn) altCartBtn.addEventListener('click', toggleCart);
  }
  
  if(closeCartBtn) closeCartBtn.addEventListener('click', toggleCart);
  if(cartOverlay) cartOverlay.addEventListener('click', toggleCart);

  // Sistema de Notificaciones (Toasts)
  const showToast = (message) => {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-check-circle"></i> <span>${message}</span>`;
    toastContainer.appendChild(toast);
    
    // Eliminar del DOM después de la animación (3s aprox)
    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  // Botón de Checkout Dummy
  document.getElementById('checkout-btn').addEventListener('click', () => {
    // Navigate to checkout regardless, checkout.js will handle empty state
    window.location.href = 'checkout';
  });

  // Inicialización
  renderProducts();
  updateCartUI();

  // ----------------------------------------------------
  // SPA Page Transitions
  // ----------------------------------------------------
  document.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      if (
        this.target === '_blank' || 
        this.getAttribute('href').startsWith('#') || 
        this.getAttribute('href').startsWith('http') && !this.href.includes(window.location.host)
      ) {
        return;
      }
      e.preventDefault();
      const href = this.href;
      document.body.classList.add('fade-out');
      setTimeout(() => {
        window.location.href = href;
      }, 300);
    });
  });

  // ----------------------------------------------------
  // 3D Tilt Effect (Vanilla Tilt)
  // ----------------------------------------------------
  const loadVanillaTilt = () => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.8.1/vanilla-tilt.min.js';
    script.onload = () => {
      const initTilt = () => {
        // Solo seleccionar tarjetas que NO tengan el atributo data-tilt-ready
        const cards = document.querySelectorAll(".premium-card:not([data-tilt-ready]), .feature-card:not([data-tilt-ready]), .review-card:not([data-tilt-ready])");
        if (cards.length > 0) {
          VanillaTilt.init(cards, {
            max: 5,
            speed: 400,
            glare: true,
            "max-glare": 0.05,
          });
          // Marcar las tarjetas como inicializadas
          cards.forEach(card => card.setAttribute('data-tilt-ready', 'true'));
        }
      };
      
      initTilt();
      
      // Observar cambios solo en los contenedores donde se inyectan tarjetas dinámicamente
      const observer = new MutationObserver(initTilt);
      const grids = ['bestsellers-grid', 'premium-grid', 'related-grid', 'modal-grid'];
      
      grids.forEach(id => {
        const grid = document.getElementById(id);
        if (grid) {
          observer.observe(grid, { childList: true, subtree: true });
        }
      });
    };
    document.body.appendChild(script);
  };
  loadVanillaTilt();
});
