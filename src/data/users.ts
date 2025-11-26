import { User } from '../models/User';
import { MoneyBox } from '../models/MoneyBox'; // veya '../App' dosyan neredeyse oradan import et

export interface UserWithPassword extends User {
  password: string;
}

export const dummyUsers: UserWithPassword[] = [
  {
    id: '1',
    name: 'Kamil Yasin',
    surname: 'Ablay',
    phone: "5551234567",
    city:34,
    zone: 'İstanbul / Kadıköy',
    address: 'Bahariye Caddesi No:23, Kadıköy, İstanbul',
    picture: 'https://randomuser.me/api/portraits/men/45.jpg',
    moneyboxes: [
      { id: "1", name: 'Tatil', city: 'Antalya', zone: 'Lara', amount: 1250.75, description:"",user_id:"",is_deleted: false },
      { id: "2", name: 'Araba', city: 'İstanbul', zone: 'Ataşehir', amount: 3200.0,description:"",user_id:"", is_deleted: false },
    ],
    is_deleted: false,
    district:"",
    password: '123456',
    username:'kyasinablay',
    role:"admin"
  },
  {
    id: '2',
    name: 'Ayşe',
    surname: 'Demir',
    phone: "5557654321",
    city:6,
    zone: 'Ankara / Çankaya',
    address: 'Atatürk Bulvarı No:45, Çankaya, Ankara',
    picture: 'https://randomuser.me/api/portraits/women/62.jpg',
    moneyboxes: [
      { id: "3", name: 'Eğitim', city: 'Ankara', zone: 'Kızılay', amount: 2100.5,description:"",user_id:"", is_deleted: false },
      { id: "4", name: 'Ev', city: 'İzmir', zone: 'Bornova', amount: 5000.0,description:"",user_id:"", is_deleted: true },
    ],
    is_deleted: false,
    district:"",
    password: 'password123',
     username:'aysedemir',
     role:"user"
  },
  {
    id: '3',
    name: 'Mehmet',
    surname: 'Koç',
    phone: "5559876543",
    city:35,
    zone: 'İzmir / Konak',
    address: 'Gazi Bulvarı No:10, Konak, İzmir',
    picture: 'https://randomuser.me/api/portraits/men/77.jpg',
    moneyboxes: [
      { id: "5", name: 'Yatırım', city: 'İzmir', zone: 'Karşıyaka', amount: 900.25,description:"",user_id:"", is_deleted: false },
    ],
    is_deleted: false,
   district:"",
    password: 'qwerty',
    username:'mehmetkoc',
    role:"user"
  },
];
