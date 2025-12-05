
import { useEffect, useState } from "react";
import MoneyBoxService from "@/src/api/MoneyBoxService";
import { useMoneyBoxStore } from "@/src/store/moneyBoxStore";

export function useMoneyBoxes({ autoFetch = false } = {}) {
  const { setMoneyBoxes } = useMoneyBoxStore();
  const [loading, setLoading] = useState(false);

  const fetchMoneyBoxes = async () => {
    setLoading(true);
    try {
      const data = await MoneyBoxService.getList();
      setMoneyBoxes(data.moneyboxes ?? []);
    } catch (err) {
      console.error("MoneyBox fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) fetchMoneyBoxes();
  }, []);

  return { loading, refresh: fetchMoneyBoxes };
}
// import { useEffect, useState } from "react";
// import UserService from "../src/api/UserService";
// import { User } from "../src/models/User";
// import Sleep from "@/src/utils/Sleep";
// import { useMoneyBoxStore } from "@/src/store/moneyBoxStore";
// import MoneyBoxService from "@/src/api/MoneyBoxService";


// //session da tutulan user'ın idsini kulllanarak moneyboxları çekip store a atacak
// export default function getMoneyBox() {
//     console.log("getmoneybox çalıştı");
    
//    const {setMoneyBoxes} = useMoneyBoxStore.getState();
//     const [loading, setLoading] = useState(false);
 
//     const fetchMoneyBoxes = async () => {
//         debugger;
//         setLoading(true);
//         try {
//             await MoneyBoxService.getList().then((data) => {
//                 setMoneyBoxes(data.moneyboxes!);
//             });
//         } catch (error) {
//             console.log("User fetch error:", error);
//         } finally {
//             await Sleep(500).then(() => setLoading(false));
//         }
//     };

    
//     useEffect(() => {
//         fetchMoneyBoxes();
//     }, []);
// }


