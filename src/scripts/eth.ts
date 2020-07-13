import { returnString } from './test'

/**
 * Register new account and return the private key
 */
export function register (): String {
  return returnString()
}

interface Form {
  age: Number;
  gender: String;
  occupation: String;
  income: Number;
  hometown: String;
  education: String;
  maritalStatus: String;
  wentTo: String;
}

export { Form }

interface EthInterface {
  // priKey: String;

  // common
  /**
   * 登录
   * Return `true` if login succeeded.
   */
  login(priKey: String): Boolean;

  /**
   * 获取账户信息。
   */
  getAccount(): { account: String; balance: Number };

  // Data buyer
  /**
   *  获得历史交易记录。
   */
  getTransactionsAsDataBuyer(): Array<{
    id: String;
    date: Date;
    status: String;
    deployedContract: String;
    transactions: Array<{ to: String; payment: Number; data: String }>;
  }>;

  /**
   * 创建一个新的交易
   * @param filter 筛选的条件
   * @param selectType 选择具体查询的对象
   * @param queryType 查询的类型
   * @param budget 支付的金额
   */
  createNewTransaction(
    filter: String,
    selectType: String,
    queryType: Number,
    budget: Number
  ): void;

  // Data Owner
  /**
   * 获得历史交易记录。
   */
  getTransactionsAsDataOwner(): Array<{
    id: String;
    date: Date;
    status: String;
    payment: Number;
    from: String;
  }>;

  /**
   * 获得自己曾经提交的所有记录。
   */
  getData(): Array<Form>;

  /**
   * 上传一份数据。
   * @param data 未加密的数据（但已经是验证过的信息）。
   * @param epsilon 隐私保护因子
   */
  createNewData(data: Form, epsilon: Number): void;
}

export class EthTest implements EthInterface {
  login (priKey: String): Boolean {
    console.log('[Eth] execute login')

    return true
  }

  getAccount (): { account: String; balance: Number } {
    return { account: 'this is a account', balance: 123.45 }
  }

  getTransactionsAsDataBuyer (): {
    id: String;
    date: Date;
    status: String;
    deployedContract: String;
    result: String;
    transactions: { to: String; payment: Number; data: String }[];
  }[] {
    return [
      {
        id: 'id 1',
        date: new Date(),
        status: 'finished',
        deployedContract: 'Contract...',
        transactions: [
          {
            to: 'aaaa',
            payment: 0.3,
            data: 'data 1'
          },
          {
            to: 'bbb',
            payment: 0.5,
            data: 'data 2'
          }
        ],
        result: 'encrypted data'
      },
      {
        id: 'id 2',
        date: new Date(),
        status: 'finished',
        deployedContract: 'Contract...',
        transactions: [
          {
            to: 'aaaa',
            payment: 0.3,
            data: 'data 1'
          },
          {
            to: 'bbb',
            payment: 0.5,
            data: 'data 2'
          },
          {
            to: 'ccc',
            payment: 0.7,
            data: 'data 7'
          }

        ],
        result: 'encrypted data again'
      }
    ]
  }

  createNewTransaction (
    filter: String,
    selectType: String,
    queryType: Number,
    budget: Number
  ): void {}

  getTransactionsAsDataOwner (): {
    id: String;
    date: Date;
    status: String;
    payment: Number;
    from: String;
  }[] {
    return [
      {
        id: 'id 111',
        date: new Date('2020-01-02'),
        status: 'finished',
        payment: 0.34,
        from: 'id xxxxxx01'
      },
      {
        id: 'id 114',
        date: new Date('2020-03-04'),
        status: 'finished',
        payment: 0.89,
        from: 'id xxxxxx01'
      }
    ]
  }

  getData (): Array<Form> {
    return [
      {
        age: 32,
        education: '本科',
        gender: '男',
        hometown: '北京市',
        income: 3000,
        maritalStatus: '已婚',
        occupation: '学生',
        wentTo: '香港特别行政区'
      }
    ]
  }

  createNewData (data: Form, epsilon: Number): void {}
}
