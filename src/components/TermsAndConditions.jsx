
import React from 'react';
//t&C
const TermsAndConditions = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl max-w-md shadow-lg overflow-y-auto max-h-[80vh]">
        <h2 className="text-xl font-bold text-[#6C3428] mb-2">Terms & Conditions</h2>
        <p className="text-sm text-gray-700 mb-4">
          By using our platform, you agree to the following terms and conditions. Orders are subject to availability. Prices and availability of products are subject to change without notice. We reserve the right to cancel orders in case of fraud or system errors.
        </p>

        <h2 className="text-xl font-bold text-[#6C3428] mb-2">Privacy Policy</h2>
        <p className="text-sm text-gray-700">
          We value your privacy. Your personal data is collected only to fulfill your order and improve your shopping experience. We do not sell or rent your personal information to third parties. Secure protocols are used for all transactions.
        </p>

        <button
          onClick={onClose}
          className="mt-4 bg-[#BA704F] text-white px-4 py-2 rounded hover:bg-[#6C3428]"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TermsAndConditions;
