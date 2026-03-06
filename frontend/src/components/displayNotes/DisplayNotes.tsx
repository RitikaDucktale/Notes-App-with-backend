
import image from '../../assets/backImg.png'
import Card from "../cards/Card";
import styles from "./DiplayNotes.module.css";
import type { Note } from "../../types/notes";
import type { SetStateAction } from 'react';

interface Props {
  displayNotes:Note[];
  // notFound:Boolean;
  // setNotFound:React.Dispatch<SetStateAction<boolean>>;
}


const DisplayNotes = (props: Props) => {
  
  const {displayNotes} = props || {};
  return (
    <div className={styles.cardsOuterContainer}>
      <div className={styles.cardsContainer}>
          {displayNotes.length? displayNotes.map(note=>(
            <Card note={note} key={note.id}/>
          ))
          : <img src={image} alt="" className={styles.img}/>
        }
      </div>
    </div>
  );
};
  export default DisplayNotes;
