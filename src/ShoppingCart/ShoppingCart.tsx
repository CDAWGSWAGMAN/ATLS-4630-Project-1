import "./ShoppingCart.css";
import CartItem from "./CartItem/CartItem";

type Props = {
  items: string[];             
  toggleClose: ()=> void;
  handleRemove: (name : string) => void;
  handleClear: () => void;
};


/*export default function ShoppingCart({ items }: Props) {
  // Minimal cart items state
  const [items, setItems] = useState<string[]>([
    "Tequila",
    "Lime Juice",
    "Triple Sec",
    "Salt",
  ]);
  */

export default function ShoppingCart({ items, toggleClose, handleClear, handleRemove }: Props) {
  // Minimal cart items state
  



  

  

  return (
    <aside className="ShoppingCart" role="dialog" aria-modal="true" aria-label="Shopping List">
      <header className="ShoppingCart__header">
        <h2>Shopping List</h2>
        <div className="ShoppingCart__actions">
          <button className="ShoppingCart__btn" onClick={handleClear}>Clear</button>
          <button className="ShoppingCart__btn" onClick={toggleClose}>Close</button>
        </div>
      </header>

      <ul className="ShoppingCart__list">
        {items.length === 0 ? (
          <li className="ShoppingCart__empty">No items yet—add ingredients.</li>
        ) : (
          items.map((name) => (
            <CartItem key={name} name={name} onRemove={handleRemove} />
          ))
        )}
      </ul>
    </aside>
  );
}
