declare global {
    namespace Express {
        interface User extends Partial<IUser> {}
    }
}

export interface IUser {
    id: string;
    phoneNumber: string;
    password: string;
    firstname: string;
    lastname: string;
    avatar: string;
}