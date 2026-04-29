export type Customer = {
  id: string;
  name: string;
  phone: string;
  cardId: string;
  points: number;
  totalVisits: number;
  lastVisit: string;
  status: "active" | "inactive";
};

export type Employee = {
  id: string;
  name: string;
  role: "waiter" | "manager" | "admin";
  lastSeen: string;
};

export type Authorization = {
  id: string;
  employeeName: string;
  action: string;
  customer: string;
  timestamp: string;
  approved: boolean;
};

export type Alert = {
  id: string;
  message: string;
  type: "warning" | "info" | "error";
  time: string;
};

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: "1",
    name: "Anna Kowalska",
    phone: "600100200",
    cardId: "BLC-2024-001",
    points: 4,
    totalVisits: 12,
    lastVisit: "2026-04-28",
    status: "active",
  },
  {
    id: "2",
    name: "Marek Nowak",
    phone: "700200300",
    cardId: "BLC-2024-002",
    points: 10,
    totalVisits: 24,
    lastVisit: "2026-04-29",
    status: "active",
  },
  {
    id: "3",
    name: "Zofia Wiśniewska",
    phone: "500300400",
    cardId: "BLC-2024-003",
    points: 7,
    totalVisits: 18,
    lastVisit: "2026-04-27",
    status: "active",
  },
  {
    id: "4",
    name: "Piotr Kowalczyk",
    phone: "600400500",
    cardId: "BLC-2024-004",
    points: 1,
    totalVisits: 3,
    lastVisit: "2026-04-26",
    status: "active",
  },
  {
    id: "5",
    name: "Katarzyna Lewandowska",
    phone: "700500600",
    cardId: "BLC-2024-005",
    points: 9,
    totalVisits: 31,
    lastVisit: "2026-04-29",
    status: "active",
  },
  {
    id: "6",
    name: "Tomasz Wróbel",
    phone: "500600700",
    cardId: "BLC-2024-006",
    points: 6,
    totalVisits: 15,
    lastVisit: "2026-04-24",
    status: "active",
  },
  {
    id: "7",
    name: "Marta Szymańska",
    phone: "600700800",
    cardId: "BLC-2024-007",
    points: 3,
    totalVisits: 8,
    lastVisit: "2026-04-22",
    status: "active",
  },
];

export const MOCK_EMPLOYEES: Employee[] = [
  { id: "1", name: "Michał Kowalski", role: "manager", lastSeen: "2026-04-29 12:34" },
  { id: "2", name: "Ania Nowak", role: "waiter", lastSeen: "2026-04-29 12:40" },
  { id: "3", name: "Paweł Zając", role: "waiter", lastSeen: "2026-04-29 11:55" },
  { id: "4", name: "Admin System", role: "admin", lastSeen: "2026-04-29 09:00" },
];

export const MOCK_AUTHORIZATIONS: Authorization[] = [
  {
    id: "1",
    employeeName: "Michał Kowalski",
    action: "Realizacja nagrody",
    customer: "Marek Nowak",
    timestamp: "2026-04-29 12:15",
    approved: true,
  },
  {
    id: "2",
    employeeName: "Michał Kowalski",
    action: "Realizacja nagrody",
    customer: "Zofia Wiśniewska",
    timestamp: "2026-04-29 10:40",
    approved: true,
  },
  {
    id: "3",
    employeeName: "Michał Kowalski",
    action: "Reset karty",
    customer: "Anna Kowalska",
    timestamp: "2026-04-28 14:20",
    approved: true,
  },
  {
    id: "4",
    employeeName: "Michał Kowalski",
    action: "Korekta punktów",
    customer: "Tomasz Wróbel",
    timestamp: "2026-04-27 16:05",
    approved: true,
  },
];

export const MOCK_ALERTS: Alert[] = [
  {
    id: "1",
    message: "Karta BLC-2024-002 gotowa do realizacji nagrody",
    type: "info",
    time: "12:40",
  },
  {
    id: "2",
    message: "Karta BLC-2024-005 — brakuje 1 wizyty do nagrody",
    type: "warning",
    time: "12:20",
  },
  {
    id: "3",
    message: "Nowa karta zarejestrowana: BLC-2024-012",
    type: "info",
    time: "11:55",
  },
];

export const MOCK_STATS = {
  vouchersToday: 47,
  rewardsToday: 3,
  activeCards: 284,
  visitsThisWeek: 156,
};

let idCounter = 100;
export function generateCardId(): string {
  return `BLC-2024-0${++idCounter}`;
}
export function generateCustomerId(): string {
  return String(Date.now());
}
