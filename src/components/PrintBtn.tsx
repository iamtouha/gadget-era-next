"use client";

const PrintBtn = () => {
  return (
    <button
      onClick={() => window.print()}
      className="bg-primary-500 py-2 px-4 font-bold text-white transition-colors hover:bg-primary-600"
    >
      Print Invoice
    </button>
  );
};

export default PrintBtn;
