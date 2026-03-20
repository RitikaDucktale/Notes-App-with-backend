
import styles from "./Header.module.css";

import { useAuth } from "../../contexts/AuthContext";
import { useNotesContext } from "../../contexts/NotesContext";


const Header = ()=>{
    const {loggedInUser} = useAuth();
    const {openProfileModal,profile} = useNotesContext();
    const firstLetter = loggedInUser?.firstName[0];

    const onclickHandler = ()=>{
        openProfileModal();

    }
    return(
        <>
        <div className={styles.headerContainer}>
            <p>Welcome, {`${loggedInUser?.firstName} ${loggedInUser?.lastName}`} </p>
            <div className={styles.profileIcon} onClick={onclickHandler}>
                {profile? <img src={profile} alt="profile" style={{height:"100%"}} />:firstLetter}
            </div>
        </div>
        </>
    )
}

export default Header; 