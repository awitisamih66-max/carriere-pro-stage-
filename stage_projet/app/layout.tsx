"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { User, LogOut, KeyRound, LayoutDashboard, X } from "lucide-react";
import { Toaster, toast } from "sonner";
import { EstimationProvider } from "@/context/EstimationContext";
import "./globals.css";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Modal changement de mot de passe
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [pwdForm, setPwdForm] = useState({ current: "", new: "", confirm: "" });
  const [pwdError, setPwdError] = useState("");
  const [pwdLoading, setPwdLoading] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Détection stricte de la page active pour le soulignement orange
  const isActive = (path: string): boolean => pathname === path;

  const handleLogout = async () => {
    setDropdownOpen(false);
    await supabase.auth.signOut();
    router.push("/");
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdError("");
    
    if (pwdForm.new !== pwdForm.confirm) {
      setPwdError("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }
    if (pwdForm.new.length < 6) {
      setPwdError("Le nouveau mot de passe doit faire au moins 6 caractères.");
      return;
    }
    
    setPwdLoading(true);

    // 1. Verify current password
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: session.user.email,
      password: pwdForm.current,
    });

    if (signInError) {
      setPwdError("L'ancien mot de passe est incorrect.");
      setPwdLoading(false);
      return;
    }

    // 2. Update to new password
    const { error: updateError } = await supabase.auth.updateUser({
      password: pwdForm.new
    });

    setPwdLoading(false);

    if (updateError) {
      setPwdError(updateError.message);
    } else {
      setPasswordModalOpen(false);
      setPwdForm({ current: "", new: "", confirm: "" });
      toast.success("Mot de passe mis à jour avec succès !");
    }
  };

  return (
    <html lang="fr">
      <body className="bg-[#0d0f12] text-white min-h-screen flex flex-col font-sans antialiased">
        <Toaster theme="dark" position="top-right" />
        
        {/* TOPBAR GÉNÉRALE DE LA PLATFORME */}
        <header className="h-20 w-full bg-[#141414] border-b border-gray-800 flex items-center justify-between px-12 sticky top-0 z-50 select-none">
          
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-wider font-mono hover:opacity-80 transition-opacity">
            CARRIER<span className="text-[#f27405]">PRO</span>
          </Link>
          
          {/* Menu de navigation central - Nettoyé et Dynamique */}
          <nav className="flex items-center space-x-12 text-sm font-semibold tracking-wide text-gray-300">
            <Link 
              href="/" 
              className={`hover:text-white transition-colors pb-2 ${
                isActive("/") ? "text-white border-b-2 border-[#f27405]" : "border-b-2 border-transparent"
              }`}
            >
              Accueil
            </Link>
            <Link 
              href="/materiaux" 
              className={`hover:text-white transition-colors pb-2 ${
                isActive("/materiaux") ? "text-white border-b-2 border-[#f27405]" : "border-b-2 border-transparent"
              }`}
            >
              Matériaux
            </Link>
            <Link 
              href="/estimation" 
              className={`hover:text-white transition-colors pb-2 ${
                isActive("/estimation") ? "text-white border-b-2 border-[#f27405]" : "border-b-2 border-transparent"
              }`}
            >
              Simuler une Estimation
            </Link>
          </nav>
          
          {/* Bouton Espace Admin ou Profil Utilisateur Dynamique */}
          <div className="relative">
            {session ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="bg-[#1c1f26] border border-gray-700 p-2.5 rounded-full hover:bg-gray-800 transition-colors cursor-pointer flex items-center justify-center"
                >
                  <User className="w-5 h-5 text-gray-300" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-[#141414] border border-gray-800 shadow-2xl z-50 flex flex-col">
                    <div className="px-4 py-3 border-b border-gray-800">
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Connecté en tant que</p>
                      <p className="text-sm font-medium text-white truncate">{session.user.email}</p>
                    </div>
                    
                    <button 
                      onClick={() => { setDropdownOpen(false); router.push("/admin/dashboard"); }}
                      className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-[#1c1f26] hover:text-white transition-colors flex items-center gap-3 border-b border-gray-800"
                    >
                      <LayoutDashboard className="w-4 h-4 text-gray-400" /> Dashboard Admin
                    </button>
                    
                    <button 
                      onClick={() => { setDropdownOpen(false); setPasswordModalOpen(true); }}
                      className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-[#1c1f26] hover:text-white transition-colors flex items-center gap-3 border-b border-gray-800"
                    >
                      <KeyRound className="w-4 h-4 text-gray-400" /> Changer de mot de passe
                    </button>
                    
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-[#1c1f26] hover:text-red-300 transition-colors flex items-center gap-3"
                    >
                      <LogOut className="w-4 h-4" /> Se déconnecter
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/admin/login">
                <button className="bg-[#f27405] text-black font-extrabold text-xs px-6 py-3 rounded-none uppercase tracking-widest hover:bg-[#d66204] transition-colors shadow-md cursor-pointer">
                  Espace Admin
                </button>
              </Link>
            )}
          </div>
          
        </header>

        {/* CONTENU DYNAMIQUE DE LA PAGE */}
        <EstimationProvider>
          <div className="flex-1 flex flex-col relative z-0">
            {children}
          </div>
        </EstimationProvider>

        {/* MODALE CHANGEMENT MOT DE PASSE */}
        {passwordModalOpen && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] p-4">
            <div className="bg-[#11141a] border border-gray-800 w-full max-w-md">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
                <h2 className="font-bold text-gray-100 font-mono text-sm uppercase tracking-wider">
                  Changer de mot de passe
                </h2>
                <button onClick={() => setPasswordModalOpen(false)} className="text-gray-400 hover:text-white cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <form onSubmit={handleChangePassword} className="p-6 space-y-4">
                {pwdError && (
                  <div className="bg-red-950/40 border border-red-800 text-red-300 text-sm px-4 py-2 font-mono">
                    {pwdError}
                  </div>
                )}
                <div>
                  <label className="block text-[11px] font-mono uppercase text-gray-400 mb-1">Mot de passe actuel</label>
                  <input
                    type="password"
                    required
                    value={pwdForm.current}
                    onChange={(e) => setPwdForm({ ...pwdForm, current: e.target.value })}
                    className="w-full bg-[#1b1c21]/60 border border-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#f27405]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-gray-400 mb-1">Nouveau mot de passe</label>
                  <input
                    type="password"
                    required
                    value={pwdForm.new}
                    onChange={(e) => setPwdForm({ ...pwdForm, new: e.target.value })}
                    className="w-full bg-[#1b1c21]/60 border border-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#f27405]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-gray-400 mb-1">Confirmer le nouveau mot de passe</label>
                  <input
                    type="password"
                    required
                    value={pwdForm.confirm}
                    onChange={(e) => setPwdForm({ ...pwdForm, confirm: e.target.value })}
                    className="w-full bg-[#1b1c21]/60 border border-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#f27405]"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setPasswordModalOpen(false)}
                    className="px-4 py-2 text-xs font-mono uppercase text-gray-400 hover:text-white cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={pwdLoading}
                    className="bg-[#f27405] hover:bg-[#d66204] text-black font-extrabold text-[11px] font-mono tracking-widest px-5 py-2.5 uppercase transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {pwdLoading ? "En cours..." : "Valider"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </body>
    </html>
  );
}

















// 'use client';

// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const router = useRouter();
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleSearchSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (searchTerm.trim()) {
//       // Redirige vers la page recherche en passant le mot-clé dans l'URL
//       router.push(`/recherche?q=${encodeURIComponent(searchTerm)}`);
//     } else {
//       router.push('/recherche');
//     }
//   };

//   return (
//     <html
//       lang="fr"
//       className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
//     >
//       <body className="min-h-full flex flex-col bg-black text-white">
        
//         {/* --- BARRE DE NAVIGATION GLOBALE --- */}
//         <nav className="border-b border-[#27272a] bg-[#121214] px-6 py-4">
//           <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            
//             {/* Logo / Titre */}
//             <Link href="/" className="text-xl font-bold tracking-wider text-amber-500 hover:text-amber-400 transition-colors flex-shrink-0">
//               🏗️ CarrièrePro
//             </Link>

//             {/* --- VRAIE BARRE DE RECHERCHE --- */}
//             <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md relative mx-4">
//               <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
//                 🔍
//               </span>
//               <input
//                 type="text"
//                 placeholder="Rechercher un matériau (Sable, Gravier...)"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full bg-[#1c1c1f] border border-[#27272a] rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
//               />
//             </form>

//             {/* Liens de navigation */}
//             <div className="flex items-center space-x-4 flex-shrink-0">
//               <Link 
//                 href="/demande" 
//                 className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
//               >
//                 🛒 Simuler & Commander
//               </Link>
//             </div>

//           </div>
//         </nav>

//         {/* Le contenu des pages s'affiche ici */}
//         <main className="flex-1">
//           {children}
//         </main>

//       </body>
//     </html>
//   );
// }