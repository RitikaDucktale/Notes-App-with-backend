import { useNotesContext } from "../../contexts/NotesContext";
import type { Note } from "../../types/notes";
import {toast} from 'react-toastify';

import styles from "./Card.module.css";
import emptyStar from "../../assets/emptyStar.png";
import fillStar from "../../assets/fillStar.png";
import editIcon from "../../assets/editIcon.png";
import binIcon from "../../assets/binIcon1.png";
import { useState } from "react";
import { favsToggleReq } from "../../apis/notesApi";

interface props {
  note: Note;
}
const Card = (props: props) => {
  const {
    openFormPageModal,
    openDeleteModal,
    notes,
    setNotes,
    setTitle,
    setContent,
    setId,
    setButtonText,
  } = useNotesContext();
  const { note } = props || {};
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const isLongContent = note.content.length > 300;
  console.log('longCOnte=====',isLongContent)

  const displayText = isExpanded?  note.content :note.content.slice(0, 300) ;

  const onEditHandler = (id: string) => {
    const editNote = notes.find((note) => note._id == id);
    if(!editNote) return
    openFormPageModal();
    setButtonText("Edit");
    setTitle(editNote.title);
    setContent(editNote.content);
    setId(editNote._id);
  };

  const onDeleteHandler = (id: string) => {
    openDeleteModal(id);
  };

  const favsHandler = async (id: string,note:Note)=>{
    try{
      const res = await favsToggleReq(id,note);
      console.log(res);
      if(res.status===200){
        toast.success('Successfully added in favourites, view in favuorites section!')
        setNotes(prev=>{
         return prev.map(note=>{
          return (note._id=== res.data._id)? res.data : note; 
         })
        })
      }
    }catch(err:any){
      console.log(err);
      toast.error(err.response.data.message);
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.favIcon}>
          {note.isFavs ? (
            <img
              src={fillStar}    
              alt="favIcon"
              onClick={() => favsHandler(note._id,note)}
            />
          ) : (
            <img
              src={emptyStar}
              alt="favIcon"
              onClick={() => favsHandler(note._id,note)}
            />
          )}
        </div>
        <h2>{note.title}</h2>
              <div className={styles.contentSection}>
              <p>
                {displayText}
                {!isExpanded && isLongContent && "....."}{" "}
                {isLongContent &&(
                  <span onClick={()=>setIsExpanded(prev=> !prev)}>{isExpanded? "Show Less" : "Read More" }</span>
                )} 
              </p>  
              </div>
            </div>
      <div className={styles.btns}>
        <img
          src={editIcon}
          alt=""
          onClick={() => onEditHandler(note._id,note)}
          className={styles.editIcon}
        />
        <img
          src={binIcon}
          alt=""
          onClick={() => onDeleteHandler(note._id)}
          className={styles.binIcon}
        />
      </div>
    </div>
  );
};
export default Card;
