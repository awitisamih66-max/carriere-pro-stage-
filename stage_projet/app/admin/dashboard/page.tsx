// "use client";

// import React from "react";
// import { 
//   ClipboardList, 
//   AlertTriangle, 
//   ShoppingBag, 
//   Coins, 
//   ExternalLink,
//   BarChart3,
//   PieChart
// } from "lucide-react";

// // 1. Fausses données pour le tableau des dernières demandes
// const DERNIERES_DEMANDES_FAKE = [
//   { id: "#TR-8902", client: "Société Ben Ahmed S.A.", region: "Tunis, La Marsa", quantite: 450, statut: "NOUVELLE" },
//   { id: "#TR-8901", client: "Constructions Modernes", region: "Sousse, Akouda", quantite: 1200, statut: "VALIDÉE" },
//   { id: "#TR-8899", client: "M. Slimane Trabelsi", region: "Sfax, Route Gremda", quantite: 25, statut: "NOUVELLE" },
//   { id: "#TR-8898", client: "Infrastructure Plus", region: "Nabeul, Hammamet", quantite: 2800, statut: "VALIDÉE" },
//   { id: "#TR-8897", client: "Habitat Durable S.A.R.L", region: "Tunis, Gammarth", quantite: 150, statut: "VALIDÉE" },
// ];

// export default function AdminDashboardPage() {
//   return (
//     <div className="space-y-8 font-mono text-white">
      
//       {/* ================= EN-TÊTE ================= */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div className="space-y-1">
//           <h1 className="text-xl font-bold tracking-tight">Tableau de Bord - Vue d'ensemble</h1>
//           <div className="flex items-center space-x-2 text-xs text-gray-500">
//             <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
//             <span>Système actif — Dernier rafraîchissement: Il y a 2 min</span>
//           </div>
//         </div>
//         <div>
//           <span className="bg-[#f27405]/10 border border-[#f27405] text-[#f27405] text-[10px] font-black tracking-widest px-3 py-1.5 uppercase">
//             ● Mode Administrateur
//           </span>
//         </div>
//       </div>

//       {/* ================= 4 CARTES KPI (GRILLE DE STATS) ================= */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
//         {/* Carte 1: Total Demandes */}
//         <div className="bg-[#14161a] border border-gray-800 p-5 flex flex-col justify-between h-36">
//           <div className="flex justify-between items-start text-gray-400 text-[11px] font-bold tracking-wider uppercase">
//             <span>Total Demandes</span>
//             <ClipboardList className="w-4 h-4 text-[#f27405]" />
//           </div>
//           <div className="space-y-1">
//             <div className="text-3xl font-black">142</div>
//             <div className="text-[10px] text-emerald-500 font-bold">+8% depuis hier</div>
//           </div>
//         </div>

//         {/* Carte 2: Nouvelles Demandes (Alerte Orange) */}
//         <div className="bg-[#14161a] border border-[#f27405]/30 p-5 flex flex-col justify-between h-36 relative overflow-hidden">
//           <div className="absolute top-0 left-0 w-1 h-full bg-[#f27405]"></div>
//           <div className="flex justify-between items-start text-[#f27405] text-[11px] font-bold tracking-wider uppercase">
//             <span>Nouvelles Demandes</span>
//             <AlertTriangle className="w-4 h-4 text-[#f27405]" />
//           </div>
//           <div className="space-y-1">
//             <div className="text-3xl font-black text-[#f27405]">12</div>
//             <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Action Requise</div>
//           </div>
//         </div>

//         {/* Carte 3: Volume Total */}
//         <div className="bg-[#14161a] border border-gray-800 p-5 flex flex-col justify-between h-36">
//           <div className="flex justify-between items-start text-gray-400 text-[11px] font-bold tracking-wider uppercase">
//             <span>Volume Total</span>
//             <ShoppingBag className="w-4 h-4 text-[#f27405]" />
//           </div>
//           <div className="space-y-1">
//             <div className="text-3xl font-black">3,450 <span className="text-xs text-gray-500 font-medium">T</span></div>
//             <div className="text-[10px] text-gray-500 font-bold">Mois en cours</div>
//           </div>
//         </div>

