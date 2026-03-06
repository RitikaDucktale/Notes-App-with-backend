import { useNavigate } from "react-router-dom";
import sidebarImg from "../../assets/sidebarImg.png";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./Footer.module.css"
const Footer = ()=>{
    const navigate = useNavigate();
    const {setLoggedInUsers} = useAuth();
    const onclickHandler = ()=>{
        localStorage.removeItem('authUser')
        setLoggedInUsers(null);
        navigate('/');
    }
    return(
        <div className={styles.footer}>
            <img src={sidebarImg} alt="" />
            <button onClick={onclickHandler}>Log Out</button>
        </div>
    )
}

export default Footer;