import { NuxtAuthHandler } from '#auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import DiscordProvider from 'next-auth/providers/discord';

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,
  providers: [
    // @ts-expect-error
    GithubProvider.default({
      clientId: process.env.GITHUB_PROVIDER_CLIENT_ID,
      clientSecret: process.env.GITHUB_PROVIDER_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'read:user user:email'
        }
      }
    }),
    // @ts-expect-error
    GoogleProvider.default({
      clientId: process.env.GOOGLE_PROVIDER_CLIENT_ID,
      clientSecret: process.env.GOOGLE_PROVIDER_CLIENT_SECRET
    }),
    // @ts-expect-error
    DiscordProvider.default({
      clientId: process.env.DISCORD_PROVIDER_CLIENT_ID,
      clientSecret: process.env.DISCORD_PROVIDER_CLIENT_SECRET
    }),
  ],
  pages: {
    signIn: '/auth',
    signOut: '/'
  },
});