//         {/* Carte 4: C.A. Estimé */}
//         <div className="bg-[#14161a] border border-gray-800 p-5 flex flex-col justify-between h-36">
//           <div className="flex justify-between items-start text-gray-400 text-[11px] font-bold tracking-wider uppercase">
//             <span>C.A. Estimé</span>
//             <Coins className="w-4 h-4 text-[#f27405]" />
//           </div>
//           <div className="space-y-1">
//             <div className="text-3xl font-black">45,200 <span className="text-xs text-gray-500 font-medium">DT</span></div>
//             <div className="text-[10px] text-gray-500 font-bold">Projections hebdomadaires</div>
//           </div>
//         </div>

//       </div>

//       {/* ================= ZONE DU MILIEU (GRAPHIQUES SQUELETTES) ================= */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
//         {/* Activité par Région (Prend 2/3) */}
//         <div className="lg:col-span-2 bg-[#14161a] border border-gray-800 p-6 flex flex-col justify-between min-h-[260px]">
//           <div className="flex justify-between items-center text-xs font-bold uppercase text-gray-400 tracking-wider">
//             <span className="flex items-center gap-2"><BarChart3 className="w-4 h-4 text-[#f27405]" /> Activité par Région</span>
//             <span className="text-gray-600">•••</span>
//           </div>
//           {/* Simulation d'un axe de graphique simple */}
//           <div className="grid grid-cols-4 items-end h-32 gap-4 border-b border-gray-800 pb-2 pt-4">
//             <div className="bg-[#f27405]/20 border-t-2 border-[#f27405] h-20 w-full text-center"></div>
//             <div className="bg-[#f27405]/10 border-t-2 border-[#f27405]/60 h-12 w-full"></div>
//             <div className="bg-[#f27405]/20 border-t-2 border-[#f27405] h-28 w-full"></div>
//             <div className="bg-[#f27405]/10 border-t-2 border-[#f27405]/40 h-16 w-full"></div>
//           </div>
//           <div className="grid grid-cols-4 text-center text-[10px] text-gray-500 font-bold uppercase mt-2">
//             <span>Tunis</span>
//             <span>Sousse</span>
//             <span>Sfax</span>
//             <span>Nabeul</span>
//           </div>
//         </div>

//         {/* Matériaux Populaires (Prend 1/3) */}
//         <div className="bg-[#14161a] border border-gray-800 p-6 flex flex-col justify-between min-h-[260px]">
//           <div className="flex justify-between items-center text-xs font-bold uppercase text-gray-400 tracking-wider">
//             <span className="flex items-center gap-2"><PieChart className="w-4 h-4 text-[#f27405]" /> Matériaux Populaires</span>
//           </div>
          
//           <div className="flex items-center gap-6 py-4">
//             {/* Box Récap 100% stylisée */}
//             <div className="w-24 h-24 border-2 border-[#f27405] flex items-center justify-center bg-[#1c1612]">
//               <span className="text-sm font-black text-[#f27405]">100%</span>
//             </div>
//             {/* Légende */}
//             <div className="space-y-1.5 text-[10px] uppercase font-bold text-gray-400 flex-1">
//               <div className="flex items-center justify-between"><span className="text-[#f27405]">■ Sable</span> <span>42%</span></div>
//               <div className="flex items-center justify-between"><span className="text-orange-300">■ Gravier</span> <span>28%</span></div>
//               <div className="flex items-center justify-between"><span className="text-gray-500">■ Calcaire</span> <span>15%</span></div>
//               <div className="flex items-center justify-between"><span className="text-gray-600">■ Autres</span> <span>15%</span></div>
//             </div>
//           </div>
//         </div>

//       </div>

