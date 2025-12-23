
import { useEffect, useState } from "react";
import MoneyBoxService from "@/src/api/MoneyBoxService";
import { useMoneyBoxStore } from "@/src/store/moneyBoxStore";

export function useMoneyBoxes({ autoFetch = true } = {}) {

  const { setMoneyBoxes, appendMoneyBoxes } = useMoneyBoxStore();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);


  const fetchMoneyBoxes = async (opts?: { page?: number; reset?: boolean }) => {
    const nextPage = opts?.page ?? 1;
    const reset = opts?.reset ?? false;
    setLoading(true);
    try {
      const data = await MoneyBoxService.getListWithParams({ page: nextPage });
      
      const items = data.moneyboxes ?? [];

      if (reset) {
        setMoneyBoxes(items);
      } else {
        appendMoneyBoxes(items);
      }

      setPage(nextPage);
      setHasMore(items.length > 0); // API "boş" dönünce dur
    } catch (err) {
      console.error("MoneyBox fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

   const refresh = () => {
    setHasMore(true);
    return fetchMoneyBoxes({ page: 1, reset: true });
  };

  const loadMore = () => {
    if (loading || !hasMore) return;
    return fetchMoneyBoxes({ page: page + 1, reset: false });
  };

  useEffect(() => {
    if (autoFetch) refresh();
  }, []);

  return { loading, refresh, loadMore, hasMore };
}

