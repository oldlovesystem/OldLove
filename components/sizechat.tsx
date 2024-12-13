import React from 'react';

const SizeChartModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="font-tenor-sans fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="relative w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg">
        <button
          onClick={onClose}
          className="absolute right-2 top-2 text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>
        <h2 className="mb-4 text-center text-xl font-semibold">Men's Size Chart</h2>

        {/* Jeans Size Chart */}
        <h3 className="mb-2 text-lg font-medium">Jeans</h3>
        <table className="mb-4 w-full table-fixed rounded-lg border border-gray-300 bg-white">
          <thead>
            <tr className="bg-gray-200 text-sm text-gray-600">
              <th className="border border-gray-300 px-4 py-2 text-center">Size</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Waist (inches)</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Hip (inches)</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Inseam (inches)</th>
            </tr>
          </thead>
          <tbody>
            {[
              { size: 'S', waist: '28-30', hip: '34-36', inseam: '30' },
              { size: 'M', waist: '31-33', hip: '37-39', inseam: '32' },
              { size: 'L', waist: '34-36', hip: '40-42', inseam: '34' },
              { size: 'XL', waist: '37-39', hip: '43-45', inseam: '34' },
              { size: 'XXL', waist: '40-42', hip: '46-48', inseam: '34' }
            ].map((item, index) => (
              <tr key={index} className="border border-gray-300">
                <td className="border border-gray-300 px-4 py-2 text-center">{item.size}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{item.waist}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{item.hip}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{item.inseam}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Shirts Size Chart */}
        <h3 className="mb-2 text-lg font-medium">Shirts</h3>
        <table className="w-full table-fixed rounded-lg border border-gray-300 bg-white">
          <thead>
            <tr className="bg-gray-200 text-sm text-gray-600">
              <th className="border border-gray-300 px-4 py-2 text-center">Size</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Chest (inches)</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Waist (inches)</th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Sleeve Length (inches)
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              { size: 'S', chest: '34-36', waist: '28-30', sleeve: '32-33' },
              { size: 'M', chest: '38-40', waist: '32-34', sleeve: '33-34' },
              { size: 'L', chest: '42-44', waist: '36-38', sleeve: '34-35' },
              { size: 'XL', chest: '46-48', waist: '40-42', sleeve: '35-36' },
              { size: 'XXL', chest: '50-52', waist: '44-46', sleeve: '36-37' }
            ].map((item, index) => (
              <tr key={index} className="border border-gray-300">
                <td className="border border-gray-300 px-4 py-2 text-center">{item.size}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{item.chest}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{item.waist}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{item.sleeve}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SizeChartModal;