//       {/* ================= TABLEAU DES 5 DERNIÈRES DEMANDES ================= */}
//       <div className="bg-[#14161a] border border-gray-800 p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xs font-extrabold uppercase tracking-widest text-gray-300">
//             5 Dernières demandes reçues
//           </h2>
//           <button className="text-[10px] font-black uppercase text-[#f27405] hover:underline cursor-pointer">
//             Voir Tout
//           </button>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full text-left text-xs border-collapse">
//             <thead>
//               <tr className="border-b border-gray-800 text-gray-500 uppercase text-[10px] tracking-wider pb-3">
//                 <th className="pb-3 font-bold">ID</th>
//                 <th className="pb-3 font-bold">Client</th>
//                 <th className="pb-3 font-bold">Région</th>
//                 <th className="pb-3 font-bold">Quantité (T)</th>
//                 <th className="pb-3 font-bold">Statut</th>
//                 <th className="pb-3 font-bold text-center">Action</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-800/50">
//               {DERNIERES_DEMANDES_FAKE.map((demande) => (
//                 <tr key={demande.id} className="hover:bg-[#181b20]/40 transition-colors">
//                   <td className="py-4 font-bold text-gray-400">{demande.id}</td>
//                   <td className="py-4 font-semibold text-gray-200">{demande.client}</td>
//                   <td className="py-4 text-gray-400">{demande.region}</td>
//                   <td className="py-4 font-mono font-bold text-gray-300">{demande.quantite.toLocaleString()}</td>
//                   <td className="py-4">
//                     <span className={`text-[9px] px-2 py-0.5 font-extrabold tracking-wider ${
//                       demande.statut === "NOUVELLE"
//                         ? "bg-blue-950/40 border border-blue-800 text-blue-400"
//                         : "bg-emerald-950/40 border border-emerald-800 text-emerald-400"
//                     }`}>
//                       {demande.statut}
//                     </span>
//                   </td>
//                   <td className="py-4 text-center">
//                     <button className="text-gray-500 hover:text-[#f27405] transition-colors cursor-pointer inline-block">
//                       <ExternalLink className="w-4 h-4" />
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

// import React, { useState, useEffect } from "react";
// import { ClipboardList, AlertTriangle, ShoppingBag, Coins, ExternalLink, BarChart3, PieChart } from "lucide-react";
// import { supabase } from "@/lib/supabase"; // Assurez-vous que le chemin est correct

// export default function AdminDashboardPage() {
//   const [stats, setStats] = useState({ total: 0, nouvelles: 0, volume: 0, ca: 0 });
//   const [dernieresDemandes, setDernieresDemandes] = useState<any[]>([]);

//   const fetchData = async () => {
//     // 1. Récupération des données pour les KPIs
//     const { data: allDemandes } = await supabase.from("demandes").select("*, statuts(libelle), materiaux(prix_tonne)");
    
//     if (allDemandes) {
//       const total = allDemandes.length;
//       const nouvelles = allDemandes.filter(d => d.statuts?.libelle === 'Nouvelle').length;
//       const volume = allDemandes.reduce((acc, curr) => acc + (curr.quantite_s || 0), 0);
//       const ca = allDemandes.reduce((acc, curr) => acc + ((curr.quantite_s || 0) * (curr.materiaux?.prix_tonne || 0)), 0);
      
//       setStats({ total, nouvelles, volume, ca });
//     }

//     // 2. Récupération des 5 dernières demandes
//     const { data: recent } = await supabase
//       .from("demandes")
//       .select("id_dem, nom_client, region, quantite_s, statuts(libelle)")
//       .order("date_creation", { ascending: false })
//       .limit(5);
    
//     setDernieresDemandes(recent || []);
//   };

//   useEffect(() => {
//     fetchData();

//     // Souscription aux changements temps réel sur la table 'demandes'
//     const channel = supabase
//       .channel('schema-db-changes')
//       .on('postgres_changes', { event: '*', schema: 'public', table: 'demandes' }, () => {
//         fetchData();
//       })
//       .subscribe();

//     return () => { supabase.removeChannel(channel); };
//   }, []);

//   return (
//     <div className="space-y-8 font-mono text-white">
//       {/* EN-TÊTE */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div className="space-y-1">
//           <h1 className="text-xl font-bold tracking-tight">Tableau de Bord - Vue d'ensemble</h1>
//           <div className="flex items-center space-x-2 text-xs text-gray-500">
//             <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
//             <span>Système actif — Connecté à la base de données</span>
//           </div>
//         </div>
//       </div>

//       {/* 4 CARTES KPI */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         <div className="bg-[#14161a] border border-gray-800 p-5 h-36 flex flex-col justify-between">
//           <div className="text-gray-400 text-[11px] font-bold uppercase">Total Demandes</div>
//           <div className="text-3xl font-black">{stats.total}</div>
//         </div>
//         <div className="bg-[#14161a] border border-[#f27405]/30 p-5 h-36 flex flex-col justify-between relative">
//           <div className="absolute top-0 left-0 w-1 h-full bg-[#f27405]"></div>
//           <div className="text-[#f27405] text-[11px] font-bold uppercase">Nouvelles Demandes</div>
//           <div className="text-3xl font-black text-[#f27405]">{stats.nouvelles}</div>
//         </div>
//         <div className="bg-[#14161a] border border-gray-800 p-5 h-36 flex flex-col justify-between">
//           <div className="text-gray-400 text-[11px] font-bold uppercase">Volume Total</div>
//           <div className="text-3xl font-black">{stats.volume.toLocaleString()} <span className="text-xs text-gray-500">T</span></div>
//         </div>
//         <div className="bg-[#14161a] border border-gray-800 p-5 h-36 flex flex-col justify-between">
//           <div className="text-gray-400 text-[11px] font-bold uppercase">C.A. Estimé</div>
//           <div className="text-3xl font-black">{stats.ca.toLocaleString()} <span className="text-xs text-gray-500">DT</span></div>
//         </div>
//       </div>

