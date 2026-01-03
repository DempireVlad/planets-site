# Planets Site 🌍

Interactive planets information website built with Vanilla JavaScript.  
The app displays detailed information about planets and allows switching between
overview, internal structure, and surface geology.

## 🚀 Live Demo
https://github.com/DempireVlad/planets-site/deployments/github-pages

## 📌 Features

- Switch between planets
- Dynamic content loaded from JSON
- Section switching:
  - Overview
  - Internal Structure
  - Surface Geology
- Dynamic theme color based on selected planet
- Responsive mobile navigation
- Mobile menu with burger button
- Image switching with geology overlay

## 🛠 Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla)
- JSDoc (code documentation)

## 📁 Project Structure

```txt
.
├── assets/                # Images and icons
├── style/                 # CSS styles
├── data.json              # Planets data
├── index.html             # Main HTML file
├── script.js              # Application logic
└── README.md              # Project documentation
```

## 🧠  Main Logic

### updateGeologyImage(planet, section)
Updates planet image and geology layer based on selected section.

**Parameters:**
- `planet` — planet name in lowercase
- `section` — `"overview" | "structure" | "surface"`

### fetchData()
Fetches planets data from `data.json` and initializes the app.

### initApp()
Initializes event listeners and updates UI with selected planet data.

## 📚 JSDoc Documentation

HTML documentation can be generated from JSDoc comments using `jsdoc`.