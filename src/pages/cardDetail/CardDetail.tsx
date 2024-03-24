import { Link } from 'react-router-dom';
import { LazyLoadingImage } from '../../components';
import { BaseModel } from '../../models';
import { useCartStore } from '../../store/Cart';
import styles from './cardDetail.module.scss';
import CardDetailProps from './CardDetailProps'

export const CardDetail = <T extends Record<string, string | number | object | Array<string>>>(cardDetailProps: CardDetailProps<T>) => {



    return <div className="max-w-sm w-full h-full rounded overflow-hidden shadow-lg relative bg-white">
        <Link className='h-full flex flex-col ' to={`/products/${cardDetailProps.id}`}>
            <LazyLoadingImage className="w-full"
                src={`${Array.isArray(cardDetailProps?.images) ? cardDetailProps?.images[0] : ''}`}
                alt="Sunset in the mountains" />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{`${cardDetailProps?.title}`}</div>
                <p className="text-gray-700 text-base">
                    {`${cardDetailProps?.title}`}
                </p>
            </div>
            <div className="flex-1 flex items-end justify-end pb-3 w-full">

                <span className="inline-block bg-gray-200 rounded-full px-5 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{`${cardDetailProps?.price}`}.00$</span>
            </div>
        </Link>

    </div>
}