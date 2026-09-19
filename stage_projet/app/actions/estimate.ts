"use server";

import { createClient } from "@/lib/supabaseServer";

export async function calculateEstimate(id_mat: number, quantite: number, region: string) {
  try {
    const supabase = await createClient();
    // 1. Récupérer le matériau et la carrière associée
    const { data: materiau, error: matError } = await supabase
      .from("materiaux")
      .select(`
        prix_tonne,
        id_carr,
        carrieres ( latitude, longitude )
      `)
      .eq("id_mat", id_mat)
      .single();

    if (matError || !materiau) {
      throw new Error("Matériau introuvable");
    }

    // 2. Récupérer un camion standard (ex: le premier disponible, ou avec la plus grande capacité)
    // Pour simplifier, on prend le premier camion avec sa capacité et son coût au km
    const { data: camions, error: camError } = await supabase
      .from("camions")
      .select("capacite, cout_km")
      .order("capacite", { ascending: false })
      .limit(1);

    if (camError || !camions || camions.length === 0) {
      throw new Error("Aucun camion disponible");
    }

    const camion = camions[0];

    // 3. Calcul de la distance via table statique par région (Remplace Google Maps)
    const DISTANCES_PAR_REGION: Record<string, number> = {
      "Tunis": 25,
      "Ariana": 30,
      "Ben Arous": 15,
      "Manouba": 20,
      "Nabeul": 65,
      "Zaghouan": 60,
      "Bizerte": 70,
      "Béja": 105,
      "Jendouba": 150,
      "Le Kef": 175,
      "Siliana": 130,
      "Sousse": 140,
      "Monastir": 165,
      "Mahdia": 205,
      "Kairouan": 160,
      "Kasserine": 290,
      "Sidi Bouzid": 265,
      "Sfax": 270,
      "Gabès": 405,
      "Medenine": 480,
      "Tataouine": 530,
      "Gafsa": 350,
      "Tozeur": 430,
      "Kébili": 500
    };

    // Par défaut 30km si la région n'est pas dans la liste
    const distanceKm = DISTANCES_PAR_REGION[region] || 30;

    // 4. Appliquer les formules
    const prix_materiaux = quantite * materiau.prix_tonne;
    const nb_camions = Math.ceil(quantite / camion.capacite);
    // On multiplie par 2 si le camion doit faire l'aller-retour pour le coût ? Le cahier des charges dit :
    // Coût transport = Distance × Coût/km × Nombre de camions
    const prix_transport = distanceKm * camion.cout_km * nb_camions;
    const total = prix_materiaux + prix_transport;

    return {
      success: true,
      distanceKm,
      nb_camions,
      prix_materiaux,
      prix_transport,
      total
    };

  } catch (error: any) {
    return {
      success: false,
      error: error.message
    };
  }
}
