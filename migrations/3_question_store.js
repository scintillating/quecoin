const Quecoin = artifacts.require("./Quecoin.sol");
const QuestionStore = artifacts.require("./QuestionStore.sol");

module.exports = deployer => {
  deployer.deploy(QuestionStore, Quecoin.address);
};
