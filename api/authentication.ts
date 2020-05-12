import { LoginForm } from '../pages/login';
import { RegisterForm } from '../pages/register';

export const login = (
  formData: LoginForm
): Promise<{ accessToken: string }> => {
  return fetch('http://localhost:8000/login', {
    body: JSON.stringify(formData),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) =>
    response.ok ? response.json() : Promise.reject(response)
  );
};

export const register = (
  formData: RegisterForm
): Promise<{ accessToken: string }> => {
  return fetch('http://localhost:8000/register', {
    body: JSON.stringify(formData),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) =>
    response.ok ? response.json() : Promise.reject(response)
  );
};

export const checkAuth = (
  accessToken: string
): Promise<{ isLoggedIn: boolean }> => {
  return fetch('http://localhost:8000/checkAuth', {
    method: 'GET',
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  }).then((response) =>
    response.ok ? response.json() : Promise.reject(response)
  );
};
