import { ensureDemoData, getCurrentUser, getUsers, setCurrentUser, setUsers } from './storage.js';

const DEMO_PASSWORDS = {
  'buyer@gamezone.demo': 'Buyer@123',
  'seller@gamezone.demo': 'Seller@123'
};

const base64 = (buffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
};

export const hashPassword = async (password, salt = 'gamezone-demo') => {
  const raw = `${salt}:${password}`;
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(raw));
  return base64(digest);
};

export const createUserPayload = (formData) => ({
  firstName: formData.firstName.trim(),
  lastName: formData.lastName.trim(),
  username: formData.username.trim(),
  email: formData.email.trim().toLowerCase(),
  role: formData.role,
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80'
});

export const registerUser = async (formData) => {
  ensureDemoData();
  const users = getUsers();
  const payload = createUserPayload(formData);
  const validated = validateRegistration(payload, formData.password, formData.confirmPassword, formData.acceptTerms);
  if (!validated.ok) {
    throw new Error(validated.message);
  }
  const salt = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const passwordHash = await hashPassword(formData.password, salt);
  const user = {
    ...payload,
    id: `u_${Date.now()}`,
    passwordHash,
    passwordSalt: salt,
    createdAt: new Date().toISOString()
  };
  users.push(user);
  setUsers(users);
  setCurrentUser(user);
  return user;
};

export const loginUser = async ({ email, password }) => {
  ensureDemoData();
  const safeEmail = String(email || '').trim().toLowerCase();
  const users = getUsers();
  const user = users.find((item) => item.email.toLowerCase() === safeEmail);

  if (!user) {
    throw new Error('No user found with that email.');
  }

  if (user.passwordHash === 'demo-password-hash' && DEMO_PASSWORDS[safeEmail] === password) {
    setCurrentUser(user);
    return user;
  }

  const freshHash = await hashPassword(password, user.passwordSalt || 'gamezone-demo');
  if (freshHash === user.passwordHash) {
    setCurrentUser(user);
    return user;
  }

  throw new Error('Incorrect password or email.');
};

export const logoutUser = () => {
  setCurrentUser(null);
  window.location.href = 'login.html';
};

export const isLoggedIn = () => Boolean(getCurrentUser());

export const requireAuth = () => {
  if (!isLoggedIn()) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
};

export const requireRole = (role) => {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    window.location.href = 'login.html';
    return false;
  }
  if (currentUser.role !== role) {
    const destination = currentUser.role === 'seller' ? 'seller-dashboard.html' : 'user-dashboard.html';
    window.location.href = destination;
    return false;
  }
  return true;
};

const validateRegistration = (payload, password, confirmPassword, acceptTerms) => {
  if (!payload.firstName || !payload.lastName) return { ok: false, message: 'Please complete your first and last name.' };
  if (!payload.username || payload.username.length < 3) return { ok: false, message: 'Username must be at least 3 characters.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) return { ok: false, message: 'Please enter a valid email address.' };
  if (getUsers().some((user) => user.username.toLowerCase() === payload.username.toLowerCase())) return { ok: false, message: 'This username is already in use.' };
  if (getUsers().some((user) => user.email.toLowerCase() === payload.email.toLowerCase())) return { ok: false, message: 'This email is already registered.' };
  if (password.length < 8) return { ok: false, message: 'Password must be at least 8 characters long.' };
  if (password !== confirmPassword) return { ok: false, message: 'Passwords do not match.' };
  if (!acceptTerms) return { ok: false, message: 'You must accept the terms and conditions.' };
  return { ok: true };
};

export const updateUserProfile = (updates) => {
  const currentUser = getCurrentUser();
  if (!currentUser) return null;
  const users = getUsers();
  const index = users.findIndex((user) => user.id === currentUser.id);
  if (index === -1) return null;
  const nextUser = { ...users[index], ...updates };
  users[index] = nextUser;
  setUsers(users);
  setCurrentUser(nextUser);
  return nextUser;
};
