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
   console.log(savedCv);
   
   //state where we'll keep track if the user wants to view saved data
   const [savedData, setSavedData] = useState(savedCv.about.length === 0 || savedCv.about.firstName=== undefined ? false : true)
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
        <div>
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
                <label htmlFor="firstName">First Name
                    <input name="firstName"  type="text" onChange={handleChange}/>
                </label>
                <label htmlFor="lastName">Last Name
                    <input name="lastName" type="text" onChange={handleChange}/>
                </label>
                <label htmlFor="title">Title
                    <input name="title" type="text" onChange= {handleChange}/>
                </label>
                <label htmlFor="phone">Phone Number
                     <input name="phone"  type="tel"  onChange= {handleChange} />
                </label>
                <label htmlFor="city">Location
                    <input name="city"  type="text"  onChange= {handleChange}/>
                </label>
                <label htmlFor="linkedin">Linkedin
                    <input name="linkedin" placeHolder="linkedin.com/..." type="text"  onChange= {handleChange}/>
                </label>
                <label htmlFor="github">Github
                    <input name="github" type="text" placeHolder="github.com/..." onChange= {handleChange}/>
                </label>
                <label htmlFor="email">Email
                    <input name="email" type="text"  onChange= {handleChange}/>
                </label>
                <button className="submitButton" type="submit">Submit</button>
            </form>
            : null
            }
        </div>
    )
}

/* 
class About extends React.Component {
    
    constructor(props){
        super(props);
        //initialize state with the variables we will be collecting
       
    };
   
    editAbout = (e) => {
        //prevent page from reloading
        e.preventDefault();
        //set the edit to true, the popup window will appear
       this.setState({edit:true});
    };
    handleChange = (e) => {
       
        e.preventDefault();
        //get the target name to get the name we want to change
        const name=e.target.name;
        //set state based on the name from the target, and target value
        this.setState({
            [name]:e.target.value
        })
      
    };
    handleSubmit = (e) => {
        e.preventDefault();
        const dispatch = useDispatch();
        //turn edit to false so the popup window will disappear
        this.setState({edit:false});
        //dispatch state
        dispatch(
            aboutSection({
                firstName: this.state.firstName,
                lastName:this.state.lastName,
                title: this.state.title,
                phone:this.state.phone,
                email:this.state.email,
                city: this.state.city,
                linkedin:this.state.linkedin,
                github:this.state.github,

            })
        )
        
    };
   
   
    render() {
        const {firstName,lastName,title,edit,phone,city,linkedin,github,email} = this.state;
        return(
            <div>
              
            </div>
            )
        };
};  
export default About; */