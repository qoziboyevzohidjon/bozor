import { getCurrentUser } from './auth.js';
import { getGames, setGames, getSellerSettings, setSellerSettings } from './storage.js';

export const getSellerGames = (sellerId) => getGames().filter((game) => game.sellerId === sellerId);

export const addSellerGame = (formData) => {
  const currentUser = getCurrentUser();
  if (!currentUser || currentUser.role !== 'seller') {
    throw new Error('Only sellers can add games.');
  }

  const games = getGames();
  const newGame = {
    id: `G-${Date.now()}`,
    name: formData.name.trim(),
    description: formData.description.trim(),
    price: Number(formData.price),
    oldPrice: Number(formData.oldPrice || formData.price),
    discount: Number(formData.discount || 0),
    category: formData.category,
    platform: formData.platform,
    cover: formData.cover || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80',
    rating: Number(formData.rating || 4.5),
    sales: Number(formData.sales || 0),
    sellerId: currentUser.id,
    sellerName: currentUser.username,
    availability: formData.availability || 'In Stock',
    createdAt: new Date().toISOString(),
  };

  games.unshift(newGame);
  setGames(games);
  return newGame;
};

export const updateSellerGame = (gameId, updates) => {
  const currentUser = getCurrentUser();
  if (!currentUser || currentUser.role !== 'seller') {
    throw new Error('Only sellers can update games.');
  }

  const games = getGames();
  const index = games.findIndex((game) => game.id === gameId && game.sellerId === currentUser.id);
  if (index === -1) {
    throw new Error('Game not found or you cannot edit this listing.');
  }

  games[index] = { ...games[index], ...updates };
  setGames(games);
  return games[index];
};

export const deleteSellerGame = (gameId) => {
  const currentUser = getCurrentUser();
  if (!currentUser || currentUser.role !== 'seller') {
    throw new Error('Only sellers can remove games.');
  }

  const games = getGames().filter((game) => !(game.id === gameId && game.sellerId === currentUser.id));
  setGames(games);
  return games;
};

export const updateSellerStore = (updates) => {
  const settings = getSellerSettings();
  const merged = { ...settings, ...updates };
  setSellerSettings(merged);
  return merged;
};

export const getSellerStats = (sellerId) => {
  const games = getSellerGames(sellerId);
  return {
    gameCount: games.length,
    totalSales: games.reduce((sum, game) => sum + (game.sales || 0), 0),
    revenue: games.reduce((sum, game) => sum + ((game.price || 0) * (game.sales || 0)), 0),
    avgRating: games.length ? (games.reduce((sum, game) => sum + (game.rating || 0), 0) / games.length).toFixed(1) : 0
  };
};
