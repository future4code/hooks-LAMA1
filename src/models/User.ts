export type user = {
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
}

export interface UserInputDTO{
    name: string;
    email: string;
    password: string;
    role: UserRole;
}

export enum UserRole {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN",
}

export interface LoginInputDTO{
    email: string;
    password: string;
}

export type AuthenticationData = {
    id: string;
}