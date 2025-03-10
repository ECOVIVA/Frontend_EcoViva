export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  first_name: string;
  last_name: string;
  phone: string;
}

export interface CheckIn {
  id: string;
  userId: string;
  date: string;
  count: number;
}

export interface ForumPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  title: string;
  content: string;
  date: string;
  likes: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  date: string;
}


export interface ser {
  id: string;
  username: string; 
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  photos: string;
}


export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  initAuth: () => void;
  register: (formData: any) => Promise<boolean>;
}

