import { useEffect, useState } from "react";

import { useNotesContext } from "../../contexts/NotesContext";
import notesApi from "../../apis/notesApi";

import styles from "./NotesPage.module.css";
import NotFoundImg from '../../assets/notFoundImg.png';
import EmptyNotes from '../../assets/EmptyNotes.png'
import Header from "../../components/header/Header";
import DisplayNotes from "../../components/displayNotes/DisplayNotes";

const NotesPage = () => {
  const { notes } = useNotesContext();
  const [isDisplayFavs, setIsDisplayfavs] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [debounceVal,setDebounceVal] = useState('');
  const [activeBtnId,setActiveBtnId] = useState('');
  const  btnIds = ["All","Favourites" ]; 
  let displayNotes = notes;

  useEffect(()=>{
    console.log('indide api useffect..')
   const fetchNotes = async ()=>{
    console.log('try..')
          try{
            const res = await notesApi();
            console.log(res);
          }catch(err){
            console.log("Error fetching notes!" , err)
          }
    }
    fetchNotes();
  },[])

  useEffect(()=>{ 
    console.log('inide useeffect')
    const timer = setTimeout(()=>{
      setDebounceVal(searchVal);
    },1000);

    return ()=>{
      clearTimeout(timer)
      console.log('clearing time out ')
    }
  },[searchVal])
  

 if (debounceVal.trim() !== "") {
    console.log("search");
    
    displayNotes = displayNotes.filter((note) => {
      if (
        note.title.toLowerCase().includes(debounceVal.toLowerCase()) ||
        note.content.toLowerCase().includes(debounceVal.toLowerCase())
      ) {
        return note;
      }
      
    });
  }
  if (isDisplayFavs) displayNotes = displayNotes.filter((note) => note.isFavs);
const notFound = displayNotes.length===0;

  const onclickHandler = (id:string)=>{
  setActiveBtnId(id)
  if(id==="Favourites") setIsDisplayfavs(true);
  else setIsDisplayfavs(false)
  }

  return (
    <>
      <div className={styles.container}>
        <div>
          <Header searchVal={searchVal} setSearchVal={setSearchVal} />
        </div>
        <div className={styles.heading}>
          <h1>MY NOTES</h1>
          <div className={styles.btns}>

              {btnIds.map(id=>(
                <button 
                key={id} 
                onClick={()=>onclickHandler(id)}
                className={activeBtnId===id? styles.highlightedBtn :styles.btn }
                 >{id}</button>
              ))}
          </div>
        </div>
        <div className={styles.notesContainer}>
          {notFound?  <div className={styles.notFound}>{notes.length && !isDisplayFavs? <img src={NotFoundImg}/> : <img src={EmptyNotes}/>}</div> :<DisplayNotes displayNotes={displayNotes} /> }
              
        </div>
      </div>
    </>
  );
};

export default NotesPage;
