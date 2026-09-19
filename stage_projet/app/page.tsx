"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col bg-[#0d0f12]">
      
      {/* 1. HERO SECTION AVEC BACKGROUND CHANTIER */}
      <section 
        className="relative flex-1 min-h-[calc(100vh-5rem)] flex items-center px-12 bg-cover bg-center bg-no-repeat"
        style={{ 
          // Utilisation d'une image de chantier sombre libre de droits par défaut.
          // Tu pourras remplacer l'URL par ton image locale dans /public si besoin.
          backgroundImage: `linear-gradient(to right, rgba(13, 15, 18, 0.85) 40%, rgba(13, 15, 18, 0.4)), url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070')` 
        }}
      >
        <div className="max-w-3xl space-y-6 z-10">
          
          {/* Petit bandeau avec la barre verticale orange à gauche */}
          <div className="border-l-4 border-[#f27405] pl-4 bg-black/40 py-2 pr-6 max-w-max">
            <p className="text-xs font-bold tracking-widest text-[#f27405] uppercase">
              Vos matériaux de construction livrés
              <br />
              directement de la carrière à votre chantier
            </p>
          </div>

          {/* Titre Principal */}
          <h1 className="text-6xl font-extrabold tracking-tight text-white leading-tight">
            La Logistique <br />
            Chantier <br />
            <span className="text-[#f27405]">Simplifiée</span>
          </h1>

          {/* Description sous le titre */}
          <p className="text-gray-300 text-base max-w-lg font-medium leading-relaxed">
            Estimez instantanément le coût de vos matériaux et du transport, 
            envoyez votre demande en un clic sans inscription.
          </p>

          {/* Les 2 Boutons côte à côte */}
          <div className="flex items-center space-x-4 pt-4">
            <Link href="/estimation">
              <button className="bg-[#f27405] text-black font-extrabold text-xs px-8 py-4 uppercase tracking-widest hover:bg-[#d66204] transition-colors cursor-pointer">
                Commander Maintenant
              </button>
            </Link>
            
            <Link href="/materiaux">
              <button className="border border-gray-600 bg-transparent text-white font-extrabold text-xs px-8 py-4 uppercase tracking-widest hover:bg-white/5 transition-colors cursor-pointer">
                Prix par Tonne
              </button>
            </Link>
          </div>

        </div>
      </section>

      {/* 2. FOOTER QUATRE COLONNES */}
      <footer className="bg-[#0f1115] border-t border-gray-950 pt-16 pb-8 px-12 text-sm text-gray-400">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Colonne 1 : Description de la marque */}
          <div className="space-y-4">
            <div className="text-lg font-bold tracking-wider text-white">
              CARRIER<span className="text-[#f27405]">PRO</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-xs">
              Spécialiste de la logistique de matériaux de construction. Nous simplifions l'approvisionnement de vos chantiers directement depuis les carrières.
            </p>
          </div>

          {/* Colonne 2 : Informations légales */}
          <div className="space-y-4">
            <h4 className="text-white font-bold uppercase text-xs tracking-wider">Informations</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions Légales</Link></li>
              <li><Link href="/confidentialite" className="hover:text-white transition-colors">Politique de Confidentialité</Link></li>
              <li><Link href="/cgu" className="hover:text-white transition-colors">CGU</Link></li>
            </ul>
          </div>

          {/* Colonne 3 : Contact */}
          <div className="space-y-4">
            <h4 className="text-white font-bold uppercase text-xs tracking-wider">Contact</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#f27405]" />
                <span>+216 71 000 000</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#f27405]" />
                <span>contact@carrierpro.com</span>
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Réseaux Sociaux / Suivez-nous */}
          <div className="space-y-4">
            <h4 className="text-white font-bold uppercase text-xs tracking-wider">Suivez-nous</h4>
            <div className="flex space-x-3">
              {/* Carré de réseau social gris de la maquette */}
              <div className="w-10 h-10 bg-[#242930] rounded-none hover:bg-gray-700 transition-colors cursor-pointer"></div>
            </div>
          </div>

        </div>

        {/* Ligne inférieure de Copyright */}
        <div className="border-t border-gray-900 pt-6 text-center text-[11px] text-gray-500 space-y-1">
          <p>© 2026 Carrier Pro. Tous droits réservés.</p>
          <p className="text-gray-600">Solution Industrielle Haute Performance</p>
        </div>
      </footer>

    </div>
  );
}




