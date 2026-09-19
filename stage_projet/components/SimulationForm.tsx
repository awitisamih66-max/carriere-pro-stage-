// "use client";
// import { useState, useEffect } from "react";
// import { supabase } from "@/lib/supabase";

// export default function SimulationForm({ materiaux }: { materiaux: any[] }) {
//   const [formData, setFormData] = useState({
//     nom_client: "", telephone: "", adresse_livraison: "", 
//     quantite_s: "", id_mat: "", distance: 0 // Distance ajoutée pour le calcul
//   });
//   const [estimation, setEstimation] = useState(0);

//   // Calcul en temps réel
//   useEffect(() => {
//     const mat = materiaux.find(m => m.id_mat == formData.id_mat);
//     if (mat && formData.quantite_s) {
//       const prixMat = mat.prix_tonne * parseFloat(formData.quantite_s);
//       // Formule exemple : prix matériau + estimation transport (ex: 2DT/km)
//       setEstimation(prixMat + (formData.distance * 2)); 
//     }
//   }, [formData, materiaux]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const { error } = await supabase.from("demandes").insert([{
//       nom_client: formData.nom_client,
//       telephone: formData.telephone,
//       adresse_livraison: formData.adresse_livraison,
//       quantite_s: formData.quantite_s,
//       id_mat: formData.id_mat,
//       id_statut: 1 // Statut par défaut "En attente"
//     }]);
    
//     if (error) alert("Erreur: " + error.message);
//     else alert("Demande enregistrée !");
//   };

//   return (
//     <form onSubmit={handleSubmit} className="bg-[#141414] p-8 border border-gray-800 space-y-4 text-white">
//       <h2 className="text-2xl font-bold text-[#f27405]">Simuler votre commande</h2>
      
//       <select onChange={(e) => setFormData({...formData, id_mat: e.target.value})} className="w-full bg-[#0d0f12] p-3 border border-gray-700">
//         <option value="">Sélectionnez un matériau</option>
//         {materiaux.map(m => <option key={m.id_mat} value={m.id_mat}>{m.nom_mat}</option>)}
//       </select>

//       <input type="number" placeholder="Quantité (tonnes)" onChange={(e) => setFormData({...formData, quantite_s: e.target.value})} className="w-full bg-[#0d0f12] p-3 border border-gray-700" />
      
//       <div className="text-xl font-bold mt-4">Estimation : {estimation.toFixed(3)} DT</div>
      
//       <input placeholder="Nom client" onChange={(e) => setFormData({...formData, nom_client: e.target.value})} className="w-full bg-[#0d0f12] p-3 border border-gray-700" />
      
//       <button className="w-full bg-[#f27405] text-black font-bold py-3 uppercase">Envoyer la demande</button>
//     </form>
//   );
// }


"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Calculator, FileText, User, Phone, MapPin, Layers } from "lucide-react";
import { calculateEstimate } from "@/app/actions/estimate";
import { toast } from "sonner";
import { useEstimation, REGIONS } from "@/context/EstimationContext";

