import { useState, useEffect } from "react";
import MealItem from "./MealItem";

export default function Meals() {
  // Because call API take a little time to loading
  // Then we will need state to manage its display
  const [loadedMeals, setLoadedMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      // Fetch return a promise
      // Async and await effeciently handle the promise
      const response = await fetch("http://localhost:3000/meals");
      if (!response.ok) {
        // ...
      }
      const meals = await response.json();
      setLoadedMeals(meals);
    }

    fetchMeals();
  }, []);

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
