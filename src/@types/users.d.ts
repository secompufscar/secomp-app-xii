export interface User {
    id: string;
    nome: string;
    email: string;
    tipo: string;
    qrCode?: string;
    confirmed: boolean;
    points: number;
}

