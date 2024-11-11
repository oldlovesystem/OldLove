'use client';

import { useState } from 'react';
import Breadcrumb from 'components/Breadcrumb';

const PolicyPage = () => {
  const [activeSection, setActiveSection] = useState('delivery');

  const sections = [
    {
      key: 'delivery',
      title: 'Delivery Policy',
      content: (
        <>
          <p className="mb-4">
          Welcome to OLDLOVE&#39;s delivery policy. We are committed to providing you with the best shipping
experience. We ensure prompt delivery, secure packaging, and transparent cost. Our aim is to build trust
and confidence, so you can shop with peace of mind.
          </p>
          <ul className="list-disc pl-6">
            <li>Shipping charges will be charged based on the product weight.</li>
            <li>
            Product are shipped from our warehouse within 4 working days.
            </li>
            <li>The order will be delivered in 10 working days.</li>
            <li>You will receive order tracking number as soon as we ship your order.</li>
          </ul>
        </>
      )
    },
    {
      key: 'exchange',
      title: 'Exchange Policy',
      content: (
        <>
          <p className="mb-4">
          At OldLove (Nandi International), we want you to be delighted with your purchase. If for any reason you are not
satisfied, our hassle-free exchange policy is here to ensure your complete satisfaction. We aim to build trust and
reassure you that you can shop with confidence.
          </p>
          <ul className="list-disc pl-6">
            <li>There is no additional charge for any exchange orders.</li>
            <li>
            Size exchange is subject to availability.
            </li>
            <li>Size exchange is subject to availability.</li>

          </ul>
        </>
      )
    },
    {
      key: 'return',
      title: 'Return Policy',
      content: (
        <>
          <p className="mb-4">
          At OldLove (Nandi International), we prioritize customer satisfaction and make every effort to offer a hassle-free
return policy, ensuring that you are fully satisfied with your purchase. Our goal is to establish trust with our
customers and provide them with the confidence to shop with us.
          </p>
          <ul className="list-disc pl-6">
            <li>
            We have a 7- day return policy.
            </li>
            <li>Please ensure that the products you return are unused, unworn, and the original tags are intact.</li>
            <li>
            Once the product is picked, a refund will be initiated in 5-3 working days for prepaid orders after
            examining the return order.
            </li>
            <li>Please share the package unboxing video for wrong product/missing item received.</li>
            <li>Do not hand over the product without a pick-up slip or SMS confirmation.</li>
            <li>Items purchased during sale are non-returnable.</li>
          </ul>
        </>
      )
    },
    {
      key: 'privacy',
      title: 'Privacy Policy',
      content: (
        <>
          <p className="mb-4">
          At OldLove (Nandi International), we respect your privacy and are committed to protecting your personal
information. This policy outlines how we collect, use, and safeguard your data.
          </p>
          <ul className="list-disc pl-6">
            <li>
            We collect personal information only when you provide it to us voluntarily, such as when you create
            an account or place an order.
            </li>
            <li>
            Your information will not be sold or shared with third parties without your consent, except as
            necessary to fulfill your order or comply with the law.
            </li>
            <li>
            We implement a variety of security measures to maintain the safety of your personal information.
            </li>
            <li>
            You have the right to access, correct, or delete your personal data at any time by contacting us.
            </li>
            <li>By using our website, you consent to our privacy policy.</li>
          </ul>
        </>
      )
    },
    {
      key: 'Terms',
      title: 'Terms & Conditions',
      content: (
        <>
          <p className="mb-4">
          This policy applies to all the Old Love platforms (the &quot;Site&quot; or &quot;Web Site&quot; or &quot;Mobile Application&quot; or &quot;App&quot; or &quot;Us&quot;
or &quot;We&quot; or &quot;Social Media Platforms&quot;), which is operated and owned by Nandi International, marketed and/or
managed by Nandi International. It is Old Love&#39;s policy to comply with general laws for protecting user information
and bank details shared for the purpose of availing Old Love (Nandi International) services. This regulates the
processing of information relating to you and grants you various rights in respect of your personal data. Any
Images, Data or Files Uploaded on the website must not be used without the consent of the authorized personnel
of the brand. The Web Site contains links to other websites over which we have no control. Old Love is not
responsible for the privacy policies or practices of other web sites to which you choose to link from OldLove
(Nandi International). in. We encourage you to review the privacy policies of those other web sites so you can
understand how they collect, use and share your information.
          </p>
        </>
      )
    }
  ];

  return (
    <>
      <Breadcrumb heading="Privacy Policy" subHeading="Privacy Policy" />
      <div className="flex min-h-screen w-full flex-col bg-gray-50 md:flex-row font-tenor-sans">
        <aside className="border-r border-gray-300 p-6 md:w-1/4">
          <h2 className="mb-6 text-center text-xl font-semibold">Policies</h2>
          <ul className="space-y-4">
            {sections.map((section) => (
              <li
                key={section.key}
                className={`cursor-pointer rounded-lg p-4 shadow-md transition duration-200 ${activeSection === section.key ? 'bg-[rgb(210,239,154)] font-bold text-black' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
                onClick={() => setActiveSection(section.key)}
              >
                {section.title}
              </li>
            ))}
          </ul>
        </aside>

        <main className="p-6 md:w-3/4">
          <h1 className="mb-4 border-b-2 border-gray-300 pb-2 text-3xl font-bold">
            {sections.find((section) => section.key === activeSection).title}
          </h1>
          {sections.find((section) => section.key === activeSection).content}
        </main>
      </div>
    </>
  );
};

export default PolicyPage;
