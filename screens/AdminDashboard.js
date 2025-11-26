import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function AdminDashboard({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>👨‍💼 Admin Dashboard</Text>
      
      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardTitle}>Project Management</Text>
        <Text style={styles.cardDesc}>Manage construction projects</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardTitle}>User Management</Text>
        <Text style={styles.cardDesc}>Manage engineers & subcontractors</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardTitle}>Reports</Text>
        <Text style={styles.cardDesc}>View project reports & analytics</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.logoutBtn}
        onPress={() => navigation.replace('Login')}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f7f9fc' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 30, color: '#0077b6' },
  card: { backgroundColor: '#fff', padding: 20, marginBottom: 15, borderRadius: 10, elevation: 2 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  cardDesc: { fontSize: 14, color: '#666', marginTop: 5 },
  logoutBtn: { backgroundColor: '#dc3545', padding: 15, borderRadius: 10, marginTop: 20 },
  logoutText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});