import { Outlet } from "react-router-dom";
import { useEffect } from "react";

import { useNotesContext } from "../../contexts/NotesContext";
import { userInfoReq } from "../../apis/userApi.ts"
import Sidebar from "../../components/sidebar/Sidebar";
import Modal from "../../components/modal/Modal";
import FormPage from "../../components/formPage/FormPage";
import styles from "./MainLayout.module.css";
import DeletePopup from "../../components/popUp/DeletePopup";
import Header from "../../components/header/Header";
import Profile from "../../pages/profile/Profile";
import { useAuth } from "../../contexts/AuthContext";

const MainLayout = () => {
  const { modalType,setProfile} = useNotesContext();
  const {setLoggedInUser} = useAuth();
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

  const renderModalLayout = ()=>{ //return different type modal as based on state 
    switch(modalType){
      case 'formPage' : return <FormPage/>;
      case 'delete' : return <DeletePopup/> ;
      case 'profile' : return <Profile/>
      default :
      return null;
    }
  }


  return (
    <>
      <div className={styles.outerContainer}>
        <div>
          <Sidebar />
        </div>

        { modalType && <Modal>
            { renderModalLayout() }
          </Modal> }
  

        <div className={styles.mainSection}>
         <div className={styles.header}>
        <Header/>
        
        </div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
