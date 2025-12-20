
import { useEffect, useState } from "react";
import MoneyBoxService from "@/src/api/MoneyBoxService";
import { useMoneyBoxStore } from "@/src/store/moneyBoxStore";

export function useMoneyBoxes({ autoFetch = true } = {}) {
  debugger;
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

