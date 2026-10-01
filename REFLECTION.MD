# Week 1 Reflection

**1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?**
Imperative programming means giving step-by-step instructions on *how* to change the screen (like manually creating elements and appending them to the DOM). Declarative programming (React) means describing *what* the UI should look like based on our data, and letting React figure out how to update the DOM automatically.

**2. Why must a component name start with a capital letter?**
React requires capital letters so it can distinguish between custom React components (like `<Header />`) and standard HTML tags (like `<header>` or `<div>`). If we use a lowercase letter, React will just think it's a regular HTML element.

**3. What does a fragment `<>...</>` do, and why not just use a `<div>`?**
React components must return a single root element. A fragment allows us to group multiple sibling elements together without adding an extra, invisible `<div>` wrapper to our final HTML. This keeps the DOM clean and prevents CSS layout issues.

**4. Name one benefit of splitting the UI into small components.**
It makes the code reusable. For example, instead of copying and pasting the HTML for every food item, we can just write one `MenuItemCard` component and reuse it for our entire menu. It also makes the code much easier to read and debug.