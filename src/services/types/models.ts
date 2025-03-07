import NewAcarreo from "../../components/Acarreo/NewAcarreo";

// src/services/types/models.ts
export interface User {
  _id: string;
  nombre: string;
  telefono: string;
  correo: string;
  rol: "cliente" | "cuidador" | "admin" | string;
}

export interface Cliente extends User {
  direccion: string;
}

export interface Cuidador extends User {
  bisonte?: string;
}

export interface Admin extends User {
}

export interface Bisonte {
  _id: string;
  nombre: string;
  peso: number;
  estado: string;
  cuidador?: string;
}

export interface LoginData {
  correo: string;
  contrasena: string;
}

export interface ErrorLogin {
  message: string;
}

export interface RegisterData extends LoginData {
  nombre: string;
  telefono: string;
  rol: "cliente" | "cuidador" | "admin";
  bisonte?: string;
  direccion?: string;
}

export interface NewAcarreo {
  numAcarreo?: number;
  clienteld: string;
  cuidadorld?: string;
  fechaInicio: Date;
  fechaEntrega: Date;
  direccionOrigen: string;
  direccionFinal: string;
  peso: number;
  costoTotal: number;
  estado: string;
}
export interface Acarreo extends NewAcarreo {
  _id: string;
}
