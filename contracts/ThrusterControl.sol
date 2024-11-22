// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ThrusterControl {
    struct Thruster {
        uint256 gasMultiplier;
        uint256 brakeMultiplier;
        bool isActive;
    }
    
    mapping(address => Thruster) public thrusters;
    mapping(address => uint256) public playerPots;
    
    event ThrusterActivated(address indexed player, uint256 thrusterId);
    event SpeedChanged(address indexed player, bool isAccelerating, uint256 amount);
    event GameResult(address indexed winner, address indexed loser, uint256 winnings);
    
    function createThruster(uint256 _gasMultiplier, uint256 _brakeMultiplier) external {
        require(!thrusters[msg.sender].isActive, "Thruster already exists");
        thrusters[msg.sender] = Thruster(_gasMultiplier, _brakeMultiplier, true);
        emit ThrusterActivated(msg.sender, 1);
    }
    
    function placeBet() external payable {
        require(msg.value > 0, "Must send some ETH");
        playerPots[msg.sender] += msg.value;
    }
    
    function accelerate(uint256 amount) external {
        require(thrusters[msg.sender].isActive, "No active thruster");
        uint256 boost = amount * thrusters[msg.sender].gasMultiplier;
        emit SpeedChanged(msg.sender, true, boost);
    }
    
    function brake(uint256 amount) external {
        require(thrusters[msg.sender].isActive, "No active thruster");
        uint256 reduction = amount * thrusters[msg.sender].brakeMultiplier;
        emit SpeedChanged(msg.sender, false, reduction);
    }
    
    function declareWinner(address winner, address loser) external {
        require(playerPots[winner] > 0 && playerPots[loser] > 0, "Both players must have active bets");
        
        uint256 totalPot = playerPots[winner] + playerPots[loser];
        uint256 winnerShare = totalPot;
        
        playerPots[winner] = 0;
        playerPots[loser] = 0;
        
        payable(winner).transfer(winnerShare);
        
        emit GameResult(winner, loser, winnerShare);
    }
}
