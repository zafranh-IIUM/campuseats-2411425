import { useState } from 'react';
import Header from './components/Header';
import VendorCard from './components/VendorCard';
import MenuList from './components/MenuList';
import SpecialBanner from './components/SpecialBanner';
import Footer from './components/Footer';
import vendors from './data/vendors';

export default function App() {
  const [selectedVendorId, setSelectedVendorId] = useState(vendors[0].id);
  const [cart, setCart] = useState([]);

  // Derived value: compute selected vendor directly instead of storing duplicate state
  const selectedVendor = vendors.find((v) => v.id === selectedVendorId) || vendors[0];

  // Derived daily special item for Feature 5
  const specialItem = selectedVendor?.menu?.find((item) => item.special);

  // Immutable state update (never use cart.push)
  const handleAddToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  return (
    <div className="app-container">
      <Header cartCount={cart.length} />

      <main className="content-container">
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

        <section className="section-block">
          <h2 className="section-title">Menu: {selectedVendor.name}</h2>

          {/* Personal feature (Digit 5): Daily special banner above menu */}
          <SpecialBanner specialItem={specialItem} onAdd={handleAddToCart} />

          <MenuList items={selectedVendor.menu} onAdd={handleAddToCart} />
        </section>
      </main>

      <Footer />
    </div>
  );
}