//       {/* TABLEAU DES DEMANDES (Dynamique) */}
//       <div className="bg-[#14161a] border border-gray-800 p-6">
//         <h2 className="text-xs font-extrabold uppercase tracking-widest text-gray-300 mb-6">5 Dernières demandes</h2>
//         <table className="w-full text-left text-xs border-collapse">
//           <thead>
//             <tr className="border-b border-gray-800 text-gray-500 uppercase text-[10px]">
//               <th className="pb-3">ID</th><th className="pb-3">Client</th><th className="pb-3">Région</th><th className="pb-3">Quantité (T)</th><th className="pb-3">Statut</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-800/50">
//             {dernieresDemandes.map((d) => (
//               <tr key={d.id_dem}>
//                 <td className="py-4 font-bold text-gray-400">#TR-{d.id_dem}</td>
//                 <td className="py-4 text-gray-200">{d.nom_client}</td>
//                 <td className="py-4 text-gray-400">{d.region}</td>
//                 <td className="py-4 font-bold">{d.quantite_s}</td>
//                 <td className="py-4 text-blue-400 font-bold">{d.statuts?.libelle}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }




// "use client";

// import React, { useState, useEffect } from "react";
// import { ClipboardList, AlertTriangle, ShoppingBag, Coins, ExternalLink, BarChart3, PieChart } from "lucide-react";
// import { supabase } from "@/lib/supabase";

// export default function AdminDashboardPage() {
//   const [stats, setStats] = useState({ total: 0, nouvelles: 0, volume: 0, ca: 0 });
//   const [dernieresDemandes, setDernieresDemandes] = useState<any[]>([]);

//   const fetchData = async () => {
//     const { data: allDemandes } = await supabase.from("demandes").select("*, statuts(libelle), materiaux(prix_tonne, nom_mat)");
    
//     if (allDemandes) {
//       const total = allDemandes.length;
//       const nouvelles = allDemandes.filter(d => d.statuts?.libelle === 'Nouvelle').length;
//       const volume = allDemandes.reduce((acc, curr) => acc + (curr.quantite_s || 0), 0);
//       const ca = allDemandes.reduce((acc, curr) => acc + ((curr.quantite_s || 0) * (curr.materiaux?.prix_tonne || 0)), 0);
      
//       setStats({ total, nouvelles, volume, ca });
//     }

//     const { data: recent } = await supabase
//       .from("demandes")
//       .select("id_dem, nom_client, region, quantite_s, statuts(libelle)")
//       .order("date_creation", { ascending: false })
//       .limit(5);
    
//     setDernieresDemandes(recent || []);
//   };

//   useEffect(() => {
//     fetchData();
//     const channel = supabase
//       .channel('schema-db-changes')
//       .on('postgres_changes', { event: '*', schema: 'public', table: 'demandes' }, () => {
//         fetchData();
//       })
//       .subscribe();

//     return () => { supabase.removeChannel(channel); };
//   }, []);

//   return (
//     <div className="space-y-8 font-mono text-white">
//       {/* EN-TÊTE */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div className="space-y-1">
//           <h1 className="text-xl font-bold tracking-tight">Tableau de Bord - Vue d'ensemble</h1>
//           <div className="flex items-center space-x-2 text-xs text-gray-500">
//             <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
//             <span>Système actif — Connecté à la base de données</span>
//           </div>
//         </div>
//       </div>

