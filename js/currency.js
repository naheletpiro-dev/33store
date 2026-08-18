const EXCHANGE_RATE = 1650;
const USD_MARKUP = 1.30; // Incremento del 30% para los precios en USD

function getCurrency() {
  return localStorage.getItem('currency') || 'ARS';
}

function setCurrency(curr) {
  localStorage.setItem('currency', curr);
  window.location.reload(); 
}

function formatPriceNumber(arsBaseValue) {
  const currency = getCurrency();
  if (currency === 'USD') {
    const usdVal = (arsBaseValue / EXCHANGE_RATE) * USD_MARKUP;
    return `USD ${usdVal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: (usdVal < 0.1 ? 4 : 2) })}`;
  } else {
    return `ARS ${arsBaseValue.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  }
}

function formatPriceText(text) {
  if (!text) return text;
  const currency = getCurrency();
  if (currency === 'ARS') return text;
  
  return text.replace(/ARS\s([\d.,]+)/g, (match, numStr) => {
    let cleanNumStr = numStr.replace(/\./g, '').replace(/,/g, '.');
    let arsValue = parseFloat(cleanNumStr);
    let usdValue = (arsValue / EXCHANGE_RATE) * USD_MARKUP;
    return `USD ${usdValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: (usdValue < 0.1 ? 4 : 2) })}`;
  });
}


document.addEventListener('DOMContentLoaded', () => {
  const current = getCurrency();
  const btns = document.querySelectorAll('.currency-btn');
  btns.forEach(btn => {
    if (btn.dataset.currency === current) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
    
    // Make sure we only add the listener once.
    if (!btn.dataset.listenerAdded) {
      btn.addEventListener('click', () => {
        setCurrency(btn.dataset.currency);
      });
      btn.dataset.listenerAdded = 'true';
    }
  });
});
