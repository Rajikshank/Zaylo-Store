# Zaylo

Welcome to **Zaylo**! This project is a feature-rich e-commerce application built with modern web technologies to provide a seamless shopping experience. Designed to be fast, secure, and mobile-responsive, this platform is ideal for businesses looking to take their store online.

---

## 🚀 Features

- **Add/Edit Product:** Seamlessly manage your product catalog with an intuitive interface.
- **View Sales Analytics:** Gain insights into your store's performance with comprehensive analytics.
- **View Payment Status:** Track payment statuses in real-time with Stripe integration.
- **Mobile Responsive:** Optimized for mobile devices to provide a great user experience.
- **Secure Actions:** Ensures safe operations and protects sensitive data with Next.js safe actions.

---

## 🛠 Technologies Used

| Technology            | Description                                    |
|-----------------------|------------------------------------------------|
| <img src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg" alt="Next.js" height="40" /> | Framework for building server-side rendered React applications. |
| <img src="https://shadcn.dev/images/logo-dark.svg" alt="ShadCN UI" height="40" /> | Beautiful and customizable UI components.      |
| <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" height="40" /> | Payment gateway for secure transactions.        |
| <img src="https://framer.com/images/logo.svg" alt="Framer Motion" height="40" /> | Library for animations and transitions.        |
| <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" alt="TypeScript" height="40" /> | Strongly typed JavaScript for reliability.      |

---

## 🏗️ Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

- Node.js v16 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/zaylo.git
   cd zaylo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:
   ```env
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📈 Analytics & Dashboard

- Sales data visualization with interactive charts.
- Detailed insights into product performance.
- Integration with Stripe for payment and refund tracking.

---

## 🎨 Design Highlights

- **ShadCN UI Components:** Pre-designed and customizable components for faster development.
- **Framer Motion Animations:** Smooth transitions and animations for better user engagement.
- **Mobile-First Design:** Optimized layouts for seamless navigation on all screen sizes.

---

## 📂 Folder Structure

```plaintext
.
├── app
│   ├── api
│   ├── dashboard
│   ├── products
│   └── ...
├── components
├── public
├── styles
├── utils
└── ...
```

---

## 🛡 Security

This project implements **Next.js Safe Actions** to ensure secure operations, especially for sensitive functionalities like adding/editing products and handling payments.

---

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## 🤝 Contributions

We welcome contributions! If you want to contribute:

1. Fork the project.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

---

## 📧 Contact

For inquiries or support, feel free to reach out:

- Email: your-email@example.com
- GitHub: [your-username](https://github.com/your-username)

---

Thank you for checking out **Zaylo**! 🎉
