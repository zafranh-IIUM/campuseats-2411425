import { Link } from 'react-router';
import { useCart } from '../hooks/useCart.js';

export default function OrdersPage() {
  const { orders } = useCart();

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
    );
  }

  return (
    <section className="section-block">
      <h2 className="section-title">My Orders</h2>
      <div className="orders-list">
        {orders.map((order) => (
          <article key={order.id} className="card order-card">
            <div className="order-card-header">
              <div>
                <h3 className="order-customer">{order.name}</h3>
                <p className="muted">
                  Mahallah {order.mahallah} · Pickup at {order.pickupTime}
                </p>
              </div>
              {order.placedAt && <span className="muted">{order.placedAt}</span>}
            </div>
            <ul className="cart-list">
              {order.items?.map((line) => (
                <li key={line.item.id} className="order-item-row">
                  <span>
                    {line.qty} × {line.item.name}
                  </span>
                  <span>RM {(line.item.price * line.qty).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <p className="cart-total">Total: RM {order.total?.toFixed(2)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
