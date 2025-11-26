"use client"

import Link from "next/link";
import { useUserStore } from "../_store/useUserStore";
import { useRouter } from "next/navigation";

export default function Navbar () {
    const { session } = useUserStore()
    const router = useRouter()

    return (
        <nav>
            <Link href={'/'} className="logo">🛒 Маркетплейс</Link>

            {session.token ? <ul className="nav-links" id="auth-nav">
                <li><Link href={"/"} className="active">Товары</Link></li>
                <li><Link href={"/my-bids"}>Мои ставки</Link></li>
                <li><Link href="/create-item" className="btn-primary">+ Создать товар</Link></li>
                <li className="user-info">
                    <span className="username">{session.user.username}</span>
                    <button onClick={() => router.replace('/logout')} className="btn-logout">Выйти</button>
                </li>
            </ul>
            :
            <ul className="nav-links" id="guest-nav">
                <li><Link href={"/"}>Товары</Link></li>
                <li><Link href={"/login"}>Войти</Link></li>
                <li><Link href={"/register"} className="btn-primary">Регистрация</Link></li>
            </ul>}
        </nav>
    )
}