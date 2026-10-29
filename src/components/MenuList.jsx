import MenuItemCard from './MenuItemCard';
import { useCart } from '../hooks/useCart.js';

export default function MenuList({ items = [] }) {
  const { addToCart } = useCart();

  if (!items || items.length === 0) {
    return (
      <div className="empty-menu-container">
        <p className="empty-menu-msg">No items on this menu yet.</p>
      </div>
    );
  }

  return (
    <div className="items-grid">
      {items.map((item) => (
        <MenuItemCard key={item.id} item={item} onAdd={addToCart} />
      ))}
    </div>
  );
}
