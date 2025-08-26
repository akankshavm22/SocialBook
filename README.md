# 📚  SocialBook - College Network of Students
**SocialBook** is a web-based platform designed exclusively for college students to connect, share educational materials, address issues, and foster academic collaboration. Inspired by platforms like Facebook but tailored for educational needs, this application is the ideal digital space for student interaction.

## 📌 Features
- **User Registration & Authentication**: Students can sign up and create secure accounts.
- **Profile Management**: Upload and update profile pictures.
- **Networking**: Send friend requests and connect with peers.
- **Messaging System**: Private messaging between connected users.
- **Post & Share**: Share educational materials, updates, and ideas.
- **Global College Network**: Connect with students worldwide.

## 🛠️ Tech Stack
- **Frontend**: Next.js (React framework)
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **State Management**: Redux with Thunk
- **Styling**: Tailwind CSS / CSS Modules (based on your implementation)
- **Hosting**: Vercel / Firebase Hosting

## 🚀 Installation & Setup
### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- Firebase project setup

### Steps
1. **Clone the Repository**
   <pre>
   git clone https://github.com/your-username/socialbook-main.git
   cd socialbook-main
   </pre>
2. **Install Dependencies**
<pre>
npm install
# or
yarn install
</pre>
3. Firebase Configuration
    - Create a project in Firebase Console
    - Enable Authentication, Firestore Database, and Storage
    - Copy your Firebase config and replace it in firebase-config.js
4. **Run the Development Server**
<pre>
npm run dev
# or
yarn dev
</pre>
5. **Build for Production**
<pre>
npm run build
npm start
</pre>

## 📂 Project Structure
<pre>
├── public/               # Static assets
├── src/                  # Application source code
│   ├── components/       # Reusable UI components
│   ├── pages/            # Next.js pages
│   ├── store/            # Redux store and slices
│   ├── styles/           # CSS and styling files
│   └── utils/            # Helper functions
├── firebase-config.js    # Firebase configuration
├── package.json          # Dependencies and scripts
└── README.md             # Project documentation
</pre>

## 🎯 Future Enhancements
    - Group chats and discussion forums
    - Video calling functionality
    - Push notifications for messages and friend requests
    - Admin panel for college event management

## 👩‍💻 Contributors
    - Akanksha Mane
    - Siddhi Tambe
    - Ibrahim Quershi 
    - Ali Patel