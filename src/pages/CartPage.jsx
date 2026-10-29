import { Link, useNavigate } from 'react-router';
import { useCart } from '../hooks/useCart.js';
import CartItem from '../components/CartItem.jsx';
import CheckoutForm from '../components/CheckoutForm.jsx';

export default function CartPage() {
  const { cart, total, changeQty, removeFromCart, placeOrder } = useCart();
  const navigate = useNavigate();

  function handlePlaceOrder(details) {
    placeOrder(details);
    navigate('/orders');
  }

  if (cart.length === 0) {
    return (
      <div className="card empty-cart-box">
        <p className="muted" style={{ marginBottom: '1.25rem' }}>
          Your cart is empty. Pick something from a menu first.
        </p>
        <Link to="/" className="btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
          Browse Vendors
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-layout">
      <div className="card cart-items-card">
        <h2 className="cart-title">Your cart</h2>
        <ul className="cart-list">
          {cart.map((line) => (
            <CartItem
              key={line.item.id}
              line={line}
              onChangeQty={changeQty}
              onRemove={removeFromCart}
            />
          ))}
        </ul>
        <p className="cart-total">Total: RM {total.toFixed(2)}</p>
      </div>

      <CheckoutForm onPlaceOrder={handlePlaceOrder} />
    </div>
  );
}
