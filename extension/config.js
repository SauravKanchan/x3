export const ADDRESS = "0xF7f85c096602aF8a2eB8A5A81cA8e780fE33547a";
export const RPC = "https://goerli.base.org";
export const ABI = [
  {
    inputs: [
      { internalType: "contract IEAS", name: "eas", type: "address" },
      { internalType: "address[]", name: "intialAttestors", type: "address[]" },
    ],
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
  "0xe69c1fec64adccc2990cb139261332ead68c8d74333f6a220b50f3bed94ca884";

export const EAS_CONTRACT_ADDRESS = "0x4200000000000000000000000000000000000021";