import axios from 'axios'

const host = 'http://localhost:3000'

axios.defaults.baseURL = host

async function getTransactionsAsDataBuyer(address) {
  const response = await axios.get('/getTransactionsAsDataBuyer', {
    params: { address },
  })
  let data = response.data
  data = data.map(v => ({ ...v, transactions: JSON.parse(v.transactions) }))
  console.group('get data buyer')
  console.log(address)
  console.log(response)
  console.log(data)
  console.groupEnd('get data buyer')
  return data
}

async function getTransactionsAsDataOwner(address) {
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

function setData(id, price, epsilon, calculatorContract, address) {
  return axios.post('/setData', {
    id,
    price,
    epsilon,
    calculatorContract,
    address,
  })
}

async function getData(address) {
  const response = await axios.get('/getData', {
    params: { address },
  })
  const data = response.data
  console.group('getData')
  console.log(response)
  console.log(data)
  console.groupEnd('getData')
  return data
}

export default {
  getTransactionsAsDataBuyer,
  getTransactionsAsDataOwner,
  getCalculators,
  setData,
  getData,
}
