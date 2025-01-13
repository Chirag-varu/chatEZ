import React from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, title, description }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg w-96">
                <h2 className="text-lg font-semibold dark:text-white text-gray-900">{title}</h2>
                <p className="mt-2 text-sm dark:text-gray-300 text-gray-500">{description}</p>
                <div className="flex justify-end gap-4 mt-4">
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