//       {/* 4 CARTES KPI */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         <div className="bg-[#14161a] border border-gray-800 p-5 h-36 flex flex-col justify-between">
//           <div className="text-gray-400 text-[11px] font-bold uppercase">Total Demandes</div>
//           <div className="text-3xl font-black">{stats.total}</div>
//         </div>
//         <div className="bg-[#14161a] border border-[#f27405]/30 p-5 h-36 flex flex-col justify-between relative">
//           <div className="absolute top-0 left-0 w-1 h-full bg-[#f27405]"></div>
//           <div className="text-[#f27405] text-[11px] font-bold uppercase">Nouvelles Demandes</div>
//           <div className="text-3xl font-black text-[#f27405]">{stats.nouvelles}</div>
//         </div>
//         <div className="bg-[#14161a] border border-gray-800 p-5 h-36 flex flex-col justify-between">
//           <div className="text-gray-400 text-[11px] font-bold uppercase">Volume Total</div>
//           <div className="text-3xl font-black">{stats.volume.toLocaleString()} <span className="text-xs text-gray-500">T</span></div>
//         </div>
//         <div className="bg-[#14161a] border border-gray-800 p-5 h-36 flex flex-col justify-between">
//           <div className="text-gray-400 text-[11px] font-bold uppercase">C.A. Estimé</div>
//           <div className="text-3xl font-black">{stats.ca.toLocaleString()} <span className="text-xs text-gray-500">DT</span></div>
//         </div>
//       </div>

//       {/* NOUVELLE SECTION GRAPHIQUES (d'après Capture d'écran 2026-07-03 175035.png) */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-[#14161a] border border-gray-800 p-6">
//             <div className="flex justify-between items-center text-xs font-bold uppercase text-gray-400 tracking-wider mb-8">
//                 <span>Activité par région</span>
//                 <span>...</span>
//             </div>
//             <div className="flex justify-between items-end h-32 px-4 border-b border-gray-800">
//                 {['Tunis', 'Sousse', 'Sfax', 'Nabeul'].map((region) => (
//                     <div key={region} className="text-center">
//                         <div className="w-8 bg-[#f27405]/20 hover:bg-[#f27405]/40 transition-all h-20"></div>
//                         <p className="text-[10px] mt-2 text-gray-500 font-bold">{region.toUpperCase()}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//         <div className="bg-[#14161a] border border-gray-800 p-6">
//             <div className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-6">Matériaux populaires</div>
//             <div className="flex items-center gap-8">
//                 <div className="w-24 h-24 border-2 border-[#f27405] flex items-center justify-center text-[#f27405] font-black">100%</div>
//                 <div className="space-y-2 text-[10px] uppercase font-bold text-gray-400">
//                     <div>■ Sable (42%)</div>
//                     <div>■ Gravier (28%)</div>
//                     <div>■ Calcaire (15%)</div>
//                     <div>■ Autres (15%)</div>
//                 </div>
//             </div>
//         </div>
//       </div>

//       {/* TABLEAU DES DEMANDES */}
//       <div className="bg-[#14161a] border border-gray-800 p-6">
//         <h2 className="text-xs font-extrabold uppercase tracking-widest text-gray-300 mb-6">5 Dernières demandes</h2>
//         <table className="w-full text-left text-xs border-collapse">
//           <thead>
//             <tr className="border-b border-gray-800 text-gray-500 uppercase text-[10px]">
//               <th className="pb-3">ID</th><th className="pb-3">Client</th><th className="pb-3">Région</th><th className="pb-3">Quantité (T)</th><th className="pb-3">Statut</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-800/50">
//             {dernieresDemandes.map((d) => (
//               <tr key={d.id_dem}>
//                 <td className="py-4 font-bold text-gray-400">#TR-{d.id_dem}</td>
//                 <td className="py-4 text-gray-200">{d.nom_client}</td>
//                 <td className="py-4 text-gray-400">{d.region}</td>
//                 <td className="py-4 font-bold">{d.quantite_s}</td>
//                 <td className="py-4 text-blue-400 font-bold">{d.statuts?.libelle}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }




// "use client";

// import React, { useState, useEffect } from "react";
// import { ClipboardList, AlertTriangle, ShoppingBag, Coins, ExternalLink, BarChart3, PieChart } from "lucide-react";
// import { supabase } from "@/lib/supabase";

// export default function AdminDashboardPage() {
//   const [stats, setStats] = useState({ total: 0, nouvelles: 0, volume: 0, ca: 0 });
//   const [dernieresDemandes, setDernieresDemandes] = useState<any[]>([]);
//   // États pour les graphiques dynamiques
//   const [chartData, setChartData] = useState({
//     regions: { Tunis: 0, Sousse: 0, Sfax: 0, Nabeul: 0 },
//     materiaux: [] as { nom: string; pourc: number }[]
//   });

