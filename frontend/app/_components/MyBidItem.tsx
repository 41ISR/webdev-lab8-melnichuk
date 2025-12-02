import Link from "next/link";
import BidInterface from "../_interface/BidInterface";
import ItemInterface from "../_interface/ItemInterface";
import { useItemStore } from "../_store/useItemStore";

export default function MyBidItem({amount, isWinning, itemTitle, itemId}:BidInterface){
    const {items} = useItemStore()
    const item: ItemInterface = items.filter((el) => el.id == itemId)[0]
    

    return(
        <div className={`bid-item ${isWinning && "winning"}`}>
            <img src={item.imageUrl} alt={itemTitle} className="bid-item-image"/>
            <div className="bid-item-content">
                <div className="bid-item-header">
                    <Link href={`/items/${itemId}`} className="bid-item-title">{item.title}</Link>
                    <span className="winning-badge">{isWinning ? "🏆 Лидирую" : "Перебита"}</span>
                </div>
                <div className="bid-item-meta">
                    <span>⏰ 2 часа назад</span>
                    <span>💰 Начальная: {item.price} ₽</span>
                </div>
            </div>
            <div className="bid-item-amount">
                <span className="bid-amount">{amount} ₽</span>
                <span className="bid-status">Моя ставка</span>
            </div>
        </div>
    )
}