export default function Header({ cartCount, onShowMenu, onShowCart }) {
  return (
    <header className="header">
      <div className="navbar-container">
        <h1 className="logo">CampusEats</h1>
        <nav className="nav">
          <button type="button" className="link" onClick={onShowMenu}>Vendors</button>
          <button type="button" className="link cart" onClick={onShowCart}>
            Cart <span className="badge">{cartCount}</span>
          </button>
        </nav>
      </div>
    </header>
  );
}