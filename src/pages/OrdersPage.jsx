import { Link } from 'react-router'
import { useMyOrders } from '../hooks/useMyOrders.js'
import OrderStatus from '../components/OrderStatus.jsx'
import OrderActions from '../components/OrderActions.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'

export default function OrdersPage() {
  const { orders, loading, error } = useMyOrders()

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />

  if (orders.length === 0) {
    return (
      <div className="card empty-cart-box">
        <h2>My Orders</h2>
        <p className="muted" style={{ margin: '0.75rem 0 1.25rem' }}>
          You haven&apos;t placed any orders yet.
        </p>
        <Link to="/" className="btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
          Browse Vendors
        </Link>
      </div>
    )
  }

  return (
    <section className="section-block">
      <h2 className="section-title">My Orders</h2>
      <p className="muted" style={{ marginBottom: '1.25rem' }}>
        Status updates appear here live.
      </p>

      <ul className="orders-list" style={{ listStyle: 'none', padding: 0 }}>
        {orders.map((order) => (
          <li key={order.id} className="card order-card" style={{ marginBottom: '1.25rem' }}>
            <div className="order-card-header">
              <div>
                <h3 className="order-customer" style={{ fontSize: '1.15rem', fontWeight: 600 }}>
                  {order.vendorName} · pickup {order.pickupTime}
                </h3>
                <p className="muted">
                  Customer: {order.studentName} · Mahallah {order.mahallah}
                </p>
              </div>
              <span className="muted" style={{ fontSize: '0.85rem' }}>
                Placed{' '}
                {order.createdAt?.toDate
                  ? order.createdAt.toDate().toLocaleString('en-MY')
                  : 'just now'}
              </span>
            </div>

            <ul className="cart-list" style={{ margin: '0.75rem 0' }}>
              {order.items?.map((item) => (
                <li key={item.itemId || item.name} className="order-item-row">
                  <span>
                    {item.qty} × {item.name}
                  </span>
                  <span>RM {(item.price * item.qty).toFixed(2)}</span>
                </li>
              ))}
            </ul>

            <p className="order-total-highlight" style={{ margin: '0.5rem 0' }}>
              Total: RM {order.total.toFixed(2)}
            </p>

            <OrderStatus status={order.status} />

            {order.status === 'Received' && <OrderActions order={order} />}
          </li>
        ))}
      </ul>
    </section>
  )
}
