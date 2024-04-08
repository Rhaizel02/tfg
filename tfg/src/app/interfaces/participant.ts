export interface Participant {
    id: number;
    name: string;
    isEnemy: boolean; // Diferencia entre jugador y enemigo
    initiative: number; // Orden de acción basado en la tirada de iniciativa
    initiative_bonus: number; // Modificador de iniciativa
    ac: number; // Clase de armadura
    hp: number; // Puntos de vida
    statuses: string[]; // Estados
};

