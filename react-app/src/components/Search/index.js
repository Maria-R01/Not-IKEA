import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allItemsThunk } from '../../store/item';
import { useHistory } from 'react-router-dom';

const Search = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [searchItem, setSearchItem] = useState('');

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        history.push(`/search-results/${searchItem}`)
        setSearchItem('')
    };
    // console.log('IN SEARCH COMPONENT')
    return (
        <div>
            <form className="search-bar" onSubmit={handleSearchSubmit}>
                <input
                type="text"
                placeholder="What are you looking for?"
                // name="search"
                value={searchItem}
                onChange={e => setSearchItem(e.target.value)}
                />
                <button type="submit">
                    <i className="fa-solid fa-search fa-lg"></i>
                </button>
            </form>
        </div>
    );
};

export default Search;
