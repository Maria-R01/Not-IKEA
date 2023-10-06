import './ItemTile.css';

const ItemTile = ({ item }) => {
    return (
        <>
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
        </>
    )

}

export default ItemTile;