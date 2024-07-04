// deployed-contract/sources

export const contractABI = [
    {
      "type": "constructor",
      "name": "",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "event",
      "name": "NewMessage",
      "inputs": [
        {
          "type": "address",
          "name": "sender",
          "indexed": true,
          "internalType": "address"
        },
        {
          "type": "uint256",
          "name": "timestamp",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "type": "string",
          "name": "message",
          "indexed": false,
          "internalType": "string"
        }
      ],
      "outputs": [],
      "anonymous": false
    },
    {
      "type": "function",
      "name": "pay-mate",
      "inputs": [
        {
          "type": "string",
          "name": "_message",
          "internalType": "string"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "getMessage",
      "inputs": [],
      "outputs": [
        {
          "type": "uint256",
          "name": "",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    }
] as const;