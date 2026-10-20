import { STORAGE_KEYS, demoGames, demoUsers, demoSellerSettings } from './data.js';

const safeJSONParse = (value, fallback) => {
  if (!value || value === 'undefined') return fallback;
  try {
    return JSON.parse(value);
  } catch (error) {
    console.warn('JSON parse error:', error.message);
    return fallback;
  }
};

export const getStorage = (key, fallback = []) => {
  if (typeof window === 'undefined') return fallback;
  const value = localStorage.getItem(key);
  return safeJSONParse(value, fallback);
};

export const setStorage = (key, value) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
};

export const getUsers = () => getStorage(STORAGE_KEYS.users, demoUsers);
export const setUsers = (users) => setStorage(STORAGE_KEYS.users, users);

export const getCurrentUser = () => {
  const currentUser = getStorage(STORAGE_KEYS.currentUser, null);
  if (!currentUser) return null;
  const users = getUsers();
  return users.find((user) => user.id === currentUser.id) || currentUser;
};

export const setCurrentUser = (user) => setStorage(STORAGE_KEYS.currentUser, user ? { id: user.id, username: user.username, role: user.role } : null);

export const getGames = () => getStorage(STORAGE_KEYS.games, demoGames);
export const setGames = (games) => setStorage(STORAGE_KEYS.games, games);

export const getCart = (userId = null) => {
  const cart = getStorage(STORAGE_KEYS.cart, {});
  if (!userId) return cart;
  return cart[userId] || [];
};

export const setCart = (userId, items) => {
  const cart = getStorage(STORAGE_KEYS.cart, {});
  cart[userId] = items;
  setStorage(STORAGE_KEYS.cart, cart);
};

export const getWishlist = (userId = null) => {
  const wishlist = getStorage(STORAGE_KEYS.wishlist, {});
  if (!userId) return wishlist;
  return wishlist[userId] || [];
};

export const setWishlist = (userId, items) => {
  const wishlist = getStorage(STORAGE_KEYS.wishlist, {});
  wishlist[userId] = items;
  setStorage(STORAGE_KEYS.wishlist, wishlist);
};

export const getOrders = (userId = null) => {
  const orders = getStorage(STORAGE_KEYS.orders, {});
  if (!userId) return orders;
  return orders[userId] || [];
};

export const setOrders = (userId, items) => {
  const orders = getStorage(STORAGE_KEYS.orders, {});
  orders[userId] = items;
  setStorage(STORAGE_KEYS.orders, orders);
};

export const getSellerSettings = () => getStorage(STORAGE_KEYS.sellerSettings, demoSellerSettings);
export const setSellerSettings = (settings) => setStorage(STORAGE_KEYS.sellerSettings, settings);

export const resetDemoData = () => {
  setUsers(demoUsers);
  setGames(demoGames);
  setStorage(STORAGE_KEYS.cart, {});
  setStorage(STORAGE_KEYS.wishlist, {});
  setStorage(STORAGE_KEYS.orders, {});
  setStorage(STORAGE_KEYS.sellerSettings, demoSellerSettings);
  setCurrentUser(null);
  return true;
};

export const ensureDemoData = () => {
  const users = getUsers();
  const games = getGames();
  const cart = getStorage(STORAGE_KEYS.cart, {});
  const wishlist = getStorage(STORAGE_KEYS.wishlist, {});
  const orders = getStorage(STORAGE_KEYS.orders, {});
  const settings = getSellerSettings();

  if (!Array.isArray(users) || !users.length) setUsers(demoUsers);
  if (!Array.isArray(games) || !games.length) setGames(demoGames);
  if (!cart || typeof cart !== 'object') setStorage(STORAGE_KEYS.cart, {});
  if (!wishlist || typeof wishlist !== 'object') setStorage(STORAGE_KEYS.wishlist, {});
  if (!orders || typeof orders !== 'object') setStorage(STORAGE_KEYS.orders, {});
  if (!settings || typeof settings !== 'object') setSellerSettings(demoSellerSettings);

  const currentUser = getCurrentUser();
  if (currentUser && !users.some((user) => user.id === currentUser.id)) {
    setCurrentUser(null);
  }
};

export const clearGameZoneStorage = () => {
  Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
  ensureDemoData();
};

export const getRoleSpecificCollection = (userId, key) => {
  const collection = getStorage(key, {});
  return collection[userId] || [];
};

export const saveRoleSpecificCollection = (userId, key, value) => {
  const collection = getStorage(key, {});
  collection[userId] = value;
  setStorage(key, collection);
};
