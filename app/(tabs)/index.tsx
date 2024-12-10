import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();
  const { user, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.greeting}></Text>
      {user ? (
        <>
          <Text style={styles.greeting}>Hello, {user}!</Text>
          <TouchableOpacity
            style={styles.buttons}
            onPress={signOut}
          >
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.infoText}>Please Log in</Text>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => navigation.navigate("login")}
          >
            <Text style={styles.buttonText}>Go to Sign In</Text>
          </TouchableOpacity>

          <Text style={styles.infoText}>Don't have an account?</Text>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => navigation.navigate("signup")}
          >
            <Text style={styles.buttonText}>Go to Sign Up</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f8ff", 
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1e90ff",
    marginBottom: 40,
    textAlign: "center",
  },
  greeting: {
    fontSize: 20,
    fontWeight: "500",
    color: "#333", 
    marginBottom: 30,
    textAlign: "center",
  },
  infoText: {
    fontSize: 16,
    color: "#888", 
    textAlign: "center",
    marginVertical: 10,
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 15,
    width: "100%", 
    alignItems: "center",
  },
  buttons: {
    backgroundColor: "#1e90ff",
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
    width: "80%", 
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

