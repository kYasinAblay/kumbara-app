import React from 'react';
import { View, Text, StyleSheet, ViewProps, TextProps } from 'react-native';

// 🔹 Card
export const Card: React.FC<ViewProps> = ({ style, children, ...props }) => {
  return (
    <View style={[styles.card, style]} {...props}>
      {children}
    </View>
  );
};

// 🔹 CardHeader
export const CardHeader: React.FC<ViewProps> = ({ style, children, ...props }) => {
  return (
    <View style={[styles.cardHeader, style]} {...props}>
      {children}
    </View>
  );
};

// 🔹 CardTitle
export const CardTitle: React.FC<TextProps> = ({ style, children, ...props }) => {
  return (
    <Text style={[styles.cardTitle, style]} {...props}>
      {children}
    </Text>
  );
};

// 🔹 CardDescription
export const CardDescription: React.FC<TextProps> = ({ style, children, ...props }) => {
  return (
    <Text style={[styles.cardDescription, style]} {...props}>
      {children}
    </Text>
  );
};

// 🔹 CardAction
export const CardAction: React.FC<ViewProps> = ({ style, children, ...props }) => {
  return (
    <View style={[styles.cardAction, style]} {...props}>
      {children}
    </View>
  );
};

// 🔹 CardContent
export const CardContent: React.FC<ViewProps> = ({ style, children, ...props }) => {
  return (
    <View style={[styles.cardContent, style]} {...props}>
      {children}
    </View>
  );
};

// 🔹 CardFooter
export const CardFooter: React.FC<ViewProps> = ({ style, children, ...props }) => {
  return (
    <View style={[styles.cardFooter, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff', // bg-card
    borderColor: '#e5e7eb',     // border-gray-200
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'column',
    gap: 12,
  },
  cardHeader: {
    paddingTop: 12,
    paddingHorizontal: 16,
    borderBottomColor: '#e5e7eb',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827', // text-gray-900
  },
  cardDescription: {
    fontSize: 13,
    color: '#6b7280', // text-muted-foreground
  },
  cardAction: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-start',
  },
  cardContent: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderTopColor: '#e5e7eb',
  },
});