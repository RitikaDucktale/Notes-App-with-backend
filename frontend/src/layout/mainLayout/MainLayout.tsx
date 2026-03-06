import { Outlet } from "react-router-dom";

import { useNotesContext } from "../../contexts/NotesContext";
import Sidebar from "../../components/sidebar/Sidebar";
import Modal from "../../components/modal/Modal";
import FormPage from "../../components/formPage/FormPage";
import styles from "./MainLayout.module.css";
import DeletePopup from "../../components/popUp/DeletePopup";

const MainLayout = () => {
  const { modalType } = useNotesContext();
  const renderModalLayout = ()=>{ //return different type modal as based on state 
    switch(modalType){
      case 'formPage' : return <FormPage/>;
      case 'delete' : return <DeletePopup/> ;
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
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
