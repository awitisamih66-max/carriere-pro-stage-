// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Lock, Mail, Eye, EyeOff } from "lucide-react";

// export default function AdminLoginPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     // Simulation temporaire du Login (Fake Data)
//     if (email === "admin@carrierpro.com" && password === "admin123") {
//       // Si c'est bon, on redirige vers le dashboard
//       router.push("/admin/dashboard");
//     } else {
//       setError("Identifiants incorrects. (Test: admin@carrierpro.com / admin123)");
//     }
//   };

//   return (
//     <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-[#0d0f12] px-4">
//       <div className="w-full max-w-md bg-[#141414] border border-gray-800 p-8 space-y-6">
        
//         {/* En-tête du formulaire */}
//         <div className="space-y-2 text-center">
//           <h1 className="text-2xl font-black uppercase tracking-wider text-white">
//             Connexion <span className="text-[#f27405]">Admin</span>
//           </h1>
//           <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">
//             Accès réservé au personnel autorisé
//           </p>
//         </div>

//         {/* Message d'erreur */}
//         {error && (
//           <div className="bg-red-950/30 border border-red-900 text-red-400 text-xs p-3 font-medium rounded-none">
//             {error}
//           </div>
//         )}

//         {/* Formulaire */}
//         <form onSubmit={handleLogin} className="space-y-4">
          
//           {/* Champ Email */}
//           <div className="space-y-2">
//             <label className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
//               <Mail className="w-3.5 h-3.5 text-gray-500" /> Adresse Email
//             </label>
//             <input
//               type="email"
//               required
//               placeholder="admin@carrierpro.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full bg-[#0d0f12] border border-gray-700 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f27405] transition-colors rounded-none placeholder-gray-700"
//             />
//           </div>

//           {/* Champ Mot de passe */}
//           <div className="space-y-2">
//             <label className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
//               <Lock className="w-3.5 h-3.5 text-gray-500" /> Mot de passe
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 required
//                 placeholder="••••••••"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full bg-[#0d0f12] border border-gray-700 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f27405] transition-colors rounded-none placeholder-gray-700 pr-10"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
//               >
//                 {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//               </button>
//             </div>
//           </div>

//           {/* Bouton de soumission */}
//           <button
//             type="submit"
//             className="w-full bg-[#f27405] text-black font-black text-xs uppercase tracking-widest py-4 mt-2 transition-colors hover:bg-[#d66204] cursor-pointer rounded-none shadow-lg"
//           >
//             Se connecter
//           </button>
//         </form>

//       </div>
//     </div>
//   );
// }




"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase"; // Import de votre client supabase
import { Lock, Mail, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push("/admin/dashboard");
      }
    });
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Authentification réelle avec Supabase
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      // Redirection vers le dashboard après connexion réussie
      router.push("/admin/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-[#0d0f12] px-4">
      <div className="w-full max-w-md bg-[#141414] border border-gray-800 p-8 space-y-6">
        
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-black uppercase tracking-wider text-white">
            Connexion <span className="text-[#f27405]">Admin</span>
          </h1>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">
            Accès réservé au personnel autorisé
          </p>
        </div>

        {error && (
          <div className="bg-red-950/30 border border-red-900 text-red-400 text-xs p-3 font-medium rounded-none">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-gray-500" /> Adresse Email
            </label>
            <input
              type="email"
              required
              placeholder="admin@carrierpro.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0d0f12] border border-gray-700 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f27405] transition-colors rounded-none placeholder-gray-700"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-gray-500" /> Mot de passe
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0d0f12] border border-gray-700 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f27405] transition-colors rounded-none placeholder-gray-700 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#f27405] text-black font-black text-xs uppercase tracking-widest py-4 mt-2 transition-colors hover:bg-[#d66204] cursor-pointer rounded-none shadow-lg disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}