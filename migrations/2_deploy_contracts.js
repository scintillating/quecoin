const Quecoin = artifacts.require("./Quecoin.sol");
const QuestionStore = artifacts.require("./QuestionStore.sol");

module.exports = async (deployer) => {
  await deployer.deploy(Quecoin);
  deployer.deploy(QuestionStore, Quecoin.address);
};
