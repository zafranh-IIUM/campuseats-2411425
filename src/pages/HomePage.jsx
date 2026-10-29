import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { useVendors } from '../hooks/useVendors.js';
import VendorCard from '../components/VendorCard.jsx';
import { Loading, ErrorMessage } from '../components/Status.jsx';

function calculateRemaining() {
  const now = new Date();
  const target = new Date();
  target.setHours(22, 0, 0, 0);

  const diff = target - now;
  if (diff <= 0) {
    return 'Ended';
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s left`;
}

export default function HomePage() {
  const { vendors, loading, error, reload } = useVendors();
  const [timeLeft, setTimeLeft] = useState(() => calculateRemaining());

  // Personal feature (Digit 5): Live countdown for today's specials on HomePage
  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft(calculateRemaining());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  const todaysSpecials = vendors
    .map((vendor) => {
      const specialItem = vendor.menu?.find((item) => item.special);
      return specialItem ? { vendor, specialItem } : null;
    })
    .filter(Boolean);

  return (
    <>
      {todaysSpecials.length > 0 && (
        <section className="section-block">
          <div className="special-banner-header" style={{ marginBottom: '1rem' }}>
            <h2 className="section-title" style={{ marginBottom: 0 }}>
              ⭐ Today&apos;s Daily Specials
            </h2>
            <span className="special-countdown">⏳ Ends in: {timeLeft}</span>
          </div>
          <div className="vendors-grid">
            {todaysSpecials.map(({ vendor, specialItem }) => (
              <Link
                key={specialItem.id}
                to={`/vendor/${vendor.id}`}
                className="special-banner"
                style={{ textDecoration: 'none', display: 'block', marginBottom: 0 }}
              >
                <span className="special-tag">{vendor.name}</span>
                <h3 className="special-name" style={{ marginTop: '0.5rem' }}>
                  {specialItem.name}
                </h3>
                <p className="special-desc">{specialItem.description}</p>
                <div className="special-pricing">
                  <span className="category-tag">{specialItem.category}</span>
                  <span className="special-price">
                    RM {specialItem.price.toFixed(2)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="section-block">
        <h2 className="section-title">Choose a vendor</h2>
        <div className="vendors-grid">
          {vendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      </section>
    </>
  );
}
