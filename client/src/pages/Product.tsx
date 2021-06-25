import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DB } from "../components/DB";
import { Product } from "../types/ProductTypes";

import '../styles/pages/product.css'

export const ProductPage: React.FC = () => {
    const {id} = useParams<{id: string}>()
    const [comment, setComment] = useState('')
    const [product, setProduct] = useState<Product>({
        name: '',
        imageUrl: '',
        comments: [],
        count: 0,
        size: {
            width: -1,
            height: -1
        },
        description: '',
        weight: -1,
        id: "-1"
    })
    
    const reloadProduct = () => {
        DB.getProduct(id).then((productLoaded) => {
            if(productLoaded){
                setProduct(productLoaded)
            }
        })
    }

    useEffect(() => {
        reloadProduct()
    }, [])

    return  (
        <div className="main product-page">
            <section className="product-page__column">
                <img className="product-page__image" src={product.imageUrl} alt="Product image" />
                <h1 className="product-page__name">{product.name}</h1>
                <h3>Count: {product.count}</h3>
                <p className="product-page__description">{product.description}</p>
                <h3>Size:</h3>
                <p>height: {product.size.height}</p> 
                <p>width: {product.size.width}</p>
                <h3>Weight: {product.weight}</h3>
            </section>
            <section className="product-page__column">
                <div className="comments">
                    {product.comments.length === 0 ? <p>here gonna be comments</p> : product.comments.map((comm, i) => <div key={"comment_"+i}>{comm.text}:{comm.date}</div>)}
                </div>
                <form className="comment-add" onSubmit = {(e) => {
                    e.preventDefault()
                    if(comment){
                        DB.appendComment(id, comment).then(() => {
                            reloadProduct()
                        })
                    }
                }}>
                    <input onInput={(e) => {
                        const target = e.target as HTMLInputElement
                        setComment(target.value)
                    }} className="comment-input"type="text" placeholder="Type your comment..." />
                    <button className="btn btn-success">Send</button>
                </form>
            </section>
        </div>
    )
}