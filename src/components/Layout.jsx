import { Outlet } from 'react-router';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

export default function Layout() {
  return (
    <div className="app-container">
      <Header />
      <main className="container content-container">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
