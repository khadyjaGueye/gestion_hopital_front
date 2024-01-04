
export interface Model<T> {
  data: T
}

export interface Data {
  patient: Patient[]
  users: User[]
  dossierMedicales: DossierMedicale[]
  medecins: User[]
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
  id: number
  nom: string
  prenom: string
  adresse: string
  telephone: number
  age: number
  sexe: string
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
