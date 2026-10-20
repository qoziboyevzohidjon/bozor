import { getCurrentUser } from './auth.js';
import { getGames, getOrders, setOrders } from './storage.js';

export const getAllOrdersForCurrentUser = () => {
  const currentUser = getCurrentUser();
  if (!currentUser) return [];
  return getOrders(currentUser.id);
};

export const getSellerOrders = (sellerId) => {
  const profiles = getOrders();
  const values = Object.values(profiles || {});
  const flattened = values.flat();
  return flattened.filter((order) => order.items.some((item) => item.game.sellerId === sellerId));
};

export const createOrderFromCart = (items) => {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    throw new Error('You need to log in to place an order.');
  }

  const timestamp = new Date();
  const order = {
    id: `ORD-${Date.now()}`,
    createdAt: timestamp.toISOString(),
    status: 'Processing',
    total: items.reduce((sum, item) => sum + (item.game.price * item.quantity), 0),
    items: items.map((item) => ({
      gameId: item.game.id,
      game: item.game,
      quantity: item.quantity,
      price: item.game.price
    }))
  };

  const userOrders = getOrders(currentUser.id);
  userOrders.unshift(order);
  setOrders(currentUser.id, userOrders);
  return order;
};

export const getDashboardOrders = () => {
  const games = getGames();
  const currentUser = getCurrentUser();
  if (!currentUser) return [];
  const userOrders = getOrders(currentUser.id);
  return userOrders.slice(0, 4).map((order) => ({
    ...order,
    items: order.items.map((item) => ({ ...item, game: games.find((game) => game.id === item.gameId) || item.game }))
  }));
};
