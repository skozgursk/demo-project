import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './infiniteScroll.module.scss';
import InfiniteScrollProps from './InfiniteScrollProps'
import { storeInstance } from '../../utils/httpBase';
import { CardDetail } from '../../pages';
import { BaseModel } from '../../models';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Loading } from '../loading/Loading';

export const InfiniteScroll = <T extends BaseModel>({ requestPath }: InfiniteScrollProps) => {
    const [items, setItems] = useState<Array<T>>([])
    const lastElementRef = useRef(null)
    const isMounted = useRef(false)
    const [isOnScreen, setIsOnScreen] = useState(false);
    const searchParams = useSearchParams()
    const location = useLocation()
    const [isLoading, setIsLoading] = useState(true);
    const isItemsLoaded = useRef(false)
    const [filters, setFilter] = useState<string>('')
    const [allChecks, setAllChecks] = useState([false, false, false, false])

    const observerRef = useRef<IntersectionObserver>(new IntersectionObserver((entry) => {
        if (entry[0].isIntersecting) {
            setIsOnScreen(true)
        }
    }));

    const getItemsReq = () => {
        if (!allChecks.includes(false)) {
            setIsLoading(true)
            storeInstance.get<Array<T>, Array<T>>(`${requestPath}?offset=${items.length}&limit=10${filters}`, {
                signal: (new AbortController()).signal
            }).then(data => {
                setItems([...items, ...(data as Array<T>)])
            }).finally(() => { setIsLoading(false) })
        }
    }

    useEffect(() => {
        if (lastElementRef.current && !isMounted.current) {
            isMounted.current = true
            observerRef.current?.observe(lastElementRef.current)
            const tempChecks = Object.assign(allChecks)
            tempChecks[0] = true
            setAllChecks(tempChecks)
        }
    }, [lastElementRef])

    useEffect(() => {
        if (items.length === 0) {
            const tempChecks = Object.assign(allChecks)
            tempChecks[1] = true
            setAllChecks(tempChecks)
            getItemsReq()
        }
    }, [items.length])

    useEffect(() => {
        handleFilters()
        const tempChecks = Object.assign(allChecks)
        tempChecks[2] = true
        setAllChecks(tempChecks)
    }, [location.search])



    const handleFilters = () => {
        let searchFilter = ``
        if (searchParams[0].get('category')) {
            searchFilter = searchFilter + `&categoryId=${searchParams[0].get('category')}`
        }
        if (searchParams[0].get('title')) {
            searchFilter = searchFilter + `&title=${searchParams[0].get('title')}`
        }
        setFilter(searchFilter)
    }

    useEffect(() => {
        const tempChecks = Object.assign(allChecks)
            tempChecks[3] = true
            setAllChecks(tempChecks)
        if (items.length === 0) {
            getItemsReq()
        } else {
            setItems([])
        }
    }, [filters])

    useEffect(() => {
        if (isOnScreen && items.length > 0) {
            getItemsReq()
            isItemsLoaded.current = true
            setIsOnScreen(false)
        }
    }, [isOnScreen])

    return <div className='lg:min-h-[600px] bg-gray-100'>
        {isLoading && <Loading />}
        <div className={`${styles.__element} h-full`}>
            {items && items.map((item: T) => {
                return <div className='flex justify-center items-center' key={item.id}>
                    <CardDetail {...item} />
                </div>
            })}
        </div>
        <div ref={lastElementRef} className='w-full h-1'></div>
    </div>
}