// "use client";

// import React, { useState } from "react";
// import { Calculator, FileText, User, Phone, MapPin, Layers } from "lucide-react";

// // Liste fictive des matériaux pour alimenter le menu déroulant (mêmes prix que le catalogue)
// const MATERIAUX_OPTIONS = [
//   { id_mat: 1, nom_mat: "Sable de Oued Classé 0/4", prix_tonne: 45.000 },
//   { id_mat: 2, nom_mat: "Gravier Concassé 3/8", prix_tonne: 38.500 },
//   { id_mat: 3, nom_mat: "Pierre Calcaire Concassée", prix_tonne: 32.000 },
//   { id_mat: 4, nom_mat: "Sable de Carrière 0/2", prix_tonne: 40.000 },
// ];

// // Liste des régions pour le menu déroulant
// const REGIONS_OPTIONS = ["Tunis", "Ariana", "Ben Arous", "Manouba", "Bizerte", "Nabeul", "Sousse", "Sfax"];

// export default function EstimationPage() {
//   // États du formulaire
//   const [nom, setNom] = useState("");
//   const [telephone, setTelephone] = useState("");
//   const [adresse, setAdresse] = useState("");
//   const [region, setRegion] = useState("");
//   const [idMatSelectionne, setIdMatSelectionne] = useState<number>(1);
//   const [quantite, setQuantite] = useState<number>(0);

//   // Trouver le matériau sélectionné pour obtenir son prix unitaire
//   const materiauSelectionne = MATERIAUX_OPTIONS.find(m => m.id_mat === idMatSelectionne);
  
//   // Logique de calcul automatique (Fictive pour le moment)
//   const prixMateriaux = materiauSelectionne ? materiauSelectionne.prix_tonne * quantite : 0;
//   // Simulation d'un coût de transport forfaitaire par tonne (ex: 7 DT / tonne si une quantité est saisie)
//   const prixTransport = quantite > 0 ? 7.500 * quantite : 0;
//   const totalGlobal = prixMateriaux + prixTransport;

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     alert(`Demande simulée avec succès pour ${nom} ! (Données prêtes pour l'envoi Supabase)`);
//   };

//   return (
//     <div className="flex-1 bg-[#0d0f12] px-12 py-10 space-y-8">
      
//       {/* SECTION TITRE */}
//       <div className="space-y-2">
//         <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
//           <Calculator className="text-[#f27405] w-8 h-8" />
//           Simuler une Estimation
//         </h1>
//         <p className="text-sm text-gray-400 font-medium">
//           Remplissez le formulaire pour obtenir un calcul instantané du coût de vos matériaux et du transport.
//         </p>
//       </div>

//       {/* DISPOSITION BI-COLONNE CONFORME À LA MAQUETTE */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
//         {/* COLONNE GAUCHE : FORMULAIRE (Prend 2/3 de l'espace) */}
//         <form onSubmit={handleSubmit} className="lg:col-span-2 bg-[#141414] border border-gray-800 p-8 space-y-6 rounded-none">
//           <h2 className="text-lg font-bold uppercase tracking-wider text-gray-300 border-b border-gray-800 pb-3 flex items-center gap-2">
//             <FileText className="w-4 h-4 text-[#f27405]" /> Informations de livraison
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Nom complet */}
//             <div className="space-y-2">
//               <label className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
//                 <User className="w-3.5 h-3.5 text-gray-500" /> Nom Complet
//               </label>
//               <input
//                 type="text"
//                 required
//                 placeholder="Ex: Mohamed Ali"
//                 value={nom}
//                 onChange={(e) => setNom(e.target.value)}
//                 className="w-full bg-[#0d0f12] border border-gray-700 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f27405] transition-colors rounded-none placeholder-gray-700"
//               />
//             </div>

