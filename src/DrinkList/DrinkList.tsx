import type { Drink } from "../App/App"
import "./DrinkList.css"
import ListItem from "./ListItem/ListItem"

type DrinkListProps = {
    drinkResultList: Drink[]
}

export default function DrinkList({drinkResultList}: DrinkListProps){
    return(
        <div className="DrinkListContainer">
            {
                drinkResultList.map(drink =>
                    <ListItem drink={drink} key={drink.idDrink}/>,

                )
            }
        </div>
    )
}