const Quecoin = artifacts.require("./Quecoin.sol");

module.exports = (deployer) => {

  deployer.deploy(Quecoin);
};
