"use client"

import { api } from "@/app/_api/api";
import AuthGuard from "@/app/_components/AuthGuard";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";


export default function Page () {
  const [title, setTitle] = useState<string>("")
  const [description, setDesc] = useState<string>("")
  const [price, setPrice] = useState<string>("")
  const [image, setImage] = useState<string>("")

  const router = useRouter()

  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault()
    try {
      let item
      if(image) {
        item = {
          title: title,
          description: description,
          price: price,
          imageUrl: image
        }
      }else{
        item = {
          title: title,
          description: description,
          price: price
        }
      }

      const res = await api.createItem(item)

      router.push('/')
    } catch (error) {
      console.error(error);
      
    }
  }

  return (
    <AuthGuard>
      <div className="page-header">
        <h1>Создать новый товар</h1>
    </div>

    <div className="form-container">
        <form id="create-item-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="form-label">
                    Название товара <span className="required">*</span>
                </label>
                <input 
                    type="text" 
                    className="form-input" 
                    name="title"
                    placeholder="Например: iPhone 14 Pro 256GB"
                    maxLength={100}
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div className={`char-counter ${title.length >= 85 && 'warning'} ${title.length > 100 && 'error'}`}>
                    <span className="current">{title.length}</span> / 100
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">
                    Описание <span className="required">*</span>
                </label>
                <textarea 
                    className="form-textarea" 
                    name="description"
                    placeholder="Подробно опишите товар, его состояние, характеристики..."
                    maxLength={1000}
                    required
                    value={description}
                    onChange={(e) => setDesc(e.target.value)}
                ></textarea>
                <div className={`char-counter ${description.length >= 950 && 'warning'} ${description.length > 1000 && 'error'}`}>
                    <span className="current">{description.length}</span> / 1000
                </div>
                <div className="form-hint">
                    Чем подробнее описание, тем больше шансов продать товар
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">
                    Начальная цена <span className="required">*</span>
                </label>
                <div className="input-group">
                    <input 
                        type="number" 
                        className="form-input with-prefix" 
                        name="price"
                        placeholder="5000"
                        min="1"
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <span className="input-prefix">₽</span>
                </div>
                <div className="form-hint">
                    Укажите минимальную цену, с которой начнутся торги
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">
                    URL изображения
                </label>
                <input 
                    type="url" 
                    className="form-input" 
                    name="imageUrl"
                    placeholder="https://example.com/image.jpg"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
                <div className="form-hint">
                    Вставьте ссылку на изображение товара (опционально)
                </div>
                <div className={`image-preview ${image && 'active'}`} id="image-preview">
                    <img src={image} alt="Предпросмотр"/>
                </div>
            </div>

            <div className="form-actions">
                <Link href="/" className="btn-cancel">Отмена</Link>
                <button type="submit" className="btn-submit">Создать товар</button>
            </div>
        </form>
    </div>
    </AuthGuard>
  )
}