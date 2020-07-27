/***
 * 本文件主要从另一个项目（https://github.com/fky2015/privacy-auction-with-dp/tree/master/JS/api.js）中移植而来。
 *
 * 主要的改动有：
 * 1. 将 CommonJS 转化为 ES6 module
 *
 * */

import abi from './abi'
import JSEncrypt from 'encryptlong'
// const abi = require('./abi.js')
// const NodeRSA = require('node-rsa')
// let fs = require('fs')
// let Tx = require('ethereumjs-tx')
window.JSEncrypt = JSEncrypt

async function createNewTransaction(
  queryType,
  query,
  resultType,
  budget,
  calculatorAddress,
  bindata,
  onsuccess,
  onfail,
) {
  const web3 = window.web3
  const myContract =new web3.eth.Contract(abi.Inter)
  const account = await web3.eth.getCoinbase()
  var tran;
  tran =await myContract
    .deploy({
      data: bindata,
    })
    .send(
      {
        from: account,
        gas: 1500000,
        gasPrice: '30000000000',
      },
      function(error, transactionHash) {
        console.log(error)
      }
    );
  console.log(tran);
  console.log(tran._address)
  const contract = new web3.eth.Contract(abi.Calc, calculatorAddress)
  var json
  json=JSON.stringify({
    queryType:queryType,
    query:query,
    resultType:resultType,
  });
  const buyercontract = new web3.eth.Contract(abi.Inter, tran._address)
  console.log(json)
      await buyercontract.methods
    .set_requirements(json)
    .send({
      gas: 3000000,
      gasPrice: web3.utils.toWei('1', 'gwei'),
      from: account,
      // 'nonce' : web3.eth.getTransactionCount(this.account.address),
    })
    .on('receipt', onsuccess)
    .on('error', onfail)
  await contract.methods
    .bid(tran._address)
    .send({
      gas: 3000000,
      gasPrice: web3.utils.toWei('1', 'gwei'),
      from: account,
      // 'nonce' : web3.eth.getTransactionCount(this.account.address),
      value: budget,
    })
    .on('receipt', onsuccess)
    .on('error', onfail)
}

async function uploadNewData(data, epsilon, price, calculatorAddress, onsuccess, onfail) {
  const rsadata =
    '-----BEGIN RSA PUBLIC KEY-----\n' +
    'MIIBCgKCAQEAqymJH1pMkr4F9NR8nze09w+iMMejql4bk7GpVa0xjilCDsvVHvxD\n' +
    'FhVHVRxpuZyM5p684sUGleV0qZXBXFuBzSLrY7n6GqlgP5qQorhCkQP7q05sqGtU\n' +
    '95dYbn3LjEzYs14XtTCXZvO6zHzABoLceKzeYGHjahtKLIitLR1NbNYbrgKCMlQE\n' +
    'JEvxQrYBYs7cbGY/PIRCft+F28VwUAilHLRNLpME+CAPI35VV6K+oVeEbBFiEgbE\n' +
    'Wss++52Tjy6knCeb7a+aaEPsEu5+0Q6zTVauCTRBCEDngj13DbeBQsEitcOW8g11\n' +
    'rpGLCqiFJsFrJLuKcxHyNefiALufEACeVwIDAQAB\n' +
    '-----END RSA PUBLIC KEY-----'
  const web3 = window.web3
  const contract = new web3.eth.Contract(abi.Calc, calculatorAddress)
  console.log(data)
  const account = await web3.eth.getCoinbase()
  const encrypt = new JSEncrypt()
  encrypt.setPublicKey(rsadata)
  const cipherText = encrypt.encrypt(data)
  const params = ' '
  var tran
  tran=await contract.methods
    .set_data(price, cipherText, params, epsilon, account)
    .send({
      gas: 1000000,
      gasPrice: web3.utils.toWei('1', 'gwei'),
      from: account,
    })

    console.log(tran.transactionHash)
    return tran.transactionHash
}

export default { createNewTransaction, uploadNewData }
