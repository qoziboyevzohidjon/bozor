import { ensureDemoData, getCurrentUser, loginUser, logoutUser, registerUser, requireAuth, requireRole, updateUserProfile } from './auth.js';
import { addToCart, clearCart, getCartItems, getCartSummary, removeFromCart, updateCartQuantity } from './cart.js';
import { getWishlistItems, toggleWishlist } from './wishlist.js';
import { getGameById, filterGames, getCategories, renderCatalogGrid, formatCurrency, renderStars } from './games.js';
import { createOrderFromCart, getAllOrdersForCurrentUser, getDashboardOrders } from './orders.js';
import { addSellerGame, deleteSellerGame, getSellerGames, updateSellerGame, updateSellerStore, getSellerStats } from './seller.js';
import { getBuyerDashboardData, getSellerDashboardData } from './dashboard.js';
import { attachGlobalEvents, setPageTheme, setupPasswordToggles, showMessage, updateHeaderState } from './ui.js';
import { getGames, getCurrentUser as getCurrentUserStorage, getSellerSettings, setSellerSettings, resetDemoData } from './storage.js';

const page = document.body.dataset.page;

const renderHomePage = () => {
  const games = getGames();
  const featured = games.slice(0, 4);
  const trending = [...games].sort((a, b) => b.sales - a.sales).slice(0, 4);
  const offers = games.filter((game) => game.discount).slice(0, 4);
  const releases = [...games].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4);

  document.querySelector('[data-featured]').innerHTML = featured.map((game) => `
    <article class="game-card">
      <div class="game-thumb">
        <img src="${game.cover}" alt="${game.name}" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80';" />
        ${game.discount ? `<span class="discount-tag">-${game.discount}%</span>` : ''}
      </div>
      <div class="game-body">
        <div class="game-meta"><span>${game.category}</span><span>${game.platform}</span></div>
        <h3 class="game-title">${game.name}</h3>
        <div class="game-price-row"><span class="price-main">${formatCurrency(game.price)}</span><span class="price-old">${formatCurrency(game.oldPrice || game.price)}</span></div>
        <div class="game-actions"><button class="btn btn-primary" data-action="add-cart" data-game-id="${game.id}">Add to Cart</button><a class="btn btn-secondary" href="game-details.html?id=${game.id}">View</a></div>
      </div>
    </article>
  `).join('');

  document.querySelector('[data-trending]').innerHTML = trending.map((game) => `
    <article class="game-card">
      <div class="game-thumb"><img src="${game.cover}" alt="${game.name}" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80';" /></div>
      <div class="game-body">
        <div class="game-meta"><span>${game.category}</span><span>${renderStars(game.rating)}</span></div>
        <h3 class="game-title">${game.name}</h3>
        <div class="game-price-row"><span class="price-main">${formatCurrency(game.price)}</span></div>
      </div>
    </article>
  `).join('');

  document.querySelector('[data-offers]').innerHTML = offers.map((game) => `
    <article class="game-card">
      <div class="game-thumb"><img src="${game.cover}" alt="${game.name}" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80';" /></div>
      <div class="game-body">
        <h3 class="game-title">${game.name}</h3>
        <div class="game-price-row"><span class="price-main">${formatCurrency(game.price)}</span><span class="price-old">${formatCurrency(game.oldPrice || game.price)}</span></div>
      </div>
    </article>
  `).join('');

  document.querySelector('[data-releases]').innerHTML = releases.map((game) => `
    <article class="game-card">
      <div class="game-thumb"><img src="${game.cover}" alt="${game.name}" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80';" /></div>
      <div class="game-body"><h3 class="game-title">${game.name}</h3><div class="game-meta"><span>${game.platform}</span><span>${new Date(game.createdAt).toLocaleDateString()}</span></div></div>
    </article>
  `).join('');
};

