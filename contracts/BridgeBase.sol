// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// contract BridgeBase {
//   address public admin;
//   IERC20 public token;
//   uint public nonce;

//   enum Step { Burn, Mint }
//   event Transfer(
//     address from,
//     address to,
//     uint amount,
//     uint date,
//     uint nonce,
//     Step indexed step
//   );

//   constructor(address _token) {
//     admin = msg.sender;
//     token = IERC20(_token);
//   }

//   function burn(address from, uint amount) external {
//     require(token.balanceOf(msg.sender)  >= amount, "insufficient banlance");
//     require(token.transferFrom(from, admin, amount), "Burn failed");
//     emit Transfer(
//       from,
//       admin,
//       amount,
//       block.timestamp,
//       nonce,
//       Step.Burn
//     );
//     nonce++;
//   }

//   function mint(address to, uint amount) external {
//     require(token.transferFrom(admin,to, amount), "Mint failed");
//     emit Transfer(
//       admin,
//       to,
//       amount,
//       block.timestamp,
//       otherChainNonce,
//       Step.Mint
//     );
//   }

//   function updateAdmin(address newAdmin) external  {
//         require(msg.sender==admin,"only admin can call");
//         require(newAdmin != address(0), "New admin address cannot be zero address");
//         admin = newAdmin;
//     }
// }