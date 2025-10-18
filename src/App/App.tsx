import { useState } from 'react'
import './App.css'
import { useState } from 'react'
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

  const[CartItems, setCartItems] = useState<string[]>([
    "Tequila",
    "Lime Juice",
    "Triple Sec",
    "Salt",
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleClose=()=>{
    setIsCartOpen(!isCartOpen)
    }
    const handleRemove = (name: string) =>
    setCartItems((list) => list.filter((n) => n !== name));
    const handleClear = () => setCartItems([]);
   

  const [drinkResultList, setDrinkResultList] = useState<Drink[]>([]);
  const [favorites, setFavorites] = useState<string[]>([])

  async function getDrinkResultsFromSearch(searchTerm:string, showFavorites:Boolean, showAlcoholicDrinks:boolean, showNonAlcoholicDrinks:boolean ){

    // searchTerm = "margarita"
    const response = await fetch(`https://thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`)
    const json = await response.json()

    console.log(json)
    const drinks = json.drinks
    if (!drinks){
      console.log("No Drinks Found")
    }

    const newDrinks:Drink[] = []

    for (const drink of drinks){

      function getIngredients(){

        const ingredients:Ingredient[] = []

        for (let i = 1; i <= 15; i++){
          const ingredientName = drink[`strIngredient${i}`];
          const ingredientMeasure = drink[`strMeasure${i}`]
          if(!ingredientName){break}
          else{
            const newIngredient:Ingredient = {
              name:ingredientName,
              measure: ingredientMeasure
            }
            ingredients.push(newIngredient)
          }
        }

        return ingredients;
      }

      const newDrink:Drink = {
        idDrink: drink.idDrink,
        strDrink: drink.strDrink,
        strInstructions: drink.strInstructions,
        strDrinkThumb: drink.strDrinkThumb,
        ingredients: getIngredients(),
        strGlass: drink.strGlass,
      }
      newDrinks.push(newDrink)
      setDrinkResultList(newDrinks);
    }

  }

  return (
    <div className="App">

      <div className="TitleandCart"> 
        <h1>Cocktail App</h1>
        <button onClick={() => setIsCartOpen(true)}>Cart</button> 
      </div>
      
      <SearchFilter />
      <DrinkList drinkResultList={drinkResultList} />
       {isCartOpen && (
          <ShoppingCart items={CartItems} toggleClose={toggleClose} handleClear={handleClear} handleRemove={handleRemove} />
        )}
    </div>
    
  );
}

export default App
