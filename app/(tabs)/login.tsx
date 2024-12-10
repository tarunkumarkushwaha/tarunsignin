import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Formik } from "formik";
import { useAuth } from "@/context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";

export default function Login() {
  const navigation = useNavigation();
  const { signIn, user } = useAuth();

  const handleSubmit = (values: { email: string; password: string }) => {
    const success = signIn(values.email, values.password);

    if (success) {
      navigation.navigate('index');
      console.log("logged in");
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Invalid email")
            .required("Email required"),
          password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password required"),
        })}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
          
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {touched.email && errors.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}

       
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            {touched.password && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            <Button title="Sign In" onPress={() => handleSubmit()} />
          </View>
        )}
      </Formik>

      <Button
        title="Go to Sign Up"
        onPress={() => navigation.navigate("signup")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, textAlign: "center", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  error: { color: "red", fontSize: 12, marginBottom: 10 },
});