//   const fetchData = async () => {
//     const { data: allDemandes } = await supabase.from("demandes").select("*, statuts(libelle), materiaux(prix_tonne, nom_mat)");
    
//     if (allDemandes) {
//       // 1. Calculs KPIs
//       const total = allDemandes.length;
//       const nouvelles = allDemandes.filter(d => d.statuts?.libelle === 'Nouvelle').length;
//       const volume = allDemandes.reduce((acc, curr) => acc + (curr.quantite_s || 0), 0);
//       const ca = allDemandes.reduce((acc, curr) => acc + ((curr.quantite_s || 0) * (curr.materiaux?.prix_tonne || 0)), 0);
//       setStats({ total, nouvelles, volume, ca });

//       // 2. Calcul dynamique Activité par Région
//       const regMap = { Tunis: 0, Sousse: 0, Sfax: 0, Nabeul: 0 };
//       allDemandes.forEach(d => { if (regMap.hasOwnProperty(d.region)) regMap[d.region as keyof typeof regMap]++; });
      
//       // 3. Calcul dynamique Matériaux populaires
//       const volTotal = volume || 1;
//       const matMap = allDemandes.reduce((acc, d) => {
//         const nom = d.materiaux?.nom_mat || 'Autres';
//         acc[nom] = (acc[nom] || 0) + (d.quantite_s || 0);
//         return acc;
//       }, {} as Record<string, number>);
      
//       const matList = Object.entries(matMap).map(([nom, vol]) => ({
//         nom,
//         pourc: Math.round(((vol as number) / volTotal) * 100)
//       }));

//       setChartData({ regions: regMap, materiaux: matList });
//     }

//     const { data: recent } = await supabase
//       .from("demandes")
//       .select("id_dem, nom_client, region, quantite_s, statuts(libelle)")
//       .order("date_creation", { ascending: false })
//       .limit(5);
    
//     setDernieresDemandes(recent || []);
//   };

//   useEffect(() => {
//     fetchData();
//     const channel = supabase.channel('schema-db-changes').on('postgres_changes', { event: '*', schema: 'public', table: 'demandes' }, fetchData).subscribe();
//     return () => { supabase.removeChannel(channel); };
//   }, []);

//   return (
//     <div className="space-y-8 font-mono text-white">
//       {/* EN-TÊTE & KPI (inchangés) */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <h1 className="text-xl font-bold tracking-tight">Tableau de Bord - Vue d'ensemble</h1>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         <div className="bg-[#14161a] border border-gray-800 p-5 h-36 flex flex-col justify-between">
//           <div className="text-gray-400 text-[11px] font-bold uppercase">Total Demandes</div>
//           <div className="text-3xl font-black">{stats.total}</div>
//         </div>
//         <div className="bg-[#14161a] border border-[#f27405]/30 p-5 h-36 flex flex-col justify-between relative">
//           <div className="absolute top-0 left-0 w-1 h-full bg-[#f27405]"></div>
//           <div className="text-[#f27405] text-[11px] font-bold uppercase">Nouvelles Demandes</div>
//           <div className="text-3xl font-black text-[#f27405]">{stats.nouvelles}</div>
//         </div>
//         <div className="bg-[#14161a] border border-gray-800 p-5 h-36 flex flex-col justify-between">
//           <div className="text-gray-400 text-[11px] font-bold uppercase">Volume Total</div>
//           <div className="text-3xl font-black">{stats.volume.toLocaleString()} <span className="text-xs text-gray-500">T</span></div>
//         </div>
//         <div className="bg-[#14161a] border border-gray-800 p-5 h-36 flex flex-col justify-between">
//           <div className="text-gray-400 text-[11px] font-bold uppercase">C.A. Estimé</div>
//           <div className="text-3xl font-black">{stats.ca.toLocaleString()} <span className="text-xs text-gray-500">DT</span></div>
//         </div>
//       </div>

