import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const nggihERC721Module = buildModule("nggihERC721Module", m => {
  const defaultOwner = m.getAccount(0);
  const owner = m.getParameter("owner", defaultOwner);
  const token = m.contract("nggihERC721", [owner]);

  return { token };
});

export default nggihERC721Module;
