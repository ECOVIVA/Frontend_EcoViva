import axios from 'axios';

// Defina a URL base da API para reutilizar no axios
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/users', // Corrigido para a URL base da API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interface para a resposta de login
interface LoginResponse {
  user: {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    photos?: string;
  };
  token: string;
}

// Função para fazer login
export const loginUser = async (email: string, password: string): Promise<LoginResponse | null> => {
  try {
    // Enviar requisição POST para a API de login
    const response = await api.post('/auth/login', { email, password }); // Corrigido o caminho da API

    // Verificar se a resposta contém o token
    if (response.data && response.data.token) {
      // Armazenar o token e dados do usuário no localStorage
      localStorage.setItem('token', response.data.token); // Armazenando o token
      localStorage.setItem('user', JSON.stringify(response.data.user)); // Armazenando o usuário

      return response.data; // Retornar os dados do usuário e o token
    }

    return null; // Caso o login falhe
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return null;
  }
};

// Função para fazer logout
export const logout = (): void => {
  localStorage.removeItem('token'); // Remove o token ao deslogar
  localStorage.removeItem('user'); // Remove os dados do usuário
};

// Função para obter o usuário atual
export const getCurrentUser = (): object | null => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null; // Retorna o usuário armazenado ou null se não existir
};

// Função para verificar se o usuário está autenticado
export const isAuthenticated = (): boolean => {
  // Retorna true se houver um token válido no localStorage
  return !!localStorage.getItem('token');
};

// Função para realizar a verificação de validade do token no backend
export const validateToken = async (): Promise<boolean> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return false; // Se não houver token, retorna false
    }

    // Realiza a validação do token com a API (Exemplo de endpoint)
    const response = await api.post('/auth/validate', { token });

    if (response.data && response.data.isValid) {
      return true; // Se o token for válido
    }

    return false; // Se o token não for válido
  } catch (error) {
    console.error('Erro ao validar token:', error);
    return false;
  }
};

// Função para atualizar o token (caso o backend permita)
export const refreshToken = async (): Promise<string | null> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return null; // Se não houver token, retorna null
    }

    // Realiza o refresh token na API (Exemplo de endpoint)
    const response = await api.post('/auth/refresh-token', { token });

    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token); // Atualiza o token no localStorage
      return response.data.token; // Retorna o novo token
    }

    return null; // Se o refresh não for bem-sucedido
  } catch (error) {
    console.error('Erro ao atualizar o token:', error);
    return null;
  }
};
