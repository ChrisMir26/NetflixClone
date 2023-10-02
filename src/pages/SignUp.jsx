import React, { useState } from "react";
import wallpaper from "../images/background.webp";
import { Link,useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { FirebaseError } from 'firebase/app';



const SignUp = () => {
  const navigate = useNavigate()

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, signUp } = useAuthContext();
  const [error,setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault(e);
    const regex = /^[A-Za-z\s]{1,30}$/;

    try {
      if([name,lastName,password].includes("")){
     return  setError(`Name,Last Name and Email cannot be empty `)
    
      }
      if(!regex.test(name) || !regex.test(lastName)){
       return setError(`Name and surname fields accept only up to 30 letters; no numbers or special characters are allowed`)

      }
      if(password.length < 6 || password.length > 15){
      return  setError(`Password between 6 and15`)
      
      }


    const sign = await signUp(email,password)    
    if(sign){
      setEmail("")
      setPassword("")
      setEmail("")
      setName("")
      navigate("/")
    }
    else{
      throw Error
    }
    } catch (error) {
      if (error instanceof FirebaseError) {
        // Handle Firebase errors.
        console.error("Firebase error code:", error.code);
        console.error("Firebase error message:", error.message);
        
        if (error.code === "auth/email-already-in-use") {
            setError("Email already in use. Please use a different one.");
        } else {
            setError("An unknown error occurred. Please try again.");
        }
    } else {
        // Handle other types of errors.
        console.error("An unknown error occurred:", error);
        setError("An unknown error occurred. Please try again.");
        setTimeout(()=>{
          setError("")
        },3000)
    }
  }
  };

  return (
    <>
      <div className="w-full h-screen">
        <img
          src={wallpaper}
          className=" hidden sm:block absolute w-full h-full object-cover"
          alt="background img"
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-screen">
          <div className="fixed w-full px-4 py-24 z-50">
            <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white ">
              <div className="max-w-[320px] mx-auto  p-10"></div>
              <div className="text-center">
                <h1 className="text-3xl font-bold">Sign Up</h1>
              </div>
              <form
              
                className="w-[80%] flex flex-col py-4 mx-auto"
                onSubmit={handleSubmit}
              >
                {error && <p className="p-3 bg-red-400 rounded">{error}</p>}

                <input
                  className="p-3 my-2 bg-gray-600 rounded  "
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <input
                  className="p-3 my-2 bg-gray-600 rounded  "
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
                <input
                  className="p-3 my-2 bg-gray-600 rounded  "
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <input
                  className="p-3 my-2 bg-gray-600 rounded  "
                  type="password"
                  name=""
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />

                <button className="bg-red-600 py-3 my-6 rounded font-bold">
                  Sign Up
                </button>
                <div className="flex justify-around items-center text-sm text-gray-600">
                  <p>
                    <input className="mr-2 " type="checkbox" name="" id="" />{" "}
                    Remember me
                  </p>
                  <p>Need Help?</p>
                </div>
                <p className="py-4 ml-10 text-left">
                  <span className="text-gray-600">Already a member ?</span>{" "}
                  <Link to="/login">Sign in</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
