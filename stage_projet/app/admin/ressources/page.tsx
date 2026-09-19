"use client";

import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Search, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Carriere, Materiau } from "@/types/database";

interface Categorie {
  id_cat: number;
  nom_cat: string;
}

type DeleteTarget = {
  type: "carriere" | "materiau";
  id: number;
  label: string;
};

const STATUTS = ["active", "en pause", "inactive"];

const statutStyle = (statut?: string) => {
  switch (statut) {
    case "active":
      return "bg-emerald-950/30 border-emerald-800/80 text-emerald-400";
    case "en pause":
      return "bg-yellow-950/30 border-yellow-800/80 text-yellow-400";
    case "inactive":
      return "bg-red-950/30 border-red-800/80 text-red-400";
    default:
      return "bg-gray-800/60 border-gray-700 text-gray-400";
  }
};

type CarriereFormState = {
  nom_carr: string;
  adresse: string;
  latitude: string;
  longitude: string;
  contact: string;
  statut: string;
};

type MateriauFormState = {
  nom_mat: string;
  prix_tonne: string;
  quantite_disp: string;
  id_carr: string;
  id_cat: string;
};

const EMPTY_CARR_FORM: CarriereFormState = { nom_carr: "", adresse: "", latitude: "", longitude: "", contact: "", statut: "active" };
const EMPTY_MAT_FORM: MateriauFormState = { nom_mat: "", prix_tonne: "", quantite_disp: "", id_carr: "", id_cat: "" };

