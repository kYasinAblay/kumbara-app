import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MoneyBox } from '../src/models/MoneyBox';

interface MoneyBoxFormProps {
  initialData?: MoneyBox;
  onSubmit: (data: Omit<MoneyBox, 'id' | 'is_deleted' | 'date'>) => void;
  onCancel: () => void;
}

export function MoneyBoxForm({ initialData, onSubmit, onCancel }: MoneyBoxFormProps) {
  const [formData, setFormData] = useState({
    city: initialData?.city || '',
    zone: initialData?.zone || '',
    name: initialData?.name || '',
    amount: initialData?.amount?.toString() || '0',
    description: initialData?.description || '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.city || !formData.zone) return;
    onSubmit({
      city: formData.city,
      zone: formData.zone,
      name: formData.name,
      amount: parseFloat(formData.amount) || 0,
      description: formData.description,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Name */}
      <View style={styles.field}>
        <Text style={styles.label}>Money Box Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Emergency Fund"
          value={formData.name}
          onChangeText={(text) => handleChange('name', text)}
        />
      </View>

      {/* City and Zone */}
      <View style={styles.row}>
        <View style={[styles.field, styles.flex1]}>
          <Text style={styles.label}>City *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Istanbul"
            value={formData.city}
            onChangeText={(text) => handleChange('city', text)}
          />
        </View>

        <View style={[styles.field, styles.flex1]}>
          <Text style={styles.label}>Zone *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Kadıköy"
            value={formData.zone}
            onChangeText={(text) => handleChange('zone', text)}
          />
        </View>
      </View>

      {/* Amount */}
      <View style={styles.field}>
        <Text style={styles.label}>Initial Amount *</Text>
        <TextInput
          style={styles.input}
          placeholder="0.00"
          keyboardType="numeric"
          value={formData.amount}
          onChangeText={(text) => handleChange('amount', text)}
        />
      </View>

      {/* Description */}
      <View style={styles.field}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Add notes about this money box..."
          value={formData.description}
          onChangeText={(text) => handleChange('description', text)}
          multiline
          numberOfLines={4}
        />
      </View>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          onPress={handleSubmit}
          style={[styles.button, styles.submitButton]}
        >
          <Text style={styles.buttonText}>
            {initialData ? 'Update' : 'Create'} Money Box
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onCancel}
          style={[styles.button, styles.cancelButton]}
        >
          <Text style={[styles.buttonText, { color: '#4f46e5' }]}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e1b4b',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#d1d5db',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },
  textarea: {
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  flex1: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#4f46e5',
  },
  cancelButton: {
    backgroundColor: '#e0e7ff',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
  },
});
