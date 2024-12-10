import React, { createContext, useState, useContext, ReactNode } from 'react';

interface User {
  email: string;
  password: string;
}

interface AuthContextProps {
  user: string | null;
  signIn: (email: string, password: string) => boolean;
  signOut: () => void;
  signUp: (email: string, password: string) => boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<User[]>([]);

  // console.log(user,registeredUsers,"from sign up")

  const signUp = (email: string, password: string) => {
    const userExists = registeredUsers.some((user) => user.email === email);
    
    if (userExists) {
      return false; 
    }

    setRegisteredUsers([...registeredUsers, { email, password }]);
    return true; 
  };

  const signIn = (email: string, password: string) => {
    const user = registeredUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      setUser(email);
      return true; 
    }

    return false; 
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('error error error');
  }
  return context;
};

