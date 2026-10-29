# AI usage log

## Week 1
- Tool(s): 
Gemini (Antigravity VS Code Extension)

- What I asked for:
I uploaded my Week 1 lab PDFs and asked the AI to summarize my tasks, provide a step-by-step work plan, and help generate the static JSX components and CSS to match the lab requirements.

- What I kept, changed or rejected, and why: 
I kept the overall component structure and CSS styling the AI provided. However, I rejected some code earlier that tried to use `useState` and `props`, because I learned that Week 1 strictly requires a static UI with hardcoded data inside the components. 

- One thing the AI got wrong and how I fixed it: 
The AI initially tried to run terminal commands (like `ls` and `dir`) directly in my workspace to set things up for me. I rejected the terminal permissions and told the AI to just guide me, as I wanted to type the code and run the commands myself to learn.

## Week 2
- Tool(s): 
Gemini (Antigravity VS Code Extension)

- What I asked for:
I provided the Lab 2 sheet and lecture slides, asking for a detailed work plan and implementation for Week 2: migrating data to `src/data/vendors.js`, refactoring components to receive props, implementing list rendering with `.map()` and keys, setting up state in `App.jsx` for selected vendor and cart count, and building my personal feature for matric ending in 5 (Daily special banner).

- What I kept, changed or rejected, and why: 
I kept the component architecture (`Header`, `VendorCard`, `MenuList`, `MenuItemCard`, `SpecialBanner`), the clean data structure in `vendors.js`, and the immutable state update pattern (`[...prev, item]`). I made sure `selectedVendor` is calculated as a derived value using `vendors.find()` instead of extra state to follow the "If you can compute it, don't store it" principle taught in class.

- One thing the AI got wrong and how I fixed it: 
The AI initially suggested storing both `selectedVendor` and `selectedVendorId` in `useState`, which violates the single source of truth rule. I corrected it to store only `selectedVendorId` in state and derive `selectedVendor` on each render, preventing state synchronization bugs.

## Week 3
- Tool(s): 
Gemini (Antigravity VS Code Extension)

- What I asked for:
I uploaded the Week 3 lab sheet and lecture slides, asking the AI to explain the requirements in detail and provide an implementation plan for:
1. Migrating data to a mock API (`public/api/vendors.json`) and data fetching via `useEffect` with loading and error states (`Status.jsx`).
2. Lifting cart state up to `App.jsx`, deriving totals and item counts with `reduce`.
3. Building interactive `CartPage.jsx` and `CartItem.jsx` with `+`, `-`, and remove handlers.
4. Implementing a controlled checkout form with validation (`CheckoutForm.jsx`).
5. Implementing personal feature step for Digit 5: Live countdown to the daily special's end time using `useEffect + setInterval` with cleanup in `SpecialBanner.jsx`.

- What I kept, changed or rejected, and why:
I kept the full architecture recommended in the lab sheet, including the `reloadKey` pattern for retry, the `AbortController` cleanup in the effect, and the derived state calculations (`cartCount` and `total` via `reduce`). I also ensured the Digit 5 personal feature properly clears its `setInterval` when unmounting.

- One thing the AI got wrong and how I fixed it:
The AI initially attempted to execute terminal commands in the background before explaining the lab steps. I instructed the AI to explain the concepts and plan first so I could understand the architecture and review the code before execution.

## Week 4
- Tool(s):
Gemini (Antigravity VS Code Extension)

- What I asked for:
I provided the Week 4 lab sheet and reference materials (Custom Hooks, Context API, React Router 8, and the CampusEats DOM), asking the AI to first explain the concepts and build order in detail, create a checklist.

- What I kept, changed or rejected, and why:
I kept the modular separation into `src/hooks/`, `src/context/`, `src/pages/`, and `src/components/`, the `try/catch` blocks inside `useLocalStorage`, the 8-item value shared by `CartProvider` (with `count` and `total` derived using `.reduce()`), and the React Router 8 setup (`BrowserRouter`, `Layout` with `<Outlet />`, `NavLink` with `end` on `"/"`, `useParams()`, and `useNavigate()`). I rejected the AI's attempt to run `git add` and `git commit` directly so I could run the git commands and separate my feature commit myself.

- One thing the AI got wrong and how I fixed it:
In the initial version of `useVendors.js` (and `SpecialBanner.jsx`), calling `setLoading(true)` or `setTimeLeft(calculateRemaining())` synchronously at the top of `useEffect` triggered ESLint's `react-hooks/set-state-in-effect` error. We fixed this by moving `setLoading(true)` and `setError(null)` into the `reload()` function in `useVendors.js` and using lazy initial state `useState(() => calculateRemaining())` for the countdown timer so `npm run lint` and `npm run build` pass with zero errors.
