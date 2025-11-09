import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { MoneyBox } from '../../src/models/MoneyBox';

interface DashboardProps {
  moneyBoxes: MoneyBox[];
}

export function Dashboard({ moneyBoxes }: DashboardProps) {
  const totalAmount = moneyBoxes.reduce((sum, box) => sum + box.amount, 0);
  const totalBoxes = moneyBoxes.length;

  const cities = new Set(moneyBoxes.map(box => box.city));
  const totalCities = cities.size;

  const cityBreakdown = Array.from(cities)
    .map(city => {
      const cityBoxes = moneyBoxes.filter(box => box.city === city);
      const cityTotal = cityBoxes.reduce((sum, box) => sum + box.amount, 0);
      return { city, total: cityTotal, count: cityBoxes.length };
    })
    .sort((a, b) => b.total - a.total);

  return (
    <View style={styles.container}>
    

      {/* Şehirlere Göre Liste */}
      {cityBreakdown.length > 0 && totalCities > 1 && (
        <Card style={[styles.cityCard, styles.shadow]}>
          <CardHeader>
            <CardTitle style={styles.cityHeader}>Şehirlere Göre</CardTitle>
          </CardHeader>

          <CardContent>
            {cityBreakdown.map(({ city, total, count }, index) => (
              <View
                key={city}
                style={[
                  styles.cityRow,
                  index === cityBreakdown.length - 1 ? { borderBottomWidth: 0 } : null,
                ]}
              >
                <View style={styles.cityLeft}>
                  <Ionicons name="location-outline" size={16} color="#4f46e5" />
                  <View>
                    <Text style={styles.cityName}>{city}</Text>
                    <Text style={styles.cityCount}>{count} kumbara</Text>
                  </View>
                </View>
                <Text style={styles.cityAmount}>₺{total.toFixed(0)}</Text>
              </View>
            ))}
          </CardContent>
        </Card>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 16,
  },
  card: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderColor: '#c7d2fe', // border-indigo-200
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  shadow: {
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  iconWrapperGreen: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#dcfce7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  iconWrapperBlue: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#dbeafe',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  iconWrapperPurple: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#ede9fe',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#312e81', // text-indigo-900
    marginBottom: 2,
  },
  cardLabel: {
    fontSize: 11,
    color: '#6b7280', // text-gray-500
  },
  cityCard: {
    backgroundColor: '#fff',
    borderColor: '#c7d2fe',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 10,
  },
  cityHeader: {
    fontSize: 13,
    fontWeight: '600',
    color: '#312e81',
    marginBottom: 6,
  },
  cityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#e5e7eb',
    borderBottomWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  cityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cityName: {
    fontSize: 13,
    color: '#111827',
  },
  cityCount: {
    fontSize: 11,
    color: '#6b7280',
  },
  cityAmount: {
    fontSize: 13,
    color: '#312e81',
    fontWeight: '500',
  },
});
