import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  CheckBox,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import { useAuth } from "@/context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";

export default function Login() {
  const [rememberMe, setRememberMe] = useState(false);
  const [credentialsLoaded, setCredentialsLoaded] = useState(false);
  const navigation = useNavigation();
  const { signIn } = useAuth();

  const [initialValues, setInitialValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchStoredCredentials = async () => {
      try {
        const email = await AsyncStorage.getItem("email");
        const password = await AsyncStorage.getItem("password");
        if (email && password) {
          setInitialValues({ email, password });
          setRememberMe(true);
        }
      } catch (error) {
        console.error("Error fetching stored credentials", error);
      } finally {
        setCredentialsLoaded(true);
      }
    };

    fetchStoredCredentials();
  }, []);

  const handleSubmit = async (values: { email: string; password: string }) => {
    const success = await signIn(values.email, values.password, rememberMe);

    if (success) {
      if (rememberMe) {
        await AsyncStorage.setItem("email", values.email);
        await AsyncStorage.setItem("password", values.password);
      } else {
        await AsyncStorage.removeItem("email");
        await AsyncStorage.removeItem("password");
      }
      navigation.navigate("index");
    } else {
      alert("Invalid email or password.");
    }
  };

  if (!credentialsLoaded) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
          password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
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
              <Text style={styles.text}>Don't have an account? Sign Up</Text>
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
