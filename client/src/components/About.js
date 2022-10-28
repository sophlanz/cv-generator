import React, { useEffect, useState } from "react";
import  phonePic from "../images/phone.svg";
import locationPic from "../images/location.svg";
import linkedinPic from "../images/linkedin.svg";
import githubPic from "../images/github.svg";
import emailPic from "../images/email.svg";
import { aboutSection } from '../redux/cvSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function About() {
    //check to see if details have been saved to the store
   const savedCv = useSelector((state)=> state.cv);
 
   
   //state where we'll keep track if the user wants to view saved data
   const [savedData, setSavedData] = useState(savedCv.about.length === 0  ? false : true)
    const defaultValues = {
        firstname: "Your",
        lastName: "Name",
        title:"Frontend Developer",
        phone:"555-555-5555",
        email:"superdev@gmail.com",
        city:"New York",
        linkedin:'linkedin.com/in/superdev',
        github:"github.com/superdev"
    };
   //check value of savedData, if true set savedCv data, false use defaults
  const checkForData = (field) => {
      
      let info =  savedCv.about;
    if(savedData === true) {
        //return savedCv.about.field
       return (info[0][field]);
       
    } else {
        //return defaultvalues
       return (defaultValues[field])
    }
  }
    //states, if savedData is true, use the savedCv data, else default values
    const [firstName, setFirstName] = useState(()=> checkForData('firstName') )
    const [lastName, setLastName] = useState(()=> checkForData('lastName') )
    const [title, setTitle] = useState(()=> checkForData('title') )
    const [phone, setPhone] = useState(()=> checkForData('phone') )
    const [email, setEmail] = useState(()=> checkForData('email') );
    const [city, setCity] = useState(()=> checkForData('city') );
    const [linkedin, setLinkedin] = useState(()=> checkForData('linkedin') );
    const [github, setGithub] = useState(()=> checkForData('github') );
    const [edit, setEdit] = useState(false);
    //hooks
    const dispatch = useDispatch();
    const editAbout = (e) => {
        //prevent page from reloading
        e.preventDefault();
        //set the edit to true, the popup window will appear
     setEdit(true);
    };
    const handleChange = (e) => {
       
        e.preventDefault();
        //get the target name to get the name we want to change
        const name=e.target.name;
        //switch based on name to set state
        switch(name) {
            case "firstName":
                setFirstName(e.target.value)
                break;
            case "lastName" :
                setLastName(e.target.value)
                break;
            case "title": 
                setTitle(e.target.value)
                break;
            case "phone":
                setPhone(e.target.value)
                break;
            case "email":
                setEmail(e.target.value)
                break;
            case "city" :
                setCity(e.target.value)
                break;
            case 'linkedin' :
                setLinkedin(e.target.value)
                break;
            case 'github' :
                setGithub(e.target.value)
                break;
        }
       
    };
    const handleSubmit = (e) => {
        e.preventDefault();
       
        //turn edit to false so the popup window will disappear
        setEdit(false);
        //dispatch state
        dispatch(
            aboutSection({
                firstName: firstName,
                lastName:lastName,
                title: title,
                phone:phone,
                email:email,
                city: city,
                linkedin:linkedin,
                github:github,
            })
        )
        
    };

    return (
        <>
              <div className="aboutDisplay">
                <button className="printButton" onClick={()=> window.print()}>Print</button>
                    <div className="title">
                        <div className="firstLastName">
                            <h2 className = "firstName" id="name" value={firstName} > {firstName} </h2>
                            <h2 className = "lastName" id="name" value={lastName} > {lastName}</h2>
                        </div>
                        <h3 className="aboutEditIcon"id="title" value={title}>{title} <button className="aboutButton" title="Edit" onClick= {editAbout}></button> </h3>
                    </div>
                    <div className="personalInformation">
                        <div id="phone"  value={phone} > <img src={phonePic}alt="pic"/>{phone}</div> |
                        <div id="city"  value={city} ><img src ={locationPic} alt="pic"/> {city}</div> |
                        <a href = {`https://${linkedin}` } target="_blank"><div id="linkedin"  value={linkedin} ><img src ={linkedinPic} alt="pic"/>{linkedin}</div></a> |
                        <a href={`https://${github}` } target="_blank"><div id="github"  value={github} ><img src ={githubPic} alt="pic"/>{github}</div></a> |
                        <div id="email"  value={email} ><img src ={emailPic} alt="pic"/>{email}</div> 
                    </div>
                </div>
            {/*if the edit state is true, show the input fields*/ }
            {edit === true ? 
            <form class="about" onSubmit={handleSubmit}>
                <h1>About</h1>
                <div className="formWrapper">
                    <input placeholder="  " id="firstName" name="firstName" type="text" onChange={handleChange}/>
                    <label htmlFor="firstName">First Name</label>
                </div>
                <div className="formWrapper">
                    <input placeholder="  " id="lastName" name="lastName" type="text" onChange={handleChange}/>
                    <label htmlFor="lastName">Last Name</label>
                </div>
                <div className="formWrapper">
                    <input placeholder = "  " id="titleAbout" name="titleAbout" type="text" onChange={handleChange}/>
                    <label htmlFor="titleAbout">Title</label>
                </div>    
               <div className="formWrapper">
                     <input placeholder="  " id="phoneAbout" name="phoneAbout"  type="tel"  onChange= {handleChange} />
                     <label htmlFor="phoneAbout">Phone Number</label>
               </div>
                <div className="formWrapper">
                    <input placeholder="  " id="cityAbout" name="cityAbout"  type="text"  onChange= {handleChange}/>
                    <label htmlFor="cityAbout">Location</label>
                </div>
                <div className="formWrapper">
                    <input placeholder="  " id="linkedinAbout" name="linkedinAbout"  type="text"  onChange= {handleChange}/>
                    <label htmlFor="linkedinAbout">linkedin.com/...</label>
                </div>
                <div className="formWrapper">
                    <input placeholder="  " id="githubAbout" name="githubAbout" type="text"  onChange= {handleChange}/>
                    <label htmlFor="githubAbout">github.com/...</label>
                </div>
                <div className="formWrapper"> 
                    <input placeholder="  " id="emailAbout" name="emailAbout" type="text"  onChange= {handleChange}/>
                    <label htmlFor="emailAbout">Email</label>
                </div>
                <button className="submitButtonAbout" type="submit">Submit</button>
            </form>
            : null
            }
        </>
    )
}

