import './HomePage.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { allItemsThunk } from '../../store/item'
import ItemTile from '../ItemTile';

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
                    <ItemTile item={item} />
                ))}
            </div>
        </>
    )

}

export default HomePage;