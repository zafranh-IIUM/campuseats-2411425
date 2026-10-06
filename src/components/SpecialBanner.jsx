export default function SpecialBanner({ specialItem, onAdd }) {
  if (!specialItem) return null;

  return (
    <div className="special-banner">
      <div className="special-banner-header">
        <span className="special-tag">⭐ Today's Daily Special</span>
        <span className="special-countdown">⏳ Limited Daily Batch</span>
      </div>
      <div className="special-content">
        <div className="special-details">
          <h3 className="special-name">{specialItem.name}</h3>
          <p className="special-desc">{specialItem.description}</p>
          <div className="special-pricing">
            <span className="category-tag">{specialItem.category}</span>
            <span className="special-price">RM {specialItem.price.toFixed(2)}</span>
          </div>
        </div>
        <button
          type="button"
          className="btn-add special-btn"
          disabled={!specialItem.available}
          onClick={() => onAdd(specialItem)}
        >
          {specialItem.available ? 'Add special to cart' : 'Sold out'}
        </button>
      </div>
    </div>
  );
}
