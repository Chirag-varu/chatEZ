# **ChatEZ** 💬

ChatEZ is a modern, full-stack real-time chat application designed to deliver seamless and efficient communication. With a responsive, visually appealing user interface, secure user authentication, and instant real-time message updates, ChatEZ ensures a smooth and engaging user experience for both personal and professional use.

chatEZ - Next-Gen Real-Time Chat App.

---

## **Features** 🚀

- **📱 Responsive UI** : Optimized for all screen sizes and devices.
- **⚡ Real-Time Messaging** : Enjoy instant updates and uninterrupted communication.
- **✅ User Authentication** : Secure sign-up and login functionality.
- **📈 Scalable Architecture** : Built for high performance and future enhancements.
- **🔒 Secure Authorization** : Multi-factor authentication & secure login.
- **🛡️ Encrypted Messages** : End-to-end encryption for ultimate privacy.
- **👥 Group Chats** : Create and manage group conversations.
- **📷 Image Sharing** : Share moments instantly.
- **🔍 User and Group Search** : Find friends and Group easily.
- **🟢 User Tracking** : See who's online in real-time.
- **👤 Profile Updates** : Customize your profile.
- **🛠️ Admin Panel (CRM)** : To monitor and manage users.

---

## **upcomming features (soon)** 🛠️

- **📞 Voice Calls** : Crystal-clear voice calls with friends.
- **📹 Video Calls** : Seamless video calls without interruption.
- **📄 PDF Support** : Share documents seamlessly.
- **🎭 GIF Support** : Express yourself with GIFs.
- **🎥 Video Upload** : Share videos with your contacts.

---

## 🛠 Tech Stack  

### **Frontend (chatez)**  
- **Vite** (Fast build tool)  
- **React 18 + TypeScript**  
- **Tailwind CSS** (With DaisyUI, Tailwind Merge, and Animations)  
- **Radix UI** (Avatar, Dialog, Dropdown, Tooltip, etc.)  
- **Framer Motion** (Animations)  
- **React Router** (Client-side navigation)  
- **React Select** (Custom dropdowns)  
- **Zustand** (State management)  
- **Axios** (HTTP requests)  
- **Sonner / React Hot Toast** (Notifications)  
- **Lucide React** (Icons)  

### **Backend (server)**  
- **Node.js & Express.js** (Backend framework)  
- **MongoDB & Mongoose** (Database & ORM)  
- **Cloudinary** (Media storage)  
- **Socket.io** (Real-time communication)  
- **JSON Web Token (JWT)** (Authentication)  
- **Bcrypt.js** (Password hashing)  
- **Express Rate Limit** (Security & throttling)  
- **Crypto.js** (Encryption)  
- **Cron** (Scheduled tasks and app uptime)  
- **Nodemailer** (Email service)  

### **Tooling & Dev Dependencies**  
- **TypeScript** (Static typing)  
- **ESLint & Prettier** (Linting & code formatting)  
- **PostCSS & Autoprefixer** (CSS optimization)  
- **Vite Plugins** (React, SWC)  
- **DaisyUI** (UI Components)  
- **Nodemon** (Auto-restart for backend development)  

---

## **Installation** 🛠️

Follow these steps to set up ChatEZ on your local machine:

1. **Clone the Repository** 🖥️  
   Clone the repository from GitHub:

   ```bash
   git clone https://github.com/Chirag-varu/chatEZ.git
   ```

2. **Navigate to the Project Folder** 📂  
   Move into the project directory:

   ```bash
   cd chatEZ
   ```

3. **Install Dependencies** 📦  
   Use `npm` or `yarn` to install the required dependencies:
   ```bash
   npm install
   # OR
   yarn install
   ```
4. Set up your `.env` file with:

   ```
   PORT=5001
   MONGODB_URI=your-mongodb-uri
   SECRET_KEY = your_secret_key
   HTTPS = false

   CLOUDNARY_CLOUD_NAME = your_cloud_name
   CLOUDNARY_API_KEY = your_api_key
   CLOUDNARY_API_SECRET = your_api_secret
   MESSAGE_SECRET_KEY = your_message_secret_key
   ```

5. **Start the Development Server** 🚀  
   Run the project locally:
   ```bash
   npm run dev
   # OR
   yarn dev
   ```
   Open your browser and visit `http://localhost:5173` to access ChatEZ.

---

## **Project Structure Overview 📂**

ChatEZ follows a structured directory layout to keep the project organized and maintainable:
```
chirag-varu-chatez/
├── client/          # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── Components/  # Reusable UI components
│   │   ├── pages/       # Application pages
│   │   ├── store/       # State management (using zustand)
│   │   ├── hooks/       # Custom hooks
│   │   ├── lib/         # Utility functions & API handlers
│   │   └── ui/          # UI elements (buttons, modals, etc. using shadcn)
│   ├── public/         # Static assets (chatEZ logo)
│   ├── index.html      # Main HTML file
│   ├── package.json    # Dependencies and scripts
|   ├── .gitignore      # Ignored files
│   ├── tailwind.config.js  # Tailwind CSS configuration
│   ├── vite.config.ts  # Vite configuration
│   └── tsconfig.json   # TypeScript configuration
│
├── server/         # Backend (Node.js + Express.js)
│   ├── src/
│   │   ├── controllers/  # Request handling logic
│   │   ├── routes/       # API routes
│   │   ├── modules/      # Business logic
│   │   ├── middleware/   # Authentication & authorization
│   │   ├── lib/          # Utility files (Cloudinary, DB connection, etc.)
│   │   └── app.js        # Entry point for the backend
│   ├── package.json  # Dependencies and scripts
│   ├── .gitignore    # Ignored files
│
├── README.md      # Project documentation
├── LICENSE        # License details
├── History.md     # version information
├── package.json   # Root dependencies and scripts
└── run.sh         # Deployment script
```
This structure helps developers quickly navigate the project and understand where to make modifications.

---

## **Contributing** 🤝

We welcome contributions to ChatEZ! Follow these steps to contribute:

1. **Fork the Repository** 🍴

   - Click the **Fork** button in the top-right corner of the repository page to create your own copy of the repository.

2. **Clone Your Fork** 🔄  
   Clone your forked repository to your local machine:

   ```bash
   git clone https://github.com/Chirag-varu/chatEZ.git
   cd chatEZ
   npm install
   ```

3. **Create a New Branch** 🌱  
   Create a feature branch to make changes:

   ```bash
   git checkout -b feature-name
   ```

4. **Make Changes** ✍️  
   Implement your feature or bug fix and test it locally.

5. **Stage and Commit Changes** 📝  
   Stage your modified files and commit with a clear message:

   ```bash
   git add .
   git commit -m "Describe your changes"
   ```

6. **Push Changes** ⬆️  
   Push your branch to your forked repository:

   ```bash
   git push origin feature-name
   ```

7. **Create a Pull Request** 🔃
   - Go to the original ChatEZ repository on GitHub.
   - Open a pull request from your feature branch and provide a clear description of your changes.

---

## **License** 📜

This project is licensed under the [MIT License](LICENSE).

Feel free to use, modify, and distribute this project in accordance with the license terms.

---
