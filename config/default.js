const path = require("path");
const dotenv = require("dotenv");

const pkg = require("../package.json");

dotenv.config();

module.exports = {
  // base config
  NODE_ENV: "development",
  version: pkg["version"],
  host: process.env.HOST || "localhost",
  port: process.env.PORT || 9999,
  instance: process.env.NODE_APP_INSTANCE || null, // PM2 instance

  daisy: {
    identifier: process.env.DAISY_ID,
    secretKey: process.env.DAISY_SECRET_KEY,
  },
  daisyOTP: {
    identifier: process.env.DAISY_OTP_ID,
    secretKey: process.env.DAISY_OTP_SECRET_KEY,
  },

  renderer: {
    engine: "nextjs",
    options: {
      dev: process.env.NODE_ENV !== "production",
      quiet: true,
      dir: path.join(__dirname, "..", "client"),
      conf: {
        distDir: "build-client", // relative to `options.dir`
        useFileSystemPublicRoutes: false,
      },
    },
  },

  // koa config
  proxy: false,
  silent: false,
  subdomainOffset: 0,
  keys: ["SECRET_KEY"],

  // koa-static
  statics: {
    // https://github.com/koajs/static#options
    dir: path.join(__dirname, "..", "public"),
    options: {
      maxage: 0,
      hidden: false, // hidden files
      index: "index.html",
      gzip: true,
      br: true,
    },
  },

  // koa-session config (https://github.com/koajs/session)
  session: {
    key: "margarita-poc:session:dev",
    maxAge: 86400000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: false,
    secure: false,
    sameSite: false,
    domain: undefined,
  },
};
