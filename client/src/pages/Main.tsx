import React, { useEffect, useState } from "react";
import { DB } from "../components/DB";
import { Product } from "../components/Product";
import { Product as ProductType } from "../types/ProductTypes";

import '../styles/pages/main.css'
import { TopBar } from "../components/TopBar";
import { RemoveModal } from "../components/RemoveModal";
import { AddModal } from "../components/AddModal";

export const MainPage: React.FC = () => {
    const [products, setProducts] = useState<ProductType[]>([])
    const [isVisibleDeleteModal, setVisibleDeleteModal] = useState(false)
    const [isVisibleAddModal, setVisibleAddModal] = useState(false)
    const [removingID, setRemovingID] = useState( '-1' )
    const [sortingTarget, setSortingTarget] = useState<'name' | 'count'>('name')
    const reloadProducts = () => {
        DB.getProducts(sortingTarget).then(products => {
            setProducts(products)
        })
    }
    useEffect(() => {
        reloadProducts()
    }, [sortingTarget]) //reload products when sorting type changed
    
    return (
        <div className="main">
            <RemoveModal onRemove = {(success) => {
                if(success){ //If agree removing
                    DB.removeProduct(removingID) 
                    setProducts(prev => prev.filter(product => product.id !== removingID))
                }
                setVisibleDeleteModal(false)
            }} visible={isVisibleDeleteModal} />
            <AddModal visible={isVisibleAddModal}  onAdd={(success) => {
                setVisibleAddModal(false)
                if(success){ //if added (not canceled) reload products
                    reloadProducts()
                }
            }}  />


            <TopBar onChangeSort={(target) => {
                setSortingTarget(target) // On left sight buttons toggled target is new sorting method 
            }} onAdd={() => {
                setVisibleAddModal(true) // On clicked right sight button
            }}/>
            <div className="products_wrapper">
                {
                products.map(product => <Product key={`product_key_${product.id}`} {...product} onRemove = {(id) => {                    
                    setRemovingID(id)
                    setVisibleDeleteModal(true)
                }}/> )  
                }
            </div>
        </div>
    )
}