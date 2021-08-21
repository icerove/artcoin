const BN = require("bn.js");
const UNIT = new BN("100000000000000000000");

export const formatNearWithDecimal = (amount) => {
  return new BN(amount.toString()).div(new BN(UNIT)).toNumber() / 10000;
};
