import { create } from "zustand";
import { User } from "../models/User";
import { MoneyBox } from "../models/MoneyBox";
import EventBus from "@/src/utils/EventBus";


interface MoneyBoxState {
  moneyBoxes: MoneyBox[];
  setMoneyBoxes: (list: MoneyBox[]) => void;
  addMoneyBox: (newData: Partial<MoneyBox>) => void;
  confirmAdd: (tempId: number, realId: number) => void;
  updateMoneyBox: (id: number, boxData: Partial<MoneyBox>) => void;
  removeMoneyBox: (id: number) => void;
  updateAmount: (id: number, newAmount: number) => void;
   appendMoneyBoxes: (newItems: MoneyBox[]) => void;
}

export const useMoneyBoxStore = create<MoneyBoxState>((set) => ({
  moneyBoxes: [],

  setMoneyBoxes: (list) => set({ moneyBoxes: list }),

  addMoneyBox: (newData) => {

     const tempId = Date.now(); // geçici id
     const tempBox = { ...newData, id: tempId };

    set((state) => ({
      moneyBoxes: [...state.moneyBoxes, tempBox as MoneyBox],
    }));
    EventBus.emit("MONEYBOX_ADDED", tempBox);
  },

    confirmAdd: (tempId, realId) =>
    set((s) => ({
      moneyBoxes: s.moneyBoxes.map((b) =>
        b.id === tempId ? { ...b, id: realId } : b
      ),
    })),

    updateMoneyBox: (id, boxData) => {
  set((state) => ({
    moneyBoxes: state.moneyBoxes.map((k) =>
      k.id === id ? { ...k, ...boxData } : k
    ),
  }));
  EventBus.emit("MONEYBOX_UPDATED", { id, boxData });
},

removeMoneyBox: (id) => {
  set((state) => ({
    moneyBoxes: state.moneyBoxes
      .map((k) => (k.id === id ? { ...k, is_deleted: true } : k))
      .filter((box) => box.is_deleted !== true),
  }));

  EventBus.emit("MONEYBOX_REMOVED", id);
},

updateAmount: (id, newAmount) => {
  set((state) => ({
    moneyBoxes: state.moneyBoxes.map((k) =>
      k.id === id ? { ...k, amount: newAmount } : k
    ),
  }));
  EventBus.emit("MONEYBOX_AMOUNT_UPDATED", { id, newAmount });
},

 appendMoneyBoxes: (newItems: MoneyBox[]) =>
  set((state) => ({ moneyBoxes: [...state.moneyBoxes, ...newItems] }))


  //setMoneyBoxes(prev =>
  //   prev.map(box => (box.id === id ? { ...box, is_deleted: true } : box)).filter(box => box.id !== id)
  // );
}));
