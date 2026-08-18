document.addEventListener('DOMContentLoaded', () => {
  const bestsellersGrid = document.getElementById('bestsellers-grid');
  
  if (!bestsellersGrid) return;

  // Let's pick 4 popular products from the premiumProducts array
  // Assuming premiumProducts is globally available from premium-data.js
  
  // Example IDs: netflix, chatgpt, discord, spotify
  const topProductIds = ['netflix', 'chatgpt', 'discord', 'spotify'];
  
  let bestsellers = [];
  if (typeof premiumProducts !== 'undefined') {
    bestsellers = premiumProducts.filter(p => topProductIds.includes(p.id));
    
    // Fallback if exactly those ids aren't found
    if (bestsellers.length < 4) {
      bestsellers = premiumProducts.slice(0, 4);
    }
  }

  const createCardHTML = (product) => `
    <div class="premium-badge" style="${product.badge === 'Out of stock' ? 'background: rgba(255,0,0,0.3); color: #ff6b6b;' : ''}">${product.badge}</div>
    <div class="premium-image-wrapper">
      <img src="${product.image}" alt="${product.title} image" style="width:100%; height:100%; object-fit: cover;">
    </div>
    <div class="premium-delivery">
      <i class="fa-solid fa-bolt"></i> Entrega inmediata
    </div>
    <div class="premium-title">${product.title}</div>
    <div class="premium-price">${formatPriceText(product.priceText)}</div>
  `;

  bestsellersGrid.innerHTML = '';
  
  bestsellers.forEach(product => {
    const card = document.createElement('a');
    card.href = `/${product.slug}`;
    card.className = 'premium-card';
    card.innerHTML = createCardHTML(product);
    bestsellersGrid.appendChild(card);
  });
});
