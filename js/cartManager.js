// js/cartManager.js
class CartManager {
  constructor() {
    this.cart = [];
    this.listeners = [];
    this.loadCart();
    
    // Sincronización entre pestañas
    window.addEventListener('storage', (e) => {
      if (e.key === 'cart') {
        this.loadCart();
        this.notifyListeners();
      }
    });
  }

  loadCart() {
    try {
      const saved = localStorage.getItem('cart');
      this.cart = saved ? JSON.parse(saved) : [];
    } catch (e) {
      this.cart = [];
    }
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.notifyListeners();
  }

  getCart() {
    return this.cart;
  }

  // Agregado desde producto.js o app.js
  addItem(product, quantity = 1, variant = null) {
    let finalPrice = product.priceNum || product.price || 0;
    
    // Si parsePriceNum no se pasó, intentar extraerlo (fallback rápido)
    if (!finalPrice && typeof product.priceText === 'string') {
      const match = product.priceText.match(/ARS ([\d\.,]+)/);
      if(match) {
        finalPrice = parseFloat(match[1].replace(/\./g, '').replace(',', '.'));
      }
    }
    
    if (variant) {
       finalPrice = variant.priceNum || finalPrice;
    }

    const cartId = variant ? `${product.id}-${variant.name}` : product.id;
    const existing = this.cart.find(item => (item.cartId || item.id) === cartId);

    if (existing) {
      existing.quantity += quantity;
    } else {
      this.cart.push({
        id: product.id,
        cartId: cartId,
        title: product.title + (variant ? ` (${variant.name})` : ''),
        priceText: variant ? variant.priceText : product.priceText,
        price: finalPrice,
        image: product.image,
        icon: product.icon,
        quantity: quantity
      });
    }
    this.saveCart();
  }

  updateQuantity(index, quantity) {
    if (this.cart[index]) {
      if (quantity <= 0) {
        this.removeItem(index);
      } else {
        this.cart[index].quantity = quantity;
        this.saveCart();
      }
    }
  }

  removeItem(index) {
    this.cart.splice(index, 1);
    this.saveCart();
  }

  getTotal() {
    return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getTotalItems() {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  subscribe(callback) {
    this.listeners.push(callback);
  }

  notifyListeners() {
    this.listeners.forEach(cb => cb(this.cart));
  }
}

window.cartManager = new CartManager();