export default function SimulationForm({ initialMateriaux }: { initialMateriaux: any[] }) {
  const { formData, setFormData, estimation, setEstimation, resetContext } = useEstimation();
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    if (!formData.id_mat && initialMateriaux.length > 0) {
      setFormData((prev) => ({ ...prev, id_mat: initialMateriaux[0].id_mat.toString() }));
    }
  }, [initialMateriaux, formData.id_mat, setFormData]);

  const handleEstimate = async () => {
    if (!formData.id_mat || formData.quantite <= 0 || !formData.adresse) {
      toast.error("Veuillez remplir le matériau, la quantité et l'adresse exacte pour estimer.");
      return;
    }
    setIsCalculating(true);
    const res = await calculateEstimate(Number(formData.id_mat), formData.quantite, formData.region);
    if (res.success) {
      setEstimation(res as any);
      toast.success("Estimation calculée !");
    } else {
      toast.error("Erreur lors de l'estimation: " + res.error);
    }
    setIsCalculating(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!estimation) {
      toast.error("Veuillez d'abord calculer l'estimation.");
      return;
    }

    const { error } = await supabase.from("demandes").insert([{
      nom_client: formData.nom,
      telephone: formData.telephone,
      region: formData.region,
      adresse_livraison: formData.adresse,
      quantite_s: formData.quantite,
      id_mat: Number(formData.id_mat),
      id_statut: 1 // Nouvelle demande
    }]);

    if (error) {
      toast.error("Erreur : " + error.message);
    } else {
      toast.success("Demande envoyée avec succès !");
      resetContext();
    }
  };

  return (
    <div className="flex-1 bg-[#0d0f12] px-12 py-10 space-y-8 text-white">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold flex items-center gap-3"><Calculator className="text-[#f27405] w-8 h-8" /> Simuler une Estimation</h1>
        <p className="text-sm text-gray-400">Remplissez le formulaire pour obtenir un calcul instantané.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#141414] border border-gray-800 p-8 space-y-6">
          <h2 className="text-lg font-bold border-b border-gray-800 pb-3 flex items-center gap-2"><FileText className="w-4 h-4 text-[#f27405]" /> Informations de livraison</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2"><label className="text-xs text-gray-400 flex items-center gap-2"><User size={14}/> NOM COMPLET</label>
              <input required value={formData.nom} className="w-full bg-[#0d0f12] border border-gray-700 p-3 focus:outline-none focus:border-[#f27405] transition-colors" onChange={e => setFormData({...formData, nom: e.target.value})} /></div>
            <div className="space-y-2"><label className="text-xs text-gray-400 flex items-center gap-2"><Phone size={14}/> TÉLÉPHONE</label>
              <input required value={formData.telephone} className="w-full bg-[#0d0f12] border border-gray-700 p-3 focus:outline-none focus:border-[#f27405] transition-colors" onChange={e => setFormData({...formData, telephone: e.target.value})} /></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2"><label className="text-xs text-gray-400 flex items-center gap-2"><MapPin size={14}/> RÉGION</label>
              <select className="w-full bg-[#0d0f12] border border-gray-700 p-3 focus:outline-none focus:border-[#f27405] transition-colors" onChange={e => setFormData({...formData, region: e.target.value})} value={formData.region}>
                {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
              </select></div>
            <div className="md:col-span-2 space-y-2"><label className="text-xs text-gray-400">ADRESSE EXACTE</label>
              <input required value={formData.adresse} className="w-full bg-[#0d0f12] border border-gray-700 p-3 focus:outline-none focus:border-[#f27405] transition-colors" onChange={e => setFormData({...formData, adresse: e.target.value})} /></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-gray-800">
            <div className="md:col-span-2 space-y-2"><label className="text-xs text-gray-400 flex items-center gap-2"><Layers size={14}/> MATÉRIAU</label>
              <select className="w-full bg-[#0d0f12] border border-gray-700 p-3 focus:outline-none focus:border-[#f27405] transition-colors" onChange={e => setFormData({...formData, id_mat: e.target.value})} value={formData.id_mat}>
                <option value="">Sélectionnez un matériau</option>
                {initialMateriaux.map(m => <option key={m.id_mat} value={m.id_mat}>{m.nom_mat} ({Number(m.prix_tonne).toFixed(3)} DT/T)</option>)}
              </select></div>
            <div className="space-y-2"><label className="text-xs text-gray-400">QUANTITÉ (TONNES)</label>
              <input type="number" required min="1" value={formData.quantite || ""} className="w-full bg-[#0d0f12] border border-gray-700 p-3 focus:outline-none focus:border-[#f27405] transition-colors" onChange={e => setFormData({...formData, quantite: Number(e.target.value)})} /></div>
          </div>
          
          <button 
            type="button" 
            onClick={handleEstimate} 
            disabled={isCalculating}
            className="w-full bg-gray-800 text-white font-bold py-3 mt-4 hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            {isCalculating ? "Calcul en cours..." : "ESTIMER LE COÛT"}
          </button>
        </div>

        <div className="bg-[#141414] border border-gray-800 p-6 space-y-6 sticky top-24 h-fit">
          <h2 className="text-xs font-bold text-[#f27405] border-b border-gray-800 pb-3">RÉSUMÉ DE L'ESTIMATION</h2>
          
          {estimation ? (
            <div className="space-y-4 text-sm text-gray-400">
              <div className="flex justify-between"><span>Distance :</span><span className="text-white">{estimation.distanceKm?.toFixed(1)} km</span></div>
              <div className="flex justify-between"><span>Camions requis :</span><span className="text-white">{estimation.nb_camions} camions</span></div>
              <div className="flex justify-between"><span>Prix Matériaux :</span><span className="text-white">{estimation.prix_materiaux.toFixed(3)} DT</span></div>
              <div className="flex justify-between"><span>Prix Transport :</span><span className="text-white">{estimation.prix_transport.toFixed(3)} DT</span></div>
              <div className="border-t border-gray-800 pt-4 flex justify-between font-bold text-white"><span>Total Global :</span><span className="text-2xl text-[#f27405]">{estimation.total.toFixed(3)} DT</span></div>
            </div>
          ) : (
            <div className="text-sm text-gray-500 py-4 text-center">
              Veuillez remplir le formulaire et cliquer sur "Estimer le coût" pour voir le résumé.
            </div>
          )}

          <button 
            type="button" 
            onClick={handleSubmit} 
            disabled={!estimation}
            className="w-full bg-[#f27405] text-black font-black py-4 hover:bg-[#d66204] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ENVOYER LA DEMANDE
          </button>
        </div>
      </div>
    </div>
  );
}