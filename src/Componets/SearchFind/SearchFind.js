import './search.css'
import React, { useEffect, useState } from 'react';

const SearchFind = () => {
    const [meals , setMeals] = useState([]);
    const [search,setSearch] = useState('');
    const handleChange = event =>{
        setSearch(event.target.value);
    }
    useEffect(() =>{
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
        fetch(url)
        .then(response => response.json())
        .then(data =>{
            // console.log(data.meals[0])
            setMeals(data.meals)
        })
    },[search])
    return (
        <div id="search">
            <input type="text" onChange={handleChange} placeholder=" Search Food" />
            <p>Search: {search}</p>
            <p>Available Item: {meals?.length || 0}</p>
            <ul>
                {
                    meals?.map(meal =><li>{meal.strMeal}</li>)
                }
            </ul>
        </div>
    );
};

export default SearchFind;