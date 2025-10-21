import type { Drink } from "../App/App"
import "./DrinkList.css"
import ListItem from "./ListItem/ListItem"

type DrinkListProps = {
    drinkResultList: Drink[],
    handleAdd: (name:string) => void,
    toggleFavorite: (id: string) => void
}

export default function DrinkList({drinkResultList, handleAdd, toggleFavorite}: DrinkListProps){
    return(
        <div className="DrinkListContainer">
            {
                //For Every Drink In The Data, create a ListItem, if there are no drinks found, prompt user to add search terms
                drinkResultList.length !== 0?
                    drinkResultList.map(drink =>
                        <ListItem drink={drink} key={drink.idDrink} handleAdd={handleAdd} toggleFavorite={toggleFavorite}/>,
                    ):
                    "No Cocktails Found, Try A Different Search Term or Filters"
            }
        </div>
    )
}