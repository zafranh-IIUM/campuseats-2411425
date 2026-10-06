import MenuItemCard from './MenuItemCard';

export default function MenuList({ items = [], onAdd }) {
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
        <MenuItemCard key={item.id} item={item} onAdd={onAdd} />
      ))}
    </div>
  );
}
