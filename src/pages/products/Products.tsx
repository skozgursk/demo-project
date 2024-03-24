import { InfiniteScroll } from '../../components';
import styles from './products.module.scss';
import ProductsProps from './ProductsProps'
import { ProductModel } from '../../models'
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';


export const Products = (productsProps: ProductsProps) => {

    const searchParams = useSearchParams()
    const [titleFilter, setTitleFilter] = useState<string>(searchParams[0]?.get('title') ?? '')
    const navigate = useNavigate()
    const timerId = useRef<NodeJS.Timeout | null>(null)


    const handleFilter = () => {
        let filters = ``

        if (searchParams[0]?.get('category')) {
            filters = `${filters}&category=${searchParams[0]?.get('category')}`
        }

        if (titleFilter) {
            filters = `${filters}&title=${titleFilter}`
        }

        timerId.current = null
        navigate(`/products?${filters}`)
    }

    useEffect(() => {
        if (timerId.current) {
            clearTimeout(timerId.current)
        }

        timerId.current = setTimeout(handleFilter, 1000)

    }, [titleFilter])

    return <div className='w-full h-full bg-gray-100 pt-2'>
        <div className='flex flex-row border-2 border-gray-100 rounded-md mb-2 bg-white mt-2 mx-5'>
            <input
                placeholder='Product title'
                type="text" value={titleFilter} onChange={(e) => { setTitleFilter(e.target.value) }}
                className="rounded-sm h-11 w-full bg-white text-black px-3" />
        </div>

        <InfiniteScroll<ProductModel> requestPath='products' />
    </div>
}