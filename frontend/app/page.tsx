"use client"
// MAIN PAGE

import { useEffect, useState } from "react";
import Stats from "./_components/Stats";
import { useItemStore } from "./_store/useItemStore";
import ItemCard from "./_components/ItemCard";
import { api } from "./_api/api";
import StatsInterface from "./_interface/StatsInterface";

export default function Page () {
  const {items, getItems} = useItemStore()
  const [stats, setStats] = useState({})

  useEffect(() => {
    const getStats = async () => {
      const res = await api.getStats()
      setStats(res)
    }
    getItems()    
    getStats()
  },[])

  return (
    <>
    <div className="page-header">
        <h1>Все товары</h1>
    </div>

    <Stats {...stats} />    

    {items ? (
      <div className="items-grid">
        {items.map((el) => (
          <ItemCard key={el.id} {...el} />
        ))}
      </div>
    ) : (
      <div className="no-items">
        <div className="no-items-icon">📦</div>
        <h2>Товаров пока нет</h2>
        <p>Станьте первым, кто разместит товар на продажу!</p>
      </div>
    )}
   
    </>
  )
}