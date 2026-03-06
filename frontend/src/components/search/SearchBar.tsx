import styles from "./Search.module.css";
import SearchIcon from "../../assets/search.png";
import { type SetStateAction } from "react";


interface Props {
    searchVal:string;
    setSearchVal: React.Dispatch<SetStateAction<string>>;
}
const SearchBar = (props:Props) => {
    const {searchVal,setSearchVal} = props||{};


//   const onclickHandler = () => {
//     if (searchVal.trim() !== "") {
//       displayNotes = displayNotes.filter((note) => {
//         note.title.toLowerCase().includes(searchVal.toLowerCase()) ||
//           note.content.toLowerCase().includes(searchVal.toLowerCase());
//       });
//     }
//   };
  return (
    <div className={styles.container}>
      <img src={SearchIcon} alt="SearchIcon" />
      <input
        type="text"
        placeholder="Search"
        value={searchVal}
        onChange={(e)=>setSearchVal(e.target.value)}
      />
     
    </div>
  );
};

export default SearchBar;
