import "./SearchFilter.css"
import { useEffect, useRef, useState } from "react"
import { debounce } from "lodash"

type SearchFilterProps = {
    getDrinkResultsFromSearch: (searchTerm:string, showFavoritesOnly:boolean, showAlcoholicDrinks:boolean, showNonAlcoholicDrinks:boolean, dropdownValue: string) => void;
}


export default function SearchFilter({getDrinkResultsFromSearch}:SearchFilterProps){
    // const dropdownOptions = [
    //     {type: "Drink Names"},
    //     {type: "Ingredients"},
    //     {type: "Glass"}
    // ]

    // states!
    const [inputValue, setInputValue] = useState("")
    const [dropdownIsOpen, setDropdownIsOpen] = useState(false)
    const [dropdownValue, setDropdownValue] = useState("")
    const [filterIsFavorites, setFilterIsFavorites] = useState(false)
    const [filterIsAlcoholic, setFilterIsAlcoholic] = useState(true)
    const [filterIsNonAlcoholic, setFilterIsNonAlcoholic] = useState(true)


    // below is from ChatGPT to have the "enter" functionality work for the input
    // the type allows for it to be a keyboard event (ie typing or clicking enter)
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            // when the event is enter, want to make sure the input value isn't empty
            if (inputValue !== "") {
                console.log({inputValue})
                // reset input
                setInputValue("")
                } else {
                console.log("input empty")
            }
        }
    }

    // function printDropdownValue() {
    //     console.log(dropdownValue)
    // }
    
    // printDropdownValue()

    // function printFilterValue() {
    //     console.log(`alcohol ${filterIsAlcoholic}`)
    //     console.log(`nonalcohol ${filterIsNonAlcoholic}`)
    //     console.log(`favorites ${filterIsFavorites}`)
    // }

    // printFilterValue()


    // Debounce code source - https://carlrippon.com/using-lodash-debounce-with-react-and-ts/
    const debouncedSearch = useRef(
        debounce(async (inputValue, filterIsFavorites, filterIsAlcoholic, filterIsNonAlcoholic, dropdownValue) => {
            getDrinkResultsFromSearch(inputValue, filterIsFavorites, filterIsAlcoholic, filterIsNonAlcoholic, dropdownValue);
        }, 300)
    ).current;

     useEffect(()=>{
        debouncedSearch(inputValue, filterIsFavorites, filterIsAlcoholic, filterIsNonAlcoholic, dropdownValue)

     }, [inputValue, filterIsAlcoholic, filterIsFavorites, filterIsNonAlcoholic, dropdownValue, getDrinkResultsFromSearch, debouncedSearch])


    return(
        <div className="SearchandFilter">
            <div className="ButtonandInput">
                <button
                className="Dropdown"
                // always set to opposite of what already is - hides and shows it
                onClick={() => setDropdownIsOpen(!dropdownIsOpen)}>
                    {/* set the value that's shown to dropdown value unless empty, then Select Search Option */}
                    {dropdownValue === "" ? "Select Search Option" : dropdownValue}
                    {/* {dropdownValue} */}
                </button>
        
                {/* Search Input */}
                <input
                type="text"
                className = "Searchbar"
                value = {inputValue}
                // below from chatGPT : the e is the event, the "target" is the element that triggered the event (input)
                onChange={(e) => setInputValue(e.target.value)}
                // want to input it after click enter
                onKeyDown={handleKeyDown}
                placeholder={"Search for drinks with..."}
                />
            </div>
            {/* if the dropdownisOpen is true, then show the dropdown options! */}
            {dropdownIsOpen && (
                <ul className="dropdownMenu">
                    {/* realized I made this way more complicated than necessary with the map function, options, etc. in the static version - but just in case that code is under this one*/}
                    {/* blank button to start and clear search */}
                    <button
                    className="dropdownItem"
                    onClick={() => {
                        setDropdownValue("Select Search Option");
                        // want to have the dropdown close when use this
                        setDropdownIsOpen(!dropdownIsOpen)
                    }}
                    ></button>
                    
                    <button
                    className="dropdownItem"
                    onClick={() => {
                        setDropdownValue("Drink Names")
                        setDropdownIsOpen(!dropdownIsOpen)
                    }}
                    >Drink Names</button>

                    <button
                    className="dropdownItem"
                    onClick={() => {
                        setDropdownValue("Ingredients")
                        setDropdownIsOpen(!dropdownIsOpen)
                    }}
                    >Ingredients</button>

                    <button
                    className="dropdownItem"
                    onClick={() => {
                        setDropdownValue("Glasses")
                        setDropdownIsOpen(!dropdownIsOpen)
                    }}
                    >Glasses</button>

                    {/* {dropdownOptions.map((option) => (
                    <button
                        // here makes the key a string inside the object (since keys need to be strings)
                        key={option.type}
                        className="dropdownItem"
                    >
                        {option.type}
                    </button>
                    ))} */}
                </ul>
            )}                

            <div className="Filter"> 
                <button
                className="FilterOption"
                // always set to opposite of what already is - on and off for part of filter
                onClick={() => setFilterIsFavorites(!filterIsFavorites)}
                // style from last project that I used for checkbox! if filter is on, gray. if not, white
                style= {{backgroundColor: filterIsFavorites ? "gray" : "white"}}
                >Favorites</button>
                <button
                className="FilterOption"
                // always set to opposite of what already is - on and off for part of filter
                onClick={() => setFilterIsAlcoholic(!filterIsAlcoholic)}
                style= {{backgroundColor: filterIsAlcoholic ? "gray" : "white"}}
                >Alcoholic</button>
                <button
                className="FilterOption"
                // always set to opposite of what already is - on and off for part of filter
                onClick={() => setFilterIsNonAlcoholic(!filterIsNonAlcoholic)}
                style= {{backgroundColor: filterIsNonAlcoholic ? "gray" : "white"}}
                >Non-Alcoholic</button>
            </div>

        
        </div>
    )
}