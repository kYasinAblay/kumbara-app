// src/services/SyncService.ts
import EventBus from "@/src/utils/EventBus";
import MoneyBoxRepository from "../repositories/MoneyBoxRepository";
import { useMoneyBoxStore } from "@/src/store/moneyBoxStore";


let initialized = false;


export const SyncService = {

  init() {
     if (initialized) {
      console.log("SyncService already initialized – skipping");
      return;
    }
    initialized = true;
    console.log("%cSyncService started", "color: green");

    // ADD (optimistic → real id fix)
    EventBus.on("MONEYBOX_ADDED", async (tempBox) => {
      try {
        // API'ye gönder
        const response = await MoneyBoxRepository.add(tempBox);

        const realId = response.moneyboxes?.id;

        console.log(
          "%cSynced ADD → API. Temp ID:",
          "color: orange; font-weight: bold;",
          tempBox.id,
          "→ real ID:",
          realId
        );

        // Store'da id'yi düzelt
        useMoneyBoxStore
          .getState()
          .confirmAdd(tempBox.id, realId);
      } catch (err) {
        console.warn("Add sync failed:", err);
      }
    });

    // UPDATE MONEYBOX (name, zone, description, city, etc.)
    EventBus.on("MONEYBOX_UPDATED", async ({ id, boxData }) => {
      try {
        await MoneyBoxRepository.update(boxData);
        console.log("%cSynced UPDATE → API", "color: orange; font-weight: bold;");
      } catch (err) {
        console.warn("Update sync failed:", err);
      }
    });

    // UPDATE AMOUNT (para ekleme/çıkarma)
    EventBus.on("MONEYBOX_AMOUNT_UPDATED", async ({ id, newAmount }) => {
      try {
        await MoneyBoxRepository.updateAmount(id, newAmount);
        console.log(id,newAmount);
        console.log("%cSynced AMOUNT UPDATE → API", "color: orange; font-weight: bold;");
      } catch (err) {
        console.warn("Amount sync failed:", err);
      }
    });

    // REMOVE
    EventBus.on("MONEYBOX_REMOVED", async (id) => {
    
      try {
        await MoneyBoxRepository.remove(id);
        console.log("%cSynced DELETE → API", "color: red");
      } catch (err) {
        console.warn("Delete sync failed:", err);
      }
    });


    //USER 

  },
};
