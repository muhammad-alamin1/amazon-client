import React, { useEffect, useState } from 'react';

const MealDetails = () => {
    const [meal ,setMeal] = useState({});
    useEffect(() =>{
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772`
        fetch(url)
        .then(response => response.json())
        .then(data =>{
            console.log(data)
            setMeal(data.meals?.[0])   // ? optional chain
        })
    },[])
    return (
        <div>
            <h1>This is meal Details</h1>
            <h3>name: {meal.strMeal}</h3>
        </div>
    );
};

export default MealDetails;