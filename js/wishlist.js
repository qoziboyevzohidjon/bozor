import { getCurrentUser } from './auth.js';
import { getGames } from './storage.js';
import { getWishlist, setWishlist } from './storage.js';

export const getWishlistItems = () => {
  const currentUser = getCurrentUser();
  const userId = currentUser ? currentUser.id : 'guest';
  const wishlist = getWishlist(userId);
  const games = getGames();
  return wishlist.map((gameId) => games.find((game) => game.id === gameId)).filter(Boolean);
};

export const isInWishlist = (gameId) => {
  const currentUser = getCurrentUser();
  if (!currentUser) return false;
  const wishlist = getWishlist(currentUser.id);
  return wishlist.includes(gameId);
};

export const toggleWishlist = (gameId) => {
  const currentUser = getCurrentUser();
  if (!currentUser) return false;
  const userId = currentUser.id;
  const wishlist = getWishlist(userId);
  const next = wishlist.includes(gameId) ? wishlist.filter((id) => id !== gameId) : [...wishlist, gameId];
  setWishlist(userId, next);
  return next.includes(gameId);
};

export const removeFromWishlist = (gameId) => {
  const currentUser = getCurrentUser();
  if (!currentUser) return [];
  const userId = currentUser.id;
  const next = getWishlist(userId).filter((id) => id !== gameId);
  setWishlist(userId, next);
  return next;
};
