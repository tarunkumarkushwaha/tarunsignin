import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  CheckBox,
} from "react-native";
import { Formik } from "formik";
import { useAuth } from "@/context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";

export default function Login() {
  const [rememberMe, setRememberMe] = useState(false);
  const navigation = useNavigation();
  const { signIn, user } = useAuth();

  const handleSubmit = (values: { email: string; password: string }) => {
    const success = signIn(values.email, values.password, rememberMe);

    if (success) {
      navigation.navigate("index");
      console.log("logged in");
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email("Invalid email").required("Email required"),
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
          <View style={styles.container}>
            <Text style={styles.title}>Sign In</Text>
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
            <View style={styles.checkboxContainer}>
              <CheckBox
                value={rememberMe}
                onValueChange={setRememberMe}
                style={styles.checkbox}
              />
              <Text style={styles.checkboxLabel}>Remember Me</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buttons}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.buttonText}>Sign in</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.signupbuttonContainer}>
              <Text style={styles.text}>not have account, Sign Up</Text>
              <TouchableOpacity
                style={styles.buttons}
                onPress={() => navigation.navigate("signup")}
              >
                <Text style={styles.buttonText}>Go to Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    padding: 20,
    alignItems: "center",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1e90ff",
    marginBottom: 40,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    margin: 20,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 15,
  },
  signupbuttonContainer: {
    marginBottom: 200,
    borderRadius: 15,
  },
  buttons: {
    backgroundColor: "#1e90ff",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 16,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});
