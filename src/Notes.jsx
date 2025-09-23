//diffrence between image of next and normal image

// next image is a component provided by Next.js for optimized image handling
// next image is optimized and lazy loaded by default
// next image requires width and height to be specified or layout to be defined
// next image supports more features like placeholder, blur, etc.
// next image is imported from 'next/image' instead of 'react'
// next image is used for better performance and SEO in Next.js applications
// next image is preferred for production applications in Next.js for better performance
// static image components in next.js put width and height in the image tag automatically
// server image components in next.js do not put width and height in the image tag automatically you have to specify them manually 
    //also you should put src and alt 

// normal image is just a standard HTML img tag or imported from 'react'
// normal image does not have built-in optimizations or lazy loading
// normal image can be used without specifying width and height
// normal image is more flexible for quick prototyping or simple use cases
// normal image is used in regular React applications or when Next.js optimizations are not needed

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//Nextauth 
//nextauth is an authentication library for Next.js applications
//nextauth provides built-in support for various authentication providers like Google, Facebook, GitHub, etc.
//nextauth handles session management and token storage automatically
//nextauth is configured using a single file (e.g., [...nextauth].js) in the API routes
//nextauth provides hooks and components for easy integration with Next.js pages and API routes
//nextauth supports both OAuth and email/password authentication methods
//nextauth is designed specifically for Next.js applications and leverages its features
// nextauth is preferred for Next.js applications for seamless integration and ease of use
//nextauth has providers which are the way of credentialing users which the normal way to make login system
//oauth is a protocol for authorization and authentication
//oauth is a way to login using third party services like google, facebook, github, etc.
//oauth is more secure and convenient for users as they do not have to create new credentials
//oauth requires setting up an application on the third party service and obtaining client id and secret
//oauth can be implemented using libraries like nextauth, passport, etc.
//oauth is widely used in modern web applications for social login and single sign-on (SSO)
//oauth the backend devolpers have to register their application with the oauth provider to get client id and secret and must handle it
//cradentials provider is a way to login using username and password
