import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  email: string;
  password: string;
}

interface AuthContextProps {
  user: string | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string) => boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<User[]>([]);

  console.log(user, registeredUsers);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const Loggeduser = await AsyncStorage.getItem("user");
        const LoggedregisteredUsers = await AsyncStorage.getItem(
          "registeredusers"
        );
        if (LoggedregisteredUsers) {
          setRegisteredUsers(JSON.parse(LoggedregisteredUsers));
        }
        if (Loggeduser) {
          setUser(Loggeduser);
        }
      } catch (error) {
        console.error("Error loading user from AsyncStorage:", error);
      }
    };

    initializeAuth();
  }, []);

  const signUp = async (email: string, password: string) => {
    const userExists = registeredUsers.some((user) => user.email === email);

    if (userExists) {
      return false;
    }

    setRegisteredUsers([...registeredUsers, { email, password }]);

    const jsonValue = JSON.stringify([...registeredUsers, { email, password }]);
    await AsyncStorage.setItem("registeredusers", jsonValue);
  };

  const signIn = async (email: string, password: string): Promise<boolean> => {
    const existingUser = registeredUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (existingUser) {
      setUser(email);
      try {
        await AsyncStorage.setItem("user", email);
      } catch (error) {
        console.error("Error saving user to AsyncStorage:", error);
      }

      return true;
    }

    return false;
  };

  const signOut = async (): Promise<void> => {
    setUser(null);
    try {
      await AsyncStorage.removeItem("user");
    } catch (error) {
      console.error("Error removing user from AsyncStorage:", error);
    }
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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
