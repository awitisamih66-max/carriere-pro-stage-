// "use client";

// import React from "react";
// import { Eye } from "lucide-react";

// interface DemandeClient {
//   id: string;
//   date: string;
//   client: string;
//   materiau: string;
//   quantite: number;
//   region: string;
//   statut: "NOUVELLE" | "EN COURS" | "VALIDÉE" | "ANNULÉE";
// }

// const DEMANDES_DATA: DemandeClient[] = [
//   { id: "#TR-8902", date: "30 Juin 2026", client: "Société Ben Ahmed S.A.", materiau: "Sable Fin", quantite: 450, region: "Tunis", statut: "NOUVELLE" },
//   { id: "#TR-8901", date: "29 Juin 2026", client: "Dragage Nord Sarl", materiau: "Gravier 15/25", quantite: 1200, region: "Sfax", statut: "EN COURS" },
//   { id: "#TR-8898", date: "28 Juin 2026", client: "BTP Carthage", materiau: "Tout Venant", quantite: 800, region: "Bizerte", statut: "VALIDÉE" },
//   { id: "#TR-8895", date: "28 Juin 2026", client: "Immo-South", materiau: "Sable Fin", quantite: 120, region: "Gabès", statut: "ANNULÉE" },
// ];

// export default function GestionDemandesPage() {
//   return (
//     <div className="space-y-6 text-white font-sans">
      
//       {/* EN-TÊTE DE LA PAGE */}
//       <div className="space-y-1">
//         <h1 className="text-3xl font-bold tracking-tight text-gray-100">Gestion des Demandes Clients</h1>
//         <p className="text-sm text-gray-400 font-medium">
//           24 demandes en attente de traitement
//         </p>
//       </div>

//       {/* CONTENEUR DU TABLEAU DE MAQUETTE */}
//       <div className="bg-[#11141a]/90 border border-gray-900 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left text-sm border-collapse">
            
//             {/* EN-TÊTE TABLEAU (MAJUSCULES, ESPACÉES, GRISÉES) */}
//             <thead>
//               <tr className="border-b border-gray-800 text-gray-400 font-mono text-[11px] tracking-widest uppercase bg-[#141822]/40">
//                 <th className="px-6 py-4 font-bold">Id</th>
//                 <th className="px-6 py-4 font-bold">Date</th>
//                 <th className="px-6 py-4 font-bold">Client</th>
//                 <th className="px-6 py-4 font-bold">Matériau</th>
//                 <th className="px-6 py-4 font-bold">Quantité</th>
//                 <th className="px-6 py-4 font-bold">Région</th>
//                 <th className="px-6 py-4 font-bold">Statut</th>
//                 <th className="px-6 py-4 font-bold text-center">Action</th>
//               </tr>
//             </thead>
            
//             {/* LIGNES DU TABLEAU */}
//             <tbody className="divide-y divide-gray-800/60 font-sans">
//               {DEMANDES_DATA.map((item) => (
//                 <tr key={item.id} className="hover:bg-[#151a24]/50 transition-colors">
                  
//                   {/* ID (Couleur Orange/Bronze pour le premier ou ID général) */}
//                   <td className="px-6 py-5 font-bold text-[#f27405]/80 font-mono text-sm">
//                     {item.id}
//                   </td>
                  
//                   {/* Date */}
//                   <td className="px-6 py-5 text-gray-300 text-sm">
//                     {item.date}
//                   </td>
                  
//                   {/* Client */}
//                   <td className="px-6 py-5 font-bold text-gray-100 text-sm">
//                     {item.client}
//                   </td>
                  
//                   {/* Matériau */}
//                   <td className="px-6 py-5 text-gray-300 text-sm">
//                     {item.materiau}
//                   </td>
                  
//                   {/* Quantité */}
//                   <td className="px-6 py-5 font-bold text-gray-200 text-sm font-mono">
//                     {item.quantite.toLocaleString()} <span className="text-xs text-gray-400 font-normal ml-0.5">T</span>
//                   </td>
                  
//                   {/* Région */}
//                   <td className="px-6 py-5 text-gray-300 text-sm">
//                     {item.region}
//                   </td>
                  
//                   {/* Statut avec badges pixel-perfect de ta maquette */}
//                   <td className="px-6 py-5">
//                     <span className={`text-[10px] font-black tracking-wider px-2.5 py-1 uppercase rounded-sm border font-mono ${
//                       item.statut === "NOUVELLE"
//                         ? "bg-blue-950/40 border-blue-900/60 text-blue-400"
//                         : item.statut === "EN COURS"
//                         ? "bg-amber-950/40 border-amber-900/60 text-amber-500"
//                         : item.statut === "VALIDÉE"
//                         ? "bg-emerald-950/40 border-emerald-900/60 text-emerald-400"
//                         : "bg-red-950/40 border-red-950 text-red-400/80"
//                     }`}>
//                       {item.statut}
//                     </span>
//                   </td>
                  
