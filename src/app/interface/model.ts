
export interface Model<T> {
  data: T
}

export interface Data {
  patients: Patient[]
  users: User[]
  dossierMedicales: DossierMedicale[]
  medecins: User[]
  patient:Patient
  patient2?:Patient2
  nbRendezVous:number;
  message:string
}
export interface UserAuth {
  token: string
  user: User
  status: boolean
}

export interface User {
  id: number
  email: string
  password: string
  role: string
  nom: string
  prenom: string
  patient:Patient
  specialite:string
}
export interface Patient {
  patient: Patient2
  medecin: User
}

export interface Patient2 {
  id:number
  nom: string
  prenom: string
  age:number
  adresse: string
  telephone: number
  sexe: number
  dossier_medical: DossierMedicale
}
export interface DossierMedicale {
  id: number
  dateEntre: Date
  dateSortie: Date
  symptomes: string
  maladie_antecedent: string
  bilan: string
}
