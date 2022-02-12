const transactionsUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')

console.log({incomeDisplay, expenseDisplay, balanceDisplay})
// let transactions = [
//     {id: 1, name: 'Bolo de brigadeiro', amount: -20},
//     {id: 1, name: 'Bolo de laranja', amount: 410}, 
//     {id: 1, name: 'Bolo de torta', amount: -5}, 
//     {id: 1, name: 'Bolo de leite ninho', amount: 850}, 
//     {id: 1, name: 'Bolo de coxinha', amount: 140}
    
// ]

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : []

const removeTransaction = ID => {
  transactions = transactions.filter(transaction => transaction.id !== ID)
  updateLocalStorage()
  init()
}

const addTransactionIntoDOM = transaction =>{
   const operator = transaction.amount<0?'-':'+'
   const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'
   const amountWithoutOperator = Math.abs(transaction.amount)
   const li = document.createElement('li')

    console.log(li)

   li.classList.add(CSSClass)
   li.innerHTML = `
     ${transaction.name} <span>${operator} R$ ${amountWithoutOperator}</span><butoon class="delete=btn" onClick="removeTransaction(${transaction.id})>x</button>
   `
   transactionsUl.prepend(li)
}


const updateBalaceValues = () =>{
    const transactionsAmounts = transactions.map(transaction => transaction.amount)
    const total = transactionsAmounts.reduce((accumulator, transaction) => accumulator + transaction, 0).toFixed(2)
    const income = transactionsAmounts.filter(value =>  value > 0).reduce((accumulator, value)=> accumulator + value, 0).toFixed(2)
    const expense = Math.abs(transactionsAmounts.filter(value => value < 0).reduce((accumulator, value)=>accumulator + value, 0)).toFixed(2)

    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`
}



const init = () =>{
    transactionsUl.innerHTML=''
    transactions.forEach(addTransactionIntoDOM)
    updateBalaceValues()
}

init()

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

const generateID = () => Math.round(Math.random() * 1000)

form.addEventListener('submit', event => {
    event.preventDefault()

    const transactionName = inputTransactionName.value.trim()
    const transactionAmount = inputTransactionAmount.value.trim()

    if(transactionName === '' || transactionAmount === ''){
       alert("Preencha os campos vazios")
       return 
    }

    const transaction = {id: generateID(), name: transactionName, amount: Number(transactionAmount)}

    transactions.push(transaction)
    init()
    updateLocalStorage()

    inputTransactionName.value = ''
    inputTransactionAmount.value = ''
})