import React, { useState } from "react";
import { View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
  StyleSheet, } from "react-native";

import cities from "../src/data/cities.json";
import districts from "../src/data/districts.json";

interface Props {
  formData: {
    name: string,
    surname: string,
    phone: string,
    city:number,
    district:string,
    zone: string,
    picture:string,
    address: string,
  };
  handleChange: (field: string, value: string | number) => void;
}

export default function CityDistrictSelect({ formData, handleChange }: Props) {
  const [cityModal, setCityModal] = useState(false);
  const [districtModal, setDistrictModal] = useState(false);

  const filteredDistricts = districts.filter(
    (d) => d.sehir_id === formData.city.toString()
  );

  return (
    <View style={styles.cityZoneInput}>
          {/* Şehir */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Şehir</Text>
        <TouchableOpacity
          onPress={() => setCityModal(true)}
          style={styles.rowInput}>
          <Text style={{ color: formData.city ? "#000" : "#888" }}>
            {formData.city
              ? cities.find((c) => c.sehir_id === formData.city?.toString())?.sehir_adi
              : "Şehir seçiniz"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* İlçe */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>İlçe</Text>

        <TouchableOpacity
          disabled={!formData.city}
          onPress={() => setDistrictModal(true)}
          style={[
            styles.rowInput,
            { backgroundColor: formData.city ? "#fff" : "#eee" },
          ]}
        >
          <Text
            style={{
              color: formData.district ? "#000" : "#888",
            }}
          >
            {formData.district || "İlçe seçiniz"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Şehir Modal */}
      <Modal visible={cityModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Şehir Seç</Text>
          <FlatList
            data={cities}
            keyExtractor={(item) => item.sehir_id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  handleChange("city", parseInt(item.sehir_id));
                  handleChange("district", ""); // ilçe reset
                  setCityModal(false);
                }}
              >
                <Text>{item.sehir_adi}</Text>
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity
            onPress={() => setCityModal(false)}
            style={styles.modalClose}
          >
            <Text>Kapat</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* İlçe Modal */}
      <Modal visible={districtModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>İlçe Seç</Text>

          <FlatList
            data={filteredDistricts}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  handleChange("district", item.ilce_adi);
                  setDistrictModal(false);
                }}
              >
                <Text>{item.ilce_adi}</Text>
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity
            onPress={() => setDistrictModal(false)}
            style={styles.modalClose}
          >
            <Text>Kapat</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
   inputGroup: {
    marginBottom: 15,
  },

 label: { fontSize: 14, color: '#4b5563', marginBottom: 4 },
  rowInput: {
    borderWidth: 1,
    borderColor: '#c7d2fe',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    width:175,
    maxWidth:"100%"
  },
  cityZoneInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20,
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalClose: {
    padding: 15,
    backgroundColor: "#ddd",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 8,
  },
});