//             {/* Téléphone */}
//             <div className="space-y-2">
//               <label className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
//                 <Phone className="w-3.5 h-3.5 text-gray-500" /> Numéro de Téléphone
//               </label>
//               <input
//                 type="tel"
//                 required
//                 placeholder="Ex: 98 000 000"
//                 value={telephone}
//                 onChange={(e) => setTelephone(e.target.value)}
//                 className="w-full bg-[#0d0f12] border border-gray-700 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f27405] transition-colors rounded-none placeholder-gray-700"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {/* Région (Dropdown) */}
//             <div className="space-y-2">
//               <label className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
//                 <MapPin className="w-3.5 h-3.5 text-gray-500" /> Région / Gouvernorat
//               </label>
//               <select
//                 required
//                 value={region}
//                 onChange={(e) => setRegion(e.target.value)}
//                 className="w-full bg-[#0d0f12] border border-gray-700 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f27405] transition-colors rounded-none cursor-pointer"
//               >
//                 <option value="" disabled className="text-gray-700">Sélectionner...</option>
//                 {REGIONS_OPTIONS.map((reg) => (
//                   <option key={reg} value={reg}>{reg}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Adresse exacte */}
//             <div className="md:col-span-2 space-y-2">
//               <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Adresse Exacte de Livraison</label>
//               <input
//                 type="text"
//                 required
//                 placeholder="Ex: Rue des Entrepreneurs, Charguia II"
//                 value={adresse}
//                 onChange={(e) => setAdresse(e.target.value)}
//                 className="w-full bg-[#0d0f12] border border-gray-700 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f27405] transition-colors rounded-none placeholder-gray-700"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-gray-800 pt-6">
//             {/* Choix du matériau (Dropdown) */}
//             <div className="md:col-span-2 space-y-2">
//               <label className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
//                 <Layers className="w-3.5 h-3.5 text-gray-500" /> Matériau Souhaité
//               </label>
//               <select
//                 value={idMatSelectionne}
//                 onChange={(e) => setIdMatSelectionne(Number(e.target.value))}
//                 className="w-full bg-[#0d0f12] border border-gray-700 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f27405] transition-colors rounded-none cursor-pointer"
//               >
//                 {MATERIAUX_OPTIONS.map((m) => (
//                   <option key={m.id_mat} value={m.id_mat}>
//                     {m.nom_mat} ({m.prix_tonne.toFixed(3)} DT/T)
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Quantité (Tonnes) */}
//             <div className="space-y-2">
//               <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Quantité (en Tonnes)</label>
//               <input
//                 type="number"
//                 min="1"
//                 required
//                 placeholder="Ex: 25"
//                 value={quantite || ""}
//                 onChange={(e) => setQuantite(Math.max(0, parseFloat(e.target.value) || 0))}
//                 className="w-full bg-[#0d0f12] border border-gray-700 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f27405] transition-colors rounded-none placeholder-gray-700"
//               />
//             </div>
//           </div>
//         </form>

//         {/* COLONNE DROITE : RÉSUMÉ DE L'ESTIMATION (Prend 1/3 de l'espace) */}
//         <div className="bg-[#141414] border border-gray-800 p-6 flex flex-col justify-between space-y-8 sticky top-24">
//           <div className="space-y-6">
//             <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#f27405] border-b border-gray-800 pb-3">
//               Résumé de l'estimation
//             </h2>

//             {/* Détails du calcul */}
//             <div className="space-y-4 text-sm font-medium">
//               <div className="flex justify-between items-center text-gray-400">
//                 <span>Prix Matériaux :</span>
//                 <span className="text-white font-mono">{prixMateriaux.toFixed(3)} DT</span>
//               </div>
//               <div className="flex justify-between items-center text-gray-400">
//                 <span>Prix Transport (Est.) :</span>
//                 <span className="text-white font-mono">{prixTransport.toFixed(3)} DT</span>
//               </div>
              
//               <div className="border-t border-gray-800 pt-4 flex justify-between items-baseline">
//                 <span className="text-base font-bold text-white">Total Global (TTC) :</span>
//                 <span className="text-2xl font-black text-[#f27405] font-mono">{totalGlobal.toFixed(3)} DT</span>
//               </div>
//             </div>
//           </div>

//           {/* Bouton d'action principal connecté au formulaire de gauche */}
//           <button
//             onClick={handleSubmit}
//             className="w-full bg-[#f27405] text-black font-black text-xs uppercase tracking-widest py-4 transition-colors hover:bg-[#d66204] cursor-pointer rounded-none shadow-lg"
//           >
//             Envoyer la demande
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }




import { createClient } from "@/lib/supabaseServer";
import SimulationForm from "@/components/SimulationForm";

export default async function EstimationPage() {
  const supabase = await createClient();
  const { data: materiaux } = await supabase
    .from("materiaux")
    .select("id_mat, nom_mat, prix_tonne");

  return <SimulationForm initialMateriaux={materiaux || []} />;
}