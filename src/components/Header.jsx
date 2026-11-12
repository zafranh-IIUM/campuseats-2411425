import { Link, NavLink, useNavigate } from 'react-router'
import { useCart } from '../hooks/useCart.js'
import { useAuth } from '../hooks/useAuth.js'

export default function Header() {
  const { count } = useCart()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  return (
    <header className="header">
      <div className="navbar-container">
        <Link to="/" className="logo-link">
          <h1 className="logo">CampusEats</h1>
        </Link>
        <nav className="nav">
          <NavLink to="/" end>
            Vendors
          </NavLink>
          <NavLink to="/orders">
            My Orders
          </NavLink>
          <NavLink to="/cart" className="cart">
            Cart <span className="badge">{count}</span>
          </NavLink>
          {user ? (
            <>
              <span className="user-name">Hi, {user.displayName || user.email}</span>
              <button type="button" className="link" onClick={handleLogout}>
                Log out
              </button>
            </>
          ) : (
            <NavLink to="/login">Log in</NavLink>
          )}
        </nav>
      </div>
    </header>
  )
}
