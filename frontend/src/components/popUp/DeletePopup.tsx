import { useNotesContext } from '../../contexts/NotesContext';
import styles from './deletePopup.module.css';

const DeletePopup = ()=>{
    const {setNotes,modalData,closeModal} = useNotesContext();
    const onYes = ()=>{
        setNotes(prev=>{
            return prev.filter(note=> note.id!==modalData);
        })
        closeModal();
    }
    const onCancel = ()=>{
        closeModal();
    }
    return(
        <div className={styles.popupContainer}>
           <p>Are you sure you want to delete the note?</p>
           <div className={styles.btnContainer}>
           <button onClick={onYes} style={{padding:"0.3rem 0.6rem 0.3rem 0.6rem"}}>Yes</button>
           <button onClick={onCancel} style={{padding:"0.3rem 0.7rem 0.3rem 0.7rem"}}>Cancel</button>
           </div>
        </div>
    )
}
export default DeletePopup;