
import { createClient } from "@/lib/supabaseServer";
import MateriauxClient from "@/components/MateriauxClient";

export default async function MateriauxPage() {
  const supabase = await createClient();
  // On récupère les matériaux avec une jointure vers la table categories
  const { data: materiaux, error } = await supabase
    .from("materiaux")
    .select(`
      id_mat,
      nom_mat,
      prix_tonne,
      quantite_disp,
      categories (nom_cat)
    `);

  if (error) {
    console.error("Erreur Supabase:", error);
    return <div className="p-12 text-white">Erreur : {error.message}</div>;
  }

  return <MateriauxClient initialMateriaux={materiaux || []} />;
}