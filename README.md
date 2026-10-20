# CampusEats - BICS 3301 Cross-Platform Software Development

## Week 3: Forms, Lifted State and Effects

### Vendors Credits
- Primary Vendor: Zafran's Kitchen (`2416464-zafran-kitchen`)
- Vendors 2–3 from classmates: Kafe Mahallah Ali (`2415666-kafe-ali`) and Kafe Mahallah Aminah (`2410233-kafe-aminah`).

### Features Implemented
1. **Mock API Data Fetching**: Vendors fetched from `/api/vendors.json` using `useEffect` with loading state, error state with retry, and `AbortController` cleanup.
2. **Lifted Cart State**: Cart state shared across `Header`, `MenuList`, and `CartPage`.
3. **Interactive Cart**: Merge quantities on repeat add, adjust quantities with `+` and `−`, remove items, and derived order total.
4. **Controlled Checkout Form**: Real-time controlled inputs with validation (name min 3 chars, mahallah selected, pickup time between 07:00 and 22:00).
5. **Personal Feature (Digit 5)**: Daily special live countdown timer implemented with `useEffect + setInterval` and cleanup.
