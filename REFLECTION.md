# Week 1 Reflection: Components and JSX

**1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?**
Imperative programming means giving step-by-step instructions on *how* to change the screen (like manually creating elements and appending them to the DOM with `document.querySelector`). Declarative programming (React) means describing *what* the UI should look like based on our current data, and letting React figure out how to update the DOM automatically.

**2. Why must a component name start with a capital letter?**
React requires capital letters so it can distinguish between custom React components (like `<Header />`) and standard HTML tags (like `<header>` or `<div>`). If we use a lowercase letter, React treats it as a built-in HTML element instead of calling our component function.

**3. What does a fragment `<>...</>` do, and why not just use a `<div>`?**
React components must return a single root element. A fragment allows us to group multiple sibling elements together without adding an extra, unnecessary `<div>` wrapper to the final browser DOM. This keeps the DOM clean and prevents CSS Flexbox or Grid layout issues.

**4. Name one benefit of splitting the UI into small components.**
It makes the code reusable and easier to maintain. For example, instead of copying and pasting the markup for every food item, we write one `MenuItemCard` component and reuse it across our entire menu. Each component has one clear job, making debugging much simpler.

---

# Week 2 Reflection: Props, Lists, State and Events

**1. What is the difference between `props` and `state` in React?**
`props` are read-only inputs passed *down* from a parent component to a child component (like passing `item` and `onAdd` into `MenuItemCard`), and a child must never mutate its own props. `state` (`useState`) is mutable data owned *inside* a component that changes over time in response to user actions (like selecting a vendor or adding to the cart), triggering a re-render when updated.

**2. Why does React require a `key` prop when rendering lists with `.map()`, and why is an array index a bad key?**
React uses the `key` prop (such as `key={vendor.id}` or `key={item.id}`) to uniquely identify each element across renders so it knows exactly which items were added, removed, or reordered. Using an array index (`0, 1, 2...`) is bad when lists can be filtered, sorted, or modified because the index changes whenever items shift positions, which can cause React to mix up component state and re-render the wrong elements.

**3. Why must we update arrays and objects in state immutably (e.g., `[...prev, item]`) instead of using `.push()`?**
React detects state changes by comparing object/array references (`Object.is`). If we mutate an existing array in place with `cart.push(item)` and pass the same array reference to `setCart(cart)`, React sees the exact same memory reference and will not trigger a re-render. Creating a new array with spread syntax (`[...prev, item]`), `.map()`, or `.filter()` gives React a new reference so it reliably updates the UI.

**4. What does "data flows down, events flow up" mean in CampusEats?**
Parent components own the state and pass data *down* to children via props (e.g., `MenuList` passing `item` down to `MenuItemCard`). When a user clicks a button inside the child component, the child does not modify parent state directly; instead, it calls an event handler callback passed via props (like `onClick={() => onAdd(item)}`), sending the event *up* to the owner of the state.

---

# Week 3 Reflection: Forms, Lifted State and Effects

**1. What is a controlled component/input, and why is it useful?**
In a controlled component (such as `CheckoutForm.jsx`), each input's value is driven by React state (`value={values.name}`) and every change triggers an `onChange` handler that updates that state (`handleChange`). React state serves as the single source of truth, making it straightforward to validate inputs on submit, show field-specific error messages, and reset fields.

**2. What does "Derive, don't store" mean, and why is it important in React?**
If a value can be calculated from existing state, you should compute it during render rather than storing it in a separate `useState` variable. In CampusEats, `count` and `total` are derived directly from `cart` using `cart.reduce(...)`. Storing them in separate state variables would risk state desynchronization bugs if `cart` updated without updating `count` or `total`.

**3. Why did we need to "lift state up" for the cart into `App.jsx` in Week 3?**
Sibling components in React cannot pass state directly to each other. In Week 3, three separate parts of the UI needed access to the cart:
- `Header` needed the total item count for the cart badge.
- `MenuList` / `SpecialBanner` needed to add items to the cart.
- `CartPage` needed the cart lines to display items, adjust quantities (`−` / `+`), remove items, and place orders.
Lifting `cart` to their closest common ancestor (`App.jsx`) provided a single source of truth.

