import axios from 'axios';

// Instância do axios
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/users/', 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Permite enviar cookies nas requisições
});

// Função de login
export const loginUser = async (Email: string, password: string) => {
  try {
    const response = await api.post('/login/', { Email, password });
    const { access, refresh } = response.data;

    // Armazenando os tokens no cookie
    document.cookie = `access_token=${access}; Max-Age=3600; path=/`;
    document.cookie = `refresh_token=${refresh}; Max-Age=86400; path=/`;

    console.log('Login bem-sucedido!');
    return response.data; // Retorna os tokens
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw new Error('Usuário ou senha inválidos');
  }
};

// Função para renovar o token de acesso
export const refreshAccessToken = async () => {
  try {
    const response = await api.post('/refresh/',{}, {withCredentials:true});

    console.log('Token de acesso renovado');
    return response.data; // Retorna o novo token
  } catch (error) {
    console.error('Erro ao renovar o token:', error);
    throw new Error('Falha ao renovar o token');
  }
};


// Função para obter o access token armazenado
const getAccessTokenFromCookie = () => {
  const cookies = document.cookie.split('; ');
  const accessToken = cookies.find(cookie => cookie.startsWith('access_token='));
  return accessToken ? accessToken.split('=')[1] : null;
};

export const logoutUser = () => {
  
  console.log('Usuário deslogado');
};

export const isAuthenticated = async () => {
  try {
    // Tenta fazer a requisição para verificar o token
    const response = await api.get('/verify/');
    console.log('Token válido:', response.data);

    return true;  // Retorna true se o token for válido

  } catch (error) {
    console.error('Erro na verificação do token:', error.response ? error.response.data : error.message);

    if (error.response && error.response.status === 401) {
      // Se falhar devido a erro 401, tenta fazer o refresh do token
      try {
        const refreshResponse = await api.post('/refresh/'); // Usando a mesma instância do axios para refresh
        console.log('Token atualizado:', refreshResponse.data);

        // Após o refresh, tenta verificar o token novamente
        return isAuthenticated();  // Chama novamente a função de verificação

      } catch (refreshError) {
        console.error('Erro no refresh do token:', refreshError.response ? refreshError.response.data : refreshError.message);
        return false;  // Retorna false se o refresh falhar
      }
    } else {
      return false;  // Retorna false se a verificação falhar
    }
  }
};
