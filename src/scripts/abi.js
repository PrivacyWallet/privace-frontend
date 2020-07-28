const Calc = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "data_buyer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "data_buyer_contract",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "requirements",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "address payable[]",
          "name": "owners_address",
          "type": "address[]"
        },
        {
          "indexed": false,
          "internalType": "string[]",
          "name": "owners_data",
          "type": "string[]"
        },
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "owners_price",
          "type": "uint256[]"
        },
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "owners_epsilon",
          "type": "uint256[]"
        },
        {
          "indexed": false,
          "internalType": "string[]",
          "name": "params",
          "type": "string[]"
        }
      ],
      "name": "data_selected",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "calculator",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "data",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "size",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "transactions",
      "outputs": [
        {
          "internalType": "contract DataBuyerInterface",
          "name": "buyer_contract",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "budget",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "requirements",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "encrypted_data",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "params",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "epsilon",
          "type": "uint256"
        },
        {
          "internalType": "address payable",
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "set_data",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "get_data",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "encrypted_data",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "epsilon",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "contract DataBuyerInterface",
          "name": "data_buyer_contract",
          "type": "address"
        }
      ],
      "name": "bid",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "data_buyer",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "encrypted_result",
          "type": "string"
        }
      ],
      "name": "bidEnd",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "data_buyer",
          "type": "address"
        }
      ],
      "name": "getDataBuyerTransactionInfo",
      "outputs": [
        {
          "internalType": "address payable[]",
          "name": "selected_owner",
          "type": "address[]"
        },
        {
          "internalType": "uint256[]",
          "name": "selected_prices",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256",
          "name": "budget",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "requirements",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "say",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "pure",
      "type": "function",
      "constant": true
    }
  ]

const Inter = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "get_theta_vec",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "_theta_vec",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "get_result",
      "outputs": [
        {
          "internalType": "string",
          "name": "_result",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "req",
          "type": "string"
        }
      ],
      "name": "set_requirements",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "get_requirements",
      "outputs": [
        {
          "internalType": "string",
          "name": "req",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "budget",
          "type": "uint256"
        },
        {
          "internalType": "uint256[]",
          "name": "epsilons",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256[]",
          "name": "prices",
          "type": "uint256[]"
        }
      ],
      "name": "send_budget_and_epsilons",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_result",
          "type": "string"
        }
      ],
      "name": "send_result",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

export default { Calc, Inter }
