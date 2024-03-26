import { NextAuthOptions } from 'next-auth'
import { UpstashRedisAdapter } from '@next-auth/upstash-redis-adapter'
import { db } from './db'
import GoogleProvider from 'next-auth/providers/google'



function getGoogleCredentials() {
    const clientId = '614422335126-g412205iliftmqrio6k8l6rjgknv9g8i.apps.googleusercontent.com'
    const clientSecret = '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'
    // console.log(process.env.GOOGLE_CLIENT_ID);
    // console.log("614422335126")
    // const clientId = process.env.GOOGLE_CLIENT_ID;
    // const clientSecret = process.env.GOOGLE_CLIENT_SECRET
    // console.log("GOOGLE CLIENT ID")
    // console.log(process.env.GOOGLE_CLIENT_ID);
    if (!clientId || clientId.length === 0) {
        throw new Error('Missing GOOGLE_CLIENT_ID')
    }

    if (!clientSecret || clientSecret.length === 0) {
        throw new Error('Missing GOOGLE_CLIENT_SECRET')
    }

    return { clientId, clientSecret }
}

export const authOptions: NextAuthOptions = {
    adapter: UpstashRedisAdapter(db),
    session: {
        strategy: 'jwt',
    },

    pages: {
        signIn: '/login',
    },
    providers: [
        GoogleProvider({
            clientId: getGoogleCredentials().clientId,
            clientSecret: getGoogleCredentials().clientSecret,
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            const dbUser = (await db.get(`user : ${token.id}`)) as User | null


            if (!dbUser) {
                if (user) {
                    token.id = user!.id
                }

                return token
            }

            // const dbUser = JSON.parse(dbUserResult) as User

            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                picture: dbUser.image,
            }
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id
                session.user.name = token.name
                session.user.email = token.email
                session.user.image = token.picture
            }

            return session
        },
        redirect() {
            return '/dashboard'
        },
    },
}
