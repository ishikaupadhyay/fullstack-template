# BFHL Challenge - Fullstack Project

This project is a complete fullstack application developed for the Bajaj Finserv Health Limited (BFHL) challenge. It consists of a Python Flask backend and a modern React frontend built with Vite.

## 🚀 Project Overview

The application provides an interface to process mixed data (numbers and alphabets) via a specialized API. It features robust backend processing and a premium, responsive frontend with dynamic filtering.

**Live Frontend**: https://fullstack-template-psi.vercel.app/
**Live Backend**: [https://fullstack-template-geuq.onrender.com/bfhl](https://fullstack-template-geuq.onrender.com/bfhl)

---

## 🛠 Tech Stack

### Backend
- **Framework**: Flask (Python)
- **Deployment**: Render
- **Features**: CORS enabled, JSON validation, error handling.

### Frontend
- **Framework**: React 19 (Vite)
- **Styling**: Vanilla CSS (Glassmorphism Design)
- **State Management**: React Hooks (useState, useEffect)
- **Components**: Axios, React-Select
- **Deployment**: Vercel

---

## 📦 Backend Features

### API Endpoints

#### 1. `GET /bfhl`
- **Description**: Returns a hardcoded operation code.
- **Response**: `{"operation_code": 1}`

#### 2. `POST /bfhl`
- **Description**: Processes a list of data containing numbers and alphabets.
- **Input JSON**:
  ```json
  {
    "data": ["A", "1", "b", "3", "z"]
  }
  ```
- **Response Features**:
  - `is_success`: Status of the operation.
  - `user_id`: Combined `fullname_dob` (e.g., `john_doe_17091999`).
  - `numbers`: Array of all numbers in the input.
  - `alphabets`: Array of all alphabets in the input.
  - `highest_lowercase_alphabet`: The alphabet that comes last in the A-Z sequence among all lowercase alphabets in the input.

---

## 💻 Frontend Features

### Key Functionalities
- **Dynamic Tab Title**: Browser tab title is strictly set to the roll number: `0827CD231039`.
- **JSON Input Validation**: Real-time validation ensures the data sent to the API is correctly formatted.
- **Multi-Filter Results**: Users can filter the API response to view:
  - Numbers
  - Alphabets
  - Highest lowercase alphabet
- **Premium UI**: Modern glassmorphism design with a deep gradient background and responsive layout.

### Setup Instructions
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

---

## 👤 Developer Details
- **Name**: [Your Name]
- **Roll Number**: 0827CD231039
- **Email**: [Your Email]

---

## 📄 License
This project is for demonstration purposes for the BFHL recruitment process.
