const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const AccountModule = buildModule("AccountModule", (m) => {
  const account = m.contract("AccountStore");

  return { account };
});

module.exports = AccountModule; 