import React from "react";

class About extends React.Component {
    constructor(props){
        super(props);
        //initialize state with the variables we will be collecting
        this.state = {
            name: "First and Last Name",
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
        
        const {name,title,edit,phone,city,linkedin,github,email} = this.state;
        return(
            <div>
            <form>
                <h1 id="name" value={name} >{name}</h1>
                <h2 id="title" value={title}>{title}</h2>
                <div id="phone"  value={phone} >{phone}</div>
                <div id="city"  value={city} >{city}</div>
                <div id="linkedin"  value={linkedin} >{linkedin}</div>
                <div id="github"  value={github} >{github}</div>
                <div id="email"  value={email} >{email}</div>
                <button onClick= {this.editAbout}>Edit</button>
            </form>
            {/*if the edit state is true, show the input fields*/ }
            {edit ? 
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="name">Name
                <input name="name" type="text" onChange={this.handleChange}/>
                </label>
                
                <label htmlFor="title">Position
                <input name="title" type="text"  onChange= {this.handleChange}/>
                </label>

                 
                <label htmlFor="phone">Phone Number
                <input name="phone" type="text"  onChange= {this.handleChange}/>
                </label>

                 
                <label htmlFor="city">City
                <input name="city" type="text"  onChange= {this.handleChange}/>
                </label>

                 
                <label htmlFor="linkedin">Linkedin
                <input name="linkedin" type="text"  onChange= {this.handleChange}/>
                </label>

                 
                <label htmlFor="github">Github
                <input name="github" type="text"  onChange= {this.handleChange}/>
                </label>

                 
                <label htmlFor="email">Email
                <input name="email" type="text"  onChange= {this.handleChange}/>
                </label>
                <button type="submit">Submit Changes</button>
            </form>
            : null
            }
               
            </div>
        )
    }
}
export default About;