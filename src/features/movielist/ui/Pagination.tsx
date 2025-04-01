interface PaginationProps {
    currentPage: number;
    onPageChange: (page: number) => void;
    totalPages: number;
}

const Pagination = ({ currentPage, onPageChange, totalPages }: PaginationProps) => {
    const isLastPage = totalPages ? currentPage >= totalPages : false;
    
    const goToNextPage = () => {
        if (!isLastPage) {
            onPageChange(currentPage + 1);
        }
    };
    
    const goToPrevPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };
    
    return (
        <div className="flex justify-center items-center mt-6 gap-4">
            <button
                disabled={currentPage === 1}
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
                disabled={isLastPage}
                onClick={goToNextPage}
                className="px-4 py-2 border rounded disabled:opacity-50 hover-scale"
            >
                Следующая
            </button>
        </div>
    );
};

export default Pagination;