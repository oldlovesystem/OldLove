"use client"
import { useState } from 'react';

interface FormData {
  name: string;
  phone: string;
  email: string;
  orderId: string[];
  comments: string;
}

const ContactUs = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    orderId: [],
    comments: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    phone: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  // Validate email format
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate phone number format (10 digits)
  const validatePhone = (phone: string) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'orderId') {
      setFormData({
        ...formData,
        orderId: value.split(',').map((id) => id.trim()), 
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });

      if (name === 'email') {
        setErrors({
          ...errors,
          email: validateEmail(value) ? '' : 'Invalid email format',
        });
      }

      if (name === 'phone') {
        setErrors({
          ...errors,
          phone: validatePhone(value) ? '' : 'Invalid phone number (10 digits)',
        });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!errors.email && !errors.phone && formData.name && formData.comments) {
      setFormSubmitted(true);
      // Submit to API here
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-6 bg-gray-50">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-thin text-center mb-6 text-gray-900">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full p-3 border ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email ID</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Order ID */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Order ID (Comma separated for multiple orders)
            </label>
            <input
              type="text"
              name="orderId"
              value={formData.orderId.join(', ')}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="12345, 67890"
              required
            />
          </div>

          {/* Comments/Issue */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Comments / Issue</label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white p-3 rounded-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Submit
          </button>

          {formSubmitted && (
            <p className="text-green-500 text-sm mt-4">
              Form submitted successfully!
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
