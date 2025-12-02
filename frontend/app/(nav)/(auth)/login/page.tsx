"use client"

import { api } from "@/app/_api/api"
import { useUserStore } from "@/app/_store/useUserStore"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent, use, useState } from "react"

export default function Page () {
  const [error, setError] = useState<string>('')
  const { setSession } = useUserStore()
  const router = useRouter()
  const [username, setUN] = useState<string>('')
  const [password, setPass] = useState<string>('')
  
  const handleSubmit = async (e:FormEvent) => {
      e.preventDefault()
      setError('')
      const user = {
          username: username,
          password: password
      }
      try {
          const res = await api.logUser(user)
          setSession(res.data)
          router.replace('/')
      } catch (err:any) {
          console.error(err);
          setError(err.message)
      }
  }

  return (
    <div className="auth-container">
        <div className="auth-header">
            <div className="auth-icon">🔐</div>
            <h1 className="auth-title">Вход</h1>
            <p className="auth-subtitle">Войдите в свой аккаунт</p>
        </div>

        {error && <div className="alert alert-error" id="error-alert">
            {error}
        </div>}

        <form id="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="form-label">Имя пользователя</label>
                <input 
                    type="text" 
                    className="form-input" 
                    name="username"
                    placeholder="Введите имя пользователя"
                    required
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUN(e.target.value)}
                />
                <div className="form-error">Введите имя пользователя</div>
            </div>

            <div className="form-group">
                <label className="form-label">Пароль</label>
                <input 
                    type="password" 
                    className="form-input" 
                    name="password"
                    placeholder="Введите пароль"
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPass(e.target.value)}
                />
                <div className="form-error">Введите пароль</div>
            </div>

            <button type="submit" className="btn-submit">Войти</button>
        </form>

        <div className="auth-divider">или</div>

        <div className="auth-link">
            Нет аккаунта? <Link href="/register">Зарегистрироваться</Link>
        </div>
    </div>
  )
}