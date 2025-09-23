import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { jwtDecode } from "jwt-decode"; // to decode jwt token to get user id

//in this file we will create the authoptions object that will be used in the [...nextauth]/route.js file
//this object will contain the configuration for nextauth

//step1 --> create variable
export const authoptions: NextAuthOptions = {
  // we put pages object to customize the built-in pages of nextauth
  // here we are customizing the sign in page to be our custom login page
  // so when the user tries to access a protected route he will be redirected to our custom login page instead of the default nextauth login page
  pages: {
    signIn: "/login", // custom login page route
  },

  //step2 --> add providers array
  providers: [
    // use credentials provider for email and password login
    // it carry name , credentials and authorize function
    // name of the provider to be displayed on the sign-in page
    // credentials is an object that defines the fields for the sign-in form
    // authorize function is called when user submits the sign-in form
    // it receives the credentials entered by the user and should return a user object if authentication is successful or null if it fails
    //inslide authorize function we will make a fetch request to our backend api to verify the user credentials
    // if the response is successful we will return the user object otherwise we will return null
    // the user object can contain any information you want to store in the session
    // in this example we will just return the email and name of the user
    // also contain body which is the request payload and headers to specify the content type
    //and headers to specify the content type
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },

      authorize: async (credentials) => {
        const res = await fetch(`${process.env.API}/auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        // here we will parse the json response to get the user data and token
        const payload = await res.json();
        // console.log(payload);
        // if the response is successful we will return the user object otherwise we will throw an error
        if (payload.message === "success") {
          // decode the token to get the user id as the auth api does not return the user id but the token when decoded contains the user id
          // and the athorize function should return the user object containing the id , user info and token to be stored in the session
          const decodedtoken: { id: string } = jwtDecode(payload.token);

          return {
            id: decodedtoken.id,
            user: payload.user,
            token: payload.token,
          };
        } else {
          throw new Error(payload.message || "Invalid credentials");
        }
      },
    }),
  ],

  //step3 --> add callbacks object
  callbacks: {
    // we will use the jwt callback to store the token and user info in the token object
    // this callback is called when the user signs in and whenever a session is checked
    //jwt callback is called when the user signs in and whenever a session is checked
    async jwt({ token, user }) {
      // if user object is available it means the user just signed in
      //token object contain the default token fields like name , email , picture and sub which is encrypted
      //user object contain the user info returned from the authorize function
      // any thing put inside the token object will be available in the session object from the server only
      if (user) {
        //encrypted data
        token.user = user?.user;
        token.token = user?.token;
      }

      return token; // return the token object to be stored in the session it will take the info from the user object and add it to the token object encrypted
    },

    // here we put the data that i want to access from the client
    // token object is available from the server only but session object is available from both server and client
    // token here contain the data returned from the jwt callback
    async session({ session, token }) {
        session.user = token.user;
        
      return session;
    },
  },
};

//then in the [...nextauth]/route.js file we will import this variable and pass it to the NextAuth function
// finally we will create a route handler for both GET and POST requests and export it
