import "./CartItem.css";

type Props = {
  name: string;
  onRemove?: (name: string) => void;
}

export default function CartItem({ name, onRemove }: Props) {
  return (
    <li className="CartItem">
      <span className="CartItem__name">{name}</span>
      {}
      <button
        className="CartItem__remove"
        aria-label={`Remove ${name}`}
        onClick={() => onRemove?.(name)}
      >
        ×
      </button>
    </li>
  );
}
