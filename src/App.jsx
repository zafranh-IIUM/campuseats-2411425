import Header from './components/Header';
import VendorCard from './components/VendorCard';
import MenuItemCard from './components/MenuItemCard';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="app-container">
      <Header />
      
      <main className="content-container">
        <section className="section-block">
          <h2 className="section-title">Today's vendors</h2>
          <VendorCard />
        </section>

        <section className="section-block">
          <h2 className="section-title">Popular items</h2>
          <div className="items-grid">
            <MenuItemCard />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}