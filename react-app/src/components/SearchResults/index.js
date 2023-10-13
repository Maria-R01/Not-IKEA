import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchItemsThunk } from '../../store/search';
import { useHistory, useParams } from 'react-router-dom';
import ItemTile from '../ItemTile';

const SearchResults = () => {
    const { searchInput } = useParams();
    // console.log('SEARCH INPUT IN SEARCH RESULTS: ', searchInput)
    const dispatch = useDispatch();
    const items = useSelector(state => state.search.items);

    useEffect(() => {
        // console.log('IN SEARCH COMPONENT USE EFFECT')
        dispatch(searchItemsThunk(searchInput));
    }, [dispatch, searchInput])
    // console.log('IN SEARCH COMPONENT')

    return (
        <div className='all-items-parent-container'>
            {items.length > 0 ? (
                items.map(item => (
                    <ItemTile item={item} key={item.id} className="each-item-container" />
                ))
            ) : (
                <p>No results found</p>
            )}
        </div>
    )
}

export default SearchResults;