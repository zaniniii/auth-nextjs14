import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials"

const nextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        CredentialsProvider({
            id: 'auth-tidi',
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Digite o seu e-mail" },
                password: { label: "Password", type: "password", placeholder: "Digite a sua senha" }
            },
            async authorize(credentials, req) {
                const res = await fetch("http://localhost:3001/pt/auth", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                const result = await res.json()

                if (res.ok) {
                    return result.data
                }

                return null
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            user && (token.user = user)
            return token
        },
        async session({ session, token }) {
            session = token.user as any
            return session
        }
    }

}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }