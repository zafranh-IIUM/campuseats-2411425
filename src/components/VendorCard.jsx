export default function VendorCard({ vendor, isSelected, onSelect }) {
  if (!vendor) return null;

  return (
    <button
      type="button"
      className={`card vendor-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(vendor.id)}
    >
      <div className="avatar-box">{vendor.name[0]}</div>
      <div className="vendor-info">
        <h2 className="vendor-name">{vendor.name}</h2>
        <p className="vendor-meta">{vendor.location}</p>
        <p className="vendor-meta">Open: {vendor.openHours}</p>
        <span
          className="status-badge"
          style={{
            backgroundColor: vendor.isOpen ? '#e6f9ed' : '#fee2e2',
            color: vendor.isOpen ? '#16a34a' : '#dc2626'
          }}
        >
          {vendor.isOpen ? 'Open now' : 'Closed'}
        </span>
      </div>
    </button>
  );
}