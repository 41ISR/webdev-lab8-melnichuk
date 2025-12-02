import BidItemInterface from "../_interface/BidItemInterface"
import timeSince from "../_lib/TimeSince"


export default function BidItem({id, username, amount, createdAt, isWinning}:BidItemInterface){

    return (
        <div className={`bid-item ${isWinning && 'highest-bid-item'}`}>
            <div className="bid-user">
                <div className="bid-avatar">{username[0].toUpperCase()}</div>
                <div className="bid-details">
                    <span className="bid-username">{username}</span>
                    <span className="bid-time">{timeSince(createdAt)}</span>
                </div>
                {isWinning && <span className="highest-badge">🏆 Лидирует</span>}
            </div>
            <div className="bid-amount">{amount} ₽</div>
        </div>
    )
}