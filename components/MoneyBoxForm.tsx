import React, { useState,memo, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MoneyBox } from '../src/models/MoneyBox';
import UserSelect from './UserSelect';
import useAuthorization from '@/hooks/useAuthorization';

interface MoneyBoxFormProps {
  initialData?: MoneyBox;
  onSubmit: (data: Omit<MoneyBox, 'is_deleted' | 'created_at'>) => void;
  onCancel: () => void;
}

 function MoneyBoxFormFunc({ initialData, onSubmit, onCancel }: MoneyBoxFormProps) {
  const [formData, setFormData] = useState({
    id:initialData?.id||0,
    city: initialData?.city || '',
    zone: initialData?.zone || '',
    name: initialData?.name || '',
    amount: initialData?.amount?.toString() || '',
    description: initialData?.description || '',
    userId:initialData?.user_id || ''
  });

  
  const handleChange = useCallback((field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  },[]);

  const handleSubmit = () => {
    if (!formData.name  || !formData.zone) return;
    onSubmit({
      id: formData.id,
      city: formData.city,
      zone: formData.zone,
      name: formData.name,
      amount: parseFloat(formData.amount) || 0,
      description: formData.description,
      user_id:formData.userId
    });
  };
  const {isAdmin} = useAuthorization();
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Name */}
      <View style={styles.field} >
        <Text style={styles.label} >Kumbara Adı</Text>
        <TextInput
          style={styles.input}
          placeholder="örn. Kermes Kumbarası"
          value={formData.name}
          onChangeText={(text) => handleChange('name', text)}
        />
      </View>
      {isAdmin &&  <View style={[styles.field,{width:"100%"}]}>
        <Text style={styles.label}>Kullanıcı *</Text>
        <UserSelect
        
          userId={formData.userId}
          handleChange={handleChange}
        />
      </View>
      }
   
      {/* City and Zone */}
      <View style={styles.row}>
        <View style={[styles.field, styles.flex1]}>
          <Text style={styles.label}>Şehir</Text>
       <Text
            style={[styles.input,{backgroundColor:"#DADADA"}]}
            disabled={true}
          >{formData.city}</Text>
        </View>

        <View style={[styles.field, styles.flex1]}>
          <Text style={styles.label}>Bölge *</Text>
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
        <Text style={styles.label}>Tutar *</Text>
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
        <Text style={styles.label}>Açıklama</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Kumbara hakkında birşeyler yazabilirsiniz."
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
           Kumbara {initialData?.zone !=="" ? 'Güncelle' : 'Oluştur'} 
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onCancel}
          style={[styles.button, styles.cancelButton]}
        >
          <Text style={[styles.buttonText, { color: '#016840' }]}>İptal</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}


export const MoneyBoxForm = memo(MoneyBoxFormFunc, (prevProps, nextProps) => {

  return (
    prevProps.initialData?.id === nextProps.initialData?.id &&
    prevProps.initialData?.name === nextProps.initialData?.name &&
    prevProps.onSubmit === nextProps.onSubmit &&
    prevProps.onCancel === nextProps.onCancel
  );
});

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
    backgroundColor: '#016840',
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
