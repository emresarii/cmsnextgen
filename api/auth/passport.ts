import passport from "passport";
import LocalStrategy from "passport-local";
import JwtStrategy from "passport-jwt";
import { hash } from "argon2";
import { cookieExtractor } from "../lib/utils";

passport.use(
  new LocalStrategy.Strategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, cb) => {
      const hashedPassword = await hash(password, {
        salt: Buffer.from("123123123"),
      });
      const user = await prisma.user.findFirst({
        where: { OR: { email, password: hashedPassword.toString() } },
      });

      console.log(user, hashedPassword);
      if (!user) {
        return cb(null, false, { message: "Incorrect email or password." });
      }
      return cb(
        null,
        { email: user.email },
        { message: "Logged In Successfully" }
      );
    }
  )
);

passport.use(
  new JwtStrategy.Strategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: "your_jwt_secret",
    },
    function (jwtPayload, cb) {
      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      return prisma.user
        .findFirst({ where: { email: jwtPayload.email } })
        .then((user) => {
          if (user) {
            return cb(null, user);
          }
        })
        .catch((err) => {
          return cb(err);
        });
    }
  )
);
