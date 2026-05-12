export default function Pagination({ page, totalPages, onPrev, onNext }) {
    if (totalPages <= 1) return null;

    return (
        <div className="pagination">
            <button
                className="btn btn-page"
                onClick={onPrev}
                disabled={page <= 1}
            >
                ← Anterior
            </button>
            <span className="page-info">{page} / {totalPages}</span>
            <button
                className="btn btn-page"
                onClick={onNext}
                disabled={page >= totalPages}
            >
                Siguiente →
            </button>
        </div>
    );
}
