import './index.css'

const MoneyDetails = ({type, amount}) => {
    const title = type[0].toUpperCase() + type.slice(1)
    const imageUrl = `https://assets.ccbp.in/frontend/react-js/money-manager/${type}-image.png`

    return (
        <li className={`money-details-container ${type}`}>
            <img src={imageUrl} alt={type} className="image"/>
            <div>
                <p className="money-type">Your {title}</p>
                <p className="amount">RS {amount}</p>
            </div>
        </li>
    )
}

export default MoneyDetails