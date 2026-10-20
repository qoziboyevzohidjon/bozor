import { getCurrentUser, logoutUser } from './auth.js';
import { getCartCount } from './cart.js';
import { getWishlistItems } from './wishlist.js';

export const formatCurrency = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(amount || 0));

export const renderStars = (rating = 0) => {
  const stars = Array.from({ length: 5 }, (_, index) => index < Math.round(rating) ? '★' : '☆');
  return stars.join('');
};

export const updateHeaderState = () => {
  const currentUser = getCurrentUser();
  const authButtons = document.querySelectorAll('[data-auth-button]');
  const avatarWrap = document.querySelector('[data-user-menu]');
  const cartCount = document.querySelector('[data-cart-count]');
  const wishlistCount = document.querySelector('[data-wishlist-count]');

  const cartTotal = getCartCount();
  const wishlistTotal = getWishlistItems().length;

  if (cartCount) cartCount.textContent = cartTotal;
  if (wishlistCount) wishlistCount.textContent = wishlistTotal;

  if (!currentUser) {
    authButtons.forEach((button) => button.classList.remove('hidden'));
    if (avatarWrap) avatarWrap.classList.add('hidden');
    return;
  }

  authButtons.forEach((button) => button.classList.add('hidden'));
  if (avatarWrap) {
    avatarWrap.classList.remove('hidden');
    const userName = avatarWrap.querySelector('[data-user-name]');
    if (userName) userName.textContent = currentUser.username;
  }
};

export const toggleUserMenu = () => {
  const menu = document.querySelector('[data-user-menu-panel]');
  if (!menu) return;
  menu.classList.toggle('open');
};

export const attachGlobalEvents = () => {
  document.addEventListener('click', (event) => {
    const target = event.target.closest('[data-action]');
    if (!target) return;

    const action = target.dataset.action;
    if (action === 'logout') {
      logoutUser();
    }

    if (action === 'toggle-user-menu') {
      toggleUserMenu();
    }
  });

  document.addEventListener('click', (event) => {
    const menu = document.querySelector('[data-user-menu-panel]');
    const trigger = document.querySelector('[data-user-menu-button]');
    if (!menu || !trigger) return;
    if (!menu.contains(event.target) && !trigger.contains(event.target)) {
      menu.classList.remove('open');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      const modal = document.querySelector('.modal.is-open');
      if (modal) modal.classList.remove('is-open');
      const menu = document.querySelector('[data-user-menu-panel]');
      if (menu) menu.classList.remove('open');
    }
  });
};

export const setPageTheme = () => {
  const page = document.body.dataset.page;
  document.querySelectorAll('.main-nav a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href && href.includes(page) || href === 'index.html' && page === 'home') {
      link.classList.add('active');
    }
  });
};

export const setupPasswordToggles = () => {
  document.querySelectorAll('[data-toggle-password]').forEach((button) => {
    button.addEventListener('click', () => {
      const input = button.parentElement.querySelector('input');
      if (!input) return;
      const isHidden = input.type === 'password';
      input.type = isHidden ? 'text' : 'password';
      button.textContent = isHidden ? 'Hide' : 'Show';
    });
  });
};

export const showMessage = (selector, message, type = 'error') => {
  const field = document.querySelector(selector);
  if (!field) return;
  field.textContent = message;
  field.dataset.state = type;
};

export const bindGenericActions = () => {
  document.body.addEventListener('click', (event) => {
    const target = event.target.closest('[data-open-modal]');
    if (!target) return;
    const modalId = target.dataset.openModal;
    document.getElementById(modalId)?.classList.add('is-open');
  });

  document.body.addEventListener('click', (event) => {
    const closeEl = event.target.closest('[data-close-modal]');
    if (!closeEl) return;
    const modal = closeEl.closest('.modal');
    if (modal) modal.classList.remove('is-open');
  });
};
