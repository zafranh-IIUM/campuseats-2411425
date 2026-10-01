export default function Header() {
  const cartCount = 0; // Hardcoded for Week 1

  return (
    <header className="navbar">
      <div className="navbar-container">
        <h1 className="brand-logo">CampusEats</h1>
        <nav className="nav-links">
          <a href="#">Vendors</a>
          <a href="#">My Orders</a>
          <a href="#">Cart <span className="cart-badge">{cartCount}</span></a>
        </nav>
      </div>
    </header>
  );
}