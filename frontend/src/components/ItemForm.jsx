function ItemForm({ form, isEditing, onChange, onSubmit, onCancel }) {
    return(
        <form className='item-form' onSubmit={onSubmit}>
            <input name="itemName" placeholder="Item name" value={form.itemName} onChange={onChange} required/>

            <input name="description" placeholder="Item Description" value={form.description} onChange={onChange} />

            <input name="price" placeholder="Item price" value={form.price} onChange={onChange} required />

            <button type="submit">{isEditing ? 'Update item' : 'Add Item'}</button>

            {isEditing && ( 
                <button type="button" onClick={onCancel} > Cancel </button>
            )}
        </form>
    );

}

export default ItemForm;