import { getGames } from './storage.js';
import { getCurrentUser } from './auth.js';
import { isInWishlist } from './wishlist.js';

export const formatCurrency = (amount) => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
}).format(Number(amount || 0));

export const renderStars = (rating = 0) => {
  const filled = Math.round(rating);
  const stars = Array.from({ length: 5 }, (_, index) => index < filled ? '★' : '☆');
  return `<span class="rating-row">${stars.join('')}</span>`;
};

export const getCategories = () => [...new Set(getGames().map((game) => game.category))];

export const getGameById = (gameId) => getGames().find((game) => game.id === gameId) || null;

export const filterGames = (games, filters = {}) => {
  const normalized = [...games];
  const search = (filters.search || '').toLowerCase();
  const category = filters.category || 'all';
  const platform = filters.platform || 'all';
  const minRating = Number(filters.minRating || 0);
  const maxPrice = Number(filters.maxPrice || 9999);
  const sort = filters.sort || 'popularity';

  return normalized
    .filter((game) => {
      const matchesSearch = !search || `${game.name} ${game.description}`.toLowerCase().includes(search);
      const matchesCategory = category === 'all' || game.category === category;
      const matchesPlatform = platform === 'all' || game.platform === platform;
      const matchesRating = Number(game.rating || 0) >= minRating;
      const matchesPrice = Number(game.price) <= maxPrice;
      return matchesSearch && matchesCategory && matchesPlatform && matchesRating && matchesPrice;
    })
    .sort((a, b) => {
      if (sort === 'price-low') return a.price - b.price;
      if (sort === 'price-high') return b.price - a.price;
      if (sort === 'rating') return b.rating - a.rating;
      if (sort === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      return b.sales - a.sales;
    });
};

export const renderGameCard = (game, view = 'grid') => {
  const isWishlisted = isInWishlist(game.id);
  const cardClass = view === 'list' ? 'game-card list-card' : 'game-card';
  const sellerTag = game.sellerName || 'GameZone';

  return `
    <article class="${cardClass}" data-game-id="${game.id}">
      <div class="game-thumb">
        <img src="${game.cover}" alt="${game.name}" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80';" />
        ${game.discount ? `<span class="discount-tag">-${game.discount}%</span>` : ''}
      </div>
      <div class="game-body">
        <div class="game-meta">
          <span>${game.category}</span>
          <span>${game.platform}</span>
        </div>
        <h3 class="game-title">${game.name}</h3>
        <div class="game-meta">
          <span>${renderStars(game.rating)}</span>
          <span>${game.sales} sales</span>
        </div>
        <div class="game-price-row">
          <span class="price-main">${formatCurrency(game.price)}</span>
          ${game.oldPrice ? `<span class="price-old">${formatCurrency(game.oldPrice)}</span>` : ''}
        </div>
        <p class="game-summary">${(game.description || '').slice(0, 110)}...</p>
        <div class="game-actions">
          <button class="btn btn-primary" data-action="add-cart" data-game-id="${game.id}">Add to Cart</button>
          <button class="btn btn-icon" data-action="toggle-wishlist" data-game-id="${game.id}" aria-label="Toggle wishlist">${isWishlisted ? '♥' : '♡'}</button>
          <a class="btn btn-secondary" href="game-details.html?id=${game.id}">View Details</a>
        </div>
        <div class="game-meta">
          <span>By ${sellerTag}</span>
          <span>${game.availability}</span>
        </div>
      </div>
    </article>
  `;
};

export const renderCatalogGrid = (games, container, view = 'grid') => {
  if (!container) return;
  if (!games.length) {
    container.innerHTML = `<div class="empty-state"><h3>No games match your filters</h3><p>Try a different category, platform or price range.</p></div>`;
    return;
  }
  container.className = view === 'list' ? 'games-list' : 'games-grid';
  container.innerHTML = games.map((game) => renderGameCard(game, view)).join('');
};

export const createIndexSection = (sectionTitle, games, limit = 4) => {
  const items = games.slice(0, limit);
  return `
    <div class="section-header">
      <div>
        <span class="section-kicker">${sectionTitle}</span>
        <h2 class="section-title">${sectionTitle}</h2>
      </div>
      <a href="games.html" class="btn btn-secondary">Browse all</a>
    </div>
    <div class="games-grid">
      ${items.map((game) => renderGameCard(game)).join('')}
    </div>
  `;
};

export const renderFeaturedSection = (targetSelector, games, limit = 4) => {
  const target = document.querySelector(targetSelector);
  if (!target) return;
  target.innerHTML = createIndexSection('Featured Games', games, limit);
};

export const getPlatformOptions = () => ['PC', 'PlayStation', 'Xbox', 'Nintendo Switch'];

export const getDemoStats = () => {
  const currentUser = getCurrentUser();
  const games = getGames();
  return {
    totalPlayers: games.reduce((sum, game) => sum + game.sales, 0),
    activeUser: currentUser ? currentUser.username : 'Guest',
    discountCount: games.filter((game) => game.discount).length
  };
};
