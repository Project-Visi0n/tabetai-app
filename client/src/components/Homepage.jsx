import React from "react";
//link the homepage to the other components
import { Link } from "react-router-dom";

//I got the bento boxes from emojipedia.org//

//show a welcome page
//show a search page
//show a recipes page
//show a favorites page 
function HomePage() {
  return (
    <div className="homepage">
      <h1>🍱 Welcome to the Tabetai app 🍱</h1>
      <p> Search recipes based on what you already have at home!</p>
      {/* Navigation Links */ }
      <div style={{ display: "flex", flexDirection: "column", gap: "10px"}}>
    <Link to="/recipe"> Search Recipes</Link>
     <Link to="/search"> My Recipes</Link>
      <Link to="/favorites"> Favorite Recipes</Link>
      </div>
    </div>
  );
}

export default HomePage;