//                   {/* Action - Icône Eye */}
//                   <td className="px-6 py-5 text-center">
//                     <button className="text-gray-400 hover:text-[#f27405] transition-colors cursor-pointer inline-flex items-center justify-center">
//                       <Eye className="w-5 h-5" />
//                     </button>
//                   </td>

//                 </tr>
//               ))}
//             </tbody>

//           </table>
//         </div>
//       </div>

//     </div>
//   );
// }
















// "use client";

// import React, { useState } from "react";
// import { Eye } from "lucide-react";

// interface DemandeClient {
//   id: string;
//   date: string;
//   client: string;
//   materiau: string;
//   quantite: number;
//   region: string;
//   statut: "NOUVELLE" | "EN COURS" | "VALIDÉE" | "ANNULÉE";
// }

// // Données fictives initiales conformes à ta capture d'écran
// const INITIAL_DEMANDES: DemandeClient[] = [
//   { id: "#TR-8902", date: "30 Juin 2026", client: "Société Ben Ahmed S.A.", materiau: "Sable Fin", quantite: 450, region: "Tunis", statut: "NOUVELLE" },
//   { id: "#TR-8901", date: "29 Juin 2026", client: "Dragage Nord Sarl", materiau: "Gravier 15/25", quantite: 1200, region: "Sfax", statut: "EN COURS" },
//   { id: "#TR-8898", date: "28 Juin 2026", client: "BTP Carthage", materiau: "Tout Venant", quantite: 800, region: "Bizerte", statut: "VALIDÉE" },
//   { id: "#TR-8895", date: "28 Juin 2026", client: "Immo-South", materiau: "Sable Fin", quantite: 120, region: "Gabès", statut: "ANNULÉE" },
// ];

// export default function GestionDemandesPage() {
//   // Utilisation d'un état React pour pouvoir modifier les statuts en direct
//   const [demandes, setDemandes] = useState<DemandeClient[]>(INITIAL_DEMANDES);

//   // Fonction pour mettre à jour le statut d'une ligne
//   const handleStatutChange = (id: string, nouveauStatut: DemandeClient["statut"]) => {
//     setDemandes((prev) =>
//       prev.map((d) => (d.id === id ? { ...d, statut: nouveauStatut } : d))
//     );
//   };

//   return (
//     <div className="space-y-6 text-white font-sans">
      
//       {/* EN-TÊTE DE LA PAGE */}
//       <div className="space-y-1">
//         <h1 className="text-3xl font-bold tracking-tight text-gray-100">Gestion des Demandes Clients</h1>
//         <p className="text-sm text-gray-400 font-medium">
//           {demandes.filter(d => d.statut === "NOUVELLE" || d.statut === "EN COURS").length} demandes en attente de traitement
//         </p>
//       </div>

//       {/* CONTENEUR DU TABLEAU */}
//       <div className="bg-[#11141a]/90 border border-gray-900 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left text-sm border-collapse">
            
//             <thead>
//               <tr className="border-b border-gray-800 text-gray-400 font-mono text-[11px] tracking-widest uppercase bg-[#141822]/40">
//                 <th className="px-6 py-4 font-bold">Id</th>
//                 <th className="px-6 py-4 font-bold">Date</th>
//                 <th className="px-6 py-4 font-bold">Client</th>
//                 <th className="px-6 py-4 font-bold">Matériau</th>
//                 <th className="px-6 py-4 font-bold">Quantité</th>
//                 <th className="px-6 py-4 font-bold">Région</th>
//                 <th className="px-6 py-4 font-bold">Statut</th>
//                 <th className="px-6 py-4 font-bold text-center">Action</th>
//               </tr>
//             </thead>
            
//             <tbody className="divide-y divide-gray-800/60 font-sans">
//               {demandes.map((item) => (
//                 <tr key={item.id} className="hover:bg-[#151a24]/50 transition-colors">
                  
//                   <td className="px-6 py-5 font-bold text-[#f27405]/80 font-mono text-sm">{item.id}</td>
//                   <td className="px-6 py-5 text-gray-300 text-sm">{item.date}</td>
//                   <td className="px-6 py-5 font-bold text-gray-100 text-sm">{item.client}</td>
//                   <td className="px-6 py-5 text-gray-300 text-sm">{item.materiau}</td>
//                   <td className="px-6 py-5 font-bold text-gray-200 text-sm font-mono">
//                     {item.quantite.toLocaleString()} <span className="text-xs text-gray-400 font-normal ml-0.5">T</span>
//                   </td>
//                   <td className="px-6 py-5 text-gray-300 text-sm">{item.region}</td>
                  
