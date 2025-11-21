import cities from "../src/data/cities.json";

export function getCityNameById(cityId:number) {
  return cities.find(C=>C.sehir_id===cityId.toString())?.sehir_adi;
}