import { Session } from "next-auth";

type ReturnType = {
  type: string,
  identifier: string | undefined
}

function getGithubAccountId(avatarUrl: string) {
  const unparsedId = avatarUrl.split('/').pop();
  const id = unparsedId?.slice(0, unparsedId.indexOf('?'));
  return id;
}

function getDiscordAccountId(avatarUrl: string) {
  const unparsedId = avatarUrl.split('/');
  const id = unparsedId[unparsedId.length - 2];
  return id;
}

export function getAuthIdentifier(session: Session): ReturnType {
  const avatarUrl = session.user?.image;

  if(avatarUrl?.startsWith('https://avatars.githubusercontent.com/')) {
    return {
      type: 'github',
      identifier: getGithubAccountId(session.user?.image!)
    }
  } else if(avatarUrl?.startsWith('https://lh3.googleusercontent.com')) {
    return {
      type: 'google',
      identifier: session.user?.email!
    }
  } else if(avatarUrl?.startsWith('https://cdn.discordapp.com/avatars')) {
    return {
      type: 'discord',
      identifier: getDiscordAccountId(session.user?.image!)
    }
  } else {
    return {
      type: 'unknown',
      identifier: undefined
    }
  }
}