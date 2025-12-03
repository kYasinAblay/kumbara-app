import { useEffect, useState } from "react";
import UserService from "../src/api/UserService";
import { User } from "../src/models/User";
import Sleep from "@/src/utils/Sleep";
import { useMoneyBoxStore } from "@/src/store/moneyBoxStore";
import MoneyBoxService from "@/src/api/MoneyBoxService";


//session da tutulan user'ın idsini kulllanarak moneyboxları çekip store a atacak
export default function getMoneyBox() {
   const {setMoneyBoxes} = useMoneyBoxStore.getState();
    const [loading, setLoading] = useState(false);
 
    const fetchMoneyBoxes = async () => {
        debugger;
        setLoading(true);
        try {
            await MoneyBoxService.getList().then((data) => {
                setMoneyBoxes(data.moneyboxes!);
            });
        } catch (error) {
            console.log("User fetch error:", error);
        } finally {
            await Sleep(500).then(() => setLoading(false));
        }
    };

    
    useEffect(() => {
        fetchMoneyBoxes();
    }, []);
}
