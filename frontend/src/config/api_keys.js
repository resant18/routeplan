if (process.env.NODE_ENV === "production") {
  module.exports = require("./api_keys_prod");
} else {
  module.exports = require("./api_keys_dev");
}

// module.exports = {
//   MAP_KEY: "mTgjAkaYmLIwYIArAqLEEyzYJkTegQC4",
//   YELP_KEY:
//     "mOp_g5UnBzGDCmW5_fpxXmCCaitoXrzlIwxKlEEL8Dvre40PECjRrMVWqNLMaZBeILGQWGEZ6KQyyATXlfgVAwHvw_UuzBSDVV-kDwGsR-fzmzkvgeSyL5xQeG3YXXYx"
// };