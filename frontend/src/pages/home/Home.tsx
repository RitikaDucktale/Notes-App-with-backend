import { useEffect } from "react";
import styles from "./Home.module.css";
import {userInfoReq} from "../../apis/userApi";
import { useAuth } from "../../contexts/AuthContext";
import { useNotesContext } from "../../contexts/NotesContext";

const Home = ()=>{
    const {loggedInUser,setLoggedInUser} = useAuth();
    const {setProfile} = useNotesContext();
        useEffect(()=>{
        const fetchUserInfo = async ()=>{
            const res = await userInfoReq();
            console.log("UserInfo ***>",res);
            setLoggedInUser(res.data.userInfo);
            if(res.data.userInfo?.profilePic){
                console.log("PRofile picture of the usr=>",res.data.userInfo?.profilePic)
                const profilePic = `http://localhost:3000/uploads/${res.data.userInfo?.profilePic}`
                setProfile(profilePic);
            }
        }
        fetchUserInfo();
    },[])
    return(
        <div className={styles.container}>Home
            
        </div>
    )
}

export default Home;