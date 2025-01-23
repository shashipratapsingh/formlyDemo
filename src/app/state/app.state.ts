export interface UserState {
    name: string;
    email: string;
    phone: string;
}

export interface SessionState {
    fromSlot: string;
    tillSlot: string;
    guests: { name: string; email: string; phone: string }[];
}

export interface PaymentState {
    ccNumber: string;
    ccNumberMasked: string;
    ccExp: string;
    ccCVV: string;
    ccZipCode: string;
}

export interface AppState {
    user: UserState;
    session: SessionState;
    payment: PaymentState;
}
