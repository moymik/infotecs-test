type ErrorMessageProps = {
    message: string;
    onRetry?: () => void;
};

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
    return (
        <div className="flex flex-col items-center justify-center p-8 border border-red-200 bg-red-50 rounded-lg text-center">
            <p className="text-red-700 font-semibold mb-4">Произошла ошибка</p>
            <p className="text-red-600 mb-6">{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                    Попробовать снова
                </button>
            )}
        </div>
    );
}
