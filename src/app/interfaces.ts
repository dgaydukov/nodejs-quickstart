/**
 * Different interfaces used across the project
 */


export interface IAuth {
    userId: string;
    authToken: string;
}

export enum UserStatus {
    Registered,
    Verified,
    Inactive,
}

export interface IUser {
    email: string;
    password: string;
    password_repeat: string;
    firstname: string;
    lastname: string;
}