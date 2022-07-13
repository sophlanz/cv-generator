import React from 'react';
import uniqid from 'uniqid'
class Projects extends React.Component {
    constructor(props){
        super(props);
        this.state={
            projects:[
                {title:"Weather App",
                description:["Fetches weather from the open weather API, and displays it with a user friendly interface."],
                technologies:["Open Weather Api", "Vanialla Javascript", "HTML & CSS"],
                liveDemo:"superdev.github.io/weatherApp/",
                edit:false,
                index:0,
                
                
            },
            {title: "Mock Facebook",
            description:["Personal twist on mock Facebook site, with new UI"],
            technologies:["Javascript, React , HTML & CSS"],
            liveDemo:"superdev.github.io/mockFacebook/",
            edit:false,
            index:1,
           
            }
            ],
            edit:false,
            additional:2,
            index: 0,
            description:"",
            addBullet:false,
            editBullet:false,
            editBulletIndex:0,
            editProjectIndex:0,
            
            
            
        };
    };

    addProject = (e) => {
        e.preventDefault();
        //duplicate projects array
        const projects =[...this.state.projects]
        //get additional to find out what the new index should be
        const index = this.state.additional
        //create another project object
        const newProject = {
                title:"Clothing Store",
                description:["Clothing store website made with React"],
                technologies:["Javascript","React","HTML & CSS", "Jest", "Webpack"],
                edit:false,
                index:index
        };
        //push object to projects array
        projects.push(newProject);
        //set projects state with new array
        //increase additional value by 1
        this.setState({
            projects:projects,
            additional:index+1
        });
    };
    editProject = (e) => {
        //get index of project to be edited from value
        const index = Number(e.target.value);
        //change edit to true of that specific array, and in general
        //set index to be accessed in handleChange
        this.setState({
            edit:true,
            index:index
        },()=>(console.log(this.state))); 
        //set edit to true under specific project
        this.setState(prevState => ({
            projects:prevState.projects.map(
                project => (project.index === index ? Object.assign(project,{edit:true}): project)
            )
        }))
    };
    handleChange = (e) => {
        //get name from target to know which value to change
        const name = e.target.name;
        //get index we saved we we clicked edit 
        const index = this.state.index;
        const updateValue=e.target.value
        //map through state and look for matching index, change those values
        this.setState(prevState => ({
            projects:prevState.projects.map(
                project => project.index === index ? {...project, [name]: [updateValue]} : project
            )
        }),()=>{console.log(this.state)})
    };
    handleSubmit = () => {
        //set edit back to false
        //map through state and look for edit that's true, set to false
        this.setState(prevState => ({
            projects:prevState.projects.map(
                project => (project.edit  ? Object.assign(project,{edit: false}): project)
            )
        }));
        this.setState({
            edit:false
        })
    };
    deleteProject = (e) => {
        //get index to be deleted from value
        const index = Number(e.target.value);
        //duplicate array of projects
        let projects = [...this.state.projects];
        //splcie the index
        projects.splice(index,1);
        //remap the array and reset the indexes
        projects.map((project,index)=>(
            project.index = index
        ));
        //reset the projects state with the new array
        this.setState({
            projects:projects,
        });
          //decrease by 1 the additional state
          this.setState(prevState => ({
              additional:prevState.additional-1
          }))
    }
    addBullet =(e)=>{
        e.preventDefault();
       //get new bullet we set in state
       const newBullet = "This project was developed in an effort to actively learn React and master the use of classes."
       let description = [];
       //get current description array for project being edited
       const projects=[...this.state.projects];
       projects.forEach((project)=> {
           if(project.edit) {
               //set description
               description=project.description
               console.log(description);
           }
       });
       //add new bullet to description array
       description.push(newBullet);
       console.log(description);
       //set state with new description
       if(this.state.projects) {
        this.setState(prevState => ({
            projects:prevState.projects.map(
                project => (project.edit ? {...project, description:description} : project)
            )
        }));
       };

    };
   deleteBullet =(e) => {
       //we saved the index value of the element to target in description in the value of the button 
       const indexDescription = Number(e.target.value);
       //we saved the name of the project under title
       const indexProject = Number(e.target.name)
     //where we'll hold the bullets, and then delete
       let description =[];
       //map through projects, find the matching title, and save the current description
       const projects =[...this.state.projects]
       projects.map((project)  => (
        project.index === indexProject ? description=project.description : null 
       ));
        //splice  the index from the description
        description.splice(1,indexDescription);
        //reset state of project with new description
        this.setState(prevState => ({
            projects:prevState.projects.map (
                project => (project.index === indexProject ? {...project, description:description} : project)
               
            )
        }))
   }
   editBullet = (e) => {
       //index of edit project
       const projectIndex = Number(e.target.name)
       
       //index of bullet is saved in value
       const bulletIndex = Number(e.target.value)
       //set edit bullet to true
       this.setState({
           editBullet:true,
           editBulletIndex: bulletIndex,
           editProjectIndex: projectIndex
       });
   };
   handleChangeBullet =(e) => {
    const newBullet =e.target.value;
    //set to new bullet state
    this.setState({
        newBullet:{newBullet}
    });
    const bulletIndex = this.state.editBulletIndex;
    const projectIndex = this.state.editProjectIndex;
    //loop over projects to set new array
    let projects = [...this.state.projects]
    let updateDescription ="";
    projects.map((project) => {
        if( project.index === projectIndex ) {
              //we want to get the description into a new array
         updateDescription = Array.from(project.description)
         //splice the index we want to remove
         updateDescription.splice(bulletIndex,1)
         //splice in the newBull target value
        updateDescription.splice(bulletIndex,0,newBullet)
         //set new state
        }
    })
  if(this.state.projects ){
    //set new state with description
    this.setState(prevState => ({
        projects: prevState.projects.map(
            project => project.index === projectIndex ? {...project, description:updateDescription} : project)
    }))
  };
   };
   submitEditBullet = () => {
     //set edit bullet back to false
     this.setState({
         editBullet:false,
         editBulletIndex: 0,
         editProjectIndex: 0
     });
}
    render() {
        //title for setting title of delete button
        let indexProject="";
        const {projects,edit,addBullet,editBullet} = this.state;
        const projectList = projects.map((project,index)=> {
            //put project.title and project.description in a div
            indexProject=project.index
            return(
               
                <div key={index}>
                <div className="projectList">
                <div className="projectDeleteIcon"><h3>{project.title}</h3><button className="project" title="Edit"value={index} onClick={this.editProject}></button>
                     {index !== 0 ? 
                     <button className="delete" value={index} title="Delete" onClick={this.deleteProject}></button>
                     :
                     null
                    }
                    </div>
                    { project.description ? 
                    project.description.map((item,idx) => {
                        return(
                            <div  key ={uniqid()}className="bulletDelete">
                            <li>
                            {item}
                            </li>
                            <button title = "edit" onClick = {this.editBullet} className="project" name={indexProject}value={idx}></button>
                            {idx !==0 ? 
                                <button title = "delete" className="delete" name={indexProject} value={idx}onClick={this.deleteBullet}></button>
                                
                            :null
                            }
                            </div>
                        )
                    })
                    :
                    null
                    }
                    <div className="techUsed"><p style={{fontStyle:"italic", fontWeight:"", fontSize:"1.1rem"}}>Technologies:</p><p>{project.technologies.join(', ')}</p></div>
                   <div className="liveDemo"><p style={{fontStyle:"bold", fontWeight:"bold",fontSize:"1.1rem"}}>Live Demo: </p><a href={`https://${project.liveDemo}`} target="_blank"><p>{project.liveDemo}</p></a></div>
                    {/*We don't want to give a delete button to the fist one */}
                    </div>
                </div>
            );
        });
        return(
          
        <div className="projectDisplay">
            <h1>Personal Projects</h1>
            <ul className="projectContainer">
            {projectList}
            </ul>
            {/*if edit, show input fields and submit button */}
            {edit ? 
            <form className="projects">
                <label htmlFor="title">Title
                <input name="title" placeHolder=""onChange = {this.handleChange}/>
                </label>
                <label htmlFor="technolgoies">Technologies Used
                <textarea rows="10"cols="20" name="technologies" onChange = {this.handleChange}/>
                </label>
                <label htmlFor="liveDemo">Live Demo
                <input name="liveDemo" placeHolder="user.github.io/project"onChange = {this.handleChange}/>
                </label>
                <div className="formButtons">
                <button className="add" onClick={this.addProject}>Add Project</button>
                <button className="submitButton" onClick = {this.handleSubmit}>Submit Changes</button>
                <button className="add" onClick={this.addBullet}>Add Bullet</button>
                </div>

            </form>
            :
            null
            }
         {/*if we're editing the bullet point, we want to display the form */}
            {editBullet? 
            
            <form className="editBulletContainer">
            <label htmlFor="editBullet">Edit Bullet Point
                <textarea rows="4"cols="50" name="editBullet" className= "editBullet"onChange = {this.handleChangeBullet}/>
                <button className="submitButton" onClick = {this.submitEditBullet}>Submit Changes</button>
            </label>
            </form>
            
            :
            null
            }
        </div>
        );
    }
};
export default Projects;