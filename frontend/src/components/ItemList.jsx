function ItemList({ items, onEdit, onDelete }) {
    if (items.length === 0) {
        return <p>No items yet </p>
    }

    return(
        <table className='item-table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item) => (
                    <tr key={item._id}>
                        <td>{item.itemName}</td>
                        <td>{item.description}</td>
                        <td>{item.price}</td>
                        <td>
                            <button onClick={() => onEdit(item)}>Edit</button>
                            <button onClick={() => onDelete(item._id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ItemList;