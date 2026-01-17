const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("MyTokenModule", (m) => {
  const initialOwner = m.getParameter("initialOwner", m.getAccount(0));
  const token = m.contract("MyToken", [initialOwner]);
  return { token };
});
