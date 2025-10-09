import type { Drink } from "../../App/App";
import "./ListItem.css"


type ListItemProps= {
    drink: Drink;
}


export default function ListItem({drink}:ListItemProps){

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
                {drink.ingredients.map( ingredient =>
                    <div className="DrinkIngredientInfo">
                        <span><strong>{ingredient.name}</strong></span>
                        <span>{ingredient.measure}</span>
                    </div>
                )}
            </div>
            <div className="DrinkUserActionsContainer">
                <button>Favorite</button>
                <button>Add to Cart</button>
            </div>
        </div>
    )
}