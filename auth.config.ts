import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard =
        nextUrl.pathname.startsWith('/dashboard');
      const isOnNewUserPage =
        nextUrl.pathname === '/signup';
      if (isOnNewUserPage) {
        if (isLoggedIn) {
          // Redirect logged-in users attempting to access sign-up page to the dashboard
          return Response.redirect(
            new URL('/dashboard', nextUrl)
          );
        }
        // Allow not logged-in users to stay on the /sign-up page
        return true;
      }
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(
          new URL('/dashboard', nextUrl)
        );
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
