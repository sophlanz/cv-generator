import React from 'react';

class Projects extends React.Component {
    constructor(props){
        super(props);
        this.state={
            projects:[
                {title:"Weather App",
                description:"Fetches weather from the open weather API, and displays it with a user friendly interface.",
                technologiesUsed:["Open Weather Api", "Vanialla Javascript", "HTML & CSS"],
                edit:false,
                index:0
            },
            {title: "Mock Facebook",
            description:"Personal twist on mock Facebook site, with new UI",
            technologiesUsed:["Javascript","React","HTML & CSS"],
            edit:false,
            index:1
            }
            ],
            edit:false,
            additional:2,
            index: 0
            
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
                description:"Clothing store website made with React",
                technologiesUsed:["Javascript","React","HTML & CSS", "Jest", "Webpack"],
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
    };
    handleChange = (e) => {
        //get name from target to know which value to change
        const name = e.target.name;
        //get index we saved we we clicked edit 
        const index = this.state.index;
        //map through state and look for matching index, change those values
        this.setState(prevState => ({
            projects:prevState.projects.map(
                project => (project.index === index ? Object.assign(project,{[name]: e.target.value}): project)
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
    render() {
        const {projects,edit} = this.state;
        const projectList = projects.map((project,index)=> {
            //put project.title and project.description in a div
            return(
                <div key={index}>
                <div className="projectList">
                
                
                    <div className="projectDeleteIcon"><h3>{project.title}</h3><button className="project" title="Edit"value={index} onClick={this.editProject}></button> {index !== 0 ? 
                     <button className="delete" value={index} title="Delete" onClick={this.deleteProject}></button>
                     :
                     null
                    }</div>
                    <li>{project.description}</li>
                    <div className="techUsed"><p style={{fontStyle:"italic", fontWeight:"bold"}}>Technologies:</p><p>{project.technologiesUsed.join(', ')}</p></div>
                   
                    {/*We don't want to give a delete button to the fist one */}
                   
                    </div>
                </div>
            )
        })
        return(
          
        <div className="projectDisplay">
            <h1>Personal Projects</h1>
            <ul className="projectContainer">
            {projectList}
            </ul>
            
            
            {/*if edit, show input fields and submit button */}
            {edit ? 
            <form>
                <label htmlFor="title">Title
                <input name="title" placeHolder=""onChange = {this.handleChange}/>
                </label>
                <label htmlFor="description">Descritption
                <input name="description" onChange = {this.handleChange}/>
                </label>
                <label htmlFor="technolgoies">Technologies Used
                <input name="technologiesUsed" onChange = {this.handleChange}/>
                </label>
                <button className="add" onClick={this.addProject}>Add Project</button>
                <button className="submitButton" onClick = {this.handleSubmit}>Submit Changes</button>
            </form>
            :
            null
            }
        </div>
        )
    }
};
export default Projects;