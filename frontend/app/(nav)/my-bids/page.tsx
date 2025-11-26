"use client"
import { api } from "@/app/_api/api"
import BidItem from "@/app/_components/BidItem"
// MY BIDS

import { useUserStore } from "@/app/_store/useUserStore"
import { useEffect, useState } from "react"

export default function Page () {
  const {session} = useUserStore()
  const [bids, setBids] = useState<any[]>([])

  useEffect(() => {
    const getBids = async () => {
      try {
        const res = await api.getMyBids()
        setBids(res.data)
      } catch (error) {
        console.error(error);
        
      }
    }
    getBids()
  }, [])

  return (
    <>
    <div className="page-header">
        <h1>Мои ставки</h1>
        <p className="page-subtitle">История ваших ставок на товары</p>
    </div>

    {/* <!-- Summary --> */}
    <div className="bids-summary">
        <div className="summary-card">
            <span className="summary-value">8</span>
            <span className="summary-label">Всего ставок</span>
        </div>
        <div className="summary-card winning">
            <span className="summary-value">3</span>
            <span className="summary-label">Лидирующих ставок</span>
        </div>
        <div className="summary-card">
            <span className="summary-value">185 000 ₽</span>
            <span className="summary-label">Общая сумма</span>
        </div>
    </div>

    {/* <!-- Bids List --> */}
    <div className="bids-list">
        {bids && bids.map((el) => (
          <BidItem key={el.id} {...el} />
        ))}
    </div>

    {/* <!-- Empty State (закомментирован) --> */}
    {/* 
    <div className="no-bids">
        <div className="no-bids-icon">💸</div>
        <h2>Вы еще не делали ставок</h2>
        <p>Просмотрите доступные товары и сделайте первую ставку!</p>
        <a href="/" className="btn-browse">Посмотреть товары</a>
    </div>
     */}
    </>
  )
}