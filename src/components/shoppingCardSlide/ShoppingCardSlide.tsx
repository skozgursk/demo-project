import { useState } from 'react';
import styles from './shoppingCardSlide.module.scss';
import ShoppingCardSlideProps from './ShoppingCardSlideProps'
import { useCartStore } from '../../store/Cart';
import { CartStoreModel, ProductModel, ProductStoreModel } from '../../models';

export const ShoppingCardSlide = ({ isOpen, togglePanel }: ShoppingCardSlideProps) => {
    const store: CartStoreModel = useCartStore()

    return <div className={`relative z-10 ${isOpen ? 'block' : 'hidden'}`} aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
        {/* Background backdrop */}
        <div className={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`}></div>

        {/* Slide-over panel */}
        <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                    <div className={`pointer-events-auto relative w-screen max-w-lg transform transition ease-in-out duration-500 sm:duration-700 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                        {/* Close button */}
                        <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                            <button type="button" onClick={() => togglePanel()} className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
                                <span className="absolute -inset-2.5"></span>
                                <span className="sr-only">Close panel</span>
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Panel content */}
                        <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                            <div className="px-4 sm:px-6">
                                <h2 className="text-base font-semibold leading-6 text-gray-900" id="slide-over-title">
                                    Card Items
                                </h2>
                            </div>
                            <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                <div className="relative w-full h-full border-b-2 border-b-solid border-b-black pb-2 pt-7">
                                    {store.products.map((item: ProductStoreModel) => {
                                        return <div key={item.id} className="grid grid-cols-12 border-b-2 border-black my-2 pb-1">
                                            <div className="col-span-8">{item.title}</div>
                                            <div className="col-span-1">{item.count}</div>
                                            <div className="col-span-2">{item.price * item.count} $</div>
                                            <div className="col-span-1">
                                                <button className={`h-full w-full p-2`} onClick={() => { store.removeItem(item.id) }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                        <path
                                                            d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" /></svg>
                                                </button>
                                            </div>
                                        </div>
                                    })}
                                </div>
                            </div>
                            <div className='flex justify-between px-6 font-semibold underline underline-offset-2'>
                                <button onClick={() => { store.removeAllItems() }} >Remove All</button>
                                <button onClick={() => { togglePanel(); }} >Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}