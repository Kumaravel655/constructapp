import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function EngineerDashboard({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>👷 Engineer Dashboard</Text>
      
      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardTitle}>Site Inspections</Text>
        <Text style={styles.cardDesc}>Conduct & manage site inspections</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardTitle}>Progress Reports</Text>
        <Text style={styles.cardDesc}>Submit daily progress reports</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardTitle}>Quality Control</Text>
        <Text style={styles.cardDesc}>Monitor construction quality</Text>
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