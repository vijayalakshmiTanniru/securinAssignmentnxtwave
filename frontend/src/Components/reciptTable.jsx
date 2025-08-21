import React, { useEffect, useState } from "react";
import { getRecipes, searchRecipes } from "../api";
import RecipeDrawer from "./RecipeDrawer";

const RecipeTable = () => {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    fetchRecipes();
  }, [page, limit]);

  const fetchRecipes = async () => {
    const res = await getRecipes(page, limit);
    setRecipes(res.data.data);
  };

  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            <th>Title</th>
            <th>Cuisine</th>
            <th>Rating</th>
            <th>Total Time</th>
            <th>Serves</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map(recipe => (
            <tr key={recipe.id} onClick={() => setSelectedRecipe(recipe)}>
              <td>{recipe.title}</td>
              <td>{recipe.cuisine}</td>
              <td>{recipe.rating} ⭐</td>
              <td>{recipe.total_time}</td>
              <td>{recipe.serves}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button disabled={page===1} onClick={()=>setPage(page-1)}>Prev</button>
        <span> Page {page} </span>
        <button onClick={()=>setPage(page+1)}>Next</button>
        <select value={limit} onChange={e=>setLimit(Number(e.target.value))}>
          <option value={15}>15</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </div>

      <RecipeDrawer recipe={selectedRecipe} onClose={()=>setSelectedRecipe(null)} />
    </div>
  );
};

export default RecipeTable;
