export interface RegisterDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirm: string;
    role?: 'ADMIN' | 'CREATOR';
}