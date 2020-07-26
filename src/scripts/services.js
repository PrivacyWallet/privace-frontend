import axios from 'axios'

const host = 'http://localhost:3000'

axios.defaults.baseURL = host

async function getTransactionsAsDataBuyer(address) {
  address = '0x013293a2e8c40b46bb11f1ca23b3e00e1ac86d57'
  const response = await axios.get('/getTransactionsAsDataBuyer', {
    params: { address },
  })
  let data = response.data
  data = data.map(v => ({ ...v, transactions: JSON.parse(v.transactions) }))
  console.group('get data')
  console.log(response)
  console.log(data)
  console.groupEnd('get data')
  return data
}

async function getTransactionsAsDataOwner(address) {
  address = '0x212f247a1e10075e5Fb8d3C9111008083D778BE6'
  const response = await axios.get('/getTransactionsAsDataOwner', {
    params: { address },
  })
  const data = response.data
  console.group('get data owner')
  console.log(response)
  console.log(data)
  console.groupEnd('get data owner')
  return data
}

async function getCalculators() {
  const response = await axios.get('/getCalculators')
  const data = response.data

  return data.map(v => v.calculator)
}

export default {
  getTransactionsAsDataBuyer,
  getTransactionsAsDataOwner,
  getCalculators,
}
