import {User} from "next-auth"
// import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    // we will extend the default user object to include the token and user info returned from the authorize function
    interface User {
        user: {
            name: string;
            email: string;
            role: string;
        }
        token: string;
    }
    // we will extend the session object to include the user info and token from the user object
    interface Session {
        user: User['user'];
    }
}

declare module "next-auth/jwt" {
    interface JWT extends User {
        idToken?: string
    }
}