// src/ShoppingCart/ShoppingCart.tsx
import "./ShoppingCart.css";
import CartItem from "./CartItem/CartItem";

export default function ShoppingCart() {
  // Static, mock data — replace later with real props/state
  const mockItems = [
    { name: "Tequila" },
    { name: "Lime Juice" },
    { name: "Triple Sec" },
    { name: "Salt" },
  ];

  // Always rendered open for the static pass
  return (
    <aside
      className="ShoppingCart"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping List"
    >
      <header className="ShoppingCart__header">
        <h2>Shopping List</h2>
        <div className="ShoppingCart__actions">
          <button className="ShoppingCart__btn" aria-hidden="true">Clear</button>
          <button className="ShoppingCart__btn" aria-hidden="true">Close</button>
        </div>
      </header>

      <ul className="ShoppingCart__list">
        {mockItems.map((i) => (
          <CartItem key={i.name} name={i.name} />
        ))}
      </ul>
    </aside>
  );
}
