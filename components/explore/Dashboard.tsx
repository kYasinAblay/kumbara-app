import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MoneyBox } from '../../src/models/MoneyBox';
//import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated';

interface DashboardProps {
  moneyBoxes: MoneyBox[];
}

export function Dashboard({ moneyBoxes }: DashboardProps) {
  const totalAmount = moneyBoxes.reduce((sum, box) => sum + box.amount, 0);
  const totalBoxes = moneyBoxes.length;

  const cities = new Set(moneyBoxes.map(box => box.city));
  const totalCities = cities.size;


  return (
      <View style={styles.container}>
      {/* Summary Cards */}
      <View style={styles.summaryContainer}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="cash-outline" size={18} color="#6b7280" />
            <Text style={styles.cardTitle}>Total Savings</Text>
          </View>
          <Text style={styles.cardValue}>₺{totalAmount.toFixed(2)}</Text>
          <Text style={styles.cardSubtitle}>Across all money boxes</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="archive-outline" size={18} color="#6b7280" />
            <Text style={styles.cardTitle}>Total Money Boxes</Text>
          </View>
          <Text style={styles.cardValue}>{totalBoxes}</Text>
          <Text style={styles.cardSubtitle}>Active money boxes</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="location-outline" size={18} color="#6b7280" />
            <Text style={styles.cardTitle}>Locations</Text>
          </View>
          <Text style={styles.cardValue}>{totalCities}</Text>
          <Text style={styles.cardSubtitle}>
            {totalCities === 1 ? 'City' : 'Cities'}
          </Text>
        </View>
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 24 },
  summaryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    width: '100%',
    height: 200,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  cardTitle: { fontSize: 20, color: '#6b7280', marginLeft: 4 },
  cardValue: { fontSize: 36, fontWeight: '700', color: '#312e81' },
  cardSubtitle: { fontSize: 18, color: '#9ca3af' },
  breakdownCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  breakdownTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#312e81',
    marginBottom: 12,
  },
  cityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  cityInfo: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  cityName: { fontSize: 15, fontWeight: '500', color: '#111827' },
  citySubtitle: { fontSize: 12, color: '#6b7280' },
  cityAmount: { fontSize: 16, fontWeight: '600', color: '#312e81' },
});
