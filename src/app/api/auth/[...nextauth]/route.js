import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    async session({ session }) {
        const ssessionUser = await User.findOne({
            email: session.user.email
        })
        session.user.id = sessionUser._id.toString();

        return session;
    },
    async signIn({ profile }) {
        try {
            // serverless -> lambda 
            await connectToDB();
            // check if user already exist
            const userExists = await User.findOne({
                email: profile.email
            })
            // if not, create a new user and save it to the database
            if (!userExists) {
                await User.create({
                    email: profile.email,
                    username: profile.name.replace(" ", "").toLowerCase(),
                    image: profile.picture
                })
            }
            return true;
        } catch (error) {
            console.log(error);
        }
    }
})

export { handler as GET, handler as POST };