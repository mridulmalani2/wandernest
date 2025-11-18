import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";

// University email domain validation regex
const UNIVERSITY_EMAIL_REGEX = /\.edu$|\.edu\.[a-z]{2}$|\.ac\.[a-z]{2}$|\.university$/;

// Valid domain endings for university emails
const VALID_DOMAINS = ['.edu', '.edu.in', '.ac.uk', '.ac.fr', '.edu.au', '.ac.nz', '.edu.sg'];

function isUniversityEmail(email: string): boolean {
  const emailDomain = email.split('@')[1];

  // Check against regex pattern
  if (UNIVERSITY_EMAIL_REGEX.test(emailDomain)) {
    return true;
  }

  // Check against specific domain list
  return VALID_DOMAINS.some(domain => emailDomain.endsWith(domain));
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) {
        return false;
      }

      // Validate university email domain
      if (!isUniversityEmail(user.email)) {
        // Redirect to manual verification form
        return `/student/manual-verification?error=invalid_domain&email=${encodeURIComponent(user.email)}`;
      }

      // Check if student already exists
      const existingStudent = await prisma.student.findUnique({
        where: { email: user.email },
      });

      // If student doesn't exist, create with PENDING_APPROVAL status
      if (!existingStudent && account) {
        await prisma.student.create({
          data: {
            email: user.email,
            name: user.name || '',
            googleId: account.providerAccountId,
            status: 'PENDING_APPROVAL',
          },
        });
      }

      return true;
    },
    async session({ session, user }) {
      if (session.user) {
        // Get student data to include in session
        const student = await prisma.student.findUnique({
          where: { email: session.user.email! },
          select: {
            id: true,
            status: true,
            name: true,
            email: true,
          },
        });

        if (student) {
          session.user.id = student.id;
          session.user.status = student.status;
        }
      }
      return session;
    },
  },
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};
