var Quecoin = artifacts.require("./Quecoin.sol");
var QuestionStore = artifacts.require("./QuestionStore.sol");

module.exports = function(deployer) {
  deployer.deploy(Ownable);
  deployer.link(Ownable, Killable);
  deployer.deploy(Killable);
  deployer.link(Killable, Authentication);
  deployer.deploy(Authentication);
};
