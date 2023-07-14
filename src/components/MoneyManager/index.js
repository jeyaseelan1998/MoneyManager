import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import MoneyDetails from '../MoneyDetails';
import TransactionItem from '../TransactionItem'

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
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId
  }

  getTransactionType = (optionId) => {
    const option = transactionTypeOptions.find(item => item.optionId === optionId)
    return option.displayText
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    const newtransaction = {
      uniqueId: uuidv4(),
      titleInput,
      amountInput,
      type: this.getTransactionType(optionId)
    }
    this.setState(prevState => ({
      transactionHistory: [...prevState.transactionHistory, newtransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId
    }))
  }

  onChangeInput = event => {
    const {name, value} = event.target
    this.setState({[name]:value})
  }

  onDelete = (uniqueId) => {
    this.setState(prevState => ({
      transactionHistory: prevState.transactionHistory.filter(item => item.uniqueId !== uniqueId)
    }))
  }

  getTotalIncome = () => {
    const {transactionHistory} = this.state
    const incomeTransactions = transactionHistory.filter(item => item.type === 'Income')
    return incomeTransactions.reduce((acc, item) => acc + parseInt(item.amountInput), 0)
  }

  getTotalExpenses = () => {
    const {transactionHistory} = this.state
    const incomeTransactions = transactionHistory.filter(item => item.type === 'Expenses')
    return incomeTransactions.reduce((acc, item) => acc + parseInt(item.amountInput), 0)
  }

  render() {
    const name = 'Richard'
    const {transactionHistory, titleInput, amountInput, optionId} = this.state

    const incomeAmount = this.getTotalIncome()
    const expensesAmount = this.getTotalExpenses()
    const balanceAmount = incomeAmount - expensesAmount

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
          <MoneyDetails type="balance" amount={balanceAmount} testid="balanceAmount"/>
          <MoneyDetails type="income" amount={incomeAmount} testid="incomeAmount"/>
          <MoneyDetails type="expenses" amount={expensesAmount} testid="expensesAmount"/>
        </div>
        <div className="transaction-form-history-container">
          <form className="add-transaction-form" onSubmit={this.onAddTransaction}>
            <h1 className="form-heading">Add Transaction</h1>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="titleInput" value={titleInput} onChange={this.onChangeInput}/>
            <label htmlFor="amount">Amount</label>
            <input type="text" id="amount" name="amountInput" value={amountInput} onChange={this.onChangeInput}/>
            <label htmlFor="type">Type</label>
            <select id="type" name="optionId" onChange={this.onChangeInput} value={optionId}>
              {
                transactionTypeOptions.map(item => 
                  <option key={item.optionId} value={item.optionId}> {item.displayText} </option>)
              }
            </select>
            <button className="button" type="submit">Add</button>
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
                transactionHistory.map(item => <TransactionItem key={item.uniqueId} transactionDetails={item} onDelete={this.onDelete}/>)
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
