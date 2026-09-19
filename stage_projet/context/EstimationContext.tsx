"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export const REGIONS = [
  "Tunis", "Ariana", "Ben Arous", "Manouba", "Nabeul", "Zaghouan", 
  "Bizerte", "Béja", "Jendouba", "Le Kef", "Siliana", "Sousse", 
  "Monastir", "Mahdia", "Kairouan", "Kasserine", "Sidi Bouzid", "Sfax", 
  "Gabès", "Medenine", "Tataouine", "Gafsa", "Tozeur", "Kébili"
];

export type EstimationSummary = {
  prix_materiaux: number;
  prix_transport: number;
  total: number;
  distanceKm?: number;
  nb_camions?: number;
};

export type FormData = {
  nom: string;
  telephone: string;
  region: string;
  adresse: string;
  id_mat: string;
  quantite: number;
};

interface EstimationContextType {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  estimation: EstimationSummary | null;
  setEstimation: React.Dispatch<React.SetStateAction<EstimationSummary | null>>;
  resetContext: () => void;
}

const defaultFormData: FormData = {
  nom: "",
  telephone: "",
  region: REGIONS[0],
  adresse: "",
  id_mat: "",
  quantite: 0,
};

const EstimationContext = createContext<EstimationContextType | undefined>(undefined);

export function EstimationProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [estimation, setEstimation] = useState<EstimationSummary | null>(null);

  const resetContext = () => {
    setFormData(defaultFormData);
    setEstimation(null);
  };

  return (
    <EstimationContext.Provider
      value={{
        formData,
        setFormData,
        estimation,
        setEstimation,
        resetContext,
      }}
    >
      {children}
    </EstimationContext.Provider>
  );
}

export function useEstimation() {
  const context = useContext(EstimationContext);
  if (context === undefined) {
    throw new Error("useEstimation must be used within an EstimationProvider");
  }
  return context;
}
