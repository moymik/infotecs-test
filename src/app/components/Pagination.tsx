type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export default function Pagination({currentPage, totalPages, onPageChange}: PaginationProps) {
    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className="flex justify-center items-center gap-4 mt-4 text-gray-700">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
            >
                Назад
            </button>
            <span className="font-semibold">
                Страница {currentPage} из {totalPages}
            </span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
            >
                Вперед
            </button>
        </div>
    );
}
