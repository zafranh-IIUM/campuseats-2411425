export default function Header({ cartCount = 0 }) {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <h1 className="brand-logo">CampusEats</h1>
        <nav className="nav-links">
          <a href="#vendors">Vendors</a>
          <a href="#orders">My Orders</a>
          <a href="#cart">
            Cart <span className="cart-badge">{cartCount}</span>
          </a>
        </nav>
      </div>
    </header>
  );
}