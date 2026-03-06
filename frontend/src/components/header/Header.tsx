import SearchBar from "../search/SearchBar";
import styles from "./Header.module.css";
import NewNoteBtn from "../newNoteBtn/NewNoteBtn";
import type { SetStateAction } from "react";

interface Props {
    searchVal: string;
     setSearchVal: React.Dispatch<SetStateAction<string>>;
}
const Header = (props:Props)=>{
    
    return(
        <>
        <div className={styles.headerContainer}>
            <SearchBar {...props}/>
                <NewNoteBtn/>
        </div>
        </>
    )
}

export default Header; 