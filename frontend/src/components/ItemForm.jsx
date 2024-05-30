import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editItem, createItem } from '../store/items'; // Added createItem import

const ItemForm = ({ itemId, hideForm, pokemonId }) => { // Added pokemonId prop
  const item = useSelector(state => state.items[itemId]) || { name: '', happiness: '', price: '' }; // Updated to handle new item

  const [name, setName] = useState(item.name);
  const [happiness, setHappiness] = useState(item.happiness);
  const [price, setPrice] = useState(item.price);

  const dispatch = useDispatch();

  const updateName = (e) => setName(e.target.value);
  const updateHappiness = (e) => setHappiness(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { ...item, name, happiness, price };

    let returnedItem;
    if (itemId) {
      returnedItem = await dispatch(editItem(itemId, payload));
    } else {
      returnedItem = await dispatch(createItem(payload, pokemonId));
    }

    if (returnedItem) {
      hideForm();
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    hideForm();
  };

  return (
    <section className="edit-form-holder centered middled">
      <form className="item-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={updateName}
        />
        <input
          type="number"
          placeholder="Happiness"
          min="0"
          max="100"
          required
          value={happiness}
          onChange={updateHappiness}
        />
        <input
          type="number"
          placeholder="Price"
          required
          value={price}
          onChange={updatePrice}
        />
        <button type="submit">{itemId ? 'Update Item' : 'Add Item'}</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
      </form>
    </section>
  );
};

export default ItemForm;
