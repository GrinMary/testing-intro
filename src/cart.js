function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(cart, product, quantity) { 
  if (quantity < 1) throw new RangeError('Количество должно быть положительным');
  if (quantity > product.stock) throw new RangeError('Недостаточно товара на складе');
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    return cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item));
  }
  return [...cart, { ...product, quantity }];
}

function changeQuantity(cart, productId, quantity) { 
  if (quantity < 1) throw new RangeError('Количество должно быть положительным');
  const item = cart.find((entry) => entry.id === productId);
  if (!item) return cart;
  if (quantity > item.stock) throw new RangeError('Недостаточно товара на складе');
  return cart.map((entry) => (entry.id === productId ? { ...entry, quantity } : entry));
}

function removeFromCart(cart, productId) { 
  return cart.filter((item) => item.id !== productId);
}

function calculateCartSubtotal(cart) { 
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function calculateOrderTotal(cart, promoCode) { 
  const subtotal = calculateCartSubtotal(cart);
  const discount = promoCode === 'SAVE10' && subtotal >= 20000 ? Math.round(subtotal * 0.1) : 0;
  const delivery = subtotal < 50000 ? 30000 : 0;
  const total = subtotal - discount + delivery;
  return { subtotal, discount, delivery, total };
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
