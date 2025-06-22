# 🚀 PostGen AI – Next-Gen AI Post Generator

PostGen AI is a React-based web application that uses Google's Gemini AI to generate creative social media posts, captions, and content ideas. This project is built for marketers, creators, and businesses who want to streamline content creation using artificial intelligence.

---

## 🧰 Tech Stack

* ⚛️ React.js
* 🌐 Google Gemini Generative Language API
* 💅 CSS / Custom Styling
* 🔐 .env for environment configuration

---

## 🛆 Features

* ✨ Generate AI-powered text content
* 🔑 Secure API key management via `.env`
* 📱 Responsive and minimal design
* 🧠 Uses Gemini 1.5 Flash model from Google

---

## 🛠️ Installation & Setup Guide

Follow these steps to run the project locally:

### 1. 📅 Clone the repository

```bash
git clone https://github.com/prashant-talaviya/postgen-ai.git
cd postgen-ai
```

### 2. 📆 Install dependencies

```bash
npm install
```

### 3. 🔐 Set up the `.env` file

Create a `.env` file in the root directory and add your API key like this:

```env
REACT_APP_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_API_KEY
```

> 💡 Replace `YOUR_API_KEY` with your actual key from [Google AI Studio](https://makersuite.google.com/app).

### 4. ▶️ Start the development server

```bash
npm start
```

The app will start on [http://localhost:3000](http://localhost:3000)

---

## 🚀 Deployment

You can deploy this app to:

* GitHub Pages
* Vercel
* Netlify

> 🔗 Live Demo: [https://postgen-ai.netlify.app/](https://postgen-ai.netlify.app/)

---

## 📝 License

This project is licensed under the MIT License.

---

## 🙌 Acknowledgments

* [Google Generative Language API (Gemini)](https://ai.google.dev/)
* [Create React App](https://create-react-app.dev/)

---

## ✍️ Author

**Prashant Talaviya**
Frontend Developer & AI Enthusiast
[GitHub](https://github.com/prashant-talaviya)
[LinkedIn](https://www.linkedin.com/in/prashant-talaviya/)
[Live Website](https://postgen-ai.netlify.app/)
