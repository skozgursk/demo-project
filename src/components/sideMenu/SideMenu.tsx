import { useLayoutEffect, useRef, useState } from 'react';
import { storeInstance } from '../../utils/httpBase';
import styles from './sideMenu.module.scss';
import SideMenuProps from './SideMenuProps'
import { Link } from 'react-router-dom';

export const SideMenu = (sideMenuProps: SideMenuProps) => {
    const [items, setItems] = useState<Array<any>>([])
    const isMounted = useRef(false)

    const getCategoriesReq = () => {
        storeInstance.get<Array<any>, Array<any>>(`categories`, {
            signal: (new AbortController()).signal
        }).then(data => {
            setItems([...items, ...(data as Array<any>)])
        })
    }

    useLayoutEffect(() => {
        if (!isMounted.current) {
            getCategoriesReq()
            isMounted.current = true;
        }
    }, [])

    return <div className={`flex lg:flex-col bg-gray-100 rounded-lg`}>
        <h2 className=' py-2 ps-2 w-28 text-lg font-semibold'>Categories:</h2>
        <div className={`
        px-1 h-12 max-w-[300px] overflow-x-auto flex items-center
        lg:max-w-[200px] lg:overflow-none lg:h-full lg:flex-col lg:items-start
        `}>
            <Link className='
                ps-1 py-1 mx-2 font-semibold
                lg:w-44 lg:text-center lg:border-2 lg:border-black lg:my-2 lg:rounded-lg' to={`/products`}>
                    All
                </Link>
            {items.map(item => {
                return <Link className='
                ps-1 py-1 mx-2 font-semibold
                lg:w-44 lg:text-center lg:border-2 lg:border-black lg:my-2 lg:rounded-lg' to={`/products?category=${item.id}`} key={item.id}>
                    {item.name}
                </Link>
            })}
        </div>

    </div>
}