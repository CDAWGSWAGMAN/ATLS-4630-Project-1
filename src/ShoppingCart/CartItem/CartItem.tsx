import "./CartItem.css";

type Props = {
  name: string;
};

export default function CartItem({ name }: Props) {
  return (
    <li className="CartItem">
      <span className="CartItem__name">{name}</span>
      {/* purely visual “×”; no onClick yet */}
      <button className="CartItem__remove" aria-hidden="true">×</button>
    </li>
  );
}