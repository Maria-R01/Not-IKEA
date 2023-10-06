import './HomePage.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { allItemsThunk } from '../../store/item'

const HomePage = () => {
    const dispatch = useDispatch();
    const itemData = useSelector(state => state.items.allItems)
    // console.log(itemData)

    useEffect(() => {
        dispatch(allItemsThunk())
    }, [dispatch])

    return (
        <>
            <div className='all-items-parent-container'>
                {itemData.map(item => (
                    <div key={item.id}>
                        <div>
                            Name: {item.item_name}
                        </div>
                        <div>
                            <img src={item.images[0].url}></img>
                        </div>
                        <div>
                            Price: ${item.price}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )

}

export default HomePage;