import { returnString } from './test'
import { bytecode } from './dataBuyerByteCode'
import api from './api'

/**
 * Register new account and return the private key
 */
export function register(): String {
  return returnString()
}

interface Form {
  age: Number
  gender: String
  occupation: String
  income: Number
  hometown: String
  education: String
  maritalStatus: String
  wentTo: String
}

export { Form }

/**
 * 获取账户信息。
 * （因为 MetaMask 的缘故，这个可以暂时不用实现）
 */
function getAccount(): { account: String; balance: Number } {
  return { account: 'this is a account', balance: 123.45 }
}

// Data buyer
/**
 *  获得历史交易记录。
 *  @param bidStartID 是开始交易时调用 `bid` 方法的 tx_id
 *  @param bidEndID 是交易结束时调用 `bidEnd` 方法的 tx_id
 *  @param status 一般有 success, failed, on going.
 *  @param calculatorContract 外包计算者合约的地址
 */
function getTransactionsAsDataBuyer(): Array<{
  bidStartID: String
  bidEndID: String
  date: Date
  status: String
  deployedContract: String
  calculatorContract: String
  result: String
  transactions: Array<{ to: String; payment: Number }>
}> {
  return [
    {
      bidStartID: 'start tx id 1',
      bidEndID: 'End tx id 1',
      date: new Date(),
      status: 'finished',
      calculatorContract: 'calculator address 1',
      deployedContract: 'Contract...',
      transactions: [
        {
          to: 'aaaa',
          payment: 0.3,
        },
        {
          to: 'bbb',
          payment: 0.5,
        },
      ],
      result: 'encrypted data',
    },
    {
      bidStartID: 'start tx id 2',
      bidEndID: 'End tx id 2',
      date: new Date(),
      status: 'finished',
      calculatorContract: 'calculator address 1',
      deployedContract: 'Contract...',
      transactions: [
        {
          to: 'aaaa',
          payment: 0.3,
        },
        {
          to: 'bbb',
          payment: 0.5,
        },
        {
          to: 'ccc',
          payment: 0.7,
        },
      ],
      result: 'encrypted data again',
    },
  ]
}

/**
 * 创建一个新的交易
 * @param queryType 查询的类型，其值为 ['age', 'gender', 'occupation', 'income', 'hometown', 'education', 'maritalStatus', 'wentTo'] 之一
 * @param query 选择具体查询的值，仅在 resultType == '统计个数' 时有效；当 resultType == '中位数' 时，此值为 ''。
 * @param resultType 计算结果的类型，其值为 ['统计个数', '中位数'] 之一
 * @param budget 支付的金额
 * @param calculatorContract 外包计算者合约的地址
 */
function createNewTransaction(
  queryType: String,
  query: String ,
  resultType: String,
  budget: Number,
  calculatorContract: String,
  onsuccess: (receipt:any) => void,
  onfail: (error: any) => void,
): void {
  api.createNewTransaction(
    queryType,
    query,
    resultType,
    budget,
    calculatorContract,
    bytecode,
    onsuccess,
    onfail,
  )
}

// Data Owner
/**
 * 获得历史交易记录。
 * @param status 如果还在计算，就返回未完成。（这部分可以先不管）
 * @param id trasaction id，这个应该是 bidEnd 的 ID。
 * @param dataBuyerContractAddress 数据购买者的合约地址
 */
function getTransactionsAsDataOwner(): Array<{
  id: String
  date: Date
  status: String
  payment: Number
  from: String
  dataBuyerContractAddress: String
}> {
  return [
    {
      id: 'id 111',
      date: new Date('2020-01-02'),
      status: 'finished',
      payment: 0.34,
      dataBuyerContractAddress: 'data buyer contract address',
      from: 'id xxxxxx01',
    },
    {
      id: 'id 114',
      date: new Date('2020-03-04'),
      status: 'finished',
      payment: 0.89,
      dataBuyerContractAddress: 'data buyer contract address',
      from: 'id xxxxxx01',
    },
  ]
}

/**
 * 获得自己曾经提交的所有记录。
 * @returns calculatorAddress 外包计算者的合约地址
 */
function getData(): Array<{
  id: String,
  price: Number
  epsilon: Number
  calculatorContract: String
}> {
  return [
    {
      id: "0xabcdef",
      price: 40,
      epsilon: 30,
      calculatorContract: 'calculator Contract address 1',
    },
  ]
}

/**
 * 上传一份数据。
 * @param data 未加密的数据（但已经是验证过的信息）。
 * @param epsilon 隐私保护因子
 * @param calculatorContract 外包计算者合约的地址，见 `getCalculators`
 */
function uploadNewData(
  data: Form,
  epsilon: Number,
  price: Number,
  calculatorContract: String,
  onsuccess: (receipt:any) => void,
  onfail: (error: any) => void,
): void {
  let string_data = JSON.stringify(data)
  api.uploadNewData(string_data, epsilon, price, calculatorContract, onsuccess, onfail)
}

// Calculator

/**
 * 增加新的外包计算者
 */
function addCalculator(address: String): void {}
/**
 * 获得所有的外包计算者
 */
function getCalculators(): Array<String> {
  return ['calculator 1', 'calculator 2']
}

export {
  getAccount,
  getTransactionsAsDataBuyer,
  createNewTransaction,
  getTransactionsAsDataOwner,
  uploadNewData,
  getData,
  getCalculators,
  addCalculator,
}
