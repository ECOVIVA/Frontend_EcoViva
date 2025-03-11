import { create } from 'zustand';
import { User } from '../types/types';
import { loginUser } from '../services/authService'; // Certifique-se de que este caminho esteja correto.

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  initAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await loginUser(username, password);

      if (response?.token) { // Agora estamos checando pelo 'token' que o backend retorna
        // Criando um objeto de usuário baseado na resposta do backend.
        const user: User = {
          id: response.user.id,               // Identificador único
          username: response.user.username,   // Nome de usuário único
          first_name: response.user.first_name, // Primeiro nome
          last_name: response.user.last_name,   // Sobrenome
          email: response.user.email,         // Email
          phone: response.user.phone,         // Número de telefone
          avatar: response.user.photos        // Imagem do perfil
        };

        set({ user, isAuthenticated: true });
        localStorage.setItem('ecovivaUser', JSON.stringify(user)); // Salva o usuário no localStorage

        return true;
      } else {
        return false; // Caso o 'token' não seja retornado
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return false; // Se ocorrer algum erro na tentativa de login
    }
  },

  logout: (): void => {
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem('ecovivaUser'); // Remove o usuário do localStorage ao deslogar
  },

  initAuth: (): void => {
    const storedUser = localStorage.getItem('ecovivaUser');

    if (storedUser) {
      try {
        const user: User = JSON.parse(storedUser); // Recupera o usuário salvo no localStorage
        set({ user, isAuthenticated: true });
      } catch (error) {
        console.error('Erro ao processar usuário salvo:', error);
        localStorage.removeItem('ecovivaUser'); // Remove o item se houver erro ao recuperar
      }
    }
  }
}));

// Inicializar autenticação ao carregar a aplicação
useAuthStore.getState().initAuth();
