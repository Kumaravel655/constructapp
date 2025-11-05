import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Static user database
  const users = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "engineer", password: "eng123", role: "site_engineer" },
    { username: "sub", password: "sub123", role: "subcontractor" },
  ];

  const handleLogin = () => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      Alert.alert("Login Failed", "Invalid username or password");
      return;
    }

    // Navigate based on role
    if (user.role === "admin") navigation.replace("AdminDashboard");
    else if (user.role === "site_engineer") navigation.replace("EngineerDashboard");
    else if (user.role === "subcontractor") navigation.replace("SubcontractorDashboard");
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
      <Button title="Login" onPress={handleLogin} />

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
