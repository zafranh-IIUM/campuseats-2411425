import { Link, useParams } from 'react-router'
import { useVendor } from '../hooks/useVendor.js'
import { useCart } from '../hooks/useCart.js'
import MenuList from '../components/MenuList.jsx'
import SpecialBanner from '../components/SpecialBanner.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'

export default function VendorPage() {
  const { id } = useParams()
  const { vendor, menu, loading, error } = useVendor(id)
  const { addToCart } = useCart()

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />
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
    )
  }

  // Each cart line must know its vendor, so orders can be split per vendor.
  const items = menu.map((item) => ({ ...item, vendorName: vendor.name }))
  const specialItem = items.find((item) => item.special ?? item.popular)

  return (
    <section className="section-block">
      <p style={{ marginBottom: '0.75rem' }}>
        <Link to="/" className="back-link">
          ← All vendors
        </Link>
      </p>
      <h2 className="section-title">{vendor.name}</h2>
      <p className="muted" style={{ marginBottom: '1.25rem' }}>
        {vendor.location || vendor.Location} · Open: {vendor.openHours}
      </p>

      {specialItem && <SpecialBanner specialItem={specialItem} onAdd={addToCart} />}
      <MenuList items={items} />
    </section>
  )
}
