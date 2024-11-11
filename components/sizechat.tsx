import React from 'react';

const SizeChartModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-tenor-sans px-4">
      <div className="relative w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">Men's Size Chart</h2>

        {/* Jeans Size Chart */}
        <h3 className="text-lg font-medium mb-2">Jeans</h3>
        <table className="table-fixed w-full bg-white border border-gray-300 rounded-lg mb-4">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-sm">
              <th className="py-2 px-4 text-center border border-gray-300">Size</th>
              <th className="py-2 px-4 text-center border border-gray-300">Waist (inches)</th>
              <th className="py-2 px-4 text-center border border-gray-300">Hip (inches)</th>
              <th className="py-2 px-4 text-center border border-gray-300">Inseam (inches)</th>
            </tr>
          </thead>
          <tbody>
            {[
              { size: 'S', waist: '28-30', hip: '34-36', inseam: '30' },
              { size: 'M', waist: '31-33', hip: '37-39', inseam: '32' },
              { size: 'L', waist: '34-36', hip: '40-42', inseam: '34' },
              { size: 'XL', waist: '37-39', hip: '43-45', inseam: '34' },
              { size: 'XXL', waist: '40-42', hip: '46-48', inseam: '34' },
            ].map((item, index) => (
              <tr key={index} className="border border-gray-300">
                <td className="py-2 px-4 text-center border border-gray-300">{item.size}</td>
                <td className="py-2 px-4 text-center border border-gray-300">{item.waist}</td>
                <td className="py-2 px-4 text-center border border-gray-300">{item.hip}</td>
                <td className="py-2 px-4 text-center border border-gray-300">{item.inseam}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Shirts Size Chart */}
        <h3 className="text-lg font-medium mb-2">Shirts</h3>
        <table className="table-fixed w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-sm">
              <th className="py-2 px-4 text-center border border-gray-300">Size</th>
              <th className="py-2 px-4 text-center border border-gray-300">Chest (inches)</th>
              <th className="py-2 px-4 text-center border border-gray-300">Waist (inches)</th>
              <th className="py-2 px-4 text-center border border-gray-300">Sleeve Length (inches)</th>
            </tr>
          </thead>
          <tbody>
            {[
              { size: 'S', chest: '34-36', waist: '28-30', sleeve: '32-33' },
              { size: 'M', chest: '38-40', waist: '32-34', sleeve: '33-34' },
              { size: 'L', chest: '42-44', waist: '36-38', sleeve: '34-35' },
              { size: 'XL', chest: '46-48', waist: '40-42', sleeve: '35-36' },
              { size: 'XXL', chest: '50-52', waist: '44-46', sleeve: '36-37' },
            ].map((item, index) => (
              <tr key={index} className="border border-gray-300">
                <td className="py-2 px-4 text-center border border-gray-300">{item.size}</td>
                <td className="py-2 px-4 text-center border border-gray-300">{item.chest}</td>
                <td className="py-2 px-4 text-center border border-gray-300">{item.waist}</td>
                <td className="py-2 px-4 text-center border border-gray-300">{item.sleeve}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SizeChartModal;
