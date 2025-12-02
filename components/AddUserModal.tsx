import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import { X, User as UserIcon } from "lucide-react-native";
import { User } from "@/src/models/User";
import CityDistrictSelect from "./CityDistrictSelect";



interface AddUserModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (user: User) => Promise<void>;
}

interface FormErrors {
  name?: string;
  surname?: string;
  email?: string;
  city?:string;
  district?:string;
  phone?:string;
  zone?:string;
}

export default function AddUserModal({
  visible,
  onClose,
  onSubmit
}: AddUserModalProps)
 {
  console.log("AddUserModal rendered"); // 0
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phone: "",
    address:"",
    zone:"",
    city:0,
    district:"",
    username:"",
    picture: "",
    role:"User",
    is_deleted: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  
 const [loading, setLoading] = useState(false);
  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Hata varsa temizle
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Ad alanı zorunludur";
    if (!formData.surname.trim()) newErrors.surname = "Soyad alanı zorunludur";
    if (!formData.city) newErrors.city = "Şehir alanı zorunludur";
    if (!formData.zone) newErrors.zone = "Bölge alanı zorunludur";
    // if (!formData.phone) newErrors.phone = "Telefon alanı zorunludur";
    // if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    //   newErrors.email = "Geçerli bir e-posta adresi giriniz";
    // }

    setErrors(newErrors);
   
    return Object.keys(newErrors).length === 0;
  };
  
useEffect(() => {
   if (visible) resetForm();
}, [visible]);

const resetForm = () => {
  setFormData({
    name: "",
    surname: "",
    phone: "",
    address:"",
    zone:"",
    city:0,
    district:"",
    username:"",
    picture: "",
    role:"User",
    is_deleted: false
  });
  setErrors({});
}


  const handleSubmit = async () => {
     console.log("Submit clicked"); // 1
  setLoading(true);
    if (!validateForm())  { 
           return;
    }
console.log("loading durumu: ",loading);

    const newUser: User = {
      name: formData.name.trim(),
      surname: formData.surname.trim(),
      phone: formData.phone.trim() || "",
      address: formData.address.trim() || "",
      zone: formData.zone.trim() || "",
      city: formData.city, 
      district: formData.district.trim() || "",
      username: formData.username.trim() || "",
      picture: formData.picture || ""
    };
 try {
    await onSubmit(newUser);
     console.log("Submit completed"); // 2
  } finally {
    setLoading(false);
  }
  };

  return (
    <Modal animationType="slide" transparent visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.headerIcon}>
                <UserIcon size={20} color="white" />
              </View>

              <View>
                <Text style={styles.headerTitle}>Yeni Kullanıcı Ekle</Text>
                <Text style={styles.headerSubtitle}>Kullanıcı bilgilerini giriniz</Text>
              </View>
            </View>

            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X size={22} color="#444" />
            </TouchableOpacity>
          </View>

          <ScrollView style={{ padding: 20 }}>
            {/* Name */}
            <View style={styles.field}>
              <Text style={styles.label}>
                Ad <Text style={{ color: "red" }}>*</Text>
              </Text>

              <TextInput
                style={[
                  styles.input,
                  errors.name && styles.inputError,
                ]}
                placeholder="örn. Ahmet"
                value={formData.name}
                onChangeText={(t) => handleChange("name", t)}
              />

              {errors.name && (
                <Text style={styles.errorText}>⚠ {errors.name}</Text>
              )}
            </View>

            {/* Surname */}
            <View style={styles.field}>
              <Text style={styles.label}>
                Soyad <Text style={{ color: "red" }}>*</Text>
              </Text>

              <TextInput
                style={[
                  styles.input,
                  errors.surname && styles.inputError,
                ]}
                placeholder="örn. Yılmaz"
                value={formData.surname}
                onChangeText={(t) => handleChange("surname", t)}
              />

              {errors.surname && (
                <Text style={styles.errorText}>⚠ {errors.surname}</Text>
              )}
            </View>

            {/* Email */}
            {/* <View style={styles.field}>
              <Text style={styles.label}>E-posta (Opsiyonel)</Text>

              <TextInput
                style={[
                  styles.input,
                  errors.email && styles.inputError,
                ]}
                placeholder="örn. ahmet@example.com"
                value={formData.email}
                onChangeText={(t) => handleChange("email", t)}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              {errors.email && (
                <Text style={styles.errorText}>⚠ {errors.email}</Text>
              )}
            </View> */}

             {/* City&District */}
            <View style={styles.field}>
              <Text style={styles.label}>
                Şehir/İlçe <Text style={{ color: "red" }}>*</Text>
              </Text>

              <CityDistrictSelect titleVisible={false} formData={formData} handleChange={handleChange} />
             
              {errors.city && (
                <Text style={styles.errorText}>⚠ {errors.city}</Text>
              )}
            </View>

           {/* Zone */}
            <View style={styles.field}>
              <Text style={styles.label}>
                Bölge <Text style={{ color: "red" }}>*</Text>
              </Text>

              <TextInput
                style={[
                  styles.input,
                  errors.zone && styles.inputError,
                ]}
                placeholder="örn. 1. Bölge, Fındıkzade"
                value={formData.zone}
                onChangeText={(t) => handleChange("zone", t)}
              />

              {errors.surname && (
                <Text style={styles.errorText}>⚠ {errors.zone}</Text>
              )}
            </View>


            {/* Info Box */}
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>
                💡 <Text style={{ fontWeight: "600" }}>Bilgi: </Text>
                Eklenen kullanıcılar sizin ekibiniz olur. sadece tarafınızdan görüntülenebilir ve kullanılabilir.
              </Text>
            </View>

            {/* Buttons */}
            <View style={styles.buttonRow}>
              <TouchableOpacity disabled={loading} style={styles.submitBtn} onPress={handleSubmit}>
                {loading ? (
                  <Text style={styles.submitBtnText}>Kaydediliyor...</Text>
                ) : <><UserIcon size={20} color="white" />
                <Text style={styles.submitBtnText}>Kullanıcı Ekle</Text></>}
                
              </TouchableOpacity>

              <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                <Text style={styles.cancelBtnText}>İptal</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}


const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "90%",
    overflow: "hidden",
  },

  header: {
    backgroundColor: "#ECFDF5",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#059669",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#111",
  },
  headerSubtitle: {
    color: "#555",
    fontSize: 13,
  },
  closeBtn: {
    padding: 8,
  },

  field: {
    marginBottom: 18,
  },
  label: {
    marginBottom: 6,
    fontSize: 15,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 10,
    fontSize: 15,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    marginTop: 5,
    color: "red",
    fontSize: 13,
  },

  infoBox: {
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#BFDBFE",
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  infoText: {
    color: "#1E3A8A",
    fontSize: 13,
  },

  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
    marginBottom: 20,
  },
  submitBtn: {
    flex: 1,
    backgroundColor: "#047857",
    paddingVertical: 14,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    alignItems: "center",
  },
  submitBtnText: {
    color: "white",
    fontSize: 16,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: "#E5E7EB",
    paddingVertical: 14,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelBtnText: {
    color: "#444",
    fontSize: 16,
  },
});
