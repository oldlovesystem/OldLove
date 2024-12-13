'use client';
import React from 'react';


const ContactUs = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            username: e.target.username.value,
            email: e.target.email.value,
            phone_number: e.target.phone_number.value,
            order_id: e.target.order_id.value,
            message: e.target.message.value,
        };

        try {
            const response = await fetch('https://cancelorder.vercel.app/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Message sent successfully!');
                e.target.reset(); // Reset form fields
            } else {
                alert('Error sending message. Please try again later.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error sending message. Please try again later.');
        }
    };

    return (
        <>
            

            <div className='contact-us md:py-20 py-10 flex items-center justify-center font-tenor-sans'>
                <div className="container">
                    <div className="flex justify-center max-lg:flex-col gap-y-10">
                        <div className="left lg:w-2/3 lg:pr-4">
                            <div className="heading3 text-center">Drop Us A Line</div>
                            <div className="body1 text-secondary2 mt-3 text-center">Use the form below to get in touch with the sales team</div>
                            <form className="md:mt-6 mt-4" onSubmit={handleSubmit}>
                                <div className='grid sm:grid-cols-2 grid-cols-1 gap-4 gap-y-5'>
                                    <div className="name">
                                        <input name="username" className="border-line border-gray-400 px-4 py-3 w-full rounded-lg" type="text" placeholder="Your Name *" required />
                                    </div>
                                    <div className="email">
                                        <input name="email" className="border-line px-4 border-gray-400 pt-3 pb-3 w-full rounded-lg" type="email" placeholder="Your Email *" required />
                                    </div>
                                    <div className="phone_number">
                                        <input name="phone_number" className="border-line px-4 border-gray-400 py-3 w-full rounded-lg" type="tel" placeholder="Your Phone Number *" required />
                                    </div>
                                    <div className="order_id">
                                        <input name="order_id" className="border-line px-4 border-gray-400 pt-3 pb-3 w-full rounded-lg" type="text" placeholder="Order Id *" required />
                                    </div>
                                    <div className="message sm:col-span-2">
                                        <textarea name="message" className="border-line px-4 border-gray-400 pt-3 pb-3 w-full rounded-lg" rows={3} placeholder="Your Message *" required />
                                    </div>
                                </div>
                                <div className="block-button md:mt-6 mt-4 text-center">
                                    <button className="button-main" type="submit">Send message</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContactUs;