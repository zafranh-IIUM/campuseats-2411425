import { Link, useParams } from 'react-router';
import { useVendors } from '../hooks/useVendors.js';
import { useCart } from '../hooks/useCart.js';
import MenuList from '../components/MenuList.jsx';
import SpecialBanner from '../components/SpecialBanner.jsx';
import { Loading, ErrorMessage } from '../components/Status.jsx';

export default function VendorPage() {
  const { id } = useParams();
  const { vendors, loading, error, reload } = useVendors();
  const { addToCart } = useCart();

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  const vendor = vendors.find((v) => v.id === id);

  if (!vendor) {
    return (
      <div className="card empty-cart-box">
        <h2>Vendor not found</h2>
        <p className="muted" style={{ margin: '0.75rem 0 1.25rem' }}>
          No vendor matches &ldquo;{id}&rdquo;.
        </p>
        <Link to="/" className="btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
          ← All vendors
        </Link>
      </div>
    );
  }

  const specialItem = vendor.menu?.find((item) => item.special);

  return (
    <section className="section-block">
      <p style={{ marginBottom: '0.75rem' }}>
        <Link to="/" className="back-link">
          ← All vendors
        </Link>
      </p>
      <h2 className="section-title">{vendor.name}</h2>
      <p className="muted" style={{ marginBottom: '1.25rem' }}>
        {vendor.location} · Open: {vendor.openHours}
      </p>

      <SpecialBanner specialItem={specialItem} onAdd={addToCart} />
      <MenuList items={vendor.menu} />
    </section>
  );
}