const renderCatalogPage = () => {
  const container = document.querySelector('[data-games-grid]');
  const categoryEl = document.querySelector('[name="categoryFilter"]');
  const platformEl = document.querySelector('[name="platformFilter"]');
  const sortEl = document.querySelector('[name="sortFilter"]');
  const searchEl = document.querySelector('[name="searchInput"]');
  const ratingEl = document.querySelector('[name="ratingFilter"]');
  const priceEl = document.querySelector('[name="priceFilter"]');
  const viewToggle = document.querySelector('[data-view-mode]');
  const countEl = document.querySelector('[data-results-count]');

  const categoryOptions = ['all', ...getCategories()];
  categoryEl.innerHTML = categoryOptions.map((category) => `<option value="${category}">${category === 'all' ? 'All Categories' : category}</option>`).join('');
  platformEl.innerHTML = ['all', 'PC', 'PlayStation', 'Xbox', 'Nintendo Switch'].map((platform) => `<option value="${platform}">${platform === 'all' ? 'All Platforms' : platform}</option>`).join('');

  const applyFilters = () => {
    const filters = {
      search: searchEl.value,
      category: categoryEl.value,
      platform: platformEl.value,
      minRating: ratingEl.value,
      maxPrice: priceEl.value,
      sort: sortEl.value,
    };
    const results = filterGames(getGames(), filters);
    if (countEl) countEl.textContent = `${results.length} games`;
    renderCatalogGrid(results, container, viewToggle?.dataset.view || 'grid');
  };

  [categoryEl, platformEl, sortEl, searchEl, ratingEl, priceEl].forEach((element) => {
    if (element) element.addEventListener('input', applyFilters);
    if (element) element.addEventListener('change', applyFilters);
  });

  if (viewToggle) {
    viewToggle.addEventListener('click', () => {
      const nextView = viewToggle.dataset.view === 'grid' ? 'list' : 'grid';
      viewToggle.dataset.view = nextView;
      viewToggle.textContent = nextView === 'grid' ? 'Grid View' : 'List View';
      applyFilters();
    });
  }

  applyFilters();
};

const renderGameDetails = () => {
  const container = document.querySelector('[data-game-details]');
  if (!container) return;
  const params = new URLSearchParams(window.location.search);
  const game = getGameById(params.get('id'));

  if (!game) {
    container.innerHTML = '<div class="empty-state"><h3>Game not found</h3><p>The selected title is unavailable right now.</p><a class="btn btn-primary" href="games.html">Browse catalog</a></div>';
    return;
  }

  container.innerHTML = `
    <div class="page-header">
      <h1>${game.name}</h1>
      <p>${game.category} • ${game.platform} • Rated ${game.rating}/5</p>
    </div>
    <div class="games-grid" style="grid-template-columns: 1.1fr 0.9fr; align-items:start;">
      <div class="game-card">
        <div class="game-thumb" style="height: 480px;"><img src="${game.cover}" alt="${game.name}" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80';" /></div>
      </div>
      <div class="panel-block">
        <span class="badge">${game.discount ? `${game.discount}% off` : 'Featured'}</span>
        <h2>${game.name}</h2>
        <div class="game-price-row">
          <span class="price-main">${formatCurrency(game.price)}</span>
          ${game.oldPrice ? `<span class="price-old">${formatCurrency(game.oldPrice)}</span>` : ''}
        </div>
        <p class="game-summary">${game.description}</p>
        <div class="inline-actions">
          <button class="btn btn-primary" data-action="add-cart" data-game-id="${game.id}">Add to Cart</button>
          <button class="btn btn-secondary" data-action="toggle-wishlist" data-game-id="${game.id}">Wishlist</button>
        </div>
        <ul class="table-list" style="margin-top: 18px;">
          <li><strong>Category:</strong> ${game.category}</li>
          <li><strong>Platform:</strong> ${game.platform}</li>
          <li><strong>Availability:</strong> ${game.availability}</li>
          <li><strong>Seller:</strong> ${game.sellerName}</li>
          <li><strong>Sales:</strong> ${game.sales}</li>
          <li><strong>Rating:</strong> ${renderStars(game.rating)}</li>
        </ul>
      </div>
    </div>
  `;
};

