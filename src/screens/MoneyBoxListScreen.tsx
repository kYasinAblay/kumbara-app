import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet,SectionList } from "react-native";
import MoneyBoxRepository from "../repositories/MoneyBoxRepository";
import { MoneyBox } from "../models/MoneyBox";
import axios from "axios";

export default function MoneyBoxListScreen() {
  const [boxes, setBoxes] = useState<MoneyBox[]>([]);
  const [groupBoxes, setGroupBoxes] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try { 
      const result = await MoneyBoxRepository.fetchAll();
      console.clear();
      var data = result.moneyboxes;
      
      const groupedData = Object.values(
      data.reduce((acc:any, item:MoneyBox) => {
        const city = item.city;
        
        if (!acc[city]) {
          acc[city] = { title: city, data: [] };
        }
        acc[city].data.push(item);
        return acc;
      }, {}));

      console.log("groupdata",groupedData);
      setBoxes(data);
      setGroupBoxes(groupedData);
  }
 catch (error) {
      console.error("Error fetching money boxes:", error);
    }
    // var response = await axios.get<MoneyBox[]>(API_BASE_URL + "moneyboxlist");
    // console.log("data:",response.data);
    // setBoxes(response.data);
    })();
  }, []);

  return (
      <View style={styles.container}>
      <Text style={styles.title}>💰 Kumbaralar</Text>
        <SectionList
      sections={groupBoxes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
      <View style={styles.item}>
             <Text >{item.zone}</Text>
            <Text>{item.name} — {item.amount}</Text>
            <Text>{item.description}</Text>
             <Text>{new Date(item.date).toLocaleDateString()}</Text>
          </View>
          )}
      renderSectionHeader={({ section: { title } }) => (
        <View style={{ backgroundColor: '#eee', padding: 10 }}>
          <Text style={{fontSize: 20, fontWeight: 'bold' }}>{title}</Text>
        </View>
      )}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 12 },
  item: { padding: 10, borderBottomWidth: 1, borderColor: "#ccc" },
});
