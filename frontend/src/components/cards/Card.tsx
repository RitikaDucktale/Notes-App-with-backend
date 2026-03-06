import { useNotesContext } from "../../contexts/NotesContext";
import type { Note } from "../../types/notes";

import styles from "./Card.module.css";
import emptyStar from "../../assets/emptyStar.png";
import fillStar from "../../assets/fillStar.png";
import editIcon from "../../assets/editIcon.png";
import binIcon from "../../assets/binIcon1.png";
import { useState } from "react";

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
    const editNote = notes.find((note) => note.id == id);
    if(!editNote) return
    openFormPageModal();
    setButtonText("Edit");
    setTitle(editNote.title);
    setContent(editNote.content);
    setId(editNote.id);
  };

  const onDeleteHandler = (id: string) => {
    openDeleteModal(id);
  };

  const onFavsAdd = (id: string) => {
    setNotes((prev) => {
      return prev.map((note) => {
        if (note.id === id) {
          return { ...note, isFavs: true };
        }
        return note;
      });
    });
  };

  const onFavsOut = (id: string) => {
    setNotes((prev) => {
      return prev.map((note) => {
        if (note.id === id) {
          return { ...note, isFavs: false };
        }
        return note;
      });
    });
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.favIcon}>
          {note.isFavs ? (
            <img
              src={fillStar}    
              alt="favIcon"
              onClick={() => onFavsOut(note.id)}
            />
          ) : (
            <img
              src={emptyStar}
              alt="favIcon"
              onClick={() => onFavsAdd(note.id)}
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
          onClick={() => onEditHandler(note.id)}
          className={styles.editIcon}
        />
        <img
          src={binIcon}
          alt=""
          onClick={() => onDeleteHandler(note.id)}
          className={styles.binIcon}
        />
      </div>
    </div>
  );
};
export default Card;
