import Image from "next/image";
import React from "react";
import Logo from "../../assets/brand/logo.png";
const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between flex-wrap">
          <div className="mb-6 md:mb-0 w-full md:w-auto">
            <a href="/" className="flex items-center">
              <Image src={Logo} className="w-32 h-28" alt="Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                Rajashthan Police Cyber Crime
              </span>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lf:grid-cols-3 gap-8 sm:gap-6">
            <div>
              <h2 className="mb-6 text-sm font-semibold  uppercase text-white">
                Resources
              </h2>
              <ul className="  font-medium">
                <li className="mb-4">
                  <a href="https://dholpurpolice.rajasthan.gov.in/jankalyan-category-and-entry-type/112/54/272/0" target="_blank" className="hover:underline" >
                    Latest Threat Reports
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="https://ajmerpolice.rajasthan.gov.in/jankalyan-category-and-entry-type/112/54/115" target="_blank" 
                    className="hover:underline"
                  >
                    Security Tips
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="https://www.moh.gov.sg/licensing-and-regulation/cybersecurity-for-healthcare-providers/common-signs-of-a-cyber-attack#:~:text=Accounts%20have%20been%20locked%20or,unknown%20files%20or%20programmes%20appear." target="_blank"
                    className="hover:underline"
                  >
                    Vulnerability Alerts
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.nibusinessinfo.co.uk/content/cyber-security-incident-response-plan" target="_blank"
                    className="hover:underline"
                  >
                    Incident Response Guide
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold  uppercase text-white">
                Legal
              </h2>
              <ul className="  font-medium">
                <li className="mb-4">
                  <a href="#" target="_blank" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" target="_blank" className="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" target="_blank" className="hover:underline">
                    Disclaimer
                  </a>
                </li>
                <li>
                  <a href="#"target="_blank" className="hover:underline">
                    Copyright Notice
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold  uppercase text-white">
                Additional Suggestions
              </h2>
              <ul className="  font-medium">
                <li className="mb-4">
                  <a href="/about" target="_blank" className="hover:underline">
                    Contact Information
                  </a>
                </li>
                <li className="mb-4">
                  <a href="/about" target="_blank" className="hover:underline">
                    About Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between flex-wrap">
          <span className="text-sm  sm:text-center w-full sm:w-auto mb4 sm:mb-0">
            © 2024{" "}
            <a href="https://police.rajasthan.gov.in/new/dashboard" target="_blank" className="hover:underline">
              Rajasthan Police™
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex justify-center">
            <a href="https://www.facebook.com/PoliceRajasthan/?locale=hi_IN" target="_blank" className="text-white">
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 8 19"
              >
                <path
                  fill-rule="evenodd"
                  d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                  clip-rule="evenodd"
                />
              </svg>
              <span className="sr-only">Facebook page</span>
            </a>
            <a href="https://twitter.com/PoliceRajasthan?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" target="_blank" className=" hover: hover:text-white ms-5">
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 17"
              >
                <path
                  fill-rule="evenodd"
                  d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                  clip-rule="evenodd"
                />
              </svg>
              <span className="sr-only">Twitter page</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
