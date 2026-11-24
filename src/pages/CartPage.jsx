import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useCart } from '../hooks/useCart.js'
import { useAuth } from '../hooks/useAuth.js'
import { placeOrders } from '../services/orders.js'
import CartItem from '../components/CartItem.jsx'
import CheckoutForm from '../components/CheckoutForm.jsx'

export default function CartPage() {
  const { cart, total, changeQty, removeFromCart, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  async function handlePlaceOrder(details) {
    setError('')
    try {
      // TODO 4: await placeOrders(user, cart, details), then clearCart(), then navigate('/orders')
      await placeOrders(user, cart, details)
      clearCart()
      navigate('/orders')
    } catch (err) {
      setError(`Could not place the order: ${err.message}`)
    }
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
    )
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

      <div>
        {error && (
          <p className="field-error" role="alert" style={{ marginBottom: '1rem' }}>
            {error}
          </p>
        )}
        <CheckoutForm
          key={user?.uid ?? 'guest'}
          defaultName={user?.displayName ?? ''}
          onPlaceOrder={handlePlaceOrder}
        />
      </div>
    </div>
  )
}