//       {/* GRAPHIQUES DYNAMIQUES */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-[#14161a] border border-gray-800 p-6">
//             <div className="flex justify-between items-center text-xs font-bold uppercase text-gray-400 tracking-wider mb-8"><span>Activité par région</span></div>
//             <div className="flex justify-between items-end h-32 px-4 border-b border-gray-800">
//                 {Object.entries(chartData.regions).map(([reg, count]) => (
//                     <div key={reg} className="text-center">
//                         <div style={{ height: `${Math.max(count * 10, 20)}px` }} className="w-8 bg-[#f27405]/20 hover:bg-[#f27405]/40 transition-all"></div>
//                         <p className="text-[10px] mt-2 text-gray-500 font-bold">{reg.toUpperCase()}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//         <div className="bg-[#14161a] border border-gray-800 p-6">
//             <div className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-6">Matériaux populaires</div>
//             <div className="flex items-center gap-8">
//                 <div className="w-24 h-24 border-2 border-[#f27405] flex items-center justify-center text-[#f27405] font-black">100%</div>
//                 <div className="space-y-2 text-[10px] uppercase font-bold text-gray-400">
//                     {chartData.materiaux.map(m => <div key={m.nom}>■ {m.nom} ({m.pourc}%)</div>)}
//                 </div>
//             </div>
//         </div>
//       </div>

//       {/* TABLEAU */}
//       <div className="bg-[#14161a] border border-gray-800 p-6">
//         <h2 className="text-xs font-extrabold uppercase tracking-widest text-gray-300 mb-6">5 Dernières demandes</h2>
//         <table className="w-full text-left text-xs border-collapse">
//           <thead><tr className="border-b border-gray-800 text-gray-500 uppercase text-[10px]"><th className="pb-3">ID</th><th className="pb-3">Client</th><th className="pb-3">Région</th><th className="pb-3">Quantité (T)</th><th className="pb-3">Statut</th></tr></thead>
//           <tbody className="divide-y divide-gray-800/50">
//             {dernieresDemandes.map((d) => (
//               <tr key={d.id_dem}>
//                 <td className="py-4 font-bold text-gray-400">#TR-{d.id_dem}</td>
//                 <td className="py-4 text-gray-200">{d.nom_client}</td>
//                 <td className="py-4 text-gray-400">{d.region}</td>
//                 <td className="py-4 font-bold">{d.quantite_s}</td>
//                 <td className="py-4 text-blue-400 font-bold">{d.statuts?.libelle}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }





"use client";

