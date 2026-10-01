export default function VendorCard() {
  // Use a real stall from your Mahallah!
  const vendor = {
    name: 'Kafe Mahallah Ali',
    location: 'Mahallah Ali, Block C',
    hours: '7:00 am - 10:00 pm',
    isOpen: true
  };

  return (
    <div className="card vendor-card">
      <div className="avatar-box">{vendor.name[0]}</div>
      <div className="vendor-info">
        <h2 className="vendor-name">{vendor.name}</h2>
        <p className="vendor-meta">{vendor.location}</p>
        <p className="vendor-meta">Open: {vendor.hours}</p>
        {/* Dynamic Open/Closed label */}
        <span className="status-badge" style={{ backgroundColor: vendor.isOpen ? '#e6f9ed' : '#fee2e2', color: vendor.isOpen ? '#16a34a' : '#dc2626' }}>
          {vendor.isOpen ? "Open now" : "Closed"}
        </span>
      </div>
    </div>
  );
}