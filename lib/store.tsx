"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import {
  Customer,
  INITIAL_CUSTOMERS,
  generateCardId,
  generateCustomerId,
} from "./mock-data";

type ToastMessage = {
  id: string;
  message: string;
  type: "success" | "info" | "error";
};

type AppContextType = {
  currentCustomer: Customer | null;
  setCurrentCustomer: (c: Customer | null) => void;
  customers: Customer[];
  findByPhone: (phone: string) => Customer | null;
  addCustomer: (name: string, phone: string) => Customer;
  incrementPoints: (id: string) => Customer | null;
  redeemReward: (id: string) => void;
  toasts: ToastMessage[];
  addToast: (message: string, type: ToastMessage["type"]) => void;
  removeToast: (id: string) => void;
  managerAuthReason: string;
  setManagerAuthReason: (reason: string) => void;
  loggedEmployee: string;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [managerAuthReason, setManagerAuthReason] = useState("");
  const loggedEmployee = "Ania Nowak";

  const findByPhone = useCallback(
    (phone: string) =>
      customers.find((c) => c.phone === phone.replace(/\s/g, "")) ?? null,
    [customers]
  );

  const addCustomer = useCallback((name: string, phone: string): Customer => {
    const newCustomer: Customer = {
      id: generateCustomerId(),
      name,
      phone: phone.replace(/\s/g, ""),
      cardId: generateCardId(),
      points: 1,
      totalVisits: 1,
      lastVisit: new Date().toISOString().split("T")[0],
      status: "active",
    };
    setCustomers((prev) => [...prev, newCustomer]);
    return newCustomer;
  }, []);

  const incrementPoints = useCallback(
    (id: string): Customer | null => {
      let updated: Customer | null = null;
      setCustomers((prev) =>
        prev.map((c) => {
          if (c.id !== id) return c;
          const newPoints = Math.min(c.points + 1, 10);
          updated = {
            ...c,
            points: newPoints,
            totalVisits: c.totalVisits + 1,
            lastVisit: new Date().toISOString().split("T")[0],
          };
          return updated;
        })
      );
      return updated;
    },
    []
  );

  const redeemReward = useCallback((id: string) => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, points: 0, totalVisits: c.totalVisits } : c
      )
    );
  }, []);

  const addToast = useCallback(
    (message: string, type: ToastMessage["type"]) => {
      const id = String(Date.now());
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentCustomer,
        setCurrentCustomer,
        customers,
        findByPhone,
        addCustomer,
        incrementPoints,
        redeemReward,
        toasts,
        addToast,
        removeToast,
        managerAuthReason,
        setManagerAuthReason,
        loggedEmployee,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextType {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
