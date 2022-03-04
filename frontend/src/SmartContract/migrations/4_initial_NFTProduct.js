const NFTProduct = artifacts.require("NFTProduct")


module.exports = function (deployer) {
    deployer.deploy(NFTProduct);
}