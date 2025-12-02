"use client"

import { api } from "@/app/_api/api";
import BidItem from "@/app/_components/BidItem";
import BidItemInterface from "@/app/_interface/BidItemInterface";
import ItemInterface from "@/app/_interface/ItemInterface";
import timeSince from "@/app/_lib/TimeSince";
import { useItemStore } from "@/app/_store/useItemStore";
import { useUserStore } from "@/app/_store/useUserStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";


export default function Page(){
    const {items, getItems} = useItemStore()
    const [item, setItem] = useState<ItemInterface>()
    const [bids, setBids] = useState<any[]>()
    const [amount, setAmount] = useState<string>("")
    const {session} = useUserStore()
    const id = usePathname().split('/')[2]    
    
    useEffect(() => {
        const handler = async () => {            
            setItem(items.find((el) => el.id == id))

            const res = await api.getItemBids(id)
            setBids(res)
        }
        handler()
    }, [items])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        
        if (item && (Number(amount) <= item.price || Number(amount) <= item.highestBid)) return

        const bid = {amount: amount}
        try {
            const data = await api.createBid(bid, id)
            
            getItems()
        } catch (error) {
            console.error(error);
            
        }
    }

    return (
        <>
        <Link href="/" className="back-link">← Вернуться к списку товаров</Link>

        {item && <div className="item-detail">
            <div className="item-header">
                <div>
                    <img src={item.imageUrl} alt={item.title} className="item-image-large"/>
                </div>

                <div className="item-info">
                    <span className="item-status">{item.status}</span>
                    
                    <h1 className="item-title-large">{item.title}</h1>
                    
                    <div className="item-seller-info">
                        <div className="seller-avatar">{item.username[0].toUpperCase()}</div>
                        <div className="seller-details">
                            <div className="seller-name">{item.username}</div>
                            <div className="seller-date">Опубликовано: {timeSince(item.createdAt)}</div>
                        </div>
                    </div>

                    <div className="item-description-full">
                        {item.description}
                    </div>

                    <div className="price-section">
                        <div className="starting-price">Начальная цена:</div>
                        <div className="current-price">{item.price} ₽</div>
                        <div className="highest-bid">Текущая ставка: {item.highestBid ? item.highestBid : '–'} ₽</div>

                        { session?.user && <form className="bid-form" onSubmit={handleSubmit}>
                            <input 
                                type="number" 
                                className="bid-input" 
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder={`Введите вашу ставку (мин. ${item.highestBid ? item.highestBid : item.price} ₽)`}
                                min={item.highestBid ? item.highestBid : item.price}
                            />
                            <button type="submit" className="btn-bid">Сделать ставку</button>
                        </form>}
                    </div>

                    {session?.user && item.userId == session?.user.id && <button className="btn-delete">Удалить товар</button>}
                </div>
            </div>

            <div className="bids-section">
                <div className="bids-header">
                    <h2 className="bids-title">История ставок</h2>
                    <span className="bids-count">{item.bidCount}</span>
                </div>

                {bids?.length ? <div className="bids-list">
                    {bids.map((bid:BidItemInterface) => (
                        <BidItem key={bid.id} {...bid} isWinning={bid.id == bids[0].id} />
                    ))}
                </div>
                    :
                <div className="no-bids">
                    <p>Ставок пока нет. Станьте первым!</p>
                </div>}
            </div>
        </div> }
    </>
    )
}