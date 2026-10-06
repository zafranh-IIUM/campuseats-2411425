export default function MenuItemCard({ item, onAdd }) {
  if (!item) return null;

  return (
    <div className="card food-card">
      <div className="avatar-box food-avatar">{item.name[0]}</div>
      <span className="category-tag">{item.category}</span>
      <h3 className="food-name">{item.name}</h3>
      <p className="food-desc">{item.description}</p>
      <p className="food-price">RM {item.price.toFixed(2)}</p>

      <button
        type="button"
        className="btn-add"
        disabled={!item.available}
        onClick={() => onAdd(item)}
      >
        {item.available ? 'Add to cart' : 'Sold out'}
      </button>
    </div>
  );
}