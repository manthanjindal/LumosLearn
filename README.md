# LumosLearn 🚀

An AI-powered learning platform that provides interactive lessons, personalized tutoring, and comprehensive educational content across various subjects, with a focus on AI, Machine Learning, and programming.

## 🌟 Features

- **AI-Powered Tutoring**: Interactive chatbot powered by Google's Gemini AI
- **Comprehensive Lesson Library**: 200+ lessons covering AI, ML, Data Science, and more
- **Multi-language Support**: English and Hindi translations
- **User Authentication**: Secure login and registration system
- **Progress Tracking**: Monitor your learning journey
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark/Light Theme**: Customizable user interface
- **Real-time Chat**: Instant AI assistance for learning queries

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API communication
- **React Toastify** for notifications
- **Lucide React** for icons

### Backend
- **Node.js** with Express
- **Google Gemini AI** for intelligent responses
- **CORS** for cross-origin requests
- **Dotenv** for environment management

## 📁 Project Structure

```
LumosLearn/
├── lumoslearn_frontend/          # React frontend application
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   ├── pages/               # Page components
│   │   ├── contexts/            # React contexts
│   │   ├── data/                # Lesson data and content
│   │   ├── utils/               # Utility functions
│   │   └── types/               # TypeScript type definitions
│   └── package.json
├── lumoslearn-backend/          # Node.js backend server
│   ├── server.js               # Main server file
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/LumosLearn.git
   cd LumosLearn
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd lumoslearn_frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../lumoslearn-backend
   npm install
   ```

4. **Environment Setup**

   Create a `.env` file in the `lumoslearn-backend` directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   FRONTEND_URL=http://localhost:5173
   PORT=3001
   ```

   Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd lumoslearn-backend
   npm run dev
   ```
   The backend will run on `http://localhost:3001`

2. **Start the Frontend Development Server**
   ```bash
   cd lumoslearn_frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

3. **Open your browser** and navigate to `http://localhost:5173`

## 📚 Available Lessons

The platform includes comprehensive lessons on:

- **AI Fundamentals**: Introduction to AI, Machine Learning basics
- **Deep Learning**: Neural networks, CNNs, RNNs, Transformers
- **Data Science**: Data preprocessing, visualization, analysis
- **Programming**: Python, algorithms, best practices
- **AI Applications**: Healthcare, finance, education, and more
- **Ethics & Safety**: Responsible AI, bias, privacy
- **Career Development**: Job preparation, portfolio building

## 🤖 AI Tutor Features

- **Personalized Learning**: Adapts to your learning style and pace
- **Multi-subject Support**: Covers various academic and technical topics
- **Interactive Conversations**: Natural language processing for better understanding
- **Real-time Assistance**: Instant help with questions and concepts
- **Progress Tracking**: Monitors your learning journey

## 🌐 Deployment

### Frontend (Netlify)
The frontend is configured for deployment on Netlify with the `netlify.toml` configuration file.

### Backend (Render)
The backend is configured for deployment on Render with the `render.yaml` configuration file.

## 🔧 Development Scripts

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

### Backend
```bash
npm start        # Start production server
npm run dev      # Start development server with nodemon
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Google Gemini AI for providing the AI capabilities
- The React and Node.js communities for excellent documentation
- All contributors who help improve this learning platform

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the development team.

---

**Made with ❤️ for the learning community** 