//                   {/* CELLULE STATUT INTERACTIVE ET CONFORME AU DESIGN */}
//                   <td className="px-6 py-5">
//                     <div className="relative inline-block">
                      
//                       {/* Affichage visuel strict du badge */}
//                       <span className={`text-[10px] font-black tracking-wider px-2.5 py-1 uppercase rounded-sm border font-mono pointer-events-none flex items-center ${
//                         item.statut === "NOUVELLE"
//                           ? "bg-blue-950/40 border-blue-900/60 text-blue-400"
//                           : item.statut === "EN COURS"
//                           ? "bg-amber-950/40 border-amber-900/60 text-amber-500"
//                           : item.statut === "VALIDÉE"
//                           ? "bg-emerald-950/40 border-emerald-900/60 text-emerald-400"
//                           : "bg-red-950/40 border-red-950 text-red-400/80"
//                       }`}>
//                         {item.statut}
//                       </span>

//                       {/* Menu déroulant invisible superposé pour le changement d'état */}
//                       <select
//                         value={item.statut}
//                         onChange={(e) => handleStatutChange(item.id, e.target.value as any)}
//                         className="absolute inset-0 opacity-0 w-full h-full cursor-pointer bg-[#11141a]"
//                       >
//                         <option value="NOUVELLE">NOUVELLE</option>
//                         <option value="EN COURS">EN COURS</option>
//                         <option value="VALIDÉE">VALIDÉE</option>
//                         <option value="ANNULÉE">ANNULÉE</option>
//                       </select>

//                     </div>
//                   </td>
                  
//                   <td className="px-6 py-5 text-center">
//                     <button className="text-gray-400 hover:text-[#f27405] transition-colors cursor-pointer">
//                       <Eye className="w-5 h-5" />
//                     </button>
//                   </td>

//                 </tr>
//               ))}
//             </tbody>

//           </table>
//         </div>
//       </div>

//     </div>
//   );
// }




"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Trash2, Loader2, X } from "lucide-react";
import { supabase } from "@/lib/supabase";

// ============== TYPES (alignés sur le schéma réel) ==============
interface Statut {
  id_statut: number;
  libelle: string;
}

interface Demande {
  id_dem: number;
  nom_client: string;
  telephone: string | null;
  adresse_livraison: string | null;
  region: string | null;
  quantite_s: number | null;
  id_mat: number | null;
  id_statut: number | null;
  date_creation: string;
  materiaux?: { nom_mat: string } | null;
  statuts?: { libelle: string } | null;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  const s = d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function badgeClasses(libelle: string | undefined) {
  const l = (libelle ?? "").toUpperCase();
  if (l.includes("NOUVEL")) return "bg-blue-950/40 border-blue-900/60 text-blue-400";
  if (l.includes("COURS")) return "bg-amber-950/40 border-amber-900/60 text-amber-500";
  if (l.includes("VALID")) return "bg-emerald-950/40 border-emerald-900/60 text-emerald-400";
  if (l.includes("ANNUL")) return "bg-red-950/40 border-red-950 text-red-400/80";
  return "bg-gray-800/60 border-gray-700 text-gray-400";
}

export default function GestionDemandesPage() {
  const [demandes, setDemandes] = useState<Demande[]>([]);
  const [statuts, setStatuts] = useState<Statut[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);

    const [demandesRes, statutsRes] = await Promise.all([
      supabase
        .from("demandes")
        .select("*, materiaux(nom_mat), statuts(libelle)")
        .order("date_creation", { ascending: false }),
      supabase.from("statuts").select("*").order("id_statut"),
    ]);

    if (demandesRes.error) setError(demandesRes.error.message);
    else setDemandes(demandesRes.data as unknown as Demande[]);

    if (statutsRes.error) setError(statutsRes.error.message);
    else setStatuts(statutsRes.data as Statut[]);

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Nombre de demandes "en attente" = tout statut autre que validé/annulé
  const enAttente = demandes.filter((d) => {
    const l = (d.statuts?.libelle ?? "").toUpperCase();
    return !l.includes("VALID") && !l.includes("ANNUL");
  }).length;

  async function handleStatutChange(id_dem: number, nouveauIdStatut: number) {
    // Optimistic update
    const nouveauStatut = statuts.find((s) => s.id_statut === nouveauIdStatut);
    setDemandes((prev) =>
      prev.map((d) =>
        d.id_dem === id_dem
          ? { ...d, id_statut: nouveauIdStatut, statuts: nouveauStatut ? { libelle: nouveauStatut.libelle } : d.statuts }
          : d
      )
    );

    const { error } = await supabase
      .from("demandes")
      .update({ id_statut: nouveauIdStatut })
      .eq("id_dem", id_dem);

    if (error) {
      setError(error.message);
      fetchAll(); // revert en resynchronisant avec la DB
    }
  }

  type DeleteTarget = {
    id: number;
    label: string;
  };
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);

