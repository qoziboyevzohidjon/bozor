import { getCurrentUser } from './auth.js';
import { getGames } from './storage.js';
import { getCart, setCart } from './storage.js';

export const getCartItems = () => {
  const currentUser = getCurrentUser();
  const userId = currentUser ? currentUser.id : 'guest';
  const games = getGames();
  const cart = getCart(userId);
  return cart.map((item) => {
    const game = games.find((entry) => entry.id === item.gameId);
    if (!game) return null;
    return { ...item, game };
  }).filter(Boolean);
};

export const getCartCount = () => getCartItems().reduce((total, item) => total + (item.quantity || 1), 0);

export const addToCart = (gameId, quantity = 1) => {
  const currentUser = getCurrentUser();
  const userId = currentUser ? currentUser.id : 'guest';
  const cart = getCart(userId);
  const existing = cart.find((item) => item.gameId === gameId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ gameId, quantity });
  }
  setCart(userId, cart);
  return cart;
};

export const removeFromCart = (gameId) => {
  const currentUser = getCurrentUser();
  const userId = currentUser ? currentUser.id : 'guest';
  const cart = getCart(userId).filter((item) => item.gameId !== gameId);
  setCart(userId, cart);
  return cart;
};

export const updateCartQuantity = (gameId, quantity) => {
  const currentUser = getCurrentUser();
  const userId = currentUser ? currentUser.id : 'guest';
  const cart = getCart(userId).map((item) => item.gameId === gameId ? { ...item, quantity: Math.max(1, quantity) } : item);
  setCart(userId, cart);
  return cart;
};

export const clearCart = () => {
  const currentUser = getCurrentUser();
  const userId = currentUser ? currentUser.id : 'guest';
  const empty = [];
  setCart(userId, empty);
  return empty;
};

export const getCartSummary = () => {
  const items = getCartItems();
  const subtotal = items.reduce((sum, item) => sum + (item.game.price * item.quantity), 0);
  const savings = items.reduce((sum, item) => sum + ((item.game.oldPrice || item.game.price) * item.quantity - item.game.price * item.quantity), 0);
  const total = subtotal;
  return { items, subtotal, savings, total };
};
