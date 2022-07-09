import React from 'react';
import AdditionalExperience from './AdditionalExperience'
import uniqid from 'uniqid';
class Experience extends React.Component {
    constructor(props){
        super(props);
        this.state={
            //array of experience objects
            experiences:[{ 
            company: "Amazing Startup",
            title:"Senior Web Developer",
            startDate: "July 2022",
            endDate: "Current",
            location:"Remote",
            description:" Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ex turpis, iaculis sit amet tempor at, sollicitudin id lacus. Praesent ornare lobortis est a ultricies. Nulla ornare ante ut ligula lacinia luctus. Praesent ut neque turpis. Maecenas fringilla accumsan erat pellentesque luctus. ",
            edit:false,
            index:"0",
            id:uniqid()
           }],
           additional:1,
           //monitor to be used for displaying text inputs
           edit:false
         
        };
    };
    editExperience = (e) => {
        //get index to be targeted under the number property
       const index = Number(e.target.value);
       console.log(index);
       //edit the edit property
       this.setState(prevState => ({
        experiences: prevState.experiences.map(
        experience => (experience.index === index ? Object.assign(experience, { edit: true }) : experience)
      )
    }),()=> ( console.log(this.state.experiences)));
    //change general edit, so inputs know to render
    this.setState({
        edit:true
    });
   
    };
    handleChange = (e) => {
        //get name to be changed from the event target
        const change = e.target.name;
        //name is what we want to reset in the state
       this.setState(prevState => ({
           experiences:prevState.experiences.map(
               //find the experiences that matches our index. //change coincides with the property to be changed. then assign the target value
               experience => (experience.edit? Object.assign(experience, {[change]:e.target.value}): experience)
           )
       }))
    };
    handleSubmit = (e) => {
       //get index of the experience we just updated
       const index = Number(e.target.value);
       //edit the edit property to false
       this.setState(prevState => ({
        experiences: prevState.experiences.map(
        experience => (experience.index === index ? Object.assign(experience, { edit: false }) : experience)
      )
    }));
    };
    addAnother = () => {
        //add another auto fill experience, the user can later edit
        //get additional state, and use that number to set new index
       const index = this.state.additional.toString();
       console.log(index);
       //create new experience object
        const newExperience= {
                company: "Cool Startup",
                title:"Junior Developer",
                startDate: "July 2020",
                endDate: "July2022",
                location:"Miami, FL",
                description:" Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ex turpis, iaculis sit amet tempor at, sollicitudin id lacus. Praesent ornare lobortis est a ultricies. Nulla ornare ante ut ligula lacinia luctus. Praesent ut neque turpis. Maecenas fringilla accumsan erat pellentesque luctus. ",
                edit:false,
                index:index,
                id:uniqid()
        };
        //create new array from the old experiences array
        const updatedExperiences = [...this.state.experiences];
        console.log(updatedExperiences)
        //push new experience to array
        updatedExperiences.push(newExperience);
        console.log(updatedExperiences)
        //reset experiences array in state with the updated experiences
         //increase additional state for if another experience is added
        this.setState({
            experiences: updatedExperiences,
            additional:Number(index)+1
            
        }, () => {console.log(this.state.experiences) });
    };
    deleteExperience = (e) => {
        //get value of index from target
        const index = e.target.value;
        //create a new array of the experiences
        const experiences = [...this.state.experiences];
        //splice the index we got from the array
        experiences.splice(index,1);
        //update the state with the updated experiences
        this.setState({
            experiences:experiences,
        });
         //decrease additional state for if future experiences are added using prevstate
         this.setState(prevState => ({
             additional:prevState.additional-1
         }));
         //use prevstate and idx to reset all of the indexes
         this.setState(prevState => ({
             experiences:prevState.experiences.map(
                 (experience, idx) => (Object.assign(experience,{index:idx}))
             )
         }),()=> (console.log(this.state.experiences)));
     
    
    }
    render() {
        const {company, title, startDate,endDate,location,description} = this.state.experiences[0];
        const {additional,experiences,edit} = this.state;
       
       
        return(
            <div>
                    <h1>Work Experience</h1>
                 {/*what we want to display on the screen as the final product */}
                 {/*If there's only 1 experience, just show the [0] of experiences array */}
                 {additional === 1 ? 
                 <div>
                    <div>{startDate}</div> - <div>{endDate}</div>
                    <div>{company}</div>
                    <div>{title}</div>
                    <div>{location}</div>
                    <div>{description}</div>
                    <button value = "0" onClick = { this.editExperience}>Edit</button>
                    <button onClick={this.addAnother}>Add Experience</button>
                    
                </div> 
                :    
                <AdditionalExperience experiences={experiences} deleteExperience={this.deleteExperience} editExperience={this.editExperience} addAnother={this.addAnother}/>
                 } 
                {/*the popup we want to display on the screen for editing */}
           {edit ? 
           <div>
            {/*map through the experiences, and find the experience with edit as true.
            Set the index of that experience object to the declared index variable
            return the input eleements, and link the indexes to the id's */}
                {experiences.map((experience)=> {
                    let index = " "
                    if(experience.edit){
                        index= experience.index;
                        return (
                        <div key={experience.id}>
                        <label htmlFor="company">Company</label>
                        <input type= "text" id ={index} name="company" onChange = {this.handleChange}/>
                        <label htmlFor="title">Title</label>
                        <input type= "text" id ={index} name="title" onChange = {this.handleChange} />
                        <label htmlFor="startDate">Start Date</label>
                        <input type= "text" id ={index} name="startDate" onChange = {this.handleChange}/>
                        <label htmlFor="endDate">End Date</label>
                        <input type= "text" id ={index} name="endDate" onChange = {this.handleChange}/>
                        <label htmlFor="location">Location</label>
                        <input type= "text" id ={index} name="location" onChange = {this.handleChange}/>
                        <label htmlFor="description">Description</label>
                        <input type= "text" id ={index}  name="description" onChange = {this.handleChange}/>
                        <button value = {index} type = "text" onClick= {this.handleSubmit}>Submit Changes</button>
                        </div>
                    )
                    };
                    
                })}
                </div>
            : null    
           }
            </div>
        );
    };
};
export default Experience;