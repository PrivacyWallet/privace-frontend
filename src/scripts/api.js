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
  const contract = new web3.eth.Contract(abi.Calc, calculatorAddress)
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
    '-----BEGIN PUBLIC KEY-----\n' +
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCpNPFNLwGq2Q+Bf/JWEu7ajvrr\n' +
    'iH4wEzbDmcR/6Kw7BCFAPkvxviBis/QBB0uCwv8By99fFMKllGQZZk4XudpzWumt\n' +
    '7EjbZci4AlCbOx95wGHpc46FGqPGI2Iy1fViaiWq36PjNxRlY8tjQURZDCRluadv\n' +
    'XlmhMMlxHs6+XllzQQIDAQAB\n' +
    '-----END PUBLIC KEY-----'
  const web3 = window.web3
  const contract = new web3.eth.Contract(abi.Calc, calculatorAddress)
  const account = await web3.eth.getCoinbase()
  const encrypt = new JSEncrypt()
  encrypt.setPublicKey(rsadata)
  const cipherText = encrypt.encrypt(data)
  const params = ' '
  console.log(encrypt)
  console.log(cipherText)
  contract.methods
    .set_data(price, cipherText, params, epsilon, account)
    .send({
      gas: 1000000,
      gasPrice: web3.utils.toWei('1', 'gwei'),
      from: account,
    })
    .on('receipt', onsuccess)
    .on('error', onfail)
}

export default { createNewTransaction, uploadNewData }
