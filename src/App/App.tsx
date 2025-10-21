import { useCallback, useState } from 'react'
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
    ingredients: Ingredient[],
    strGlass: string,
    isFavorite: boolean,
}



function App() {

  const[CartItems, setCartItems] = useState<string[]>([
    
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [drinkResultList, setDrinkResultList] = useState<Drink[]>([]);
  const [favorites, setFavorites] = useState<string[]>([])
  

  // Handles Cart Open/Close
  const toggleClose=()=>{
    setIsCartOpen(!isCartOpen)
    }
  
  // handles adding and removing ingredients from the cart
  const handleRemove = (name: string) =>
    setCartItems((list) => list.filter((n) => n !== name));
  const handleClear = () => setCartItems([]);
  
  const handleAdd = (ingredient:string) => setCartItems((list)=> {
    if(list.includes(ingredient)){return list}
    return [...list, ingredient] 
  })

  //handles toggling whether a drink is in the favorites list
  const toggleFavorite = (id: string) =>{
    if(favorites.includes(id)){
      setFavorites((list) => list.filter((n) => n !== id));

    }else{
      setFavorites((list)=> [...list, id] )
    }
  }

// Handles getting the api results and setting the drinkresultlist - called in Search/Filter
  const getDrinkResultsFromSearch = useCallback(async (searchTerm:string, showFavoritesOnly:boolean, showAlcoholicDrinks:boolean, showNonAlcoholicDrinks:boolean, dropdownValue: string) => {
    
    //if search term is empty, dont bother sending any reqs
    if(!searchTerm){
      setDrinkResultList([]);
      return;
    }

    //handle the different options for the drop down and different endpoints to hit
    let response: Response | null = null
    switch (dropdownValue){
      case ("Ingredients"):
        response = await fetch(`https://thecocktaildb.com/api/json/v1/1/filter.php?i=${searchTerm}`);
        break;
      case ("Glasses"):
        response = await fetch(`https://thecocktaildb.com/api/json/v1/1/filter.php?g=${searchTerm.replaceAll( " ", "_" )}`);
        break;
      default:
        response = await fetch(`https://thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`);
    }
    
    const json = await response.json()

    const drinks = json.drinks

    //handle any issues where the drinks array is not found or there is no data found
    if (!drinks || drinks === "no data found"){
      setDrinkResultList([])
      console.log("No Drinks Found")
      return;
    }

    const newDrinks:Drink[] = []

    for (const drink of drinks){

      //Skip Drink if Not Matching Filters
      if (!showAlcoholicDrinks && drink.strAlcoholic === "Alcoholic"){continue}

      if (!showNonAlcoholicDrinks&& drink.strAlcoholic === "Non alcoholic"){continue}

      if(showFavoritesOnly && !favorites.includes(drink.idDrink)) {continue}

      //function to itemize the ingredients
      function getIngredients(drinkData: Record<string, string|null>){

        const ingredients:Ingredient[] = []

        for (let i = 1; i <= 15; i++){
          const ingredientName = drinkData[`strIngredient${i}`];
          const ingredientMeasure = drinkData[`strMeasure${i}`]
          if(!ingredientName){break}
          else{
            const newIngredient:Ingredient = {
              name:ingredientName,
              measure: ingredientMeasure?ingredientMeasure:""
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
          ingredients: getIngredients(drink),
          strGlass: drink.strGlass,
          isFavorite: favorites.includes(drink.idDrink)
      }
      //add to array
      newDrinks.push(newDrink)
      // console.log(newDrink.strDrink)
    }
      //set the drink results to the new array
      setDrinkResultList(newDrinks);

  }, [favorites])

  return (
    <div className="App">

      <div className="TitleandCart"> 
        <h1>Cocktail App</h1>
        <button onClick={() => setIsCartOpen(true)}>Cart</button> 
      </div>
      
      <SearchFilter getDrinkResultsFromSearch={getDrinkResultsFromSearch}/>
      <DrinkList drinkResultList={drinkResultList} handleAdd={handleAdd} toggleFavorite={toggleFavorite}/>
       {isCartOpen && (
          <ShoppingCart items={CartItems} toggleClose={toggleClose} handleClear={handleClear} handleRemove={handleRemove} />
        )}
    </div>
    
  );
}

export default App
