import { useRouter } from "next/navigation";
import ItemInterface from "../_interface/ItemInterface";


export default function ItemCard({imageUrl, title, status, description, price, highestBid, bidCount, username, id}:ItemInterface){
    const router = useRouter()

    return (
        <div className="item-card" onClick={() => router.push(`/items/${id}`)}>
            <img src={imageUrl} alt={title} className="item-image" />
            <div className="item-content">
                <span className="status-badge status-active">{status}</span>
                <h3 className="item-title">{title}</h3>
                <p className="item-description">{description}</p>
                <div className="item-footer">
                    <div>
                        <div className="item-price">{price} ₽</div>
                        <div className="bid-info">
                            Текущая ставка: {highestBid ? `${highestBid} ₽`: " –"}
                            <span className="bid-count">{bidCount}</span>
                        </div>
                    </div>
                    <div className="item-meta">
                        <span className="item-seller">Продавец: {username}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}