export const BASE_URL = import.meta.env.VITE_NODE_ENV === 'production'
  ? import.meta.env.VITE_BACKEND_API_URL
  : 'http://localhost:8000/api/v1';
export const USERS_URL = '/users';
export const TOKEN = '/token';
export const INCOMES_URL = '/incomes';
export const EXPENSES_URL = '/expenses';
