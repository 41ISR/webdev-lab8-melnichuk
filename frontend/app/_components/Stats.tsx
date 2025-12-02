import StatsInterface from "../_interface/StatsInterface";

export default function Stats({totalItems, totalBids, activeItems, averageItemPrice}:StatsInterface){
    return (
        <div className="stats">
            <div className="stat-item">
                <span className="stat-value">{totalItems ? totalItems : 0}</span>
                <span className="stat-label">Товаров</span>
            </div>
            <div className="stat-item">
                <span className="stat-value">{totalBids ? totalBids : 0}</span>
                <span className="stat-label">Ставок</span>
            </div>
            <div className="stat-item">
                <span className="stat-value">{activeItems ? activeItems : 0}</span>
                <span className="stat-label">Активных</span>
            </div>
            <div className="stat-item">
                <span className="stat-value">{averageItemPrice ? averageItemPrice : 0} ₽</span>
                <span className="stat-label">Средняя цена</span>
            </div>
    </div>
    )
}