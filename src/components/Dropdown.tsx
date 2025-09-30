type Option = {
  value: string;
  label: string;
};

type Props = {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  order?: "asc" | "desc";
  onOrderChange?: (order: "asc" | "desc") => void;
};

export default function Dropdown({
  label,
  value,
  options,
  onChange,
  order,
  onOrderChange,
}: Props) {
  return (
    <div className="dropdown">
      <label className="dropdown-label">{label}:</label>
      <div className="dropdown-control">
        <select
          className="dropdown-select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {order && onOrderChange && (
          <button
            type="button"
            className="order-btn"
            onClick={() => onOrderChange(order === "asc" ? "desc" : "asc")}
          >
            {order === "asc" ? "↑" : "↓"}
          </button>
        )}
      </div>
    </div>
  );
}
