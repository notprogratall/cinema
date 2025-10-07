interface PaginationProps {
    currentPage: number;
    onPageChange: (page: number) => void;
    totalPages: number;
    paginationDisabled: boolean;
}

const Pagination = ({ currentPage, onPageChange, totalPages, paginationDisabled }: PaginationProps) => {
    const isLastPage = totalPages ? currentPage >= totalPages : false;

    const goToNextPage = () => {
        if (!isLastPage && !paginationDisabled) {
            onPageChange(currentPage + 1);
        }
    };

    const goToPrevPage = () => {
        if (currentPage > 1 && !paginationDisabled) {
            onPageChange(currentPage - 1);
        }
    };

    return (
        <div className={`flex justify-center items-center mt-6 gap-4 ${paginationDisabled ? 'pointer-events-none opacity-50' : ''}`}>
            <button
                disabled={currentPage === 1 || paginationDisabled}
                onClick={goToPrevPage}
                className="px-4 py-2 border rounded disabled:opacity-50 hover-scale"
            >
                Предыдущая
            </button>
            <span>
                Страница {currentPage}
                {totalPages && ` из ${totalPages}`}
            </span>
            <button
                disabled={isLastPage || paginationDisabled}
                onClick={goToNextPage}
                className="px-4 py-2 border rounded disabled:opacity-50 hover-scale"
            >
                Следующая
            </button>
        </div>
    );
};

export default Pagination;