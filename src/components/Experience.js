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
            description:[" Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ex turpis, iaculis sit amet tempor at, sollicitudin id lacus. Praesent ornare lobortis est a ultricies. Nulla ornare ante ut ligula lacinia luctus. Praesent ut neque turpis. Maecenas fringilla accumsan erat pellentesque luctus. "],
            edit:false,
            index:0,
            id:uniqid()
           }],
           additional:1,
           //monitor to be used for displaying text inputs
           edit:false,
           editBullet:false,
           editExperienceIndex:0,
           editBulletIndex:0
           
         
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
    addAnother = (e) => {
        e.preventDefault();
        //add another auto fill experience, the user can later edit
        //get additional state, and use that number to set new index
       const index = this.state.additional;
       console.log(index);
       //create new experience object
        const newExperience= {
                company: "Cool Startup",
                title:"Junior Developer",
                startDate: "July 2020",
                endDate: "July2022",
                location:"Miami, FL",
                description:[" Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ex turpis, iaculis sit amet tempor at, sollicitudin id lacus. Praesent ornare lobortis est a ultricies. Nulla ornare ante ut ligula lacinia luctus. Praesent ut neque turpis. Maecenas fringilla accumsan erat pellentesque luctus. "],
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
    addBullet =(e) => {
        e.preventDefault();
        //we saved the index of the experience in the add bullet button under value
        const index=Number(e.target.value)
        //new bullet text 
        const newText="In ex turpis, iaculis sit amet tempor at, sollicitudin id lacus. Praesent ornare lobortis est a ultricies. Nulla ornare ante ut ligula lacinia luctus. Praesent ut neque turpis. Maecenas fringilla accumsan erat pellentesque luctus."
        //we will store the old bullets and new one in here
        let newDescription = "";
        
        //we need to get the experience that matches the index
        //then we want to get it's description, and unshift it into the new description array
        const experiences=[...this.state.experiences];
        experiences.forEach((experience) => {
            if(experience.index===index) {
               let oldDescription= experience.description;
                newDescription = Array.from(oldDescription);
               console.log(newDescription);
               newDescription.push(newText);
               
            }
        }
        );
        //now we need to reset the state with the new description array
        this.setState(prevState=> ({
            experiences:prevState.experiences.map(
                experience => (experience.index===index ? {...experience, description:newDescription} : experience))
        }),()=>(console.log(this.state.experiences)));
    }
    deleteBullet=(e)=> {
        //we saved the index to be deleted from description in button value
        const indexDescription = Number(e.target.value);
        //we saved the index of the experience array we want under name
        const indexExperience = Number(e.target.name);
        //get array of experiences
        const experiences = [...this.state.experiences]
        //find experience with matching index. 
        //save to new array
        let updatedDescription = "";
        experiences.map(
            experience => experience.index === indexExperience ?  updatedDescription= Array.from(experience.description) : experience
        );
       //split array by index
       updatedDescription.splice(indexDescription,1);
       //reset state using the index again to find the experience
       this.setState(prevState => ({
           experiences:prevState.experiences.map(
               experience => experience.index === indexExperience ? {...experience,description:updatedDescription} : null
           )
       }));
    }
   editBullet=(e) => {
       //get the experience index from target name
       const indexExperience = Number(e.target.name);
       //get the bullet index from target value
       const indexBullet = Number(e.target.value);
       //set state to access these values later
       //set edit bullet to true so form displays
       this.setState({
           editExperienceIndex:indexExperience,
           editBulletIndex:indexBullet,
           editBullet:true
       },()=>console.log(this.state));
       
   }
   handleChangeBullet = (e) => {
    //get the previously saved index values in set
    const indexExperience = this.state.editExperienceIndex;
    const indexBullet = this.state.editBulletIndex;
    //updated bullet of target value
    const updatedBullet = e.target.value;
    //we'll save the new description/bullet points in here
    let description = ''
    //map through experiences and get the experience of the matching index
    //we want to get the description
    let experiences =[...this.state.experiences];
    experiences.forEach((experience) => {
        if(experience.index === indexExperience) {
            //set description to delcared description
            description=experience.description
            //splice description to get rid of old bullet
            description.splice(indexBullet,1);
            //splice again to add in new bullet
            description.splice(indexBullet,0,updatedBullet)
        }
    })
    //now reset prev state
    if(this.state.experiences) {
        this.setState(prevState => ({
            experiences:prevState.experiences.map(
                experience => experience.index === indexExperience ? {...experience, description:description} : experience
            )
        }));
    }
  
   };
   submitEditBullet = () => {
       //reset state values so form closes, and index are ready
       this.setState({
        editExperienceIndex:0,
        editBulletIndex:0,
        editBullet:false
       })
   };
    render() {
        
        const {additional,experiences,edit,editBullet} = this.state;
       const experiencesList = 
           //map  through the experiences and return the data
        experiences.map((experience,idx) => {
            //index of experience to pass to button
            const indexExperience=experience.index
            return(
                <div key={idx} className="experienceItem">
                <div className="generalInformation">
               <div className="companyTitle">
               <div className="expEditIcon">
               <h3>{experience.company}</h3>
               <button className="experience" value = {idx} onClick = { this.editExperience}></button>
               </div>
               <div >{experience.title}</div>
               </div>
               <div className="dateLocationExp">
               <p>{experience.location}</p>
              <div className="dateExperience"> <div>{experience.startDate}</div> - <div>{experience.endDate}</div></div>
               </div>
           </div>
           <ul>
            {/*map through the description array and lay out the data in an unordered list */}
            {experience.description.map((bullet,idx)=> {
                return (
                    <div className="bulletEditDiv" key={idx}>
                    <li >
                    {bullet}
                    </li>
                    <button title= "edit" value = {idx} name={indexExperience} className="experience" onClick={this.editBullet}></button>
                    {idx !==0 ? 
                        <button className="delete" name={indexExperience} value={idx}onClick={this.deleteBullet}></button>
                            :null
                            }
                    </div>
                   
                    
                )
            })}
            
            </ul>
    
           </div> 
            )});
        
       
        return(
            <div className="experienceDisplay">
                    <h1>Work Experience</h1>
                 {/*what we want to display on the screen as the final product */}
                 {/*If there's only 1 experience, just show the [0] of experiences array */}
                <div>
                {experiencesList}
                </div>
                 
              
             {/*if edit bullet, display form */}
           {editBullet ? 
           <form>
           <label htmlFor="experienceBullet">Update Bullet
            <textarea rows="8"cols="100" type= "text" className="editBullet" name="experienceBullet" onChange = {this.handleChangeBullet}/>
            <button className="submitButton" onClick = {this.submitEditBullet}>Submit Changes</button>
            </label>
           </form>
           :
           null
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
                        <form>
                        <label htmlFor="company">Company
                        <input type= "text" id ={index} name="company" onChange = {this.handleChange}/>
                        </label>
                       <label htmlFor="title">Title
                       <input type= "text" id ={index} name="title" onChange = {this.handleChange} />
                       </label>
                       
                        <label htmlFor="startDate">Start Date
                        <input type= "text" id ={index} name="startDate" onChange = {this.handleChange}/>
                        </label>
                        
                        <label htmlFor="endDate">End Date
                        <input type= "text" id ={index} name="endDate" onChange = {this.handleChange}/>
                        </label>
                        
                        <label htmlFor="location">Location
                        <input type= "text" id ={index} name="location" onChange = {this.handleChange}/>
                        </label>
                        
                        <label htmlFor="description">Description
                        <input type= "text" id ={index}  name="description" onChange = {this.handleChange}/>
                        </label>
                        
                        <div className="formButtons">
                        <button className="add"  onClick={this.addAnother}>Add Experience</button>
                        <button value = {index} className="submitButton" type = "text" onClick= {this.handleSubmit}>Submit Changes</button>
                        <button className="add" value = {index}onClick={this.addBullet}>Add Bullet</button>
                        </div>
              
                        </form>
                        </div>
                    )
                    }
                    
                }
                )}
                </div>
            : null    
           }
         
            </div>
        );
    };
};
export default Experience;