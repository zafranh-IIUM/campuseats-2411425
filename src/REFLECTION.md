# Week 1 Reflection

**1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?**
Imperative programming means giving step-by-step instructions on *how* to change the screen (like manually creating elements and appending them to the DOM). Declarative programming (React) means describing *what* the UI should look like based on our data, and letting React figure out how to update the DOM automatically.

**2. Why must a component name start with a capital letter?**
React requires capital letters so it can distinguish between custom React components (like `<Header />`) and standard HTML tags (like `<header>` or `<div>`). If we use a lowercase letter, React will just think it's a regular HTML element.

**3. What does a fragment `<>...</>` do, and why not just use a `<div>`?**
React components must return a single root element. A fragment allows us to group multiple sibling elements together without adding an extra, invisible `<div>` wrapper to our final HTML. This keeps the DOM clean and prevents CSS layout issues.

**4. Name one benefit of splitting the UI into small components.**
It makes the code reusable. For example, instead of copying and pasting the HTML for every food item, we can just write one `MenuItemCard` component and reuse it for our entire menu. It also makes the code much easier to read and debug.

---

# Week 3 Reflection: Forms, Lifted State and Effects

**1. What is a controlled component/input, and why is it useful?**
In a controlled component, the input's current value is bound directly to React state (`value={values.name}`) and every keystroke triggers an event handler that updates that state (`onChange={handleChange}`). The state serves as the single source of truth. This makes it easy to validate input data in real-time, enforce formatting, disable submission when fields are empty or invalid, and reset values easily.

**2. What does "Derive, don't store" mean, and why is it important in React?**
If a value can be computed from existing state, you should calculate it on every render rather than storing it in a separate `useState` variable. For example, in CampusEats, `cartCount` and `total` are derived directly using `cart.reduce(...)`. If we stored them in state alongside `cart`, we would risk state desynchronization bugs where the cart items change but the total count or price fails to update.

**3. Why did we need to "lift state up" for the cart into `App.jsx`?**
Sibling components in React cannot pass data horizontally to each other. In CampusEats, three different components require access to the shopping cart:
- `Header` needs `cartCount` to display on the cart badge.
- `MenuList` needs to add items to the cart via `onAdd`.
- `CartPage` needs the complete cart array to list rows, adjust quantities (`−` / `+`), and remove items.
Because `App` is the closest common ancestor of all three components, lifting the `cart` state to `App.jsx` ensures a single source of truth. Data flows down via props, and user actions bubble up via event callbacks (`handleChangeQty`, `handleRemove`).

**4. When does code inside `useEffect` run, and why did we need an `AbortController` cleanup function?**
`useEffect` runs after the component renders and React commits changes to the DOM. This keeps the rendering logic pure and handles side effects like fetching data or starting timers. We use `AbortController` in our fetch effect so that if the component unmounts or if the user triggers a retry while a request is still pending, `controller.abort()` cancels the in-flight request, preventing memory leaks and avoiding setting state on an unmounted component.

**5. How does the `reloadKey` dependency work in `useEffect` for data fetching?**
The dependency array tells React when to re-execute the effect. By passing `[reloadKey]`, the fetch effect runs on initial mount and whenever `reloadKey` changes. When data fetching fails, the `<ErrorMessage />` component provides a "Try again" button that increments `reloadKey` (`setReloadKey((k) => k + 1)`), which causes React to automatically re-run the effect and attempt the fetch again.

**6. How does checkout validation work before placing an order?**
When the user submits the form, `event.preventDefault()` prevents the browser's default full-page reload. A plain JavaScript function `validate(values)` inspects each field:
- Name must be at least 3 characters long (`values.name.trim().length >= 3`).
- A mahallah must be selected (`values.mahallah !== ''`).
- Pickup time must fall between `07:00` and `22:00`.
The function returns an `errors` object. If errors exist, they are displayed directly under the corresponding input fields. If the `errors` object is empty, `onPlaceOrder(values)` is triggered, which records the order, clears the cart, and transitions the app to the "Order placed" view.

**7. Why is a cleanup function needed for timers (Personal Feature: Digit 5 Countdown)?**
For the daily special countdown banner, `setInterval` runs a callback every second. If the user navigates away from the menu to the cart or checkout view, the banner unmounts. Without returning a cleanup function (`() => clearInterval(timerId)`), the interval would keep firing indefinitely in the browser background, causing memory leaks and performance degradation.
