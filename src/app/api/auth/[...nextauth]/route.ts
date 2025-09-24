import NextAuth from "next-auth"
import { authOptions } from '@/auth';

//here we are creating a handler for nextauth using the authoptions we created in src/auth.js
//then we are exporting the handler for both GET and POST requests

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }