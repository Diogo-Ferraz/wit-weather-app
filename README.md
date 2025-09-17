# 🌤️ Weather App

A responsive weather forecast application built with **React** and **TypeScript**.

The app allows users to search for any city and view a **5-day weather forecast**, with features like unit switching, error handling, and visual charts.  

---

## 🌐 Live Demo

**Try the app live here: https://diogo-ferraz.github.io/wit-weather-app/**

---

## 📸 Video Demo

Check out a short demo of the app here: [Watch Demo](https://youtu.be/Wx1e_8cW8go)

---

## 🎯 Development Goals

This project was designed to demonstrate my ability to:

- Build a responsive web application with **React** and **TypeScript**  
- Integrate and consume data from a real-world API (**OpenWeatherMap**)  
- Implement strong **UI/UX practices** across desktop, tablet, and mobile  
- Write clean, structured, and maintainable code  
- Handle errors gracefully with contextual messages  
- Deliver a performant, user-friendly experience  

---

## 🚀 Features

- 🔍 **City search**: Enter any city to retrieve a 5-day weather forecast  
- 🌡️ **Current temperature**: Always displays the up-to-date temperature  
- ⚠️ **Error handling**: Provides contextual error messages if data cannot be retrieved  
- 📱 **Responsive design**: Optimized for desktop, tablet, and mobile  
- 🌍 **Unit switching**: Toggle between Celsius and Fahrenheit without page refresh  
- 📊 **Temperature chart**: Graphical representation of temperature trends per day  
- 🗺️ **Weather map**: Interactive temperature map centered on the selected city  

---

## 🛠️ Tech Stack

- **React (with Hooks & Functional Components)**  
- **TypeScript**  
- **Styled Components** (for UI styling)  
- **Formik + Yup** (for form handling and validation)  
- **OpenWeatherMap API** (for weather data)  

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (>= 14)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Diogo-Ferraz/wit-weather-app.git

# Install dependencies
cd wit-weather-app
npm install

# Create a .env file with your OpenWeatherMap API key
REACT_APP_OPEN_WEATHER_API_KEY=your_api_key_here

# Start the development server
npm start
