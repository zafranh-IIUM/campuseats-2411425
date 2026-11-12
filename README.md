# CampusEats - BICS 3301 Cross-Platform Software Development

Firebase project ID: campuseats-2411425

## Vendors Credits
- **Primary Shop (My Shop):** Zafran's Kitchen (`2411425-zafran-kitchen`) — 8 menu items across 4 categories (`Rice`, `Noodles`, `Drinks`, `Snacks`).
- **Vendors from classmates:**
  - Romantika Pizza (`2419609-Romantika Pizza` from `2419609`)
  - Furtive Katfe (`2411925-furtive-katfe` from `2411925`)
  - Boost Juice (`2418547-kafe-boost` from `2418547`)

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

## Features Implemented (Week 5: Firebase Setup & Authentication)
1. **Firebase Authentication & Environment Setup**:
   - Connected to Firebase project `campuseats-2411425` using `firebase/app` and `firebase/auth` via variables in `.env.local` (`VITE_FIREBASE_*`).
2. **Auth Context & Hook (`src/context/AuthProvider.jsx`, `src/hooks/useAuth.js`)**:
   - `AuthProvider` wraps the application, listening to `onAuthStateChanged` with proper cleanup to persist login across page reloads.
   - Provides `user`, `loading`, `register` (with `updateProfile` for `displayName`), `login`, `loginWithGoogle`, and `logout`.
3. **Pages & UX (`LoginPage.jsx`, `RegisterPage.jsx`, `src/authErrors.js`)**:
   - User registration and login forms with error handling translating Firebase error codes to friendly sentences.
   - Google popup sign-in support via `GoogleAuthProvider`.
4. **Protected Routes (`ProtectedRoute.jsx`)**:
   - Route guard for `/cart` and `/orders` that verifies loading state first, redirecting unauthenticated visitors to `/login` and redirecting back to destination upon login.
5. **Personal Feature Step (Digit 5: Daily Special)**:
   - Signed-in users see "Today's special for <name>" alongside the live countdown timer.
   - Guests see a prompt linking them to log in to access today's special.

