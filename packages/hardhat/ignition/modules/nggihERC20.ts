import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const nggihERC20Module = buildModule("nggihERC20Module", m => {
  const defaultOwner = m.getAccount(0);
  const owner = m.getParameter("owner", defaultOwner);
  const token = m.contract("nggihERC20", [owner]);

  return { token };
});

export default nggihERC20Module;
