import NextAuth from "next-auth";

import { User } from "@/db/db";

import Google from "next-auth/providers/google";
const handler = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      console.log(user);

      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        await User.create({
          email: user.email,
          name: user.name,
          image: user.image,
          totalLoginTime: 0,
          lastLogin: new Date(),
        });
      } else {
        existingUser.lastLogin = new Date();
        await existingUser.save();
      }
      return true;
    },
    async session({ session }) {
      if (session.user) {
        const user = await User.findOne({ email: session.user.email });
        //@ts-expect-error seassion data error
        session.user.totalLoginTime = user?.totalLoginTime || 0;
      }
      return session;
    },
  },
  events: {
    async signOut({ token }) {
      const user = await User.findOne({ email: token.email });
      if (user && user.lastLogin) {
        const logoutTime = new Date();
        const sessionTime =
          (logoutTime.getTime() - user.lastLogin.getTime()) / 1000; // Convert to seconds
        user.totalLoginTime += sessionTime;
        user.lastLogin = null;
        await user.save();
      }
    },
  },
});

export { handler as GET, handler as POST };
