import Link from "next/link";
const SizeFilter = ({ selectedSize, pathname, query }) => {
    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  
    return (
      <div className="mb-4 flex space-x-2">
        {sizes.map((size) => (
          <Link 
            key={size} 
            href={{ pathname, query: { ...query, size } }} 
          >
            <button
              className={`p-2 rounded ${selectedSize === size ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
            >
              {size}
            </button>
          </Link>
        ))}
      </div>
    );
  };
  