// "use client";

// import React, { useState } from "react";
// import { Search, Plus, Pencil, Trash2 } from "lucide-react";

// interface TransporteurFake {
//   id: string;
//   nom: string;
//   localisation: string;
//   contact: string;
//   disponibilite: "DISPONIBLE" | "INDISPONIBLE";
// }

// interface CamionFake {
//   id: string;
//   type: string;
//   capacite: string;
//   cout_km: string;
//   transporteur_associe: string;
// }

// const TRANSPORTEURS_INITIAL_DATA: TransporteurFake[] = [
//   { id: "#TRP-01", nom: "SOTRA Logistique", localisation: "Siège Social - Tunis", contact: "+216 71 888 999", disponibilite: "DISPONIBLE" },
//   { id: "#TRP-02", nom: "Express Carrier Intl", localisation: "Plateforme Nord", contact: "+216 72 444 333", disponibilite: "INDISPONIBLE" },
//   { id: "#TRP-03", nom: "Atlas Transports", localisation: "Dépôt Ouest", contact: "+216 73 111 222", disponibilite: "DISPONIBLE" },
//   { id: "#TRP-04", nom: "Maghreb Fret", localisation: "Zone Industrielle", contact: "+216 70 555 111", disponibilite: "DISPONIBLE" },
// ];

// const CAMIONS_INITIAL_DATA: CamionFake[] = [
//   { id: "#CAM-34", type: "Benne", capacite: "25 T", cout_km: "4.200 DT/km", transporteur_associe: "SOTRA Logistique" },
//   { id: "#CAM-12", type: "Semi-remorque", capacite: "35 T", cout_km: "5.100 DT/km", transporteur_associe: "Express Carrier Intl" },
//   { id: "#CAM-08", type: "Plateau", capacite: "30 T", cout_km: "4.800 DT/km", transporteur_associe: "Atlas Transports" },
// ];

// export default function FlotteLogistiquePage() {
//   const [activeTab, setActiveTab] = useState<1 | 2>(1);
//   const [searchQuery, setSearchQuery] = useState("");

//   const filteredTransporteurs = TRANSPORTEURS_INITIAL_DATA.filter(t =>
//     t.nom.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const filteredCamions = CAMIONS_INITIAL_DATA.filter(c =>
//     c.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     c.transporteur_associe.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="space-y-6 text-white font-sans">
      
//       {/* EN-TÊTE DE LA PAGE */}
//       <div className="space-y-1">
//         <h1 className="text-3xl font-bold tracking-tight text-gray-100">Gestion de la Flotte Logistique</h1>
//         <p className="text-sm text-gray-400 font-medium">
//           Supervisez vos partenaires de transport et suivez l'état d'affectation des véhicules.
//         </p>
//       </div>

//       {/* SYSTÈME D'ONGLETS SÉLECTIONNABLES */}
//       <div className="flex items-center space-x-8 border-b border-gray-900 pb-2 text-sm font-bold font-mono tracking-wider">
//         <button
//           onClick={() => { setActiveTab(1); setSearchQuery(""); }}
//           className={`pb-2 uppercase transition-all cursor-pointer ${
//             activeTab === 1 
//               ? "text-[#f27405] border-b-2 border-[#f27405]" 
//               : "text-gray-400 hover:text-gray-200"
//           }`}
//         >
//           1. Transporteurs
//         </button>
//         <button
//           onClick={() => { setActiveTab(2); setSearchQuery(""); }}
//           className={`pb-2 uppercase transition-all cursor-pointer ${
//             activeTab === 2 
//               ? "text-[#f27405] border-b-2 border-[#f27405]" 
//               : "text-gray-400 hover:text-gray-200"
//           }`}
//         >
//           2. Gestion des Camions
//         </button>
//       </div>

