import React from "react";
import  phonePic from "../images/phone.svg";
import locationPic from "../images/location.svg";
import linkedinPic from "../images/linkedin.svg";
import githubPic from "../images/github.svg";
import emailPic from "../images/email.svg";

class About extends React.Component {
    constructor(props){
        super(props);
        //initialize state with the variables we will be collecting
        this.state = {
            firstName: "First",
            lastName:"Last",
            title: "Position",
            edit:false,
            phone:"(555)555-5555",
            email:"superdev@gmail.com",
            city: "New York",
            linkedin:"linkedin.com/in/superdev",
            github:"github.com/superdev"
        };
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
        //turn edit to false so the popup window will disappear
        this.setState({edit:false});
    };

    render() {
        
        const {firstName,lastName,title,edit,phone,city,linkedin,github,email} = this.state;
        return(
            <div>
            <div className="aboutDisplay">
                <div className="title">
                    <div className="firstLastName">
                        <h2 className = "firstName" id="name" value={firstName} > {firstName} </h2>
                        <h2 className = "lastName" id="name" value={lastName} > {lastName}</h2>
                    </div>
                    <h3 id="title" value={title}>{title}</h3>
                </div>
                <div className="personalInformation">
                    <div id="phone"  value={phone} > <img src={phonePic}alt="pic"/>{phone}</div> |
                    <div id="city"  value={city} ><img src ={locationPic} alt="pic"/> {city}</div> |
                    <div id="linkedin"  value={linkedin} ><img src ={linkedinPic} alt="pic"/>{linkedin}</div> |
                    <div id="github"  value={github} ><img src ={githubPic} alt="pic"/>{github}</div> |
                    <div id="email"  value={email} ><img src ={emailPic} alt="pic"/>{email}</div> 
                </div>
               <button className="aboutButton" title="Edit" onClick= {this.editAbout}></button>
            </div>
            {/*if the edit state is true, show the input fields*/ }
            {edit ? 
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="firstName">
                <input name="firstName" placeHolder="First Name" type="text" onChange={this.handleChange}/>
                </label>
                <label htmlFor="lastName">
                <input name="lastName" placeHolder="Last Name" type="text" onChange={this.handleChange}/>
                </label>
                
                <label htmlFor="title">
                <input name="title" type="text" placeHolder="Position" onChange= {this.handleChange}/>
                </label>

                 
                <label htmlFor="phone">
                <input name="phone" placeHolder="Phone Number" type="text"  onChange= {this.handleChange}/>
                </label>

                 
                <label htmlFor="city">
                <input name="city" placeHolder="City" type="text"  onChange= {this.handleChange}/>
                </label>

                 
                <label htmlFor="linkedin">
                <input name="linkedin" placeHolder="Linkedin" type="text"  onChange= {this.handleChange}/>
                </label>

                 
                <label htmlFor="github">
                <input name="github" type="text" placeHolder="Github" onChange= {this.handleChange}/>
                </label>

                 
                <label htmlFor="email">
                <input name="email" type="text" placeHolder="Email"  onChange= {this.handleChange}/>
                </label>
                <button className="submitButton" type="submit">Submit</button>
            </form>
            : null
            }
               
            </div>
        )
    }
}
export default About;