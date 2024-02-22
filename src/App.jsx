import React, { useState, useEffect } from "react";
import './App.css'
import { Auth } from "./components/auth";
import { db, auth, storage } from "./config/firebase";
import { 
  getDocs, 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  updateDoc, 
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";


function App() {
   const [movieList, setMovieList] = useState([]);

   //New Movie States
   const [newMovieTitle, setNewMovieTitle] = useState("");
   const [newReleaseDate, setNewReleaseDate] = useState(0);
   const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);


   //update title state
   const [updateTitled, setUpdatedTitle] = useState("");
  
   //file upload state
   const [fileUpload, setFileUpload] = useState(null);

   const moviesCollectionRef = collection(db, "movies");


   const getMovieList = async () => {
    //read the data
    //set the movie list
    try {
    const data = await getDocs(moviesCollectionRef);
    const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
    setMovieList(filteredData);
    }  catch (err) {
      console.error(err);
    }
  };

    useEffect(() => {
    getMovieList();
   }, [])

   const onSubmitMovie = async () => {
    try{
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle, 
        releaseDate: newReleaseDate,
        recievedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch(err) {
      console.error(err);
    }
  };

    const deleteMovie = async (id) => {
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);
    };
    //will have to make it into seperate components when making acutal website
    const updateMovieTitle = async (id) => {
      const movieDoc = doc(db, "movies", id);
      await updateDoc(movieDoc, {title: updateTitled});
    };

    const uploadFile = async () =>  {
      if (!fileUpload) return;
      const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
      try {
      await uploadBytes(filesFolderRef, fileUpload)
      } catch (err) {
        console.error(err);
      }
    };

    return (
      <div className = "App">
        <Auth />
      <div>
        <input placeholder="Movie title..." 
        onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input placeholder="Release date..." 
        type = "number"
        onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <input 
        type="checkbox" 
        checked = {isNewMovieOscar}
        onChange={(e) => setIsNewMovieOscar(e.target.checked)}/>
        <label> Recived an Oscar</label>
        <button onClick={ onSubmitMovie }> Submit Movie</button>
      </div>

      <div>

        {movieList.map((movie) => (
          <div>
            <h1 style={{color: movie.recievedAnOscar ? "green" : "red"}}>
            {movie.title}
            </h1>
            <p>Date: {movie.releaseDate} </p>

            <button onClick = {() => deleteMovie(movie.id)}> Delete Movie </button>

            <input 
            placeholder= "New Title..." 
            onChange={(e) => setUpdatedTitle(e.target.value)}
            /> 
            <button onClick={() => updateMovieTitle(movie.id) }> Update Title</button>

          </div>
        ))}
      </div>

      <div>
        <input type = "file" 
        onChange = {(e) => setFileUpload(e.target.files[0])} 
        />
        <button onClick = {uploadFile} > Upload File </button>
        </div>
      </div>

    );
  }

export default App
