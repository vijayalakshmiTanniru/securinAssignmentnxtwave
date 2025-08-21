import React from "react";

const RecipeDrawer = ({ recipe, onClose }) => {
  if (!recipe) return null;

  const { title, cuisine, description, total_time, prep_time, cook_time, nutrients, serves } = recipe;

  return (
    <div className="drawer">
      <button onClick={onClose}>Close</button>
      <h2>{title} - {cuisine}</h2>
      <p><strong>Description:</strong> {description}</p>
      <p>
        <strong>Total Time:</strong> {total_time} min 
        <span> (Prep: {prep_time}, Cook: {cook_time})</span>
      </p>
      <p><strong>Serves:</strong> {serves}</p>
      <h3>Nutrition</h3>
      <table>
        <tbody>
          {nutrients && Object.entries(nutrients).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecipeDrawer;
