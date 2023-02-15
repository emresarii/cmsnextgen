export const cookieExtractor = (req: { cookies: { [x: string]: any } }) => {
  let jwt = null;

  if (req && req.cookies) {
    jwt = req.cookies["jwt"];
  }

  return jwt;
};
