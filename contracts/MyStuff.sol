//import "./owned.sol";
contract owned {
  address public owner;

  function owned() {
    owner = msg.sender;
  }

  modifier onlyOwner {
    if (msg.sender != owner) throw;
    _
  }

  function transferOwnership(address newOwner) onlyOwner {
    owner = newOwner;
  }
  
  function destroy() onlyOwner {
    suicide(owner);
  }
}

contract MyStuff is owned {

  mapping (address => string) public keys;

  event StuffRegistered(address stuffOwner, string key);
  
  function registerStuff(string key) {
    keys[msg.sender] = key;
    StuffRegistered(msg.sender, key);
  }
  
}