function getEnv(name: string) {
  return String(process.env[name]);
}

const internals = {
  clientId: getEnv("CLIENT_ID"),
  redirectId: getEnv("REDIRECT_ID"),
  responseType: "token",
  scope: encodeURI("profile email"),
  authUrl: getEnv("AUTH_URL"),
};

Object.freeze(internals);

export { internals };
