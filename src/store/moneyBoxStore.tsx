import { create } from 'zustand';
import {User} from "../models/User";
import {MoneyBox} from "../models/MoneyBox";

interface MoneyBoxState {
  moneyBoxes: MoneyBox[];
  setMoneyBoxes: (list: MoneyBox[]) => void;
  updateMoneyBox: (id: number, newData: Partial<MoneyBox>) => void;
  removeMoneyBox: (id:number)=>void;
  updateAmount:(id: number, newAmount: number)=>void;
}

export const useMoneyBoxStore = create<MoneyBoxState>((set) => ({
  moneyBoxes: [],

  setMoneyBoxes: (list) => set({ moneyBoxes: list }),

  updateMoneyBox: (id, newData) =>
    set((state) => ({
      moneyBoxes: state.moneyBoxes.map((k) =>
        k.id === id ? { ...k, ...newData } : k
      ),
    })),

    removeMoneyBox: (id) =>
    set((state) => ({
      moneyBoxes: state.moneyBoxes.map((k) =>
        k.id === id ? { ...k, is_deleted:true } : k
      ),
    })),

    
    updateAmount: (id, newAmount) =>
    set((state) => ({
      moneyBoxes: state.moneyBoxes.map((k) =>
        k.id === id ? { ...k, amount:newAmount } : k
      ),
    })),

    //setMoneyBoxes(prev =>
    //   prev.map(box => (box.id === id ? { ...box, is_deleted: true } : box)).filter(box => box.id !== id)
    // );
}));



