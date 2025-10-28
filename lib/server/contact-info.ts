export interface ContactInfo {
    id: string;
    type: 'email' | 'phone';
    confirmedAt?: number;
    email?: string;
    phone?: string;
}
