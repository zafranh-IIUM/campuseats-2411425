import { Link, NavLink } from 'react-router';
import { useCart } from '../hooks/useCart.js';

export default function Header() {
  const { count } = useCart();

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
        </nav>
      </div>
    </header>
  );
}
