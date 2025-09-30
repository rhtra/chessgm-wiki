type Props = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export default function Pagination({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="btn"
      >
        ← Prev
      </button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          className={`page-btn ${page === i + 1 ? "active" : ""}`}
          onClick={() => onChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="btn"
      >
        Next →
      </button>
    </div>
  );
}
