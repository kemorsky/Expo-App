let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
  console.log("Access token set:", accessToken);
}

export function getAccessToken() {
  return accessToken;
}
