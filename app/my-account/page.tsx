"use client"
import Link from 'next/link';
import { FaBox, FaLock, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

const MyAccount = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 font-tenor-sans" >
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">My Account</h1>
    
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Link href={"/account"} >
        <div className="flex flex-row items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
        <img width="35" height="35" src="https://img.icons8.com/forma-thin/48/lock.png" alt="lock" className='mr-2'/>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Login & Security</h2>
            <p className="text-gray-500 text-sm">Edit name, mobile, password, and more</p>
          </div>
        </div>
        </Link>
      <Link href={"/orders"} >
        <div className="flex flex-row items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
        <img width="30" height="30" src="https://img.icons8.com/ios/50/box--v1.png" alt="box--v1" className='mr-4'/>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Your Orders</h2>
            <p className="text-gray-500 text-sm">Track, return and check your orders</p>
          </div>
        </div>
    </Link>

    
        <Link href={"/myaddress"} >
        <div className="flex flex-row items-center p-4  border border-gray-200 rounded-lg hover:shadow-md transition">
        <img width="30" height="30" src="https://img.icons8.com/ios/100/marker--v1.png" alt="marker--v1" className='mr-2'/>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Your Addresses</h2>
            <p className="text-gray-500 text-sm">Edit or add address for orders</p>
          </div>
        </div>
    </Link>
      <Link href={"/contact"} >
        <div className="flex flex-row items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
        <img width="30" height="30" src="https://img.icons8.com/ios/50/mail.png" alt="mail" className='mr-2'/>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Contact Us</h2>
            <p className="text-gray-500 text-sm">Get in touch for support and inquiries</p>
          </div>
        </div>
        </Link>

      </div>
    </div>
  );
};

export default MyAccount;
