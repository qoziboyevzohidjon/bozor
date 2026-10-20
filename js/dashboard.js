import { getCurrentUser } from './auth.js';
import { getGames, getOrders, getWishlist, getCurrentUser as getCurrentUserFromStorage } from './storage.js';
import { getSellerGames, getSellerStats } from './seller.js';

export const getBuyerDashboardData = () => {
  const user = getCurrentUser();
  if (!user) return null;
  const games = getGames();
  const orders = getOrders(user.id);
  const wishlist = getWishlist(user.id);

  return {
    user,
    orderCount: orders.length,
    wishlistCount: wishlist.length,
    totalSpent: orders.reduce((sum, order) => sum + order.total, 0),
    purchases: orders.flatMap((order) => order.items).map((item) => ({
      ...item,
      game: games.find((game) => game.id === item.gameId) || item.game
    })),
    recentOrders: orders.slice(0, 4)
  };
};

export const getSellerDashboardData = () => {
  const user = getCurrentUser();
  if (!user || user.role !== 'seller') return null;
  const sellersGames = getSellerGames(user.id);
  const stats = getSellerStats(user.id);
  const orders = Object.values(getOrders() || {}).flat();
  const relevantOrders = orders.filter((order) => order.items.some((item) => item.game.sellerId === user.id));

  return {
    user,
    gameCount: sellersGames.length,
    orderCount: relevantOrders.length,
    totalRevenue: relevantOrders.reduce((sum, order) => sum + order.total, 0),
    stats,
    games: sellersGames,
    recentOrders: relevantOrders.slice(0, 5)
  };
};

export const getUserSummary = () => {
  const user = getCurrentUserFromStorage();
  return user ? user.username : 'Guest';
};
