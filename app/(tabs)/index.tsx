import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function home() {
  const navigation = useNavigation();
  const { user, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      {user ? (
        <>
          <Text style={styles.title}>Hello, {user}!</Text>
          <Button title="Sign Out" onPress={signOut} />
        </>
      ) : (
        <>
          <Text style={styles.title}>Please Log in</Text>
          <Button
            title="Go to Sign In"
            onPress={() => navigation.navigate("signin")}
          />
          <Text style={styles.title}>Dont have account</Text>
          <Button
            title="Go to Sign Up"
            onPress={() => navigation.navigate("signup")}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, textAlign: "center", marginBottom: 20 },
});
