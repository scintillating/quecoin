pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

/**
 * @title Quecoin
 */
contract Quecoin is StandardToken {
    string public constant name = "Quecoin"; // solium-disable-line uppercase
    string public constant symbol = "QUE"; // solium-disable-line uppercase
    uint8 public constant decimals = 18; // solium-disable-line uppercase

    uint256 public constant INITIAL_SUPPLY = 10000 * (10 ** uint256(decimals));

    /**
     * @dev Constructor that gives msg.sender all of existing tokens.
     */
    function Quecoin() public {
      totalSupply_ = INITIAL_SUPPLY;
      balances[msg.sender] = INITIAL_SUPPLY;
      Transfer(0x0, msg.sender, INITIAL_SUPPLY);
    }
}
