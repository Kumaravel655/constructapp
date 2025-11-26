import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import ApiService from "../services/api";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please enter both username and password");
      return;
    }

    setLoading(true);
    try {
      const response = await ApiService.login(username, password);
      
      // Store token for future requests
      ApiService.setToken(response.access);
      
      // Navigate based on user role
      const role = response.user?.role || response.role;
      if (role === "admin") navigation.replace("AdminDashboard");
      else if (role === "site_engineer") navigation.replace("EngineerDashboard");
      else if (role === "subcontractor") navigation.replace("SubcontractorDashboard");
      else Alert.alert("Error", "Unknown user role");
      
    } catch (error) {
      Alert.alert("Login Failed", error.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏗️ Construction Login</Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title={loading ? "Logging in..." : "Login"} onPress={handleLogin} disabled={loading} />

      <Text style={styles.hint}>
        Try: admin/admin123 | engineer/eng123 | sub/sub123
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#f7f9fc",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 30,
    color: "#0077b6",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  hint: {
    textAlign: "center",
    marginTop: 15,
    fontSize: 12,
    color: "#666",
  },
});
