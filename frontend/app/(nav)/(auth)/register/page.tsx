"use client"

import { api } from "@/app/_api/api"
import { useUserStore } from "@/app/_store/useUserStore"
import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"

export default function Page () {
    const [error, setError] = useState<string>('')
    const { setSession } = useUserStore()
    const router = useRouter()

    const [username, setUN] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPass] = useState<string>('')
    const [passwordCh, setPassCh] = useState<string>('')
    
    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault()
        setError('')
        if(password !== passwordCh) {setError('Пароли не совпадают'); return}

        const user = {
            username: username,
            email: email,
            password: password
        }
        try {
            const res = await api.regUser(user)
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
                <div className="auth-icon">👤</div>
                <h1 className="auth-title">Регистрация</h1>
                <p className="auth-subtitle">Создайте новый аккаунт</p>
            </div>

            {error && <div className="alert alert-error" id="error-alert">
                {error}
            </div>}

            <form id="register-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Имя пользователя</label>
                    <input 
                        type="text" 
                        className="form-input" 
                        name="username"
                        placeholder="Введите имя пользователя"
                        minLength={3}
                        required
                        autoComplete="username"
                        value={username}
                        onChange={(e) => setUN(e.target.value)}
                    />
                    <div className="form-hint">Минимум 3 символа</div>
                    <div className="form-error">Имя пользователя должно быть не менее 3 символов</div>
                </div>

                <div className="form-group">
                    <label className="form-label">Email <span className="optional">(необязательно)</span></label>
                    <input 
                        type="email" 
                        className="form-input" 
                        name="email"
                        placeholder="example@email.com"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="form-error">Введите корректный email</div>
                </div>

                <div className="form-group">
                    <label className="form-label">Пароль</label>
                    <input 
                        type="password" 
                        className="form-input" 
                        name="password"
                        placeholder="Введите пароль"
                        minLength={6}
                        required
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPass(e.target.value)}
                    />
                    <div className="password-strength">
                        <div className="password-strength-bar" id="password-strength-bar"></div>
                    </div>
                    <div className="form-hint">Минимум 6 символов</div>
                    <div className="form-error">Пароль должен быть не менее 6 символов</div>
                </div>

                <div className="form-group">
                    <label className="form-label">Подтверждение пароля</label>
                    <input 
                        type="password" 
                        className="form-input" 
                        name="confirmPassword"
                        placeholder="Повторите пароль"
                        required
                        autoComplete="new-password"
                        value={passwordCh}
                        onChange={(e) => setPassCh(e.target.value)}
                    />
                    <div className="form-error">Пароли не совпадают</div>
                </div>

                <button type="submit" className="btn-submit">Зарегистрироваться</button>
            </form>

            <div className="auth-divider">или</div>

            <div className="auth-link">
                Уже есть аккаунт? <a href="/login">Войти</a>
            </div>
        </div>
    )
}