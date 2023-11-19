// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "@uma/core/contracts/optimistic-oracle-v3/implementation/ClaimData.sol";
import "@uma/core/contracts/optimistic-oracle-v3/interfaces/OptimisticOracleV3Interface.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import "hardhat/console.sol";

contract X3Bet {
    using SafeERC20 for IERC20;
    IERC20 public immutable defaultCurrency;
    OptimisticOracleV3Interface public immutable oo;
    uint64 public constant assertionLiveness = 7200;
    bytes32 public immutable defaultIdentifier;

    //ToDo: mkae betting pool here
    struct MarketBet {
        string statement;
        uint256 endDate;
        uint256 bidDate;
        address creater;
        bool resolved;
        //0 for undecided, 1 for true, 2 for false
        uint8 result;
        Bet[] betters;
    }

    struct Bet {
        uint256 amount;
        address user;
        uint8 prediction;
        bool redeemed;
    }

    mapping(bytes32 => MarketBet) public marketBets;
    mapping(bytes32 => bytes32) public marketAssertions;
    mapping(bytes32 => bytes32) public assertionsMarket;

    event MarketBetCreated(
        bytes32 indexed marketId,
        address indexed creater,
        uint256 endDate
    );

    event AssertionCreated(
        bytes32 indexed marketId,
        bytes32 indexed assertionId
    );

    event AssertionSettled(bytes32 indexed assertionId);

    constructor(address _defaultCurrency, address _optimisticOracleV3) {
        defaultCurrency = IERC20(_defaultCurrency);
        oo = OptimisticOracleV3Interface(_optimisticOracleV3);
        defaultIdentifier = oo.defaultIdentifier();
    }

    function makeBetMarket(
        string memory statement,
        uint256 endDate
    ) external //TODO: can bet size could be dynamic or removed
    // uint256 betSize
    {
        bytes32 marketId = keccak256(abi.encode(block.number, statement));

        marketBets[marketId].statement = statement;
        marketBets[marketId].endDate = endDate;
        marketBets[marketId].bidDate = block.timestamp;
        marketBets[marketId].creater = msg.sender;

        emit MarketBetCreated(marketId, msg.sender, endDate);
    }

    function placeBet(
        bytes32 marketId,
        uint256 amount,
        uint8 prediction
    ) external {
        //ToDo: pull money from better to contract
        defaultCurrency.transferFrom(msg.sender, address(this), amount);
        marketBets[marketId].betters.push(
            Bet(amount, msg.sender, prediction, false)
        );
    }

    //calling UMA oracle for truthfullness
    function assertBet(bytes32 marketId) external {
        require(
            marketBets[marketId].bidDate < block.timestamp,
            "Bet period not ended yet"
        );

        defaultCurrency.approve(address(oo), type(uint256).max);

        //assertTruthWithDefaults(bytes memory claim, address asserter
        bytes32 assertionId = oo.assertTruthWithDefaults(
            bytes(marketBets[marketId].statement),
            address(this)
        );
        marketAssertions[marketId] = assertionId;
        assertionsMarket[assertionId] = marketId;

        emit AssertionCreated(marketId, assertionId);
    }

    function settleAssertion(bytes32 assertionId) external {
        bool result = oo.settleAndGetAssertionResult(assertionId);
        //fetch market
        bytes32 marketId = assertionsMarket[assertionId];

        marketBets[marketId].resolved = true;
        if (result) marketBets[marketId].result = 1;
        else {
            marketBets[marketId].result = 2;
        }

        emit AssertionSettled(assertionId);
    }

    function redeemBetAmount(bytes32 marketId) external {
        require(marketBets[marketId].resolved, "bet has not be resolved yet");
        Bet[] memory _betters = marketBets[marketId].betters;
        uint total = 0;
        //1 for winning shares, 2 for losing
        uint[3] memory dist;
        uint beterAmount = 0;
        uint betterPrediction;
        uint betterIndex;
        //fetch the better, total, truth and against
        for (uint i = 0; i < _betters.length; i++) {
            if (msg.sender == _betters[i].user) {
                beterAmount = _betters[i].amount;
                betterPrediction = _betters[i].prediction;
                betterIndex = i;
            }
            if (_betters[i].prediction == marketBets[marketId].result) {
                dist[1] += _betters[i].amount;
            } else {
                dist[2] += _betters[i].amount;
            }
            total += _betters[i].amount;
        }
        require(beterAmount > 0, "you have not beted");
        require(betterPrediction == marketBets[marketId].result, "you failed");
        require(
            !marketBets[marketId].betters[betterIndex].redeemed,
            "you already redeemed"
        );
        //calculate its piece of cake

        uint amount = (total * beterAmount) / dist[1];

        marketBets[marketId].betters[betterIndex].redeemed = true;

        defaultCurrency.transferFrom(address(this), msg.sender, amount);
    }
}
