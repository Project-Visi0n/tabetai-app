# 🍽️ Tabetai App

**Tabetai** ("I want to eat" in Japanese) is a comprehensive full-stack food application designed to revolutionize how people approach cooking by reducing food waste, saving time, and discovering delicious recipes based on available ingredients. The app empowers users to minimize waste while maximizing culinary creativity through intelligent recipe suggestions and personal recipe management.

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v19.1.0-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v8.16+-green.svg)](https://mongodb.com/)
[![Deploy Status](https://img.shields.io/badge/Deploy-AWS%20Ready-orange.svg)](http://3.129.135.94:5000)

## 🚀 Quick Start

### Development Mode
```bash
./start-dev.sh
```

### Production Deployment
```bash
git push origin main  # Triggers automatic AWS deployment
```

> **⚠️ First-time deployment?** You need to configure GitHub secrets first!  
> See [SECRETS_SETUP.md](SECRETS_SETUP.md) for detailed instructions.

## 🌟 Project Vision

Tabetai addresses common everyday challenges in meal planning and cooking:

### 🗑️ **Reducing Food Waste**
Transform leftover ingredients into delicious meals by suggesting recipes that utilize what's already in your fridge or pantry.

### ⏰ **Saving Time and Mental Energy**
Eliminate decision fatigue with intelligent recipe recommendations - no more endless scrolling through recipe websites.

### 🎨 **Inspiring Culinary Creativity**
Encourage experimentation with available ingredients and unlock your inner chef through smart recipe suggestions.

### 🌍 **Cultural and Dietary Inclusion**
Support diverse dietary needs and cultural preferences by allowing users to create, save, and share recipes that reflect their unique tastes and requirements.

## 🛠️ Tech Stack

<div align="center">

<h3 align="center">Frontend</h3>
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
<img src="https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=webpack&logoColor=black" alt="Webpack" />

<h3 align="center">Backend</h3>
<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
<img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
<img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />

<h3 align="center">Authentication & APIs</h3>
<img src="https://img.shields.io/badge/Google_OAuth-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Google OAuth" />
<img src="https://img.shields.io/badge/Spoonacular_API-FF6B35?style=for-the-badge&logo=spoonacular&logoColor=white" alt="Spoonacular API" />

<h3 align="center">Development & Deployment</h3>
<img src="https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint" />
<img src="https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white" alt="Google Cloud" />

</div>

<div align="center">

| **Component**        | **Technology**                    | **Version** |
|---------------------|-----------------------------------|-------------|
| **Frontend**        | React with Hooks                 | 19.1.0      |
| **Styling**         | Tailwind CSS                      | 4.1.11      |
| **Backend**         | Node.js + Express                | 5.1.0       |
| **Database**        | MongoDB with Mongoose             | 8.16.1      |
| **Authentication**  | Google OAuth                      | 0.12.2      |
| **Build Tool**      | Webpack                           | 5.100.0     |
| **External API**    | Spoonacular Recipe API            | -           |
| **Deployment**      | AWS EC2 with GitHub Actions       | -           |
| **Process Manager** | PM2                               | -           |
| **Code Quality**    | ESLint                            | 9.30.1      |

</div>

## 🚀 Deployment

### **Production Environment**
- **Live URL**: [http://3.129.135.94:5000](http://3.129.135.94:5000)
- **Platform**: AWS EC2
- **CI/CD**: GitHub Actions
- **Process Manager**: PM2

### **Deployment Methods**

1. **Automated (Recommended)**:
   ```bash
   git push origin main  # Triggers GitHub Actions deployment
   ```

2. **Manual Deployment**:
   ```bash
   ./deploy-prod.sh 3.129.135.94 ~/.ssh/your-key.pem ubuntu
   ```

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

## ✨ Features

### 🔍 **Smart Recipe Discovery**
- **Ingredient-based search**: Find recipes using ingredients you already have
- **Advanced filtering**: Filter by dietary restrictions, cuisine type, cooking time, and difficulty level
- **External API integration**: Access thousands of recipes via Spoonacular API

### 👤 **User Management**
- **Secure authentication**: Google OAuth integration for seamless login
- **Personal recipe collection**: Save and organize favorite recipes
- **Custom recipe creation**: Add personal and cultural recipes to your collection

### 📱 **User Experience**
- **Responsive design**: Optimized for desktop and mobile devices
- **Intuitive navigation**: Clean, user-friendly interface with React Router
- **Real-time search**: Dynamic recipe suggestions as you type

### 🔧 **Recipe Management**
- **CRUD operations**: Create, read, update, and delete recipes
- **Ingredient substitution**: Smart suggestions for ingredient alternatives
- **Recipe editing**: Modify existing recipes to suit your preferences

## 📁 Project Structure

```
tabetai-app/
├── 📄 README.md
├── 📄 package.json
├── ⚙️ webpack.config.mjs
├── ⚙️ eslint.config.mjs
├── ⚙️ tailwind.config.cjs
├── ⚙️ postcss.config.cjs
├── 🖥️ backend/
│   ├── 📄 package.json
│   ├── 🚀 server.js
│   ├── 💾 db/
│   │   └── index.js
│   ├── 📊 models/
│   │   ├── Recipe.js
│   │   └── User.js
│   ├── 🛣️ routes/
│   │   ├── recipes.js
│   │   ├── searchbar.js
│   │   ├── spoonacular.js
│   │   └── users.js
│   └── 📁 recipes_files/
└── 🎨 client/
    ├── 📄 package.json
    └── 📁 src/
        ├── 🎯 index.jsx
        ├── 🎨 input.css
        ├── 🎨 output.css
        ├── 🎨 tailwind.css
        ├── 🔄 UserContext.jsx
        └── 🧩 components/
            ├── App.jsx
            ├── BackButton.jsx
            ├── CreateRecipePage.jsx
            ├── CustomCardPage.jsx
            ├── CustomRecipeCard.jsx
            ├── EmojiRainbow.jsx
            ├── FavoriteRecipes.jsx
            ├── FridgeMagnets.jsx
            ├── Homepage.jsx
            ├── Layout.jsx
            ├── LoginPage.jsx
            ├── NavBar.jsx
            ├── RecipeCard.jsx
            ├── RecipeDetailPage.jsx
            ├── SearchBar.jsx
            ├── SpoonacularRecipeCard.jsx
            ├── YourRecipes.jsx
            └── RecipeCards/
                └── RecipeCardPage.jsx
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (local or cloud instance)
- **Google OAuth credentials**
- **Spoonacular API key**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/theblkguy/tabetai-app.git
   cd tabetai-app
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Install client dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

5. **Environment Setup**
   
   Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   SPOONACULAR_API_KEY=your_spoonacular_api_key
   GOOGLE_CLIENT_ID=your_google_oauth_client_id
   GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

6. **Start the development servers**

   **Backend server:**
   ```bash
   cd backend
   npm start
   ```

   **Frontend development server:**
   ```bash
   # In a new terminal
   npm start
   ```

   The application will be available at `http://localhost:8080`

## 🔧 Development

### Available Scripts

**Root level:**
- `npm start` - Start the frontend development server
- `npm run build` - Build the application for production
- `npm test` - Run tests

**Backend:**
- `npm start` - Start the backend server with nodemon
- `npm test` - Run backend tests

### API Endpoints

#### Recipe Routes (`/api/recipes`)
- `GET /` - Fetch all recipes
- `POST /` - Create a new recipe
- `GET /:id` - Get a specific recipe
- `PUT /:id` - Update a recipe
- `DELETE /:id` - Delete a recipe

#### User Routes (`/api/users`)
- `POST /register` - Register a new user
- `POST /login` - User login
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile

#### Spoonacular Routes (`/api/spoonacular`)
- `GET /search` - Search recipes by ingredients
- `GET /recipe/:id` - Get detailed recipe information

## 🎯 Development Roadmap

### ✅ Completed Features
- Project setup with Webpack and ESLint
- Express server with MongoDB connection
- React client with Tailwind CSS
- Basic routing structure
- Google OAuth authentication
- Recipe search functionality
- User favorites system

### 📋 Upcoming Features
- Advanced recipe filtering
- Ingredient substitution suggestions
- Recipe sharing capabilities
- Mobile app development
- Nutrition information integration

## 🤝 Contributing

We welcome contributions from the community! Whether you're fixing bugs, adding new features, or improving documentation, your help is appreciated. Feel free to fork the repository and submit a pull request.

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Bradley Williams** - *Full Stack Developer*
- **Jasmine Hall** - *Full Stack Developer*

## 🙏 Acknowledgments

- [Spoonacular API](https://spoonacular.com/food-api) for recipe data
- [Google OAuth](https://developers.google.com/identity/protocols/oauth2) for authentication
- [MongoDB](https://www.mongodb.com/) for database services
- [Tailwind CSS](https://tailwindcss.com/) for styling framework

## 📞 Support

For support, please open an issue on GitHub or contact the development team.

---

**Made with ❤️ by Project Vision**