**4. When does code inside `useEffect` run, and why did we need an `AbortController` cleanup function?**
`useEffect` runs *after* React renders the component and updates the DOM, keeping rendering pure while handling side effects like fetching `/api/vendors.json`. We return `() => controller.abort()` as a cleanup function so that if the component unmounts or `reloadKey` changes while a fetch is still in flight, the outdated request is cancelled instead of trying to update state on an unmounted component.

**5. How does the `reloadKey` dependency work in `useEffect` for data fetching?**
Passing `[reloadKey]` in the dependency array tells React to run the effect on mount and re-run it whenever `reloadKey` changes. When a fetch fails, clicking "Try again" in `<ErrorMessage />` calls `reload()`, which increments `reloadKey` (`setReloadKey((k) => k + 1)`) and triggers a fresh `fetch`.

**6. How does checkout validation work before placing an order?**
In `CheckoutForm.jsx`, `handleSubmit` calls `event.preventDefault()` to stop the browser from reloading the page, then passes `values` into `validate(values)`:
- `name.trim().length >= 3`
- `mahallah` is selected
- `pickupTime` is between `'07:00'` and `'22:00'`
If `validate` returns any keys in the `errors` object, those error messages are rendered below each field. Only when `Object.keys(found).length === 0` does the form call `onPlaceOrder(values)`.

**7. Why is a cleanup function needed for timers (Personal Feature: Digit 5 Countdown)?**
In `SpecialBanner.jsx` (and `HomePage.jsx`), `setInterval` ticks every 1000ms to update the countdown until 10:00 PM. When the user navigates to another page, the component unmounts. Returning `() => clearInterval(timerId)` from `useEffect` stops the timer on unmount, preventing memory leaks and unnecessary background ticks.

---

# Week 4 Reflection: Custom Hooks, Context and Routing

**1. What is the difference between a custom hook and Context ("Hooks share logic, not state; Context shares state")?**
A custom hook like `useVendors()` is like a recipe card: every component that calls `useVendors()` creates its own independent `useState` variables and runs its own `fetch`. In contrast, Context (`CartProvider`) is like one shared pot on the table: `CartProvider` holds a single instance of `cart` and `orders` at the top of the app, and every component calling `useCart()` (`Header`, `VendorPage`, `MenuList`, `CartPage`, `OrdersPage`) reads and updates that exact same state without prop drilling.

**2. How does `useLocalStorage` work, and why do we use lazy initial state and `try / catch`?**
`useLocalStorage(key, initialValue)` wraps `useState` and `useEffect`. We pass a function `() => { ... }` to `useState` (lazy initialization) so `localStorage.getItem(key)` and `JSON.parse()` only run once when the component mounts rather than on every render. Whenever `value` changes, `useEffect` saves `JSON.stringify(value)` with `localStorage.setItem()`. Wrapping both operations in `try / catch` ensures that malformed JSON or disabled browser storage falls back gracefully to `initialValue` instead of crashing the app.

**3. Why does `useCart()` check `if (!context)` and throw an error?**
`CartContext` is initialized with `createContext(null)`. If a developer accidentally calls `useCart()` inside a component that is not wrapped inside `<CartProvider>`, `useContext(CartContext)` returns `null`. Throwing `new Error('useCart must be used inside <CartProvider>')` fails fast with a clear, actionable message.

**4. Why do we use `<Link>` and `<NavLink>` instead of `<a href="...">`, and why does the `"/"` `NavLink` need the `end` prop?**
A plain `<a href="/cart">` forces the browser to request a new HTML document from the server, reloading the entire page and resetting React memory. `<Link>` and `<NavLink>` perform client-side routing—updating the URL and swapping only `<Outlet />` inside `Layout.jsx` without a page reload. `<NavLink>` also adds an `.active` class when its path matches the current URL; adding `end` to `<NavLink to="/" end>` ensures `"/"` only matches the exact home route rather than matching every URL that starts with `"/"`.

**5. Why do `/vendor/abc` and `/xyz` show two different screens?**
- Visiting `/vendor/abc` matches the route `path="vendor/:id"` with `useParams()` returning `{ id: 'abc' }`. `VendorPage` renders, searches `vendors.find((v) => v.id === id)`, gets `undefined`, and displays the `"Vendor not found"` message.
- Visiting `/xyz` does not match `/`, `vendor/:id`, `cart`, or `orders`, so React Router falls through to the catch-all route `path="*"` and renders `NotFoundPage` (404).
