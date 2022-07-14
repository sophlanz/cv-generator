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
            firstName: "Your",
            lastName:"Name",
            title: "Frontend Engineer",
            edit:false,
            phone:"(555)555-5555",
            email:"superdev@gmail.com",
            city: "New York",
            linkedin:"linkedin.com/in/superdev",
            linkedinLink:"",
            github:"github.com/superdev",
            githubLink: ""
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
        
        const {firstName,lastName,title,edit,phone,city,linkedin,github,email,linkedinLink,githubLink} = this.state;
      const host=window.location.host
      const server=window.location.href

        return(
            <div>
            <div className="aboutDisplay">
            <button className="printButton" onClick={()=> window.print()}>Print</button>
           
                <div className="title">
                    <div className="firstLastName">
                        <h2 className = "firstName" id="name" value={firstName} > {firstName} </h2>
                        <h2 className = "lastName" id="name" value={lastName} > {lastName}</h2>
                    </div>
                    <h3 className="aboutEditIcon"id="title" value={title}>{title} <button className="aboutButton" title="Edit" onClick= {this.editAbout}></button> </h3>
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
            {edit ? 
            <form class="about" onSubmit={this.handleSubmit}>
                <label htmlFor="firstName">First Name
                <input name="firstName"  type="text" onChange={this.handleChange}/>
                </label>
                <label htmlFor="lastName">Last Name
                <input name="lastName" type="text" onChange={this.handleChange}/>
                </label>
                
                <label htmlFor="title">Title
                <input name="title" type="text" onChange= {this.handleChange}/>
                </label>

                 
                <label htmlFor="phone">Phone Number
                <input name="phone"  type="tel"  onChange= {this.handleChange} />
                </label>

                 
                <label htmlFor="city">Location
                <input name="city"  type="text"  onChange= {this.handleChange}/>
                </label>

                 
                <label htmlFor="linkedin">Linkedin
                <input name="linkedin" placeHolder="linkedin.com/..." type="text"  onChange= {this.handleChange}/>
                </label>


                 
                <label htmlFor="github">Github
                <input name="github" type="text" placeHolder="github.com/..." onChange= {this.handleChange}/>
                </label>
                 
                <label htmlFor="email">Email
                <input name="email" type="text"  onChange= {this.handleChange}/>
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