export default function Ressources() {
  const [activeTab, setActiveTab] = useState<1 | 2>(1);
  const [materiaux, setMateriaux] = useState<Materiau[]>([]);
  const [carrieres, setCarrieres] = useState<Carriere[]>([]);
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Modale Carrière
  const [carrModalOpen, setCarrModalOpen] = useState(false);
  const [carrForm, setCarrForm] = useState<CarriereFormState>(EMPTY_CARR_FORM);
  const [editingCarrId, setEditingCarrId] = useState<number | null>(null);
  const [savingCarr, setSavingCarr] = useState(false);

  // Modale Matériau
  const [matModalOpen, setMatModalOpen] = useState(false);
  const [matForm, setMatForm] = useState<MateriauFormState>(EMPTY_MAT_FORM);
  const [editingMatId, setEditingMatId] = useState<number | null>(null);
  const [savingMat, setSavingMat] = useState(false);

  // Suppression
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);

  useEffect(() => {
    setSearchQuery("");
    setError(null);
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    const { data: carrData, error: carrErr } = await supabase.from("carrieres").select("*").eq("actif", true).order("id_carr");
    if (carrErr) setError(carrErr.message);
    setCarrieres(carrData || []);

    const { data: catData } = await supabase.from("categories").select("*");
    setCategories(catData || []);

    if (activeTab === 2) {
      const { data, error: matErr } = await supabase
        .from("materiaux")
        .select("*, categories(nom_cat), carrieres(nom_carr)")
        .eq("actif", true)
        .order("id_mat");
      if (matErr) setError(matErr.message);
      setMateriaux(data || []);
    }
    setLoading(false);
  };

  const filteredMateriaux = materiaux.filter((m) =>
    m.nom_mat.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCarrieres = carrieres.filter((c) =>
    c.nom_carr.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ---------- CRUD Carrières ----------
  function openAddCarriere() {
    setEditingCarrId(null);
    setCarrForm(EMPTY_CARR_FORM);
    setCarrModalOpen(true);
  }

  function openEditCarriere(c: Carriere) {
    setEditingCarrId(c.id_carr);
    setCarrForm({
      nom_carr: c.nom_carr,
      adresse: c.adresse || "",
      latitude: c.latitude ? String(c.latitude) : "",
      longitude: c.longitude ? String(c.longitude) : "",
      contact: c.contact || "",
      statut: c.statut || "active",
    });
    setCarrModalOpen(true);
  }

  async function saveCarriere(e: React.FormEvent) {
    e.preventDefault();
    setSavingCarr(true);
    setError(null);

    if (!carrForm.nom_carr.trim()) {
      setError("Le nom de la carrière est requis.");
      setSavingCarr(false);
      return;
    }

    const payload = {
      nom_carr: carrForm.nom_carr.trim(),
      adresse: carrForm.adresse.trim() || null,
      latitude: carrForm.latitude ? Number(carrForm.latitude) : null,
      longitude: carrForm.longitude ? Number(carrForm.longitude) : null,
      contact: carrForm.contact.trim() || null,
      statut: carrForm.statut,
    };

    const { error: reqError } = editingCarrId
      ? await supabase.from("carrieres").update(payload).eq("id_carr", editingCarrId)
      : await supabase.from("carrieres").insert(payload);

    setSavingCarr(false);

    if (reqError) {
      setError(reqError.message);
      return;
    }
    setCarrModalOpen(false);
    fetchData();
  }

  // ---------- CRUD Matériaux ----------
  function openAddMateriau() {
    setEditingMatId(null);
    setMatForm(EMPTY_MAT_FORM);
    setMatModalOpen(true);
  }

  function openEditMateriau(m: any) {
    setEditingMatId(m.id_mat);
    setMatForm({
      nom_mat: m.nom_mat,
      prix_tonne: m.prix_tonne ? String(m.prix_tonne) : "",
      quantite_disp: m.quantite_disp ? String(m.quantite_disp) : "",
      id_carr: m.id_carr ? String(m.id_carr) : "",
      id_cat: m.id_cat ? String(m.id_cat) : "",
    });
    setMatModalOpen(true);
  }

  async function saveMateriau(e: React.FormEvent) {
    e.preventDefault();
    setSavingMat(true);
    setError(null);

    if (!matForm.nom_mat.trim() || !matForm.id_cat || !matForm.id_carr) {
      setError("Veuillez remplir les champs requis (Nom, Catégorie, Carrière).");
      setSavingMat(false);
      return;
    }

    const payload = {
      nom_mat: matForm.nom_mat.trim(),
      prix_tonne: matForm.prix_tonne ? Number(matForm.prix_tonne) : 0,
      quantite_disp: matForm.quantite_disp ? Number(matForm.quantite_disp) : 0,
      id_carr: Number(matForm.id_carr),
      id_cat: Number(matForm.id_cat),
    };

    const { error: reqError } = editingMatId
      ? await supabase.from("materiaux").update(payload).eq("id_mat", editingMatId)
      : await supabase.from("materiaux").insert(payload);

    setSavingMat(false);

    if (reqError) {
      setError(reqError.message);
      return;
    }

    setMatModalOpen(false);
    fetchData();
  }

  // ---------- Suppression ----------
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const table = deleteTarget.type === "carriere" ? "carrieres" : "materiaux";
    const idField = deleteTarget.type === "carriere" ? "id_carr" : "id_mat";

    const { error: reqError } = await supabase.from(table).delete().eq(idField, deleteTarget.id);
    if (reqError) {
      setError(reqError.message);
    } else {
      fetchData();
    }
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6 text-white font-sans">
      {/* EN-TÊTE */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-gray-100">Gestion de l'Offre & des Stocks</h1>
        <p className="text-sm text-gray-400 font-medium">Interface de contrôle des ressources et partenariats industriels.</p>
      </div>

      {error && (
        <div className="bg-red-950/40 border border-red-800 text-red-300 text-sm px-4 py-3 font-mono flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-red-300 hover:text-red-100 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ONGLETS */}
      <div className="flex items-center space-x-8 border-b border-gray-900 pb-2 text-sm font-bold font-mono tracking-wider">
        <button onClick={() => { setActiveTab(1); setSearchQuery(""); }} className={`pb-2 uppercase transition-all cursor-pointer ${activeTab === 1 ? "text-[#f27405] border-b-2 border-[#f27405]" : "text-gray-400 hover:text-gray-200"}`}>1. CARRIÈRES PARTENAIRES</button>
        <button onClick={() => { setActiveTab(2); setSearchQuery(""); }} className={`pb-2 uppercase transition-all cursor-pointer ${activeTab === 2 ? "text-[#f27405] border-b-2 border-[#f27405]" : "text-gray-400 hover:text-gray-200"}`}>2. CATALOGUE DES MATÉRIAUX</button>
      </div>

      {/* RECHERCHE ET BOUTON */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative max-w-xs w-full font-mono">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            placeholder={activeTab === 1 ? "Rechercher une carrière..." : "Rechercher un matériau..."}
            className="w-full bg-[#1b1c21]/60 border border-gray-800 pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-[#f27405] rounded-none placeholder-gray-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          onClick={activeTab === 1 ? openAddCarriere : openAddMateriau}
          className="bg-[#f27405] hover:bg-[#d66204] text-black font-extrabold text-[11px] font-mono tracking-widest px-5 py-2.5 uppercase transition-colors flex items-center justify-center gap-2 rounded-none cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[3]" /> {activeTab === 1 ? "Ajouter une carrière" : "Ajouter un matériau"}
        </button>
      </div>

      {/* CONTENU PRINCIPAL */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-500 gap-2 font-mono text-sm">
          <Loader2 className="w-4 h-4 animate-spin" />
          Chargement...
        </div>
      ) : (
        <>
          {activeTab === 1 && (
            <div className="bg-[#11141a]/90 border border-gray-900 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-gray-800 text-gray-400 font-mono text-[11px] tracking-widest uppercase bg-[#141822]/40">
                      <th className="px-6 py-4 font-bold">ID</th>
                      <th className="px-6 py-4 font-bold">Nom de la carrière</th>
                      <th className="px-6 py-4 font-bold">Adresse / Région</th>
                      <th className="px-6 py-4 font-bold">Coordonnées GPS</th>
                      <th className="px-6 py-4 font-bold">Contact</th>
                      <th className="px-6 py-4 font-bold">Statut</th>
                      <th className="px-6 py-4 font-bold text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/60 font-sans">
                    {filteredCarrieres.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-6 py-8 text-center text-gray-500 font-mono text-xs">Aucune carrière trouvée.</td>
                      </tr>
                    )}
                    {filteredCarrieres.map((carr) => (
                      <tr key={carr.id_carr} className="hover:bg-[#151a24]/50 transition-colors">
                        <td className="px-6 py-5 font-bold text-gray-500 font-mono text-xs">#CR-{String(carr.id_carr).padStart(2, "0")}</td>
                        <td className="px-6 py-5 font-bold text-gray-100 text-sm">{carr.nom_carr}</td>
                        <td className="px-6 py-5 text-gray-300 text-sm">{carr.adresse || "N/A"}</td>
                        <td className="px-6 py-5 text-gray-400 text-sm font-mono">{carr.latitude}, {carr.longitude}</td>
                        <td className="px-6 py-5 text-gray-300 text-sm font-mono">{carr.contact || "N/A"}</td>
                        <td className="px-6 py-5">
                          <span className={`px-2.5 py-1 rounded-full text-[9px] font-black tracking-wider uppercase border font-mono ${statutStyle(carr.statut)}`}>
                            {carr.statut || "N/A"}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <div className="inline-flex items-center space-x-4 text-gray-400">
                            <button onClick={() => openEditCarriere(carr)} className="hover:text-[#f27405] transition-colors cursor-pointer"><Pencil className="w-4 h-4" /></button>
                            <button onClick={() => setDeleteTarget({ type: "carriere", id: carr.id_carr, label: carr.nom_carr })} className="hover:text-red-400 transition-colors cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 2 && (
            <div className="bg-[#11141a]/90 border border-gray-900 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-gray-800 text-gray-400 font-mono text-[11px] tracking-widest uppercase bg-[#141822]/40">
                      <th className="px-6 py-4 font-bold">Matériau</th>
                      <th className="px-6 py-4 font-bold">Catégorie</th>
                      <th className="px-6 py-4 font-bold">Carrière</th>
                      <th className="px-6 py-4 font-bold">Prix</th>
                      <th className="px-6 py-4 font-bold">Stock</th>
                      <th className="px-6 py-4 font-bold text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/60 font-sans">
                    {filteredMateriaux.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-gray-500 font-mono text-xs">Aucun matériau trouvé.</td>
                      </tr>
                    )}
                    {filteredMateriaux.map((mat: any) => (
                      <tr key={mat.id_mat} className="hover:bg-[#151a24]/50 transition-colors">
                        <td className="px-6 py-5 font-bold text-gray-100 text-sm">{mat.nom_mat}</td>
                        <td className="px-6 py-5 text-gray-400 text-sm">{mat.categories?.nom_cat || "-"}</td>
                        <td className="px-6 py-5 text-gray-300 text-sm">{mat.carrieres?.nom_carr}</td>
                        <td className="px-6 py-5 text-[#f27405] font-bold font-mono text-sm">{mat.prix_tonne} DT</td>
                        <td className="px-6 py-5 text-gray-300 font-bold font-mono text-sm">{mat.quantite_disp} T</td>
                        <td className="px-6 py-5 text-center">
                          <div className="inline-flex items-center space-x-4 text-gray-400">
                            <button onClick={() => openEditMateriau(mat)} className="hover:text-[#f27405] transition-colors cursor-pointer"><Pencil className="w-4 h-4" /></button>
                            <button onClick={() => setDeleteTarget({ type: "materiau", id: mat.id_mat, label: mat.nom_mat })} className="hover:text-red-400 transition-colors cursor-pointer"><Trash2 className="w-4 h-4" /></button>
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

      {/* MODALE CARRIÈRE */}
      {carrModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#11141a] border border-gray-800 w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
              <h2 className="font-bold text-gray-100 font-mono text-sm uppercase tracking-wider">{editingCarrId ? "Modifier la carrière" : "Ajouter une carrière"}</h2>
              <button onClick={() => setCarrModalOpen(false)} className="text-gray-400 hover:text-white cursor-pointer"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={saveCarriere} className="p-6 space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase text-gray-400 mb-1">Nom de la carrière *</label>
                <input required value={carrForm.nom_carr} onChange={(e) => setCarrForm({ ...carrForm, nom_carr: e.target.value })} className="w-full bg-[#1b1c21]/60 border border-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#f27405]" />
              </div>
              <div>
                <label className="block text-[11px] font-mono uppercase text-gray-400 mb-1">Adresse</label>
                <input value={carrForm.adresse} onChange={(e) => setCarrForm({ ...carrForm, adresse: e.target.value })} className="w-full bg-[#1b1c21]/60 border border-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#f27405]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-gray-400 mb-1">Latitude</label>
                  <input type="number" step="any" value={carrForm.latitude} onChange={(e) => setCarrForm({ ...carrForm, latitude: e.target.value })} className="w-full bg-[#1b1c21]/60 border border-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#f27405]" />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-gray-400 mb-1">Longitude</label>
                  <input type="number" step="any" value={carrForm.longitude} onChange={(e) => setCarrForm({ ...carrForm, longitude: e.target.value })} className="w-full bg-[#1b1c21]/60 border border-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#f27405]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-gray-400 mb-1">Contact</label>
                  <input value={carrForm.contact} onChange={(e) => setCarrForm({ ...carrForm, contact: e.target.value })} className="w-full bg-[#1b1c21]/60 border border-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#f27405]" />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-gray-400 mb-1">Statut</label>
                  <select value={carrForm.statut} onChange={(e) => setCarrForm({ ...carrForm, statut: e.target.value })} className="w-full bg-[#1b1c21]/60 border border-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#f27405]">
                    {STATUTS.map((s) => <option key={s} value={s}>{s.toUpperCase()}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setCarrModalOpen(false)} className="px-4 py-2 text-xs font-mono uppercase text-gray-400 hover:text-white cursor-pointer">Annuler</button>
                <button type="submit" disabled={savingCarr} className="bg-[#f27405] hover:bg-[#d66204] text-black font-extrabold text-[11px] font-mono tracking-widest px-5 py-2.5 uppercase transition-colors disabled:opacity-50 cursor-pointer">
                  {savingCarr ? "Enregistrement..." : "Enregistrer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODALE MATÉRIAU */}
      {matModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#11141a] border border-gray-800 w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
              <h2 className="font-bold text-gray-100 font-mono text-sm uppercase tracking-wider">{editingMatId ? "Modifier le matériau" : "Ajouter un matériau"}</h2>
              <button onClick={() => setMatModalOpen(false)} className="text-gray-400 hover:text-white cursor-pointer"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={saveMateriau} className="p-6 space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase text-gray-400 mb-1">Nom du matériau *</label>
                <input required value={matForm.nom_mat} onChange={(e) => setMatForm({ ...matForm, nom_mat: e.target.value })} className="w-full bg-[#1b1c21]/60 border border-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#f27405]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-gray-400 mb-1">Catégorie *</label>
                  <select required value={matForm.id_cat} onChange={(e) => setMatForm({ ...matForm, id_cat: e.target.value })} className="w-full bg-[#1b1c21]/60 border border-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#f27405]">
                    <option value="">— Sélectionner —</option>
                    {categories.map((c) => <option key={c.id_cat} value={c.id_cat}>{c.nom_cat}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-gray-400 mb-1">Carrière *</label>
                  <select required value={matForm.id_carr} onChange={(e) => setMatForm({ ...matForm, id_carr: e.target.value })} className="w-full bg-[#1b1c21]/60 border border-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#f27405]">
                    <option value="">— Sélectionner —</option>
                    {carrieres.map((c) => <option key={c.id_carr} value={c.id_carr}>{c.nom_carr}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-gray-400 mb-1">Prix par Tonne (DT)</label>
                  <input type="number" step="0.01" value={matForm.prix_tonne} onChange={(e) => setMatForm({ ...matForm, prix_tonne: e.target.value })} className="w-full bg-[#1b1c21]/60 border border-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#f27405]" />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-gray-400 mb-1">Stock disponible (T)</label>
                  <input type="number" step="0.01" value={matForm.quantite_disp} onChange={(e) => setMatForm({ ...matForm, quantite_disp: e.target.value })} className="w-full bg-[#1b1c21]/60 border border-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#f27405]" />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setMatModalOpen(false)} className="px-4 py-2 text-xs font-mono uppercase text-gray-400 hover:text-white cursor-pointer">Annuler</button>
                <button type="submit" disabled={savingMat} className="bg-[#f27405] hover:bg-[#d66204] text-black font-extrabold text-[11px] font-mono tracking-widest px-5 py-2.5 uppercase transition-colors disabled:opacity-50 cursor-pointer">
                  {savingMat ? "Enregistrement..." : "Enregistrer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de confirmation de suppression */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#11141a] border border-gray-800 p-6 w-96">
            <h2 className="text-lg font-bold mb-2">Confirmer la suppression</h2>
            <p className="text-gray-400 text-sm mb-6">
              Voulez-vous vraiment supprimer <span className="text-white font-semibold">{deleteTarget.label}</span> ? Cette action est irréversible.
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteTarget(null)} className="px-4 py-2 border border-gray-700 text-gray-300 text-sm hover:bg-gray-800 transition-colors cursor-pointer">Annuler</button>
              <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white text-sm font-bold hover:bg-red-700 transition-colors cursor-pointer">Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}