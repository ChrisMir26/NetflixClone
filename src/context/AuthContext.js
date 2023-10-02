import { createContext, useContext, useEffect, useState } from "react";
import { auth,db } from "../firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  SignOut,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {setDoc,doc,getDoc,addDoc,collection} from "firebase/firestore"
import request from "../Requests.js"

const AuthContext = createContext();

export function AuthContextProvider({ children }) {

    const [user,setUser] = useState()
    const [authChecked, setAuthChecked] = useState(false);
    const [allMovies, setAllMovies] = useState([])

    useEffect(() => {
      const fetchingAllMovies = async () => {
          var moviesResults = [];
          
          for (const urlKey in request) {
              const url = request[urlKey];
              
              try {
                  const response = await fetch(url);
                  if (!response.ok) throw new Error(`Failed to fetch ${urlKey}`);
                  
                  const data = await response.json();
                  if (data.results) moviesResults.push(...data.results);
              } catch (error) {
                  console.error("Failed to fetch movies", error);
              }
          }
          
          setAllMovies(moviesResults);
          console.log(allMovies);
      };
      
      fetchingAllMovies();
  }, [])
  

 


    function signUp(email, password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const currentUser = userCredential.user;
          console.log(`soy current user`, currentUser)
          setUser(currentUser); // Almacena el usuario en el estado
          localStorage.setItem("user", JSON.stringify(currentUser)); // Guarda el usuario en localStorage
          setDoc(doc(db, "users", email), {
            savedShows: [],
          });
        })
        .catch((error) => {
          console.error("Error al registrarse:", error);
        });
    }
    function logIn(email,password){
      return (signInWithEmailAndPassword(auth,email,password))
    }

    function logOut(){
      signOut(auth )
      return localStorage.removeItem("user")
    }

    useEffect(()=>{
      const unsubscribe= onAuthStateChanged(auth,(currentUser)=>{
        setUser(currentUser)
      })
      return ()=>{
        unsubscribe()
      }
    },[])

    const fetchSavedShows = async (userEmail) => {
      const userDocRef = doc(db, "users", userEmail);
      const userDocSnapshot = await getDoc(userDocRef);
    
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        return userData.savedShows || [];
      }
    
      return [];
    };
  return(
     <AuthContext.Provider value={{
      signUp, logIn,logOut,user,authChecked,setAuthChecked,fetchSavedShows,allMovies}} >
        {children}
     </AuthContext.Provider>
     )
}

export function useAuthContext() {
  return useContext(AuthContext);
}
 