document.addEventListener('DOMContentLoaded', () => {
  const checkoutItemsContainer = document.getElementById('checkout-items');
  const checkoutTotalElement = document.getElementById('checkout-total');
  const copyBtn = document.getElementById('btn-copy-order');

  // El carrito ahora lo provee cartManager
  function renderCart() {
    const cart = cartManager.getCart();
    if (cart.length === 0) {
      checkoutItemsContainer.innerHTML = '<p style="text-align:center; color:gray;">Tu carrito está vacío.</p>';
      checkoutTotalElement.textContent = typeof formatPriceNumber === 'function' ? formatPriceNumber(0) : 'ARS 0';
      if (copyBtn) copyBtn.style.display = 'none';
      return;
    }

    if (copyBtn) copyBtn.style.display = 'flex';

    checkoutItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const formattedPrice = typeof formatPriceNumber === 'function' ? formatPriceNumber(itemTotal) : `ARS ${itemTotal.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;

      const itemHTML = `
        <div class="order-summary-item">
          <div class="order-item-info">
            <img src="${item.image}" alt="${item.title}" class="order-item-img">
            <div class="order-item-details">
              <h4>${item.title}</h4>
              <p>Cant: ${item.quantity}</p>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div class="order-item-price">${formattedPrice}</div>
            <button class="btn-remove-item" data-index="${index}" style="background: none; border: none; color: #ef4444; cursor: pointer; font-size: 1.1rem; padding: 0.2rem; transition: color 0.2s;" title="Eliminar producto" onmouseover="this.style.color='#f87171'" onmouseout="this.style.color='#ef4444'"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
      `;
      checkoutItemsContainer.insertAdjacentHTML('beforeend', itemHTML);
    });

    const formattedTotal = typeof formatPriceNumber === 'function' ? formatPriceNumber(total) : `ARS ${total.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
    checkoutTotalElement.textContent = formattedTotal;

    // Add event listeners for delete buttons
    const deleteBtns = document.querySelectorAll('.btn-remove-item');
    deleteBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.currentTarget.dataset.index);
        cartManager.removeItem(index);
        const cart = cartManager.getCart();
        
        // update global cart badge
        const cartBadge = document.getElementById('cart-badge');
        if (cartBadge) {
          const totalQty = cart.reduce((acc, i) => acc + i.quantity, 0);
          if (totalQty > 0) {
            cartBadge.textContent = totalQty;
            cartBadge.style.display = 'block';
          } else {
            cartBadge.style.display = 'none';
          }
        }
        
        // update cart toggle count (if present)
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
          const totalQty = cart.reduce((acc, i) => acc + i.quantity, 0);
          cartCount.textContent = totalQty;
          if (totalQty === 0) {
            cartCount.style.display = 'none';
          } else {
            cartCount.style.display = 'flex';
          }
        }

        renderCart();
      });
    });
  }

  // Initial render
  if (typeof cartManager !== 'undefined') {
    cartManager.subscribe(renderCart);
  }
  renderCart();

  // Copy Order Summary Logic
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const cart = cartManager.getCart();
      if (cart.length === 0) return;

      let orderText = `¡Hola 33Store! 👋 Quiero comprar:\n`;
      let total = 0;
      cart.forEach(item => {
        const itemTotal = (item.price * item.quantity);
        total += itemTotal;
        const formattedItemTotal = typeof formatPriceNumber === 'function' ? formatPriceNumber(itemTotal) : `ARS ${itemTotal.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
        orderText += `- ${item.quantity}x ${item.title} (${formattedItemTotal})\n`;
      });
      const formattedTotal = typeof formatPriceNumber === 'function' ? formatPriceNumber(total) : `ARS ${total.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
      orderText += `\nTotal: ${formattedTotal}\n¿Me pasas los medios de pago?`;

      const proceedToInstagram = (success) => {
        let toastContainer = document.getElementById('toast-container');
        if (!toastContainer) {
          toastContainer = document.createElement('div');
          toastContainer.id = 'toast-container';
          toastContainer.className = 'toast-container';
          document.body.appendChild(toastContainer);
        }
        
        const toast = document.createElement('div');
        toast.className = 'toast';
        
        if (success) {
          toast.innerHTML = `<i class="fa-solid fa-check-circle" style="color: var(--color-success);"></i> <span>Pedido copiado. Redirigiendo a Instagram...</span>`;
        } else {
          toast.innerHTML = `<i class="fa-solid fa-circle-exclamation" style="color: #ff4d4d;"></i> <span>Tu navegador bloqueó el copiado automático. Por favor, toma una captura de pantalla y envíala a nuestro Instagram.</span>`;
          toast.style.border = "1px solid #ff4d4d";
        }
        
        toastContainer.appendChild(toast);
        setTimeout(() => toast.remove(), 4000);
        
        copyBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Abriendo Instagram...`;
        setTimeout(() => {
          window.open('https://ig.me/m/33store.ar', '_blank');
          setTimeout(() => {
            copyBtn.innerHTML = `<i class="fa-brands fa-instagram"></i> Copiar y enviar por Instagram`;
          }, 2000);
        }, 1500);
      };

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(orderText)
          .then(() => proceedToInstagram(true))
          .catch(() => proceedToInstagram(false));
      } else {
        try {
          const textArea = document.createElement("textarea");
          textArea.value = orderText;
          textArea.style.position = "fixed"; 
          textArea.style.left = "-999999px";
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          const successful = document.execCommand('copy');
          textArea.remove();
          proceedToInstagram(successful);
        } catch (err) {
          proceedToInstagram(false);
        }
      }
    });
  }
});
