import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from "@/context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export default function signup() {
  const [passwordStrength, setPasswordStrength] = useState<string>("");

  const handlePasswordChange = (password: string) => {
    if (password.length < 6) {
      setPasswordStrength("Weak");
    } else if (
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(password)
    ) {
      setPasswordStrength("Strong");
    } else {
      setPasswordStrength("Medium");
    }
  };
  const { signUp } = useAuth();
  const navigation = useNavigation();

  const handleSubmit = (values: { email: string }) => {
    const success = signUp(values.email, values.password);

    if (success) {
      alert("Registration has successfull");
      navigation.navigate("login");
    } else {
      alert("User/email already exists.");
    }
  };
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
          password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .max(20, "Password cannot exceed 20 characters")
            .matches(
              /[!@#$%^&*(),.?":{}|<>]/,
              "Must have least one special characters"
            )
            .required("Password is required"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Confirm Password is required"),
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
            <Text style={styles.title}>Sign Up</Text>
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
              onChangeText={(text) => {
                handleChange("password")(text);
                handlePasswordChange(text);
              }}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            {touched.password && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
            <>
            {values.password && 
              <Text
                style={[
                  styles.passwordStrength,
                  passwordStrength === "Weak" && styles.weak,
                  passwordStrength === "Medium" && styles.medium,
                  passwordStrength === "Strong" && styles.strong,
                ]}
              >
                Password Strength: {passwordStrength}
              </Text>
            }</>

            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              value={values.confirmPassword}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.error}>{errors.confirmPassword}</Text>
            )}

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.buttons} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
              {/* <Button
                style={styles.buttons}
                title="Sign Up"
                onPress={() => handleSubmit()}
                color="#4CAF50"
              /> */}
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
  passwordStrength: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  weak: { color: "red" },
  medium: { color: "orange" },
  strong: { color: "green" },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 15,
  },
  error: { color: "red", fontSize: 12, marginBottom: 10 },
});