import React, { useState, useEffect } from "react";
import { ClipboardList, AlertTriangle, ShoppingBag, Coins, ExternalLink, BarChart3, PieChart } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ total: 0, nouvelles: 0, volume: 0, ca: 0 });
  const [dernieresDemandes, setDernieresDemandes] = useState<any[]>([]);
  // États pour les graphiques dynamiques
  const [chartData, setChartData] = useState<{
    regions: Record<string, number>;
    materiaux: { nom: string; pourc: number }[];
  }>({
    regions: {},
    materiaux: []
  });

  const fetchData = async () => {
    const { data: allDemandes } = await supabase.from("demandes").select("*, statuts(libelle), materiaux(prix_tonne, nom_mat)");
    
    if (allDemandes) {
      // 1. Calculs KPIs
      const total = allDemandes.length;
      const nouvelles = allDemandes.filter(d => d.statuts?.libelle === 'Nouvelle').length;
      const volume = allDemandes.reduce((acc, curr) => acc + (curr.quantite_s || 0), 0);
      const ca = allDemandes.reduce((acc, curr) => acc + ((curr.quantite_s || 0) * (curr.materiaux?.prix_tonne || 0)), 0);
      setStats({ total, nouvelles, volume, ca });

      // 2. Calcul dynamique de TOUTES les régions
      const regionsMap = allDemandes.reduce((acc, d) => {
        const reg = d.region || 'Inconnu';
        acc[reg] = (acc[reg] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      // 3. Calcul dynamique Matériaux populaires
      const volTotal = volume || 1;
      const matMap = allDemandes.reduce((acc, d) => {
        const nom = d.materiaux?.nom_mat || 'Autres';
        acc[nom] = (acc[nom] || 0) + (d.quantite_s || 0);
        return acc;
      }, {} as Record<string, number>);
      
      const matList = Object.entries(matMap).map(([nom, vol]) => ({
        nom,
        pourc: Math.round(((vol as number) / volTotal) * 100)
      }));

      setChartData({ regions: regionsMap, materiaux: matList });
    }

    const { data: recent } = await supabase
      .from("demandes")
      .select("id_dem, nom_client, telephone, region, quantite_s, statuts(libelle)")
      .order("date_creation", { ascending: false })
      .limit(5);
    
    setDernieresDemandes(recent || []);
  };

  useEffect(() => {
    fetchData();
    const channel = supabase.channel('schema-db-changes').on('postgres_changes', { event: '*', schema: 'public', table: 'demandes' }, fetchData).subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  return (
    <div className="space-y-8 font-mono text-white">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-xl font-bold tracking-tight">Tableau de Bord - Vue d'ensemble</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#14161a] border border-gray-800 p-5 h-36 flex flex-col justify-between">
          <div className="text-gray-400 text-[11px] font-bold uppercase">Total Demandes</div>
          <div className="text-3xl font-black">{stats.total}</div>
        </div>
        <div className="bg-[#14161a] border border-[#f27405]/30 p-5 h-36 flex flex-col justify-between relative">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#f27405]"></div>
          <div className="text-[#f27405] text-[11px] font-bold uppercase">Nouvelles Demandes</div>
          <div className="text-3xl font-black text-[#f27405]">{stats.nouvelles}</div>
        </div>
        <div className="bg-[#14161a] border border-gray-800 p-5 h-36 flex flex-col justify-between">
          <div className="text-gray-400 text-[11px] font-bold uppercase">Volume Total</div>
          <div className="text-3xl font-black">{stats.volume.toLocaleString()} <span className="text-xs text-gray-500">T</span></div>
        </div>
        <div className="bg-[#14161a] border border-gray-800 p-5 h-36 flex flex-col justify-between">
          <div className="text-gray-400 text-[11px] font-bold uppercase">C.A. Estimé</div>
          <div className="text-3xl font-black">{stats.ca.toLocaleString()} <span className="text-xs text-gray-500">DT</span></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#14161a] border border-gray-800 p-6">
            <div className="flex justify-between items-center text-xs font-bold uppercase text-gray-400 tracking-wider mb-8"><span>Activité par région</span></div>
            <div className="flex justify-between items-end h-32 px-4 border-b border-gray-800">
                {Object.entries(chartData.regions).map(([reg, count]) => {
                    const maxCount = Math.max(...Object.values(chartData.regions), 1);
                    const height = (count / maxCount) * 80;
                    return (
                        <div key={reg} className="text-center flex flex-col items-center">
                            <div style={{ height: `${height}px` }} className="w-8 bg-[#f27405]/20 hover:bg-[#f27405]/40 transition-all"></div>
                            <p className="text-[10px] mt-2 text-gray-500 font-bold w-16 truncate">{reg.toUpperCase()}</p>
                        </div>
                    );
                })}
            </div>
        </div>
        <div className="bg-[#14161a] border border-gray-800 p-6">
            <div className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-6">Matériaux populaires</div>
            <div className="flex items-center gap-8">
                <div className="w-24 h-24 border-2 border-[#f27405] flex items-center justify-center text-[#f27405] font-black">100%</div>
                <div className="space-y-2 text-[10px] uppercase font-bold text-gray-400">
                    {chartData.materiaux.map(m => <div key={m.nom}>■ {m.nom} ({m.pourc}%)</div>)}
                </div>
            </div>
        </div>
      </div>

      <div className="bg-[#14161a] border border-gray-800 p-6">
        <h2 className="text-xs font-extrabold uppercase tracking-widest text-gray-300 mb-6">5 Dernières demandes</h2>
        <table className="w-full text-left text-xs border-collapse">
          <thead><tr className="border-b border-gray-800 text-gray-500 uppercase text-[10px]"><th className="pb-3">ID</th><th className="pb-3">Client</th><th className="pb-3">Téléphone</th><th className="pb-3">Région</th><th className="pb-3">Quantité (T)</th><th className="pb-3">Statut</th></tr></thead>
          <tbody className="divide-y divide-gray-800/50">
            {dernieresDemandes.map((d) => (
              <tr key={d.id_dem}>
                <td className="py-4 font-bold text-gray-400">#TR-{d.id_dem}</td>
                <td className="py-4 text-gray-200">{d.nom_client}</td>
                <td className="py-4 text-gray-400">{d.telephone ?? "—"}</td>
                <td className="py-4 text-gray-400">{d.region}</td>
                <td className="py-4 font-bold">{d.quantite_s}</td>
                <td className="py-4 text-blue-400 font-bold">{d.statuts?.libelle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}