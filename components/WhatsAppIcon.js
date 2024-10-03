// components/WhatsAppIcon.js
"use client"
import React from 'react';

const WhatsAppIcon = () => {
    const handleClick = () => {
        // Replace with your WhatsApp number
        window.open('https://wa.me/1234567890', '_blank');
    };

    return (
        <div 
            className="fixed bottom-5 right-5 w-16 h-16 cursor-pointer z-50"
            onClick={handleClick}
        >
            <img 
                src="/image.png" 
                alt="WhatsApp" 
                className="w-full h-full" 
            />
        </div>
    );
};

export default WhatsAppIcon;
