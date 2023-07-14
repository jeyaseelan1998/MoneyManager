import './index.css'

const TransactionItem = props => {
    const {transactionDetails, onDelete} = props
    const {uniqueId, titleInput, amountInput, type} = transactionDetails

    const onDeleteClick = () => onDelete(uniqueId)
    return (
        <li className="transaction-list">
            <p className="data-cell">{titleInput}</p>
            <p className="data-cell">Rs {amountInput}</p>
            <p className="data-cell">{type}</p>
            <button onClick={onDeleteClick} className="delete-btn data-cell" data-testid ="delete" type="button">
                <img className="delete-img" src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png" alt="delete"/>
            </button>
        </li>
    )
}

export default TransactionItem