  async function confirmDelete() {
    if (!deleteTarget) return;

    const previous = demandes;
    setDemandes((prev) => prev.filter((d) => d.id_dem !== deleteTarget.id));

    const { error } = await supabase.from("demandes").delete().eq("id_dem", deleteTarget.id);

    if (error) {
      setError(error.message);
      setDemandes(previous); // revert
    }
    setDeleteTarget(null);
  }

  return (
    <div className="space-y-6 text-white font-sans">
      {/* EN-TÊTE DE LA PAGE */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-gray-100">Gestion des Demandes Clients</h1>
        <p className="text-sm text-gray-400 font-medium">
          {enAttente} demande{enAttente > 1 ? "s" : ""} en attente de traitement
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

      {/* CONTENEUR DU TABLEAU */}
      <div className="bg-[#11141a]/90 border border-gray-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400 font-mono text-[11px] tracking-widest uppercase bg-[#141822]/40">
                <th className="px-6 py-4 font-bold">Id</th>
                <th className="px-6 py-4 font-bold">Date</th>
                <th className="px-6 py-4 font-bold">Client</th>
                <th className="px-6 py-4 font-bold">Téléphone</th>
                <th className="px-6 py-4 font-bold">Matériau</th>
                <th className="px-6 py-4 font-bold">Quantité</th>
                <th className="px-6 py-4 font-bold">Région</th>
                <th className="px-6 py-4 font-bold">Statut</th>
                <th className="px-6 py-4 font-bold text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-800/60 font-sans">
              {loading && (
                <tr>
                  <td colSpan={9} className="px-6 py-10 text-center text-gray-500 font-mono text-xs">
                    <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
                    Chargement des demandes...
                  </td>
                </tr>
              )}

              {!loading && demandes.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-6 py-10 text-center text-gray-500 font-mono text-xs">
                    Aucune demande trouvée.
                  </td>
                </tr>
              )}

              {!loading &&
                demandes.map((item) => (
                  <tr key={item.id_dem} className="hover:bg-[#151a24]/50 transition-colors">
                    <td className="px-6 py-5 font-bold text-[#f27405]/80 font-mono text-sm">#TR-{item.id_dem}</td>
                    <td className="px-6 py-5 text-gray-300 text-sm">{formatDate(item.date_creation)}</td>
                    <td className="px-6 py-5 font-bold text-gray-100 text-sm">{item.nom_client}</td>
                    <td className="px-6 py-5 text-gray-400 text-sm">{item.telephone ?? "—"}</td>
                    <td className="px-6 py-5 text-gray-300 text-sm">{item.materiaux?.nom_mat ?? "—"}</td>
                    <td className="px-6 py-5 font-bold text-gray-200 text-sm font-mono">
                      {item.quantite_s != null ? item.quantite_s.toLocaleString() : "—"}
                      <span className="text-xs text-gray-400 font-normal ml-0.5">T</span>
                    </td>
                    <td className="px-6 py-5 text-gray-300 text-sm">{item.region ?? "—"}</td>

                    {/* CELLULE STATUT INTERACTIVE (édition en place) */}
                    <td className="px-6 py-5">
                      <div className="relative inline-block">
                        <span
                          className={`text-[10px] font-black tracking-wider px-2.5 py-1 uppercase rounded-sm border font-mono pointer-events-none flex items-center ${badgeClasses(
                            item.statuts?.libelle
                          )}`}
                        >
                          {item.statuts?.libelle ?? "—"}
                        </span>

                        <select
                          value={item.id_statut ?? ""}
                          onChange={(e) => handleStatutChange(item.id_dem, Number(e.target.value))}
                          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer bg-[#11141a]"
                        >
                          {statuts.map((s) => (
                            <option key={s.id_statut} value={s.id_statut}>
                              {s.libelle}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-center">
                      <button
                        onClick={() => setDeleteTarget({ id: item.id_dem, label: `Demande #TR-${item.id_dem}` })}
                        className="text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                        title="Supprimer la demande"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de confirmation de suppression */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#11141a] border border-gray-800 p-6 w-96">
            <h2 className="text-lg font-bold mb-2">Confirmer la suppression</h2>
            <p className="text-gray-400 text-sm mb-6">
              Voulez-vous vraiment supprimer la <span className="text-white font-semibold">{deleteTarget.label}</span> ?
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