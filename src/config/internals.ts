const internals = {
  clientId: String(process.env.CLIENT_ID),
  redirectId: String(process.env.REDIRECT_ID),
  responseType: "token",
  scope: encodeURI("profile email"),
  authUrl: String(process.env.AUTH_URL),
};

Object.freeze(internals);

export { internals };
