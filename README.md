# CampusEats - BICS 3301 Cross-Platform Software Development

## Vendors Credits
- **Primary Shop (My Shop):** Zafran's Kitchen (`2416464-zafran-kitchen`) — 8 menu items across 4 categories (`Rice`, `Noodles`, `Drinks`, `Snacks`).
- **Vendors 2–3 from classmates:** Kafe Mahallah Ali (`2415666-kafe-ali` from `2415666`) and Kafe Mahallah Aminah (`2410233-kafe-aminah` from `2410233`).

## Features Implemented (Weeks 1–4)
1. **Custom Hooks (`src/hooks/`)**:
   - `useLocalStorage`: Persists state to browser `localStorage` with lazy initial state and `try/catch` error handling.
   - `useVendors`: Fetches vendor menus from `/api/vendors.json` with `loading`, `error`, `reload` retry, and `AbortController` cleanup.
   - `useCart`: Consumes `CartContext` and throws a clear error if used outside `<CartProvider>`.
2. **Cart Context (`src/context/`)**:
   - `CartProvider` owns `cart` (`campuseats-cart`) and `orders` (`campuseats-orders`) with `useLocalStorage` persistence, derived `count` and `total` via `.reduce()`, and immutable cart/order handlers (`addToCart`, `changeQty`, `removeFromCart`, `placeOrder`).
3. **Client-Side Routing (`src/pages/` & `src/components/Layout.jsx`)**:
   - Multi-page SPA using React Router v8 (`BrowserRouter`, `Routes`, `Route`, `Layout` with `<Outlet />`, `NavLink` with `end`, `Link`, `useParams`, and `useNavigate`).
   - Routes: `/` (`HomePage`), `/vendor/:id` (`VendorPage` with unknown-vendor check), `/cart` (`CartPage` with validated `CheckoutForm`), `/orders` (`OrdersPage`), and `*` (`NotFoundPage` 404).
4. **Personal Feature (Digit 5 — Daily Special with Countdown)**:
   - Live countdown timer to 10:00 PM using `useEffect + setInterval` with cleanup on both `HomePage` (linking each daily special to its vendor page) and `VendorPage` (`SpecialBanner`).
