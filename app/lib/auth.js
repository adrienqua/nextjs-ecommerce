import GoogleProvider from "next-auth/providers/google"
import { PrismaClient } from "@prisma/client"
import { PrismaAdapter } from "@auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcrypt"

const prisma = new PrismaClient()

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    theme: {
        colorScheme: "light",
    },
    session: {
        strategy: "jwt",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "email@gmail.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                if (!credentials?.email || !credentials.password) {
                    throw new Error(
                        JSON.stringify({
                            email: "Veuillez renseigner une adresse email et un mot de passe.",
                        })
                    )
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                })

                if (!user) {
                    throw new Error(
                        JSON.stringify({
                            email: "Cette adresse email n'est pas enregistrée.",
                        })
                    )
                }

                const isPasswordValid = await compare(credentials.password, user.password)

                if (!isPasswordValid) {
                    throw new Error(
                        JSON.stringify({
                            password: "Mot de passe incorrect.",
                        })
                    )
                }

                return {
                    id: user.id + "",
                    email: user.email,
                    name: user.name,
                    role: user.role,
                }
            },
        }),
    ],

    callbacks: {
        session: ({ session, token }) => {
            //console.log("Session Callback", { session, token })
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    role: token.role,
                },
            }
        },
        jwt: ({ token, user }) => {
            //console.log("JWT Callback", { token, user })
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    role: user.role,
                }
            }
            return token
        },
    },
}
