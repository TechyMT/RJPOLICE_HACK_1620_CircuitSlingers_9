// AboutUs.js

import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
          <div className="max-w-2xl p-6 bg-white shadow-md rounded-md">
          <p className=" bold text-2xl text-center text-red-500">Helpline: 1930</p>
        <h1 className="text-3xl font-semibold mb-4">About Us</h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
          <p>
           Our mission is to create a safer digital environment by empowering users to report cybercrimes and incidents promptly. We aim to collaborate with law enforcement agencies, cybersecurity experts, and the community to mitigate the impact of cyber threats.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Who We Are</h2>
          <p>
            This is a dedicated initiative led by a team of cybersecurity professionals and enthusiasts along with Rajasthan Police. Our diverse team brings together expertise in cybersecurity, technology, law enforcement, and community outreach. We are passionate about making the internet a safer place for everyone.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Key Features</h2>
          <ul className="list-disc pl-6">
            <li><strong>Anonymous Reporting:</strong> We prioritize your privacy. You can report cybercrimes anonymously, ensuring your safety while contributing valuable information to combat cyber threats.</li>
            <li><strong>User-Friendly Interface:</strong> Our user-friendly platform makes it easy for individuals of all technical backgrounds to report incidents seamlessly. Your input is crucial in building a comprehensive cyber threat database.</li>
            <li><strong>Collaboration with Authorities:</strong> We work closely with law enforcement agencies and cybersecurity experts to ensure that reported incidents are promptly investigated and addressed.</li>
            <li><strong>Educational Resources:</strong> Stay informed about the latest cybersecurity trends, threats, and best practices through our curated educational resources. Knowledge is a powerful tool in the fight against cybercrime.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
          <p>
            Have questions or need assistance? Reach out to our team at <span className='bold text-blue-500'>[sp.cybercrime@rajpolic.gov.in/(+91) 9876543210]</span>. We are here to support you and address any concerns you may have.
          </p>
        </section>

              <p className="text-center text-gray-500">Join us in the fight against cybercrime! Together, we can build a safer digital future.</p>
   
      </div>
    </div>
  );
};

export default AboutUs;
