import { Product as ProductType} from "../types/ProductTypes"
import '../styles/components/product.css'
import { useHistory } from "react-router-dom"


export const Product: React.FC<ProductType & {onRemove?: (id: string) => void}> = ({
    id,
    imageUrl,
    name,
    description,
    count,
    onRemove
}) => {
    const history = useHistory()


    return (
        <div className="product" >
            <div style={{
                backgroundImage: `url('${imageUrl}')`
            }}  className="product__image"onClick={() => {
            history.push('/product/'+id)
            }}/>
            <h3 className="product__title">{name}</h3>
            <p className="product__description">{description}</p>
            <span className="product__footer">
                {count}
                <button onClick={ () => {
                    if(onRemove){
                        onRemove(id)
                    }
                } } className="btn btn-danger">Remove</button>
            </span>               
        </div>
    )
}