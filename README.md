# SecureShare

SecureShare is a secure file transfer application that enables users to create temporary rooms for encrypted file and text sharing. It ensures privacy through **Zero-Knowledge Encryption**, **Multi-Factor Authentication (MFA)**, and **Self-Destructing Rooms**. Real-time communication and file transfer are powered by WebSockets.

## Features
- **End-to-End Encryption (E2EE)**: Client-side encryption ensures that only intended recipients can access data.
- **Temporary Rooms**: Rooms auto-delete after a set time or number of transfers.
- **Password-Protected Rooms**: Users require a password + OTP for access.
- **Real-Time Chat & File Transfer**: Uses WebSockets for instant messaging and file sharing.
- **Secure Authentication**: Implemented with JWT and MFA.
- **Scalable Backend**: Built with Node.js, Express, and MongoDB.

## Tech Stack
- **Frontend**: (To be integrated later)
- **Backend**: Node.js, Express, Socket.io
- **Database**: MongoDB
- **Security**: AES encryption for messages and files
- **Authentication**: JWT-based authentication with MFA
- **Real-Time Communication**: WebSockets (Socket.io)

## Getting Started

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/en/download/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (Local or Cloud-based MongoDB Atlas)
- [Git](https://git-scm.com/downloads)

### MongoDB Setup
#### Local MongoDB Setup
1. **Download and Install MongoDB:**
   - Download MongoDB from the [official website](https://www.mongodb.com/try/download/community).
   - Follow the installation instructions for your OS.

2. **Start MongoDB Service:**
   ```sh
   mongod --dbpath /path/to/your/data/db
   ```
   (Replace `/path/to/your/data/db` with the actual path where you want to store MongoDB data.)

3. **Verify Connection:**
   Open a new terminal and run:
   ```sh
   mongo
   ```
   This should open the MongoDB shell.

#### MongoDB Atlas (Cloud) Setup
1. **Create a MongoDB Atlas Account:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up.
   - Create a free cluster.
   - Whitelist your IP address or allow access from anywhere (`0.0.0.0/0`).

2. **Get Connection String:**
   - In the **Connect** section, select **Connect Your Application**.
   - Copy the provided MongoDB URI (e.g., `mongodb+srv://username:password@cluster.mongodb.net/yourDB`).

3. **Use Connection String in .env:**
   Update the `.env` file:
   ```env
   MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/yourDB
   ```

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/MeSarthak/secureShare.git
   cd secureShare
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and configure the following:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   OTP_SECRET=your_otp_secret
   ```

4. **Start the server:**
   ```sh
   npm start
   ```
   The server should be running at `http://localhost:5000`

## Usage
- **Create a Room**: A user creates a secure room and shares the credentials with others.
- **Join a Room**: Users enter the room with a password and OTP verification.
- **Send Files & Messages**: End-to-end encrypted messages and files are shared in real time.
- **Room Expiry**: The room self-destructs based on the configured settings.

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | User login |
| POST | `/api/room/create` | Create a secure room |
| POST | `/api/room/join` | Join an existing room |
| POST | `/api/file/upload` | Upload an encrypted file |
| GET | `/api/file/:id` | Retrieve an encrypted file |

## Contributing
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m "Added feature-name"`
4. Push to the branch: `git push origin feature-name`
5. Create a Pull Request.

## License
This project is licensed under the MIT License.

---
### Team Notes
- Make sure your MongoDB instance is running before starting the server.
- Use a strong JWT secret to enhance security.
- Future updates may include a frontend integration.
- Feel free to improve encryption methods for enhanced security.

