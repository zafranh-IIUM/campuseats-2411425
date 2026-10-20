import { useState, useEffect } from 'react';
import Header from './components/Header';
import VendorCard from './components/VendorCard';
import MenuList from './components/MenuList';
import SpecialBanner from './components/SpecialBanner';
import CartPage from './components/CartPage';
import { Loading, ErrorMessage } from './components/Status';
import Footer from './components/Footer';

export default function App() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const [selectedVendorId, setSelectedVendorId] = useState(null);
  const [cart, setCart] = useState([]);
  const [view, setView] = useState('menu'); // 'menu' | 'cart' | 'done'
  const [lastOrder, setLastOrder] = useState(null);

  // Fetch vendors from mock API with loading, error, and AbortController cleanup
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch('/api/vendors.json', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setVendors(data);
        if (data.length > 0) {
          setSelectedVendorId((prevId) => prevId || data[0].id);
        }
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort(); // Cleanup on unmount or retry
  }, [reloadKey]);

  // Derived values - calculated on every render, never stored in state
  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0);
  const selectedVendor = vendors.find((v) => v.id === selectedVendorId) || vendors[0] || null;
  const specialItem = selectedVendor?.menu?.find((item) => item.special);

  // Cart handlers
  function handleAddToCart(item) {
    setCart((prev) => {
      const existing = prev.find((line) => line.item.id === item.id);
      if (existing) {
        return prev.map((line) =>
          line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line
        );
      }
      return [...prev, { item, qty: 1 }];
    });
  }

  function handleChangeQty(itemId, delta) {
    setCart((prev) =>
      prev
        .map((line) =>
          line.item.id === itemId ? { ...line, qty: line.qty + delta } : line
        )
        .filter((line) => line.qty > 0)
    );
  }

  function handleRemove(itemId) {
    setCart((prev) => prev.filter((line) => line.item.id !== itemId));
  }

  function handlePlaceOrder(details) {
    const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0);
    setLastOrder({ ...details, total });
    setCart([]);
    setView('done');
  }

  // Choose content based on view state
  let content;
  if (view === 'cart') {
    content = (
      <CartPage
        cart={cart}
        onChangeQty={handleChangeQty}
        onRemove={handleRemove}
        onPlaceOrder={handlePlaceOrder}
      />
    );
  } else if (view === 'done') {
    content = (
      <div className="card order-done-card">
        <h2>Order placed! 🎉</h2>
        <p>Thank you for ordering, <strong>{lastOrder?.name}</strong>.</p>
        <p>
          Your order will be delivered to <strong>Mahallah {lastOrder?.mahallah}</strong> at approximately{' '}
          <strong>{lastOrder?.pickupTime}</strong>.
        </p>
        <p className="order-total-highlight">
          Total Amount: <strong>RM {lastOrder?.total?.toFixed(2)}</strong>
        </p>
        <button
          type="button"
          className="btn"
          style={{ marginTop: '1.25rem' }}
          onClick={() => setView('menu')}
        >
          Back to Menus
        </button>
      </div>
    );
  } else if (loading) {
    content = <Loading />;
  } else if (error) {
    content = (
      <ErrorMessage
        message={error}
        onRetry={() => setReloadKey((k) => k + 1)}
      />
    );
  } else {
    content = (
      <>
        <section className="section-block">
          <h2 className="section-title">Choose a vendor</h2>
          <div className="vendors-grid">
            {vendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                isSelected={vendor.id === selectedVendorId}
                onSelect={setSelectedVendorId}
              />
            ))}
          </div>
        </section>

        {selectedVendor && (
          <section className="section-block">
            <h2 className="section-title">Menu: {selectedVendor.name}</h2>

            {/* Personal feature (Digit 5): Live countdown daily special banner */}
            <SpecialBanner specialItem={specialItem} onAdd={handleAddToCart} />

            <MenuList items={selectedVendor.menu} onAdd={handleAddToCart} />
          </section>
        )}
      </>
    );
  }

  return (
    <div className="app-container">
      <Header
        cartCount={cartCount}
        onShowMenu={() => setView('menu')}
        onShowCart={() => setView('cart')}
      />
      <main className="container content-container">{content}</main>
      <Footer />
    </div>
  );
}