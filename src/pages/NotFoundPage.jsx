import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <div className="card empty-cart-box">
      <h2>404 — Page Not Found</h2>
      <p className="muted" style={{ margin: '0.75rem 0 1.25rem' }}>
        No page at this address.
      </p>
      <Link to="/" className="btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
        Back to Home
      </Link>
    </div>
  );
}
