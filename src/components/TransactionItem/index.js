import './index.css'

const TransactionItem = props => {
    const {transactionDetails, onDelete} = props
    const {id, title, amount, type} = transactionDetails

    const onDeleteClick = () => onDelete(id)
    return (
        <li className="transaction-list">
            <p className="data-cell">{title}</p>
            <p className="data-cell">Rs {amount}</p>
            <p className="data-cell"> {type} </p>
            <button onClick={onDeleteClick} className="delete-btn data-cell" data-testid ="delete" type="button">
                <img className="delete-img" src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png" alt="delete"/>
            </button>
        </li>
    )
}

export default TransactionItem