import axios from "axios";
import { Product } from "../types/ProductTypes";


export class DB {
    static server_link = 'http://localhost:8000'
    static async getProducts(sortby: 'name' | 'count' = 'name'): Promise<Product[]>{ //we delegating sorting for sql, cause we probably have many products 
        const products = (await axios.get(this.server_link+'/products/'+sortby)).data as Product[]
        return products
    }
    static async getProduct(id: string): Promise<Product | undefined>{
        try {
            const product = (await axios.get(this.server_link+'/product', {params: {id}})).data as Product             
            return product
        } catch (error) {
            return
        }
    }
    static async removeProduct(id: string): Promise<boolean>{
        console.log(id)
        try {
            (await axios.delete(this.server_link+'/product', {params: {id}})).data as Product
            return true
        } catch (error) {
            return false
        }
    }
    static async createProduct(product: {
        imageUrl: string,
        name: string,
        count: string,
        width: string,
        height: string,
        weight: string,
        description: string
    }){
        try {
            await axios.post(this.server_link+'/product', null, {params: product})                    
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    static async appendComment(id: string, text: string){
        try {
            await axios.put(this.server_link+'/comment', null, {params: {id, text}})                    
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
}