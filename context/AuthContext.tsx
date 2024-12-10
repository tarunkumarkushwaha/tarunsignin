import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  email: string;
  password: string;
}

interface AuthContextProps {
  user: string | null;
  signIn: (email: string, password: string, rememberMe: boolean) => boolean;
  signOut: () => void;
  signUp: (email: string, password: string) => boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<User[]>([]);

  useEffect(() => {
    const checkSavedEmail = async () => {
      const savedEmail = await AsyncStorage.getItem('email');
      const savedPassword = await AsyncStorage.getItem('password');
      if (savedEmail) {
        setUser(savedEmail); 
        setRegisteredUsers([...registeredUsers, { savedEmail, savedPassword }]);
      }
    };
    checkSavedEmail();
  }, []);

  const signUp = (email: string, password: string) => {
    const userExists = registeredUsers.some((user) => user.email === email);

    if (userExists) {
      return false;
    }

    setRegisteredUsers([...registeredUsers, { email, password }]);
    return true;
  };

  const signIn = async (email: string, password: string, rememberMe: boolean) => {
    const user = registeredUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      setUser(email);
      if (rememberMe) {
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('password', password);
      } else {
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('password');
      }

      return true;
    }

    return false;
  };

  const signOut = async () => {
    setUser(null);
    await AsyncStorage.removeItem('email'); 
    await AsyncStorage.removeItem('password'); 
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
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


