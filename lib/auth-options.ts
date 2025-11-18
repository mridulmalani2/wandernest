import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";

// Valid student email domains
const STUDENT_EMAIL_DOMAINS = [
  '.edu',
  '.edu.in',
  '.ac.uk',
  '.edu.au',
  '.edu.sg',
  '.ac.in',
  // Add more institution-specific domains as needed
];

function isStudentEmail(email: string): boolean {
  const lowerEmail = email.toLowerCase();
  return STUDENT_EMAIL_DOMAINS.some(domain => lowerEmail.endsWith(domain));
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/student/signin",
    error: "/student/signin", // Error page
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Check if email is a valid student email
      if (user.email && !isStudentEmail(user.email)) {
        // Redirect to error page with message
        return '/student/signin?error=invalid_email';
      }
      return true;
    },
    async session({ session, user }) {
      // Add user ID to session
      if (session.user) {
        session.user.id = user.id;

        // Check if student profile exists
        const student = await prisma.student.findUnique({
          where: { email: user.email || undefined },
          select: {
            id: true,
            status: true,
            name: true,
            city: true,
          },
        });

        // Add student info to session
        session.user.studentId = student?.id;
        session.user.studentStatus = student?.status;
        session.user.hasCompletedOnboarding = !!student;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // After sign in, check if user has completed onboarding
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  session: {
    strategy: "database",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
