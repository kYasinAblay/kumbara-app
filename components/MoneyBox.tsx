import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import { Goal } from '../App';

interface MoneyBoxProps {
  balance: number;
  goal: any;
}

export const MoneyBox: React.FC<MoneyBoxProps> = ({ balance, goal }) => {
  const progress = goal.target > 0 ? (balance / goal.target) * 100 : 0;
  const progressCapped = Math.min(progress, 100);
  const remaining = goal.target - balance;

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {/* <Ionicons name="piggy-bank-outline" size={20} color="#4f46e5" /> Your Savings */}
        </Text>
      </View>

      {/* Balance Section */}
      <View style={styles.content}>
        <View style={styles.centered}>
          <View style={styles.circle}>
            {/* <Ionicons name="piggy-bank" size={48} color="#fff" /> */}
          </View>
          <Text style={styles.subtitle}>Current Balance</Text>
          <Text style={styles.balance}>${balance.toFixed(2)}</Text>
        </View>

        {/* Progress */}
        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={styles.goalText}>{goal.description}</Text>
            <Text style={styles.goalText}>${goal.target.toFixed(2)}</Text>
          </View>

          {/* Progress bar */}
          <View style={styles.progressBarBackground}>
            <View
              style={[styles.progressBarFill, { width: `${progressCapped}%` }]}
            />
          </View>

          <Text style={styles.progressLabel}>
            {progressCapped >= 100 ? (
              <Text style={styles.goalReached}>🎉 Goal reached!</Text>
            ) : (
              `${progressCapped.toFixed(1)}% of goal`
            )}
          </Text>
        </View>

        {/* Remaining Amount */}
        {progressCapped < 100 && (
          <View style={styles.remainingBox}>
            <Text style={styles.remainingText}>
              ${remaining.toFixed(2)} more to reach your goal
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderColor: '#c7d2fe',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  header: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#312e81', // indigo-900
  },
  content: {
    alignItems: 'center',
  },
  centered: {
    alignItems: 'center',
    marginBottom: 20,
  },
  circle: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: '#6366f1', // from-indigo-500
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  subtitle: {
    color: '#312e81',
    marginBottom: 2,
  },
  balance: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#312e81',
  },
  progressContainer: {
    width: '100%',
    marginBottom: 12,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  goalText: {
    fontSize: 13,
    color: '#4338ca', // indigo-700
  },
  progressBarBackground: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#e0e7ff',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#6366f1',
  },
  progressLabel: {
    textAlign: 'center',
    fontSize: 13,
    color: '#4f46e5',
    marginTop: 4,
  },
  goalReached: {
    color: '#16a34a',
    fontWeight: '600',
  },
  remainingBox: {
    backgroundColor: '#eef2ff',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  remainingText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#4f46e5',
  },
});
