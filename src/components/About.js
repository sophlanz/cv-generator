import React from "react";

class About extends React.Component {
    constructor(props){
        super(props);
        //initialize state with the variables we will be collecting
        this.state = {
            name: "First and Last Name",
            title: "Position",
            aboutMe: "About You",
            edit:false
        };
    };
    editAbout = (e) => {
        //prevent page from reloading
        e.preventDefault();
        //set the edit to true, the popup window will appear
       this.setState({edit:true});
    };
    handleChange = (e,name) => {
        const target = e.target;
        console.log(target)
        //check id of the event, to know which state element to update
        if(name==="nameInput") {
            console.log(e)
            this.setState({name:target.value});
            console.log(this.state);
        } else if (name==="titleInput") {
            this.setState({title:target.value});
            console.log(this.state)
        }else {
            console.log(target)
            this.setState({aboutMe:target.value})
        }
        
    }
    handleSubmit = (e) => {
        //turn edit to false so the popup window will disappear
        this.setState({edit:false});
    };

    render() {
        
        const {name,title,aboutMe,edit} = this.state;
        return(
            <div>
            <form>
                <div id="name" value={name} >{name}</div>
                <div id="title" value={title}>{title}</div>
                <div id="aboutMe"  value={aboutMe} >{aboutMe}</div>
                <button onClick= {this.editAbout}>Edit</button>
            </form>
            {/*if the edit state is true, show the input fields*/ }
            {edit ? 
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="name">Name
                <input name="nameInput" type="text" onChange={e=> this.handleChange(e,"nameInput")}/>
                </label>
                
                <label htmlFor="title">Position
                <input name="titleInput" type="text"  onChange= {e=>this.handleChange(e,"titleInput")}/>
                </label>
                
                <label htmlFor="aboutMe">About you</label>
                <input name = "aboutMeInput"type="text" onChange= {e=>this.handleChange(e,"aboutMeInput")}/>
                <button type="submit">Submit Changes</button>
            </form>
            : null
            }
               
            </div>
        )
    }
}
export default About;