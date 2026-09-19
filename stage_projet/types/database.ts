/// types/database.ts

export interface Carriere {
  id_carr: number;
  nom_carr: string;
  adresse: string;
  latitude: number;
  longitude: number;
  contact: string;
  statut: string;
  actif: boolean;
}

export interface Categorie {
  id_cat: number;
  nom_cat: string;
}

export interface Materiau {
  id_mat: number;
  nom_mat: string;
  prix_tonne: number;
  quantite_disp: number;
  id_cat: number;
  id_carr: number;
  actif: boolean;
  categories?: { nom_cat: string };
  carrieres?: { nom_carr: string };
}

export interface Transporteur {
  id_trans: number;
  nom_trans: string;
  contact: string;
  disponibilite: boolean;
}

export interface Camion {
  id_cam: number;
  type_cam: string;
  capacite: number;
  cout_km: number;
  id_trans: number;
  transporteurs?: { nom_trans: string };
}

export interface Statut {
  id_statut: number;
  libelle: string;
}

export interface Demande {
  id_dem: number;
  nom_client: string;
  telephone: string;
  adresse_livraison: string;
  region: string;
  quantite_s: number;
  id_mat: number;
  id_statut: number;
  date_creation: string;
  materiaux?: { nom_mat: string; prix_tonne: number };
  statuts?: { libelle: string };
}