const renderCartPage = () => {
  const container = document.querySelector('[data-cart-content]');
  if (!container) return;
  const cartItems = getCartItems();
  const summary = getCartSummary();
  if (!cartItems.length) {
    container.innerHTML = '<div class="empty-state"><h3>Your cart is empty</h3><p>Add games to your cart and get ready for checkout.</p><a class="btn btn-primary" href="games.html">Browse games</a></div>';
    return;
  }
  container.innerHTML = `
    <div class="table-wrap">
      <table>
        <thead><tr><th>Game</th><th>Price</th><th>Qty</th><th>Total</th><th></th></tr></thead>
        <tbody>
          ${cartItems.map((item) => `
            <tr>
              <td><div class="user-chip"><img class="avatar" src="${item.game.cover}" alt="${item.game.name}" /><span>${item.game.name}</span></div></td>
              <td>${formatCurrency(item.game.price)}</td>
              <td><input type="number" class="input" min="1" value="${item.quantity}" data-quantity-input="${item.game.id}" style="max-width: 90px;" /></td>
              <td>${formatCurrency(item.game.price * item.quantity)}</td>
              <td><button class="btn btn-ghost" data-action="remove-cart" data-game-id="${item.game.id}">Remove</button></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    <div class="panel-block" style="margin-top: 20px;">
      <h3>Summary</h3>
      <div class="table-list">
        <div class="order-item"><span>Subtotal</span><strong>${formatCurrency(summary.subtotal)}</strong></div>
        <div class="order-item"><span>Discount</span><strong>- ${formatCurrency(summary.savings)}</strong></div>
        <div class="order-item"><span>Total</span><strong>${formatCurrency(summary.total)}</strong></div>
      </div>
      <div class="inline-actions" style="margin-top: 18px;">
        <button class="btn btn-primary" data-action="checkout">Checkout</button>
        <button class="btn btn-dark" data-action="clear-cart">Clear Cart</button>
      </div>
      <p class="inline-note">Demo order — real payment not processed.</p>
    </div>
  `;

  document.querySelectorAll('[data-quantity-input]').forEach((input) => {
    input.addEventListener('change', (event) => {
      const gameId = event.target.dataset.quantityInput;
      updateCartQuantity(gameId, Number(event.target.value));
      renderCartPage();
    });
  });
};

const renderWishlistPage = () => {
  const container = document.querySelector('[data-wishlist-content]');
  if (!container) return;
  const items = getWishlistItems();
  if (!items.length) {
    container.innerHTML = '<div class="empty-state"><h3>Your wishlist is empty</h3><p>Save games you want to revisit later.</p><a class="btn btn-primary" href="games.html">Discover games</a></div>';
    return;
  }
  container.innerHTML = items.map((game) => `<div class="order-item"><div class="left"><img class="order-thumb" src="${game.cover}" alt="${game.name}" /><div><strong>${game.name}</strong><p>${formatCurrency(game.price)}</p></div></div><div class="inline-actions"><button class="btn btn-primary" data-action="add-cart" data-game-id="${game.id}">Move to Cart</button><button class="btn btn-dark" data-action="remove-wishlist" data-game-id="${game.id}">Remove</button></div></div>`).join('');
};

const renderUserDashboard = () => {
  const data = getBuyerDashboardData();
  const container = document.querySelector('[data-dashboard-root]');
  if (!container || !data) {
    if (container) container.innerHTML = '<div class="empty-state"><h3>Login required</h3><p>Please sign in to view your dashboard.</p></div>';
    return;
  }

  const recent = data.recentOrders.length ? data.recentOrders.slice(0, 3).map((order) => `
    <div class="order-item">
      <div class="left">
        <div>
          <strong>${order.id}</strong>
          <p>${new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      <span class="status-pill success">${order.status}</span>
      <strong>${formatCurrency(order.total)}</strong>
    </div>
  `).join('') : '<div class="empty-state"><h3>No orders yet</h3><p>Your purchase history will appear here.</p></div>';

  container.innerHTML = `
    <div class="stats-grid">
      <div class="stat-card"><span class="label">Total Orders</span><span class="value">${data.orderCount}</span></div>
      <div class="stat-card"><span class="label">Games Owned</span><span class="value">${data.purchases.length}</span></div>
      <div class="stat-card"><span class="label">Wishlist</span><span class="value">${data.wishlistCount}</span></div>
      <div class="stat-card"><span class="label">Spent</span><span class="value">${formatCurrency(data.totalSpent)}</span></div>
    </div>
    <div class="panel-block">
      <h3>Recent Orders</h3>
      <div class="order-list">${recent}</div>
    </div>
  `;
};

const renderSellerDashboard = () => {
  const data = getSellerDashboardData();
  const container = document.querySelector('[data-dashboard-root]');
  if (!container || !data) {
    if (container) container.innerHTML = '<div class="empty-state"><h3>Seller access required</h3><p>Only sellers can view this dashboard.</p></div>';
    return;
  }
  const orders = data.recentOrders.length ? data.recentOrders.slice(0, 3).map((order) => `
    <div class="order-item">
      <div class="left">
        <div>
          <strong>${order.id}</strong>
          <p>${new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      <span class="status-pill success">${order.status}</span>
      <strong>${formatCurrency(order.total)}</strong>
    </div>
  `).join('') : '<div class="empty-state"><h3>No sales yet</h3><p>Once buyers place orders, this window will update.</p></div>';

  container.innerHTML = `
    <div class="stats-grid">
      <div class="stat-card"><span class="label">Total Games</span><span class="value">${data.gameCount}</span></div>
      <div class="stat-card"><span class="label">Orders</span><span class="value">${data.orderCount}</span></div>
      <div class="stat-card"><span class="label">Revenue</span><span class="value">${formatCurrency(data.totalRevenue)}</span></div>
      <div class="stat-card"><span class="label">Avg Rating</span><span class="value">${data.stats.avgRating}</span></div>
    </div>
    <div class="panel-block">
      <h3>Recent Orders</h3>
      <div class="order-list">${orders}</div>
    </div>
  `;
};

const bindAuthForms = () => {
  const registerForm = document.querySelector('#registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(registerForm);
      const payload = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
        role: formData.get('role'),
        acceptTerms: formData.get('acceptTerms') === 'on'
      };

      try {
        await registerUser(payload);
        window.location.href = payload.role === 'seller' ? 'seller-dashboard.html' : 'user-dashboard.html';
      } catch (error) {
        showMessage('[data-register-error]', error.message);
      }
    });
  }

  const loginForm = document.querySelector('#loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(loginForm);
      const email = formData.get('email');
      const password = formData.get('password');

      try {
        const user = await loginUser({ email, password });
        window.location.href = user.role === 'seller' ? 'seller-dashboard.html' : 'user-dashboard.html';
      } catch (error) {
        showMessage('[data-login-error]', error.message);
      }
    });
  }
};

const bindGameActions = () => {
  document.body.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action]');
    if (!button) return;
    const action = button.dataset.action;
    const gameId = button.dataset.gameId;

    if (action === 'add-cart') {
      addToCart(gameId);
      updateHeaderState();
      const toast = document.querySelector('[data-toast]');
      if (toast) toast.textContent = 'Game added to cart';
    }

    if (action === 'toggle-wishlist') {
      toggleWishlist(gameId);
      updateHeaderState();
      window.location.reload();
    }

    if (action === 'remove-cart') {
      removeFromCart(gameId);
      renderCartPage();
      updateHeaderState();
    }

    if (action === 'clear-cart') {
      clearCart();
      renderCartPage();
      updateHeaderState();
    }

    if (action === 'remove-wishlist') {
      toggleWishlist(gameId);
      renderWishlistPage();
      updateHeaderState();
    }

    if (action === 'checkout') {
      const items = getCartItems();
      if (!items.length) return;
      const order = createOrderFromCart(items);
      clearCart();
      renderCartPage();
      updateHeaderState();
      alert(`Order ${order.id} created successfully. Demo payment not processed.`);
    }
  });
};

const renderSellerGameManagement = () => {
  const list = document.querySelector('[data-seller-games]');
  if (!list) return;
  const currentUser = getCurrentUser();
  if (!currentUser || currentUser.role !== 'seller') return;
  const games = getSellerGames(currentUser.id);
  if (!games.length) {
    list.innerHTML = '<div class="empty-state"><h3>No games yet</h3><p>Publish your first title and it will appear here.</p></div>';
    return;
  }

  list.innerHTML = games.map((game) => `
    <div class="order-item">
      <div class="left">
        <img class="order-thumb" src="${game.cover}" alt="${game.name}" />
        <div>
          <strong>${game.name}</strong>
          <p>${game.category} • ${formatCurrency(game.price)}</p>
        </div>
      </div>
      <div class="inline-actions">
        <button class="btn btn-secondary" data-action="edit-game" data-game-id="${game.id}">Edit</button>
        <button class="btn btn-dark" data-action="delete-game" data-game-id="${game.id}">Delete</button>
      </div>
    </div>
  `).join('');
};

const bindSellerForms = () => {
  const addForm = document.querySelector('#addGameForm');
  if (addForm) {
    addForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(addForm);
      const payload = Object.fromEntries(formData.entries());
      try {
        const newGame = addSellerGame(payload);
        alert(`${newGame.name} added successfully.`);
        addForm.reset();
        window.location.href = 'manage-games.html';
      } catch (error) {
        showMessage('[data-game-error]', error.message);
      }
    });
  }

  const settingsForm = document.querySelector('#sellerSettingsForm');
  if (settingsForm) {
    settingsForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(settingsForm);
      const payload = { storeName: formData.get('storeName'), bio: formData.get('bio'), payoutMethod: formData.get('payoutMethod'), taxRate: Number(formData.get('taxRate')) };
      updateSellerStore(payload);
      alert('Store settings updated.');
    });
  }

  document.body.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action="delete-game"]');
    if (!button) return;
    const gameId = button.dataset.gameId;
    deleteSellerGame(gameId);
    renderSellerGameManagement();
  });

  document.body.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action="edit-game"]');
    if (!button) return;
    const gameId = button.dataset.gameId;
    const game = getGameById(gameId);
    if (!game) return;
    const form = document.querySelector('#editGameForm');
    if (!form) return;
    form.querySelector('[name="name"]').value = game.name;
    form.querySelector('[name="price"]').value = game.price;
    form.querySelector('[name="description"]').value = game.description;
    form.querySelector('[name="category"]').value = game.category;
    form.querySelector('[name="platform"]').value = game.platform;
    form.querySelector('[name="cover"]').value = game.cover;
    form.dataset.gameId = gameId;
    form.scrollIntoView({ behavior: 'smooth' });
  });

  const editForm = document.querySelector('#editGameForm');
  if (editForm) {
    editForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const currentGameId = editForm.dataset.gameId;
      if (!currentGameId) return;
      const formData = new FormData(editForm);
      const payload = Object.fromEntries(formData.entries());
      updateSellerGame(currentGameId, payload);
      renderSellerGameManagement();
      alert('Game updated successfully.');
    });
  }
};

const bindProfilePage = () => {
  const profileForm = document.querySelector('#profileForm');
  if (!profileForm) return;
  const currentUser = getCurrentUserStorage();
  if (!currentUser) return;
  profileForm.querySelector('[name="firstName"]').value = currentUser.firstName || '';
  profileForm.querySelector('[name="lastName"]').value = currentUser.lastName || '';
  profileForm.querySelector('[name="email"]').value = currentUser.email || '';
  profileForm.querySelector('[name="username"]').value = currentUser.username || '';

  profileForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(profileForm);
    const updates = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      username: formData.get('username'),
      email: formData.get('email')
    };
    const nextUser = updateUserProfile(updates);
    if (nextUser) {
      alert('Profile updated.');
    }
  });
};

const bindResetDemo = () => {
  const button = document.querySelector('[data-reset-demo]');
  if (!button) return;
  button.addEventListener('click', () => {
    resetDemoData();
    window.location.reload();
  });
};

const initPage = () => {
  ensureDemoData();

  const currentUser = getCurrentUser();
  if (page === 'login' || page === 'register') {
    if (currentUser) {
      window.location.href = currentUser.role === 'seller' ? 'seller-dashboard.html' : 'user-dashboard.html';
      return;
    }
  }

  const protectedBuyerPages = ['cart', 'wishlist', 'user-dashboard', 'orders', 'profile'];
  const protectedSellerPages = ['seller-dashboard', 'add-game', 'manage-games'];
  if (protectedBuyerPages.includes(page) && !currentUser) {
    window.location.href = 'login.html';
    return;
  }
  if (page === 'seller-dashboard' || page === 'add-game' || page === 'manage-games') {
    if (!currentUser || currentUser.role !== 'seller') {
      window.location.href = 'login.html';
      return;
    }
  }
  if (page === 'user-dashboard' && currentUser && currentUser.role !== 'buyer') {
    window.location.href = 'seller-dashboard.html';
    return;
  }

  attachGlobalEvents();
  setPageTheme();
  updateHeaderState();
  setupPasswordToggles();
  bindGameActions();
  bindAuthForms();
  bindSellerForms();
  bindProfilePage();
  bindResetDemo();

  if (page === 'home') renderHomePage();
  if (page === 'games') renderCatalogPage();
  if (page === 'game-details') renderGameDetails();
  if (page === 'cart') renderCartPage();
  if (page === 'wishlist') renderWishlistPage();
  if (page === 'user-dashboard') renderUserDashboard();
  if (page === 'seller-dashboard') renderSellerDashboard();
  if (page === 'manage-games') renderSellerGameManagement();
  if (page === 'orders') {
    const orders = getAllOrdersForCurrentUser();
    const container = document.querySelector('[data-orders-list]');
    if (container) {
      container.innerHTML = orders.length ? orders.map((order) => `
        <div class="order-item">
          <div class="left"><div><strong>${order.id}</strong><p>${new Date(order.createdAt).toLocaleDateString()}</p></div></div>
          <span class="status-pill success">${order.status}</span>
          <strong>${formatCurrency(order.total)}</strong>
        </div>
      `).join('') : '<div class="empty-state"><h3>No orders yet</h3><p>Your order history will show here after checkout.</p></div>';
    }
  }

  if (page === 'seller-dashboard' || page === 'user-dashboard') {
    const settings = document.querySelector('[data-dashboard-settings]');
    if (settings) {
      const currentUser = getCurrentUserStorage();
      if (currentUser) {
        settings.innerHTML = `<div class="order-item"><span>Email</span><strong>${currentUser.email}</strong></div>`;
      }
    }
  }
};

document.addEventListener('DOMContentLoaded', initPage);
