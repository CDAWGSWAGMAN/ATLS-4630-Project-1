
type UserActionsProps = {
    isFavorite: boolean,
    idDrink: string,
    toggleFavorite: (idDrink: string) => void,
    addIngredients: () => void;
}

export default function UserActions({isFavorite, idDrink, toggleFavorite, addIngredients}:UserActionsProps){
    return(
        <div className="DrinkUserActionsContainer">
                <button onClick={()=>toggleFavorite(idDrink)}>{isFavorite?"Unfavorite":"Favorite"}</button>
                <button onClick={addIngredients}>Add to Cart</button>
        </div>
    )
}