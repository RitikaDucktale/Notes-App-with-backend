import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import Logo from "../../assets/Logo2.png";
import styles from "./Sidebar.module.css";

const Sidebar = ()=>{
    return(
        <div className={styles.sidebarContainer}>
            <div className={styles.logo}>
                <img src={Logo} alt="Logo" />
            </div>

            <div className="navbar">
                <Navbar/>
            </div>

            <div className={styles.footer}>
                <Footer/>
            </div>
        </div>
    )
}

export default Sidebar;