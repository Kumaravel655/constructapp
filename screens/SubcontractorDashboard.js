import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function SubcontractorDashboard({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔧 Subcontractor Dashboard</Text>
      
      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardTitle}>Assigned Tasks</Text>
        <Text style={styles.cardDesc}>View & update assigned work</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardTitle}>Material Requests</Text>
        <Text style={styles.cardDesc}>Request construction materials</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardTitle}>Time Tracking</Text>
        <Text style={styles.cardDesc}>Log work hours & progress</Text>
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