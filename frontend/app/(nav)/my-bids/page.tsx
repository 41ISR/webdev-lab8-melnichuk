"use client"

import { api } from "@/app/_api/api"
import AuthGuard from "@/app/_components/AuthGuard"
import MyBidItem from "@/app/_components/MyBidItem"
import { useItemStore } from "@/app/_store/useItemStore"
import Link from "next/link"

// MY BIDS

import { useEffect, useState } from "react"

export default function Page () {
  const [bids, setBids] = useState<any[]>([])
  const {getItems} = useItemStore()

  useEffect(() => {
    const getBids = async () => {
      try {
        const res = await api.getMyBids()
        setBids(res.data)
        getItems()
      } catch (error) {
        console.error(error);
        
      }
    }
    getBids()
  }, [])

  return (
    <AuthGuard>
    <div className="page-header">
        <h1>Мои ставки</h1>
        <p className="page-subtitle">История ваших ставок на товары</p>
    </div>

    {bids.length ? (
      <>
        <div className="bids-summary">
          <div className="summary-card">
              <span className="summary-value">{bids ? bids.length : '0'}</span>
              <span className="summary-label">Всего ставок</span>
          </div>
          <div className="summary-card winning">
              <span className="summary-value">{bids ? bids.filter((el) => el.isWinning === true).length : '0'}</span>
              <span className="summary-label">Лидирующих ставок</span>
          </div>
          <div className="summary-card">
              <span className="summary-value">{bids ? bids.reduce((acc, el) => acc + el.amount, 0) : '0'} ₽</span>
              <span className="summary-label">Общая сумма</span>
          </div>
      </div>

      <div className="bids-list">
          {bids && bids.map((el) => (
            <MyBidItem key={el.id} {...el} />
          ))}
      </div>
    </>):(
    <div className="no-bids">
        <div className="no-bids-icon">💸</div>
        <h2>Вы еще не делали ставок</h2>
        <p>Просмотрите доступные товары и сделайте первую ставку!</p>
        <Link href={"/"} className="btn-browse">Посмотреть товары</Link>
    </div>
    )}
    </AuthGuard>
  )
}