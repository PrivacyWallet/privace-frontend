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
  onfail
) {
  console.log('createNewTransaction', queryType, query, resultType)
  const web3 = window.web3
  const myContract = new web3.eth.Contract(abi.Inter)
  const account = await web3.eth.getCoinbase()
  const tran = await myContract
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
  await contract.methods.bid(tran._address).send({
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
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA61u0yB8hGtizMyNuPNvY\n' +
    'oGnhbVm55AmHpLBDXNOMks7l+InHyo6A1BchjxVQUNB+YKb1aV7UfHU1pJQ5fJYs\n' +
    'fOx+daK0C8NU30168diQ9E5Il6uhLG/OmnglqExJPsjorzd+smIyjdaWG8nJNJOL\n' +
    'VKOxiaJCCVTL+wH98BXjSRKaQ0437bCt1hxUSiHiuxvgFbZ6pp7e2WGftfkXIltc\n' +
    'LXzFPees0Zd1HZ/PDQzTkkRQ96ygw5hXZ6DnpSPl25H4ncRIgZgTD14fDE1EICND\n' +
    '6CFQXzK/GoX9dFNN/7ubaWLKVw7aMHK0B7TxyIwjqUt8gthOaT//XWk/IzntI6n+\n' +
    'JQIDAQAB\n' +
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
