export const ADDRESS = "0xcc309163464512548C4fB1F1F861892980BF3A7f";
export const RPC = "https://goerli.base.org";
export const ABI = [
  {
    inputs: [{ internalType: "contract IEAS", name: "eas", type: "address" }],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  { inputs: [], name: "AccessDenied", type: "error" },
  { inputs: [], name: "InsufficientValue", type: "error" },
  { inputs: [], name: "InvalidEAS", type: "error" },
  { inputs: [], name: "InvalidLength", type: "error" },
  { inputs: [], name: "NotPayable", type: "error" },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "id", type: "uint256" },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "ipfs_hash",
        type: "string",
      },
    ],
    name: "LinkCreated",
    type: "event",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "bytes32", name: "uid", type: "bytes32" },
          { internalType: "bytes32", name: "schema", type: "bytes32" },
          { internalType: "uint64", name: "time", type: "uint64" },
          { internalType: "uint64", name: "expirationTime", type: "uint64" },
          { internalType: "uint64", name: "revocationTime", type: "uint64" },
          { internalType: "bytes32", name: "refUID", type: "bytes32" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "address", name: "attester", type: "address" },
          { internalType: "bool", name: "revocable", type: "bool" },
          { internalType: "bytes", name: "data", type: "bytes" },
        ],
        internalType: "struct Attestation",
        name: "attestation",
        type: "tuple",
      },
    ],
    name: "attest",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "", type: "string" }],
    name: "attesters",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_id", type: "uint256" },
      { internalType: "string", name: "_ipfs_hash", type: "string" },
    ],
    name: "changeIpfsHash",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "_ipfs_hash", type: "string" }],
    name: "createLink",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_id", type: "uint256" }],
    name: "getLink",
    outputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "string", name: "", type: "string" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isPayable",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "linkCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "bytes32", name: "uid", type: "bytes32" },
          { internalType: "bytes32", name: "schema", type: "bytes32" },
          { internalType: "uint64", name: "time", type: "uint64" },
          { internalType: "uint64", name: "expirationTime", type: "uint64" },
          { internalType: "uint64", name: "revocationTime", type: "uint64" },
          { internalType: "bytes32", name: "refUID", type: "bytes32" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "address", name: "attester", type: "address" },
          { internalType: "bool", name: "revocable", type: "bool" },
          { internalType: "bytes", name: "data", type: "bytes" },
        ],
        internalType: "struct Attestation[]",
        name: "attestations",
        type: "tuple[]",
      },
      { internalType: "uint256[]", name: "values", type: "uint256[]" },
    ],
    name: "multiAttest",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "bytes32", name: "uid", type: "bytes32" },
          { internalType: "bytes32", name: "schema", type: "bytes32" },
          { internalType: "uint64", name: "time", type: "uint64" },
          { internalType: "uint64", name: "expirationTime", type: "uint64" },
          { internalType: "uint64", name: "revocationTime", type: "uint64" },
          { internalType: "bytes32", name: "refUID", type: "bytes32" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "address", name: "attester", type: "address" },
          { internalType: "bool", name: "revocable", type: "bool" },
          { internalType: "bytes", name: "data", type: "bytes" },
        ],
        internalType: "struct Attestation[]",
        name: "attestations",
        type: "tuple[]",
      },
      { internalType: "uint256[]", name: "values", type: "uint256[]" },
    ],
    name: "multiRevoke",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "bytes32", name: "uid", type: "bytes32" },
          { internalType: "bytes32", name: "schema", type: "bytes32" },
          { internalType: "uint64", name: "time", type: "uint64" },
          { internalType: "uint64", name: "expirationTime", type: "uint64" },
          { internalType: "uint64", name: "revocationTime", type: "uint64" },
          { internalType: "bytes32", name: "refUID", type: "bytes32" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "address", name: "attester", type: "address" },
          { internalType: "bool", name: "revocable", type: "bool" },
          { internalType: "bytes", name: "data", type: "bytes" },
        ],
        internalType: "struct Attestation",
        name: "attestation",
        type: "tuple",
      },
    ],
    name: "revoke",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "username", type: "string" }],
    name: "verifiedUser",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "attester", type: "address" }],
    name: "voteAttester",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
];
export const EAS_UID =
  "0x9419b0cbaeaf67a8f61f687edc16d9e43b3025abcc079366e94ebc17d0ef142e";

export const EAS_CONTRACT_ADDRESS =
  "0x4200000000000000000000000000000000000021";

export const UMA_CONTRACT_ADDRESS =
  "0x1eE9C8909e5f179348EFD6277130352b4ADE9dbB";

export const UMA_CONTRACT_ABI = [
  {
    inputs: [
      { internalType: "address", name: "_defaultCurrency", type: "address" },
      { internalType: "address", name: "_optimisticOracleV3", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "marketId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "assertionId",
        type: "bytes32",
      },
    ],
    name: "AssertionCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "assertionId",
        type: "bytes32",
      },
    ],
    name: "AssertionSettled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "marketId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "creater",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "endDate",
        type: "uint256",
      },
    ],
    name: "MarketBetCreated",
    type: "event",
  },
  {
    inputs: [{ internalType: "bytes32", name: "marketId", type: "bytes32" }],
    name: "assertBet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "assertionLiveness",
    outputs: [{ internalType: "uint64", name: "", type: "uint64" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    name: "assertionsMarket",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "defaultCurrency",
    outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "defaultIdentifier",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "statement", type: "string" },
      { internalType: "uint256", name: "endDate", type: "uint256" },
    ],
    name: "makeBetMarket",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    name: "marketAssertions",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    name: "marketBets",
    outputs: [
      { internalType: "string", name: "statement", type: "string" },
      { internalType: "uint256", name: "endDate", type: "uint256" },
      { internalType: "uint256", name: "bidDate", type: "uint256" },
      { internalType: "address", name: "creater", type: "address" },
      { internalType: "bool", name: "resolved", type: "bool" },
      { internalType: "uint8", name: "result", type: "uint8" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "oo",
    outputs: [
      {
        internalType: "contract OptimisticOracleV3Interface",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "marketId", type: "bytes32" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint8", name: "prediction", type: "uint8" },
    ],
    name: "placeBet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "marketId", type: "bytes32" }],
    name: "redeemBetAmount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "assertionId", type: "bytes32" }],
    name: "settleAssertion",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const UMA_ERC20_CONTRACT_ADDRESS = "0xEF8b46765ae805537053C59f826C3aD61924Db45";