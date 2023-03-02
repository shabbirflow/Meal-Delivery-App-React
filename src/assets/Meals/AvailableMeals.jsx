import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem.jsx";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getMeals = async () => {
      const response = await fetch(
        "https://react-sw-6cfc3-default-rtdb.firebaseio.com/meals.json"
      );

      if(!response.ok){
        throw new Error('Something went wrong');
      }
      const mealsObject = await response.json();

      let mealArray = [];
      for (const key in mealsObject) {
        mealArray.push({ id: key, ...mealsObject[key] });
      }

      setMeals(mealArray);
    };

    getMeals().catch((e) => {
      setLoading(false);
      setError(e.message);
      // console.log(e.message)
    });
    console.log(meals);
    setLoading(false);
  }, []);

  if(loading){
    return <h3 className={classes.loading}>The site is loading...</h3>
  }

  if(error){
    return <h3 className={classes.error}>Error: {error}</h3>
  }

  const mealList = meals.map((meal) => (
    <MealItem
      price={meal.price}
      description={meal.description}
      name={meal.name}
      key={meal.id}
      id={meal.id}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
