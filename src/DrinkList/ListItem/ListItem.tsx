import type { Drink } from "../../App/App";
import UserActions from "./UserActions/UserActions";
import { useEffect } from "react";
import "./ListItem.css"


type ListItemProps= {
    drink: Drink;
    handleAdd: (name:string) => void,
    toggleFavorite: (id: string) => void
}


export default function ListItem({drink, handleAdd, toggleFavorite}:ListItemProps){


    function addIngredients(){
        for (const ingredient of drink.ingredients){
           handleAdd(ingredient.name)
        }
    }

    return(
        <div className="DrinkContainer">
            <img src={drink.strDrinkThumb}/>
            <div className="DrinkInfo">
                <h2>{drink.strDrink}</h2>
                <h3>Instructions</h3>
                <p>{drink.strInstructions}</p>
                <br/>
                <p><strong>Served: </strong>{drink.strGlass}</p>
            </div>
            <div className="DrinkIngredients">
                <h3>Ingredients</h3>
                {drink.ingredients.map( (ingredient, index) =>
                    <div className="DrinkIngredientInfo" key={index}>
                        <span><strong>{ingredient.name}</strong></span>
                        <span>{ingredient.measure}</span>
                    </div>
                )}
            </div>
            <UserActions isFavorite={drink.isFavorite} idDrink={drink.idDrink} toggleFavorite={toggleFavorite} addIngredients={addIngredients}/>
        </div>
    )
}