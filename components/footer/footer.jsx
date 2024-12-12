"use client";

import React from "react";

export default function FooterComp() {
  console.log("Footer component is rendering");
  return (
    <footer className="bg-black  text-white py-8 mt-4  border-t-4 border-red-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h4 className="text-lg font-bold">About Us</h4>
            <p className="text-sm">
              Welcome to our e-commerce platform. We offer high-quality products
              at the best prices with fast delivery.
            </p>
            {console.log("Rendered About Us section")}
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/shop"
                  className="text-sm hover:text-gray-300"
                  onClick={() => console.log("Navigating to Shop")}
                >
                  Shop
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-sm hover:text-gray-300"
                  onClick={() => console.log("Navigating to About")}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="text-sm hover:text-gray-300"
                  onClick={() => console.log("Navigating to FAQ")}
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-sm hover:text-gray-300"
                  onClick={() => console.log("Navigating to Contact")}
                >
                  Contact
                </a>
              </li>
            </ul>
            {console.log("Rendered Quick Links section")}
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold">Contact Us</h4>
            <p className="text-sm">Email: support@example.com</p>
            <p className="text-sm">Phone: +123 456 7890</p>
            <p className="text-sm">Address: 123 E-Commerce St, Shop City</p>
            {console.log("Rendered Contact Us section")}
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-gray-300"
                onClick={() => console.log("Navigating to Facebook")}
              >
                Facebook
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-gray-300"
                onClick={() => console.log("Navigating to Twitter")}
              >
                Twitter
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-gray-300"
                onClick={() => console.log("Navigating to Instagram")}
              >
                Instagram
              </a>
            </div>
            {console.log("Rendered Follow Us section")}
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Zaylo(Developed by Rajikshan K). All
            rights reserved.
          </p>
          {console.log("Rendered footer bottom section")}
        </div>
      </div>
    </footer>
  );
}
