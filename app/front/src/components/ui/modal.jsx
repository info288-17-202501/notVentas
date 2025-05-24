// Modal simple reutilizable
function Modal({ open, onClose, children }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
            <div className="bg-white text-black rounded-lg shadow-lg p-6 min-w-[350px] max-w-lg relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold"
                    onClick={onClose}
                >
                    ×
                </button>
                {children}
            </div>
        </div>
    );
}

export default Modal;