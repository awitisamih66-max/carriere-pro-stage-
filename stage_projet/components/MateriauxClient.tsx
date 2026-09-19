
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Layers } from "lucide-react";
import { useEstimation } from "@/context/EstimationContext";

export default function MateriauxClient({ initialMateriaux }: { initialMateriaux: any[] }) {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("Tout");
  const router = useRouter();
  const { setFormData } = useEstimation();

  // Extraction des catégories uniques (en utilisant la jointure)
  const categories = ["Tout", ...Array.from(new Set(initialMateriaux.map((m) => m.categories?.nom_cat || "Non classé")))];

  const filteredMateriaux = initialMateriaux.filter((item) => {
    const matchesSearch = item.nom_mat.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeTab === "Tout" || (item.categories?.nom_cat || "Non classé") === activeTab;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex-1 bg-[#0d0f12] px-12 py-10 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight">Catalogue des Ressources</h1>
        <p className="text-sm text-gray-400 font-medium">Consultez nos matériaux disponibles.</p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#141414] p-4 border border-gray-800">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Rechercher un matériau..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0d0f12] border border-gray-700 pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#f27405] transition-colors"
          />
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto">
          {categories.map((cat, index) => (
            <button
              key={`${cat}-${index}`}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 text-xs font-bold uppercase transition-colors border ${
                activeTab === cat 
                  ? "bg-[#f27405] text-black border-[#f27405]" 
                  : "bg-transparent text-gray-400 border-gray-700 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredMateriaux.map((mat) => (
          <div key={mat.id_mat} className="bg-[#141414] border border-gray-800 flex flex-col group">
            <div className="h-40 bg-gradient-to-br from-[#16191e] to-[#0f1115] relative flex items-center justify-center border-b border-gray-800">
              <Layers className="w-12 h-12 text-gray-800" />
              <span className="absolute top-3 left-3 bg-black/80 text-[9px] font-bold px-2 py-1 text-[#f27405] border border-gray-800">
                {mat.categories?.nom_cat || "Standard"}
              </span>
            </div>
            
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-bold text-sm text-white min-h-[2.5rem] line-clamp-2">{mat.nom_mat}</h3>
                <p className="text-[#f27405] font-extrabold text-base">
                  {Number(mat.prix_tonne).toFixed(3)} <span className="text-xs text-gray-500">DT / T</span>
                </p>
                <p className="text-[10px] text-gray-500 mt-2">
                  Stock: <span className="text-white">{mat.quantite_disp || 0} tonnes</span>
                </p>
              </div>
              
              <button 
                onClick={() => {
                  setFormData((prev) => ({ ...prev, id_mat: mat.id_mat.toString() }));
                  router.push("/estimation");
                }}
                className="w-full bg-[#1a1d24] text-gray-300 border border-gray-800 hover:bg-[#f27405] hover:text-black py-3 text-[10px] font-bold uppercase transition-all"
              >
                Estimer ma commande
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}