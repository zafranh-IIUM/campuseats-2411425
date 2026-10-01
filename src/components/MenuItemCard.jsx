export default function MenuItemCard() {
  const item = {
    name: 'Nasi Lemak Ayam',
    description: 'Coconut rice, fried chicken, sambal, egg and peanuts',
    price: 7.5,
    available: true
  };

  return (
    <div className="card food-card">
      <div className="avatar-box food-avatar">{item.name[0]}</div>
      <h3 className="food-name">{item.name}</h3>
      <p className="food-desc">{item.description}</p>
      {/* Price formatted to 2 decimals */}
      <p className="food-price">RM {item.price.toFixed(2)}</p>
      
      {/* Dynamic Button */}
      <button 
        className="btn-add" 
        disabled={!item.available}
        style={{ backgroundColor: item.available ? '' : '#9ca3af' }}
      >
        {item.available ? "Add to cart" : "Sold out"}
      </button>
    </div>
  );
}