//       {/* RECHERCHE ET BOUTON D'ACTION ADAPTATIF */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//         <div className="relative max-w-xs w-full font-mono">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
//           <input
//             type="text"
//             placeholder={activeTab === 1 ? "Rechercher un prestataire..." : "Rechercher un camion..."}
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full bg-[#1b1c21]/60 border border-gray-800 pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-[#f27405] rounded-none placeholder-gray-500"
//           />
//         </div>

//         <button className="bg-[#f27405] hover:bg-[#d66204] text-black font-extrabold text-[11px] font-mono tracking-widest px-5 py-2.5 uppercase transition-colors flex items-center justify-center gap-2 rounded-none cursor-pointer">
//           <Plus className="w-4 h-4 stroke-[3]" />
//           <span>{activeTab === 1 ? "Ajouter un transporteur" : "Ajouter un camion"}</span>
//         </button>
//       </div>

//       {/* ================= TAB 1 : TRANSPORTEURS ================= */}
//       {activeTab === 1 && (
//         <div className="bg-[#11141a]/90 border border-gray-900 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full text-left text-sm border-collapse">
//               <thead>
//                 <tr className="border-b border-gray-800 text-gray-400 font-mono text-[11px] tracking-widest uppercase bg-[#141822]/40">
//                   <th className="px-6 py-4 font-bold">Id</th>
//                   <th className="px-6 py-4 font-bold">Nom du Transporteur</th>
//                   <th className="px-6 py-4 font-bold">Contact</th>
//                   <th className="px-6 py-4 font-bold">Disponibilité</th>
//                   <th className="px-6 py-4 font-bold text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-800/60 font-sans">
//                 {filteredTransporteurs.map((trans) => (
//                   <tr key={trans.id} className="hover:bg-[#151a24]/50 transition-colors">
//                     <td className="px-6 py-5 font-bold text-gray-500 font-mono text-xs">{trans.id}</td>
//                     <td className="px-6 py-5">
//                       <div className="font-bold text-gray-100 text-sm">{trans.nom}</div>
//                       <div className="text-[11px] text-gray-400 font-mono mt-0.5">{trans.localisation}</div>
//                     </td>
//                     <td className="px-6 py-5 text-gray-300 text-sm font-mono">{trans.contact}</td>
//                     <td className="px-6 py-5">
//                       <span className={`text-[9px] font-black tracking-wider px-2.5 py-1 rounded-full border font-mono uppercase ${
//                         trans.disponibilite === "DISPONIBLE" 
//                           ? "bg-emerald-950/30 border-emerald-800/80 text-emerald-400" 
//                           : "bg-gray-800/60 border-gray-700 text-gray-400"
//                       }`}>{trans.disponibilite}</span>
//                     </td>
//                     <td className="px-6 py-5 text-center">
//                       <div className="inline-flex items-center space-x-4 text-gray-400">
//                         <button className="hover:text-[#f27405] transition-colors cursor-pointer"><Pencil className="w-4 h-4" /></button>
//                         <button className="hover:text-red-400 transition-colors cursor-pointer"><Trash2 className="w-4 h-4" /></button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* ================= TAB 2 : GESTION DES CAMIONS ================= */}
//       {activeTab === 2 && (
//         <div className="bg-[#11141a]/90 border border-gray-900 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full text-left text-sm border-collapse">
//               <thead>
//                 <tr className="border-b border-gray-800 text-gray-400 font-mono text-[11px] tracking-widest uppercase bg-[#141822]/40">
//                   <th className="px-6 py-4 font-bold">Id</th>
//                   <th className="px-6 py-4 font-bold">Type de Camion</th>
//                   <th className="px-6 py-4 font-bold">Capacité Max</th>
//                   <th className="px-6 py-4 font-bold">Coût Kilométrique</th>
//                   <th className="px-6 py-4 font-bold">Transporteur Associé</th>
//                   <th className="px-6 py-4 font-bold text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-800/60 font-sans">
//                 {filteredCamions.map((camion) => (
//                   <tr key={camion.id} className="hover:bg-[#151a24]/50 transition-colors">
//                     <td className="px-6 py-5 font-bold text-gray-500 font-mono text-xs">{camion.id}</td>
//                     <td className="px-6 py-5 font-bold text-gray-100 text-sm">{camion.type}</td>
//                     <td className="px-6 py-5 font-bold text-gray-300 font-mono text-sm">{camion.capacite}</td>
//                     <td className="px-6 py-5 text-gray-300 font-mono text-sm">{camion.cout_km}</td>
//                     <td className="px-6 py-5 text-gray-100 text-sm">{camion.transporteur_associe}</td>
//                     <td className="px-6 py-5 text-center">
//                       <div className="inline-flex items-center space-x-4 text-gray-400">
//                         <button className="hover:text-[#f27405] transition-colors cursor-pointer"><Pencil className="w-4 h-4" /></button>
//                         <button className="hover:text-red-400 transition-colors cursor-pointer"><Trash2 className="w-4 h-4" /></button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }




"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Search, Plus, Pencil, Trash2, X, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

// ============== TYPES (alignés sur votre schéma réel) ==============
interface Transporteur {
  id_trans: number;
  nom_trans: string;
  contact: string | null;
  disponibilite: boolean;
}

interface Camion {
  id_cam: number;
  type_cam: string;
  capacite: number | null;
  cout_km: number | null;
  id_trans: number | null;
  transporteurs?: { nom_trans: string } | null; // vient du join
}

type TransporteurFormState = {
  nom_trans: string;
  contact: string;
  disponibilite: boolean;
};

type CamionFormState = {
  type_cam: string;
  capacite: string;
  cout_km: string;
  id_trans: string;
};

const EMPTY_TRANS_FORM: TransporteurFormState = { nom_trans: "", contact: "", disponibilite: true };
const EMPTY_CAMION_FORM: CamionFormState = { type_cam: "", capacite: "", cout_km: "", id_trans: "" };

export default function FlotteLogistiquePage() {
  const [activeTab, setActiveTab] = useState<1 | 2>(1);
  const [searchQuery, setSearchQuery] = useState("");

  const [transporteurs, setTransporteurs] = useState<Transporteur[]>([]);
  const [camions, setCamions] = useState<Camion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modale transporteur
  const [transModalOpen, setTransModalOpen] = useState(false);
  const [transForm, setTransForm] = useState<TransporteurFormState>(EMPTY_TRANS_FORM);
  const [editingTransId, setEditingTransId] = useState<number | null>(null);
  const [savingTrans, setSavingTrans] = useState(false);

  // Modale camion
  const [camionModalOpen, setCamionModalOpen] = useState(false);
  const [camionForm, setCamionForm] = useState<CamionFormState>(EMPTY_CAMION_FORM);
  const [editingCamionId, setEditingCamionId] = useState<number | null>(null);
  const [savingCamion, setSavingCamion] = useState(false);

  // ============== FETCH ==============
  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);

    const [transRes, camionRes] = await Promise.all([
      supabase.from("transporteurs").select("*").order("id_trans"),
      supabase.from("camions").select("*, transporteurs(nom_trans)").order("id_cam"),
    ]);

    if (transRes.error) setError(transRes.error.message);
    else setTransporteurs(transRes.data as Transporteur[]);

    if (camionRes.error) setError(camionRes.error.message);
    else setCamions(camionRes.data as unknown as Camion[]);

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // ============== FILTRES ==============
  const filteredTransporteurs = transporteurs.filter((t) =>
    t.nom_trans.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCamions = camions.filter(
    (c) =>
      c.type_cam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.transporteurs?.nom_trans ?? "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ============== CRUD TRANSPORTEURS ==============
  function openAddTransporteur() {
    setEditingTransId(null);
    setTransForm(EMPTY_TRANS_FORM);
    setTransModalOpen(true);
  }

  function openEditTransporteur(t: Transporteur) {
    setEditingTransId(t.id_trans);
    setTransForm({
      nom_trans: t.nom_trans,
      contact: t.contact ?? "",
      disponibilite: t.disponibilite,
    });
    setTransModalOpen(true);
  }

  async function saveTransporteur(e: React.FormEvent) {
    e.preventDefault();
    setSavingTrans(true);
    setError(null);

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      setError("Action refusée : Vous devez être authentifié.");
      setSavingTrans(false);
      return;
    }

    const payload = {
      nom_trans: transForm.nom_trans.trim(),
      contact: transForm.contact.trim() || null,
      disponibilite: transForm.disponibilite,
    };

    const { error } = editingTransId
      ? await supabase.from("transporteurs").update(payload).eq("id_trans", editingTransId)
      : await supabase.from("transporteurs").insert(payload);

    setSavingTrans(false);

    if (error) {
      setError(error.message);
      return;
    }

    setTransModalOpen(false);
    fetchAll();
  }

  type DeleteTarget = {
    type: "transporteur" | "camion";
    id: number;
    label: string;
  };
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);

  async function confirmDelete() {
    if (!deleteTarget) return;

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      setError("Action refusée : Vous devez être authentifié.");
      setDeleteTarget(null);
      return;
    }

    const table = deleteTarget.type === "transporteur" ? "transporteurs" : "camions";
    const idField = deleteTarget.type === "transporteur" ? "id_trans" : "id_cam";

    const { error } = await supabase.from(table).delete().eq(idField, deleteTarget.id);
    if (error) {
      setError(error.message);
    } else {
      fetchAll();
    }
    setDeleteTarget(null);
  }

  // ============== CRUD CAMIONS ==============
  function openAddCamion() {
    setEditingCamionId(null);
    setCamionForm(EMPTY_CAMION_FORM);
    setCamionModalOpen(true);
  }

  function openEditCamion(c: Camion) {
    setEditingCamionId(c.id_cam);
    setCamionForm({
      type_cam: c.type_cam,
      capacite: c.capacite?.toString() ?? "",
      cout_km: c.cout_km?.toString() ?? "",
      id_trans: c.id_trans?.toString() ?? "",
    });
    setCamionModalOpen(true);
  }

  async function saveCamion(e: React.FormEvent) {
    e.preventDefault();
    setSavingCamion(true);
    setError(null);

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      setError("Action refusée : Vous devez être authentifié.");
      setSavingCamion(false);
      return;
    }

    const payload = {
      type_cam: camionForm.type_cam.trim(),
      capacite: camionForm.capacite ? Number(camionForm.capacite) : null,
      cout_km: camionForm.cout_km ? Number(camionForm.cout_km) : null,
      id_trans: camionForm.id_trans ? Number(camionForm.id_trans) : null,
    };

    const { error } = editingCamionId
      ? await supabase.from("camions").update(payload).eq("id_cam", editingCamionId)
      : await supabase.from("camions").insert(payload);

    setSavingCamion(false);

    if (error) {
      setError(error.message);
      return;
    }

    setCamionModalOpen(false);
    fetchAll();
  }

  return (
    <div className="space-y-6 text-white font-sans">
      {/* EN-TÊTE DE LA PAGE */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-gray-100">Gestion de la Flotte Logistique</h1>
        <p className="text-sm text-gray-400 font-medium">
          Supervisez vos partenaires de transport et suivez l'état d'affectation des véhicules.
        </p>
      </div>

      {error && (
        <div className="bg-red-950/40 border border-red-800 text-red-300 text-sm px-4 py-3 font-mono flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-red-300 hover:text-red-100 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* SYSTÈME D'ONGLETS SÉLECTIONNABLES */}
      <div className="flex items-center space-x-8 border-b border-gray-900 pb-2 text-sm font-bold font-mono tracking-wider">
        <button
          onClick={() => {
            setActiveTab(1);
            setSearchQuery("");
          }}
          className={`pb-2 uppercase transition-all cursor-pointer ${
            activeTab === 1 ? "text-[#f27405] border-b-2 border-[#f27405]" : "text-gray-400 hover:text-gray-200"
          }`}
        >
          1. Transporteurs
        </button>
        <button
          onClick={() => {
            setActiveTab(2);
            setSearchQuery("");
          }}
          className={`pb-2 uppercase transition-all cursor-pointer ${
            activeTab === 2 ? "text-[#f27405] border-b-2 border-[#f27405]" : "text-gray-400 hover:text-gray-200"
          }`}
        >
          2. Gestion des Camions
        </button>
      </div>

      {/* RECHERCHE ET BOUTON D'ACTION ADAPTATIF */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative max-w-xs w-full font-mono">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder={activeTab === 1 ? "Rechercher un prestataire..." : "Rechercher un camion..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1b1c21]/60 border border-gray-800 pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-[#f27405] rounded-none placeholder-gray-500"
          />
        </div>

        <button
          onClick={activeTab === 1 ? openAddTransporteur : openAddCamion}
          className="bg-[#f27405] hover:bg-[#d66204] text-black font-extrabold text-[11px] font-mono tracking-widest px-5 py-2.5 uppercase transition-colors flex items-center justify-center gap-2 rounded-none cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>{activeTab === 1 ? "Ajouter un transporteur" : "Ajouter un camion"}</span>
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-500 gap-2 font-mono text-sm">
          <Loader2 className="w-4 h-4 animate-spin" />
          Chargement des données...
        </div>
      ) : (
        <>
          {/* ================= TAB 1 : TRANSPORTEURS ================= */}
          {activeTab === 1 && (
            <div className="bg-[#11141a]/90 border border-gray-900 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-gray-800 text-gray-400 font-mono text-[11px] tracking-widest uppercase bg-[#141822]/40">
                      <th className="px-6 py-4 font-bold">Id</th>
                      <th className="px-6 py-4 font-bold">Nom du Transporteur</th>
                      <th className="px-6 py-4 font-bold">Contact</th>
                      <th className="px-6 py-4 font-bold">Disponibilité</th>
                      <th className="px-6 py-4 font-bold text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/60 font-sans">
                    {filteredTransporteurs.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500 font-mono text-xs">
                          Aucun transporteur trouvé.
                        </td>
                      </tr>
                    )}
                    {filteredTransporteurs.map((trans) => (
                      <tr key={trans.id_trans} className="hover:bg-[#151a24]/50 transition-colors">
                        <td className="px-6 py-5 font-bold text-gray-500 font-mono text-xs">
                          #TRP-{String(trans.id_trans).padStart(2, "0")}
                        </td>
                        <td className="px-6 py-5">
                          <div className="font-bold text-gray-100 text-sm">{trans.nom_trans}</div>
                        </td>
                        <td className="px-6 py-5 text-gray-300 text-sm font-mono">{trans.contact || "—"}</td>
                        <td className="px-6 py-5">
                          <span
                            className={`text-[9px] font-black tracking-wider px-2.5 py-1 rounded-full border font-mono uppercase ${
                              trans.disponibilite
                                ? "bg-emerald-950/30 border-emerald-800/80 text-emerald-400"
                                : "bg-gray-800/60 border-gray-700 text-gray-400"
                            }`}
                          >
                            {trans.disponibilite ? "DISPONIBLE" : "INDISPONIBLE"}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <div className="inline-flex items-center space-x-4 text-gray-400">
                            <button
                              onClick={() => openEditTransporteur(trans)}
                              className="hover:text-[#f27405] transition-colors cursor-pointer"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeleteTarget({ type: "transporteur", id: trans.id_trans, label: trans.nom_trans })}
                              className="hover:text-red-400 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= TAB 2 : GESTION DES CAMIONS ================= */}
          {activeTab === 2 && (
            <div className="bg-[#11141a]/90 border border-gray-900 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-gray-800 text-gray-400 font-mono text-[11px] tracking-widest uppercase bg-[#141822]/40">
                      <th className="px-6 py-4 font-bold">Id</th>
                      <th className="px-6 py-4 font-bold">Type de Camion</th>
                      <th className="px-6 py-4 font-bold">Capacité Max</th>
                      <th className="px-6 py-4 font-bold">Coût Kilométrique</th>
                      <th className="px-6 py-4 font-bold">Transporteur Associé</th>
                      <th className="px-6 py-4 font-bold text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/60 font-sans">
                    {filteredCamions.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-gray-500 font-mono text-xs">
                          Aucun camion trouvé.
                        </td>
                      </tr>
                    )}
                    {filteredCamions.map((camion) => (
                      <tr key={camion.id_cam} className="hover:bg-[#151a24]/50 transition-colors">
                        <td className="px-6 py-5 font-bold text-gray-500 font-mono text-xs">
                          #CAM-{String(camion.id_cam).padStart(2, "0")}
                        </td>
                        <td className="px-6 py-5 font-bold text-gray-100 text-sm">{camion.type_cam}</td>
                        <td className="px-6 py-5 font-bold text-gray-300 font-mono text-sm">
                          {camion.capacite != null ? `${camion.capacite} T` : "—"}
                        </td>
                        <td className="px-6 py-5 text-gray-300 font-mono text-sm">
                          {camion.cout_km != null ? `${camion.cout_km} DT/km` : "—"}
                        </td>
                        <td className="px-6 py-5 text-gray-100 text-sm">{camion.transporteurs?.nom_trans ?? "—"}</td>
                        <td className="px-6 py-5 text-center">
                          <div className="inline-flex items-center space-x-4 text-gray-400">
                            <button
                              onClick={() => openEditCamion(camion)}
                              className="hover:text-[#f27405] transition-colors cursor-pointer"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeleteTarget({ type: "camion", id: camion.id_cam, label: camion.type_cam })}
                              className="hover:text-red-400 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* ================= MODALE TRANSPORTEUR ================= */}
      {transModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#11141a] border border-gray-800 w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
              <h2 className="font-bold text-gray-100 font-mono text-sm uppercase tracking-wider">
                {editingTransId ? "Modifier le transporteur" : "Ajouter un transporteur"}
              </h2>
              <button onClick={() => setTransModalOpen(false)} className="text-gray-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={saveTransporteur} className="p-6 space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase text-gray-400 mb-1">Nom</label>
                <input
                  required
                  value={transForm.nom_trans}
                  onChange={(e) => setTransForm({ ...transForm, nom_trans: e.target.value })}
                  className="w-full bg-[#1b1c21]/60 border border-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#f27405]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono uppercase text-gray-400 mb-1">Contact</label>
                <input
                  value={transForm.contact}
                  onChange={(e) => setTransForm({ ...transForm, contact: e.target.value })}
                  className="w-full bg-[#1b1c21]/60 border border-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#f27405]"
                />
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={transForm.disponibilite}
                  onChange={(e) => setTransForm({ ...transForm, disponibilite: e.target.checked })}
                  className="accent-[#f27405]"
                />
                Disponible
              </label>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setTransModalOpen(false)}
                  className="px-4 py-2 text-xs font-mono uppercase text-gray-400 hover:text-white cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={savingTrans}
                  className="bg-[#f27405] hover:bg-[#d66204] text-black font-extrabold text-[11px] font-mono tracking-widest px-5 py-2.5 uppercase transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {savingTrans ? "Enregistrement..." : "Enregistrer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODALE CAMION ================= */}
      {camionModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#11141a] border border-gray-800 w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
              <h2 className="font-bold text-gray-100 font-mono text-sm uppercase tracking-wider">
                {editingCamionId ? "Modifier le camion" : "Ajouter un camion"}
              </h2>
              <button onClick={() => setCamionModalOpen(false)} className="text-gray-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={saveCamion} className="p-6 space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase text-gray-400 mb-1">Type de camion</label>
                <input
                  required
                  value={camionForm.type_cam}
                  onChange={(e) => setCamionForm({ ...camionForm, type_cam: e.target.value })}
                  className="w-full bg-[#1b1c21]/60 border border-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#f27405]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-gray-400 mb-1">Capacité (T)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={camionForm.capacite}
                    onChange={(e) => setCamionForm({ ...camionForm, capacite: e.target.value })}
                    className="w-full bg-[#1b1c21]/60 border border-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#f27405]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-gray-400 mb-1">Coût (DT/km)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={camionForm.cout_km}
                    onChange={(e) => setCamionForm({ ...camionForm, cout_km: e.target.value })}
                    className="w-full bg-[#1b1c21]/60 border border-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#f27405]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-mono uppercase text-gray-400 mb-1">Transporteur associé</label>
                <select
                  value={camionForm.id_trans}
                  onChange={(e) => setCamionForm({ ...camionForm, id_trans: e.target.value })}
                  className="w-full bg-[#1b1c21]/60 border border-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#f27405]"
                >
                  <option value="">— Aucun —</option>
                  {transporteurs.map((t) => (
                    <option key={t.id_trans} value={t.id_trans}>
                      {t.nom_trans}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCamionModalOpen(false)}
                  className="px-4 py-2 text-xs font-mono uppercase text-gray-400 hover:text-white cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={savingCamion}
                  className="bg-[#f27405] hover:bg-[#d66204] text-black font-extrabold text-[11px] font-mono tracking-widest px-5 py-2.5 uppercase transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {savingCamion ? "Enregistrement..." : "Enregistrer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de confirmation de suppression */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#11141a] border border-gray-800 p-6 w-96">
            <h2 className="text-lg font-bold mb-2">Confirmer la suppression</h2>
            <p className="text-gray-400 text-sm mb-6">
              Voulez-vous vraiment supprimer{" "}
              <span className="text-white font-semibold">{deleteTarget.label}</span> ?
              Cette action est irréversible.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 border border-gray-700 text-gray-300 text-sm hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white text-sm font-bold hover:bg-red-700 transition-colors cursor-pointer"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}