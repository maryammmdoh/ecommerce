import NextAuth from "next-auth"
import { authoptions } from '@/auth';

//here we are creating a handler for nextauth using the authoptions we created in src/auth.js
//then we are exporting the handler for both GET and POST requests

const handler = NextAuth(authoptions)

export { handler as GET, handler as POST }