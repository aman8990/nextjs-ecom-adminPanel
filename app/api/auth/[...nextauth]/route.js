import crypto from 'crypto';
import credentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/app/_libs/prismadb';
import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    credentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
        password: { label: 'otp', type: 'text' },
      },

      async authorize(credentials) {
        if (
          !credentials?.email ||
          !credentials?.password ||
          !credentials?.otp
        ) {
          throw new Error('Invalid Credentials');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.hashedPassword) {
          throw new Error('Please verify email through signup again');
        }

        if (user.role !== 'admin') {
          throw new Error('You are not admin');
        }

        if (user.active === false) {
          throw new Error('Please verify email through signup again');
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error('Invalid Credentials');
        }

        const otpExpires = new Date(user.otpExpires);
        const currentTime = new Date();

        if (currentTime > otpExpires) {
          throw new Error('OTP has expired');
        }

        const hashedOtp = user.otp;
        const hashedOtpProvided = crypto
          .createHash('sha256')
          .update(credentials.otp)
          .digest('hex');

        if (hashedOtp !== hashedOtpProvided) {
          throw new Error('Invalid Credentials');
        }

        return user;
      },
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
  events: {
    errors: (message) => {
      console.error('NextAuth Error', message);
    },
  },
  pages: {
    error: '/auth/error',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
