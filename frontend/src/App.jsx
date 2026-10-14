import { useEffect, useState } from 'react';
import { getItems, createItem, updateItem, deleteItem } from './api'; // NEW: functions 3k
import ItemForm from './components/ItemForm'; // NEW
import ItemList from './components/ItemList';
import './App.css';

const emptyForm = { itemName: '', description: '', price: '' }; // NEW

function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm); // NEW
  const [editingId, setEditingId] = useState(null); // NEW
  const [error, setError] = useState('');

  const loadItems = () => {
    getItems()
      .then((res) => {
        setItems(res.data);
        setError('');
      })
      .catch((err) => {
        console.error(err);
        setError('Could not load items. Is the backend running?');
      });
  };

  useEffect(() => {
    loadItems();
  }, []);

  // NEW
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // NEW
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...form, price: Number(form.price) };
    try {
      if (editingId) {
        await updateItem(editingId, data);
      } else {
        await createItem(data);
      }
      setForm(emptyForm);
      setEditingId(null);
      loadItems();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Could not save the item.');
    }
  };

  // NEW
  const handleEdit = (item) => {
    setForm({
      name: item.itemName,
      description: item.description,
      price: item.price,
    });
    setEditingId(item._id);
  };

  // NEW
  const handleCancel = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  // NEW
  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      loadItems();
    } catch (err) {
      console.error(err);
      setError('Could not delete the item.');
    }
  };

  return (
    <div className="container">
      <h1>Item Manager</h1>
      {error && <p className="error">{error}</p>}
      <ItemForm
        form={form}
        isEditing={editingId !== null}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
      <ItemList items={items} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default App;
