"use client";

export default function AlertDialog({ title, buttons = {} }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">{title}</h2>
        <div className="flex justify-center gap-4 flex-wrap">
          {Object.entries(buttons).map(([label, action]) => (
            <button
              key={label}
              onClick={action}
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded text-sm"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
