import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import MoneyDetails from '../MoneyDetails';

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    transactionHistory: [],
    title: '',
    amount: '',
    type: transactionTypeOptions[0].displayText
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {title, amount, type} = this.state
    const newtransaction = {
      id: uuidv4(),
      title,
      amount,
      type
    }
    this.setState(prevState => ({
      transactionHistory: [...prevState.transactionHistory, newtransaction]
    }))
  }

  onChangeInput = event => {
    const {name, value} = event.target
    this.setState({[name]:value})
  }

  getIncome = () => {
    const {transactionHistory} = this.state
    const incomeTransactions = transactionHistory.filter(item => item.type === 'Income')
    return incomeTransactions.reduce((acc, item) => acc + parseInt(item.amount), 0)
  }

  getExpenses = () => {
    const {transactionHistory} = this.state
    const incomeTransactions = transactionHistory.filter(item => item.type === 'Expenses')
    return incomeTransactions.reduce((acc, item) => acc + parseInt(item.amount), 0)
  }

  render() {
    const name = 'Richard'
    const {transactionHistory, title, amount, type} = this.state

    const incomeAmount = this.getIncome()
    const expensesAmount = this.getExpenses()
    const balance = incomeAmount - expensesAmount

    return (
      <div className="money-manager-container">
        <div className="greetings-container">
          <h1 className="greetings-heading">Hi, {name}</h1>
          <p className="greetings-description">
            Welcome back to your 
              <span className="app-name"> Money Manager </span>
            </p>
        </div>
        <ul className="money-details-lists">
          <MoneyDetails type="balance" amount={balance}/>
          <MoneyDetails type="income" amount={incomeAmount}/>
          <MoneyDetails type="expenses" amount={expensesAmount}/>
        </ul>
        <div className="transaction-form-history-container">
          <form className="add-transaction-form" onSubmit={this.onAddTransaction}>
            <p className="form-heading">Add Transaction</p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" value={title} onChange={this.onChangeInput}/>
            <label htmlFor="amount">Amount</label>
            <input type="text" id="amount" name="amount" value={amount} onChange={this.onChangeInput}/>
            <label htmlFor="type">Type</label>
            <select id="type" name="type" onChange={this.onChangeInput}>
              {
                transactionTypeOptions.map(item => 
                  <option key={item.optionId} value={item.displayText} selected={type === item.displayText}>{item.displayText}</option>)
              }
            </select>
            <button className="button" type="submit">
              Add
            </button>
          </form>
          <div className="transaction-history-container">
            <p className="transaction-history-heading">History</p>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
