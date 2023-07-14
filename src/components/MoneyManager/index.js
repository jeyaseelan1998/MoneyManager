import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import TransactionItem from '../TransactionItem'
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
    type: transactionTypeOptions[0].optionId
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {title, amount, type} = this.state
    const newtransaction = {
      id: uuidv4(),
      title,
      amount,
      type: type[0] + type.slice(1).toLowerCase()
    }
    this.setState(prevState => ({
      transactionHistory: [...prevState.transactionHistory, newtransaction],
      title: '',
      amount: '',
      type: transactionTypeOptions[0].displayText
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

  onDelete = (uniqueId) => {
    this.setState(prevState => ({
      transactionHistory: prevState.transactionHistory.filter(item => item.id !== uniqueId)
    }))
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
        <div className="money-details-lists">
          <MoneyDetails type="balance" amount={balance} testid="balanceAmount"/>
          <MoneyDetails type="income" amount={incomeAmount} testid="incomeAmount"/>
          <MoneyDetails type="expenses" amount={expensesAmount} testid="expensesAmount"/>
        </div>
        <div className="transaction-form-history-container">
          <form className="add-transaction-form" onSubmit={this.onAddTransaction}>
            <h1 className="form-heading">Add Transaction</h1>
            <label htmlFor="title">TITLE</label>
            <input type="text" id="title" name="title" value={title} onChange={this.onChangeInput} placeholder="TITLE"/>
            <label htmlFor="amount">AMOUNT</label>
            <input type="text" id="amount" name="amount" value={amount} onChange={this.onChangeInput} placeholder="AMOUNT"/>
            <label htmlFor="type">TYPE</label>
            <select id="type" name="type" onChange={this.onChangeInput} value={type}>
              {
                transactionTypeOptions.map(item => 
                  <option key={item.optionId} value={item.optionId}>{item.displayText}</option>)
              }
            </select>
            <button className="button" type="submit">
              Add
            </button>
          </form>
          <div className="transaction-history-container">
            <h1 className="transaction-history-heading">History</h1>
            <div className="transactions-header">
              <p className="heading-cell">Title</p>
              <p className="heading-cell">Amount</p>
              <p className="heading-cell">Type</p>
              <p className="heading-cell"/>
            </div>
            <ul className="transactions-lists">
              {
                transactionHistory.map(item => <TransactionItem key={item.id} transactionDetails={item} onDelete={this.onDelete}/>)
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
