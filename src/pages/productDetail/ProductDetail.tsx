import { useParams } from 'react-router-dom';
import styles from './productDetail.module.scss';
import ProductDetailProps from './ProductDetailProps'
import { useLayoutEffect, useState } from 'react';
import { storeInstance } from '../../utils/httpBase';
import { ProductModel } from '../../models';
import { useCartStore } from '../../store/Cart';
import toast, { Toaster } from 'react-hot-toast';
const notify = () => toast('Item added to your cart');

export const ProductDetail = (productDetailProps: ProductDetailProps) => {
    const { id } = useParams();
    const [item, setItem] = useState<ProductModel | null>(null)
    const [activeIndex, setIndex] = useState(0);

    const setActiveIndex = (targetIndex: number) => {

        if (item?.images?.length && targetIndex >= item?.images?.length) {
            setIndex(0)
        } else if (item?.images?.length && targetIndex < 0) {
            setIndex(item?.images?.length - 1)
        } else {
            setIndex(targetIndex)
        }

    }

    const getProductReq = () => {
        storeInstance.get<ProductModel, ProductModel>(`products/${id}`, {
            signal: (new AbortController()).signal
        }).then(data => {
            setItem(data)
        })
    }

    const addToCart: Function = useCartStore((state) => (state as any).addToCart)

    useLayoutEffect(() => {
        getProductReq()
    }, [])
    return <div className='grid grid-cols-1 lg:grid-cols-2 border-2 rounded-lg border-b-slate-400 h-full w-full'>
        <Toaster />
        <div className='lg:min-h-96 p-12'>

            <div id="indicators-carousel" className="relative w-full" data-carousel="static">

                <div className="relative h-56 overflow-hidden rounded-lg md:h-96">

                    {item?.images.map((image, index) => {
                        return <div
                            key={`image-of-${index}`}
                            className={`${activeIndex === index ? 'block' : 'hidden'} duration-700 ease-in-out`} data-carousel-item={`${activeIndex === index ? 'active' : ''}`} >
                            <img src={image} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt={`${item.title} image ${index + 1}`} />
                        </div>
                    })}
                </div>
                <button onClick={() => { setActiveIndex(activeIndex - 1) }} type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                        </svg>
                        <span className="sr-only">Previous</span>
                    </span>
                </button>
                <button onClick={() => { setActiveIndex(activeIndex + 1) }} type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                        </svg>
                        <span className="sr-only">Next</span>
                    </span>
                </button>
            </div>


        </div>
        <div className='lg:min-h-96 p-12 flex flex-col'>
            <h1 className='text-2xl font-semibold'>
                {item?.title}
            </h1>
            <div className='flex justify-between py-3'>
                <div className='text-5xl py-2 text-gray-900 font-semibold font-serif rounded-md text-center'>
                    {item?.price}<span className='text-xl me-1'>.00</span>$
                </div>
                <div className='flex justify-center items-center'>
                    <div className='bg-gray-900 text-white my-1 font-semibold rounded-full px-3 py-1 text-lg'>
                        <em>{item?.category?.name}</em>
                    </div>
                </div>
            </div>
            <p className='pt-2'>
                {item?.description}
            </p>
            <div className='flex-1 flex justify-end items-end'>
                <button onClick={() => { notify(); addToCart(item) }} className='w-full h-12 my-2 h bg-gray-900 hover:bg-gray-700 text-white rounded-lg py-1 text-2xl font-semibold'>Add To Cart</button>
            </div>
        </div>
    </div>
}