// import { useState } from 'react'
import './App.css'
import DrinkList from '../DrinkList/DrinkList'
import ShoppingCart from '../ShoppingCart/ShoppingCart'
import SearchFilter from '../SearchFilter/SearchFilter'



export type Ingredient = {
    name: string,
    measure: string
}

export type Drink = {
    idDrink: string,
    strDrink: string,
    strInstructions: string,
    strDrinkThumb: string,
    ingredients: Ingredient[]
    strGlass: string;
}



function App() {

  //This is just Test Data for the static site - will be replaced once we implement state
  const drinkResultList = [
    {
        idDrink: "17253",
        strDrink: "Paloma",
        strInstructions: `Straight: Pour all ingredients into mixing glass with ice cubes. Stir well. Strain in chilled martini cocktail glass. Squeeze oil from lemon peel onto the drink, or garnish with olive.`,
        strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/samm5j1513706393.jpg",
        strGlass: "Collins Glass",
        ingredients:[
            {
                name: "Grape Soda",
                measure:"3 oz"
            },
            {
                name: "Tequila",
                measure:"1 1/2 oz"
            },
        ],
        
    },
  ];

  return (
    <div className="App">

      <div className="TitleandCart"> 
        <h1>Cocktail App</h1>
        <button>Cart</button>
      </div>
      
      <SearchFilter />
      <DrinkList drinkResultList={drinkResultList} />
      <ShoppingCart /> {/* static overlay always visible for now */}
    </div>
  );
}

export default App

