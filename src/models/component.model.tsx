export interface Contact {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    address: string;
    note: string;
    id: number;
}
export enum Mode {
    view='view',
    edit='edit',
    new='new'
}