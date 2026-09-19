"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  LayoutGrid, 
  ClipboardList, 
  Pickaxe, 
  Truck 
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Liste des onglets de navigation de la Sidebar
  const menuItems = [
    { name: "Tableau de Bord", path: "/admin/dashboard", icon: LayoutGrid },
    { name: "Gestion des Demandes", path: "/admin/demandes", icon: ClipboardList },
    { name: "Carrières & Matériaux", path: "/admin/ressources", icon: Pickaxe },
    { name: "Flotte Logistique", path: "/admin/logistique", icon: Truck },
  ];

  const isLoginPage = pathname === "/admin/login";

  React.useEffect(() => {
    if (!isLoginPage) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (!session) {
          router.push("/admin/login");
        }
      });
      
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (!session) {
          router.push("/admin/login");
        }
      });
      
      return () => subscription.unsubscribe();
    }
  }, [isLoginPage, router]);

  if (isLoginPage) {
    return (
      <div className="flex flex-1 min-h-[calc(100vh-5rem)] bg-[#0d0f12]">
        <main className="flex-1 bg-[#0d0f12]">
          {children}
        </main>
      </div>
    );
  }

  // Layout normal avec Sidebar pour le reste de l'espace admin
  return (
    <div className="flex flex-1 min-h-[calc(100vh-5rem)] bg-[#0d0f12]">
      
      {/* SIDEBAR ADMIN */}
      <aside className="w-72 bg-[#141210] border-r border-gray-950 flex flex-col justify-between pt-10 pb-6 sticky top-20 h-[calc(100vh-5rem)] select-none shrink-0 font-mono">
        <div>
          <div className="text-[11px] font-bold text-gray-500 uppercase tracking-widest px-8 mb-8">
            Navigation Admin
          </div>
          
          <nav className="space-y-0.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              // Le pathname.startsWith permet de garder l'onglet actif même sur les sous-pages
              const isActive = pathname === item.path || pathname.startsWith(item.path + "/");

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center space-x-4 px-8 py-4 text-[14px] font-medium tracking-wide transition-all border-l-4 ${
                    isActive
                      ? "bg-[#1c1612] text-white border-[#f27405]"
                      : "text-gray-300 border-transparent hover:bg-[#181512] hover:text-white"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-[#f27405]" : "text-gray-300"}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* ZONE DE CONTENU PRINCIPALE */}
      <main className="flex-1 p-10 bg-[#0d0f12] overflow-y-auto">
        {children}
      </main>

    </div>
  );
}