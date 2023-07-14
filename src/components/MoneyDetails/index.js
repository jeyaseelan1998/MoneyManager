import './index.css'

const MoneyDetails = ({type, amount, testid}) => {
    const title = type[0].toUpperCase() + type.slice(1)
    const imageUrl = `https://assets.ccbp.in/frontend/react-js/money-manager/${type}-image.png`

    return (
        <div className={`money-details-container ${type}`}>
            <img src={imageUrl} alt={type} className="image"/>
            <div>
                <p className="money-type">Your {title}</p>
                <p className="amount">RS</p>
                <p className="amount" data-testid={testid}>{amount}</p>
            </div>
        </div>
    )
}

export default MoneyDetails