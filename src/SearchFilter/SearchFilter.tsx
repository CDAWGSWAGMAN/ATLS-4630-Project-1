import "./SearchFilter.css"
// import Dropdown from "./Dropdown/Dropdown"


// type DropdownProps = {
//     options: string[];
//     placeholder?: string;
// //   onSelect?: (value: string) => void;
// }

export default function SearchFilter(){
    const dropdownOptions = [
        {type: "Ingredients"},
        {type: "Glass"}
    ]

    return(
        <div className="SearchandFilter">        

            <div className="ButtonandInput">
                <button
                className="Dropdown">
                    Dropdown for filters
                </button>
        
                {/* Search Input */}
                <input
                className = "Searchbar"
                type="text"
                placeholder={"Search for drinks with..."}
                />
            </div>

            {/* this will only be present once you click dropdown when we start using state */}
                <ul className="dropdownMenu">
                    {dropdownOptions.map((option) => (
                    <button
                        // here makes the key a string inside the object (since keys need to be strings)
                        key={option.type}
                        className="dropdownItem"
                    >
                        {option.type}
                    </button>
                ))}
                </ul>

            <div className="Sections"> 
                <button className="SectionOption">Favorites</button>
                <button className="SectionOption">Alcoholic</button>
                <button className="SectionOption">Non-Alcoholic</button>

            </div>

        
        </div>
    )
}