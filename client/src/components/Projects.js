import React, { useState,  } from 'react';
import uniqid from 'uniqid'
import { useSelector, useDispatch } from 'react-redux';
import { projectSection, projectDelete } from '../redux/cvSlice';
export default function Projects() {
//redux imports
const dispatch = useDispatch();
//Get CV from redux store to check to see if details have been saved to the store
const savedCv = useSelector((state)=> state.cv);


  //state where we'll keep track if the user wants to view saved data
  //if the projects array is empty, there's no saved data, we want to use default values
  const [savedData, setSavedData] = useState(savedCv.projects.length === 0 ? false : true)
    //if savedData is true,map the education array, else use the default values and two objects
   const [projects, setProjects] = useState(()=> savedData === true ? savedCv.projects.map((project)=> (
       
    
       {
     
    title:project.title,
    description:project.description,
    technologies:project.technologies,
    liveDemo:project.liveDemo,
    edit:false,
    index:project.index,
    id:project.id,
    }
    
))
   :
   [
   {title:"Weather App",
   description:["Fetches weather from the open weather API, and displays it with a user friendly interface."],
   technologies:["Open Weather Api, Vanialla Javascript, HTML & CSS"],
   liveDemo:"superdev.github.io/weatherApp/",
   edit:false,
   index:0,
   id:uniqid()
    },
    {title: "Mock Facebook",
    description:["Personal twist on mock Facebook site, with new UI"],
    technologies:["Javascript, React , HTML & CSS"],
    liveDemo:"superdev.github.io/mockFacebook/",
    edit:false,
    index:1,
    id:uniqid()
    }
]
)
//states for editing
const[edit, setEdit] = useState(false);
//new bullet
const [newBullet,setNewBullet] = useState('');
//if savedData is true, state is equal to array length, else ist's deault 2
const [additional, setAdditional] = useState(()=> savedData === true ? savedCv.projects.length : 2);
const [index, setIndex] = useState(0);
const [description, setDescription] = useState('');
const [editBullets, setEditBullets] = useState({
    addBullet:false,
    editBullet:false,
    editBulletIndex:0,
    editProjectIndex:0
});
    const addProject = (e) => {
        e.preventDefault();
        //get length of projects to find out what the new index should be
        const index = projects.length
        
         //create another project object
         const newProject = {
            title:"Clothing Store",
            description:["Clothing store website made with React"],
            technologies:["Javascript","React","HTML & CSS", "Jest", "Webpack"],
            liveDemo:"superdev.github.io/clothing-store/",
            edit:false,
            index:index,
            id:uniqid()
    };
    //will store udpated project we want to send to redux store in here
    let sendProjects = null;
           //duplicate projects array , push object to projects array
           const projectsDup =()=> {
           const updatedProjects =  [...projects]
            updatedProjects.push(newProject)
            
            sendProjects = updatedProjects;
            
            return updatedProjects;
           }
        //set projects state with new array
        //increase additional value by 1
        setProjects(projectsDup())
        setAdditional(projectsDup().length+1) 
   
            
            sendProjects.map((project)=> (
                
                dispatch(
                    
                    projectSection({
                        title:project.title,
                        description:project.description,
                        technologies:project.technologies,
                        liveDemo:project.liveDemo,
                        index:project.index,
                        id:project.id
                    })
                )
                
            ))
          
     
    };
    const editProject = (e) => {
        //get index of project to be edited from value
        const index = Number(e.target.value);
         
        //change edit to true of that specific array, and in general
        setEdit(true);
        //set index of the project to be accessed in handleChange
        setIndex(index)
       setProjects(prevState => prevState.map(
           project => (project.index === index ? Object.assign(project,{edit:true}) : project)
       ))
      
    };
    const handleChange = (e) => {
        //get name from target to know which value to change
        const name = e.target.name;
        //get index of the project we saved we we clicked edit 
        const i = index;
        
        const updateValue=e.target.value
        
        //map through state and look for matching index, change those values
        setProjects(prevState => prevState.map(
            project => project.index=== i ? {...project, [name]: updateValue} : project
        ));
    };
    const handleSubmit = () => {
        //set edit back to false
        //map through state and look for edit that's true, set to false
        setProjects(prevState => prevState.map(
            project => project.edit ? Object.assign(project,{edit: false}) : project
        ));
      setEdit(false);
      //dispatch to redux
           //dispatch projects to redux store using map so we can later send the data to the db
     projects.map((project)=> (
        dispatch(
           projectSection({
               title:project.title,
               description:project.description,
               technologies:project.technologies,
               liveDemo:project.liveDemo,
               index:project.index,
               id:project.id
           })
        )
    ))

    };
    const deleteProject = (e) => {
        //get index to be deleted from value
        const index = Number(e.target.value);
        //duplicate array of projects
        let projectsDup = [...projects];
        //splcie the index
        projectsDup.splice(index,1);
        //remap the array and reset the indexes
        projectsDup.map((project,index)=>(
            project.index = index
            //dispatch changes to the redux store
        ));
        //reset the projects state with the new array
        setProjects(projectsDup)
          //decrease by 1 the additional state
          setAdditional((prevState)=> prevState -1)
          
          projectsDup.map((project)=> (
              dispatch(
                  projectDelete({
                    title:project.title,
                    description:project.description,
                    technologies:project.technologies,
                    liveDemo:project.liveDemo,
                    index:project.index,
                    id:project.id
                  })
              )
          ))
    };
    const addBullet =(e)=>{
        e.preventDefault();
       //get new bullet we set in state
       const newBullet = "This project was developed in an effort to actively learn React and master the use of classes."
       let description = [];
       //get current description array for project being edited
       const projectsDup=[...projects];
       projectsDup.forEach((project)=> {
           
           if(project.edit) {
               //set description
                //if length greater than one map it out
               if ( project.description.length === 1) {
                    description.push(project.description[0])
                }else {
                    project.description.map((bullet)=> (
                        
                        description.push(bullet)
                    ))
                }
           }
       });
       
       //add new bullet to description array
       description.push(newBullet);
       
       //set state with new description
       
       if(projects) {
           setProjects((prevState)=> prevState.map(
               project => project.edit ? {...project, description:description} : project
           ))
        
       };

    };
   const deleteBullet =(e) => {
       //we saved the index value of the element to target in description in the value of the button 
       const indexDescription = Number(e.target.value);
       //we saved the name of the project under title
       const indexProject = Number(e.target.name)
     //where we'll hold the bullets, and then delete
       let description =[];
       //map through projects, find the matching title, and save the current description
       const projectsDup =[...projects]
       projectsDup.map((project)  => (
           //map description and push to description array
        project.index === indexProject ? project.description.map((bullet)=> (
            description.push(bullet)
       ))  : null )
       );
        //splice  the index from the description
        
        description.splice(indexDescription,1);
        
        //reset state of project with new description
        const newProjectsArray = projects.map((project)=> (
            project.index === indexProject ? {...project, description:description} : project
        ));
        setProjects(newProjectsArray)
        //dispatch changes to redux store
        newProjectsArray.map((project)=> (
            dispatch(
                projectDelete({
                  title:project.title,
                  description:project.description,
                  technologies:project.technologies,
                  liveDemo:project.liveDemo,
                  index:project.index,
                  id:project.id
                })
            )
        ))
        
    

   };
   const editBullet = (e) => {
       //index of edit project
       const projectIndex = Number(e.target.name)
       
       //index of bullet is saved in value
       const bulletIndex = Number(e.target.value)
       
       //set edit bullet to true
       setEditBullets({
        editBullet:true,
        editBulletIndex: bulletIndex,
        editProjectIndex: projectIndex
       })
       
     
   };
  const handleChangeBullet =(e) => {
    const newBullet =e.target.value;
    //set to new bullet state
    setNewBullet(newBullet);
    //get indexes with edit set to true
    const bulletIndex = editBullets.editBulletIndex;
    const projectIndex = editBullets.editProjectIndex;
    //loop over projects to set new array
    let projectsDup = [...projects]
    let updateDescription ="";
    
    
    
    
    projectsDup.forEach((project) => {
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
  if(projects ){
      //set new state with description
      setProjects((prevState)=> prevState.map(
          project => project.index === projectIndex ? {...project,description:updateDescription} : project)
      )
  };
   };
 const submitEditBullet = () => {
     //set edit bullet back to false
     setEditBullets({
        editBullet:false,
        editBulletIndex: 0,
        editProjectIndex: 0
     })
     //dispatch projects to redux store using map so we can later send the data to the db
     projects.map((project)=> (
         dispatch(
            projectSection({
                title:project.title,
                description:project.description,
                technologies:project.technologies,
                liveDemo:project.liveDemo,
                index:project.index,
                id:project.id
            })
         )
     ))
   
};
     //title for setting title of delete button
     let indexProject="";
     
     
     const projectList =  projects.map((project,index)=> {
         //put project.title and project.description in a div
         indexProject=project.index
         return(
             <div key={index}>
                 <div className="projectList">
                     <div className="projectDeleteIcon"><h3>{project.title}</h3><button className="project" title="Edit"value={index} onClick={editProject}></button>
                     
                          <button className="delete" value={index} title="Delete" onClick={deleteProject}></button>
                    
                     
                         
                      </div>
                     { project.description ? 
                     project.description.map((item,idx) => {
                         return(
                         <div  key ={uniqid()}className="bulletDelete">
                              <li>
                              {item}
                             </li>
                             <button title = "edit" onClick = {editBullet} className="project" name={indexProject}value={idx}></button>
                             {idx !==0 ? 
                             <button title = "delete" className="delete" name={indexProject} value={idx}onClick={deleteBullet}></button>
                             :null
                             }
                         </div>
                          )
                     })
                     :
                     null
                 }
                 <div className="techUsed"><p className="techLabel">Technologies:</p><p>{project.technologies}</p></div>
                     <div className="liveDemo"><h1 >Live Demo: </h1><a href={`https://${project.liveDemo}`} target="_blank" rel="noreferrer" ><p>{project.liveDemo}</p></a></div>
                      {/*We don't want to give a delete button to the fist one */}
                 </div>
             </div>
         );
     });

     return(
     <div className="projectDisplay">
        <div className="addAnother">
         <h1>Personal Projects</h1>
         <button className="add" onClick={addProject}>Add Project</button>
         </div>
         <ul className="projectContainer">
         {projectList}
         </ul>
         {/*if edit, show input fields and submit button */}
         
         {edit ? 
         <form className="projects">
                <h1>Projects</h1>
                <div className="formWrapper">
                     <input name="titleProjects" className="titleProjects" id="titleProjects" placeHolder="  " onChange = {handleChange}/>
                     <label htmlFor="titleProjects">Title</label>
                </div>
                <div className="formWrapper">
                    <textarea rows="10"cols="30" id="technologiesProjects" name="technologiesProjects" onChange = {handleChange}/>
                     <label htmlFor="technolgoiesProjects">Technologies Used</label>
                </div>
                 <div className="formWrapper">
                    <input name="liveDemo" className="liveDemo" id="liveDemo" placeHolder="  "onChange = {handleChange}/>
                    <label htmlFor="liveDemo">Live Demo: user.github.io/project</label>
                 </div>
                <div className="formButtons">
                    <button className="add" onClick={addProject}>Add Project</button>
                    <button className="add" onClick={addBullet}>Add Bullet</button>
                    <button className="submitButton" onClick = {handleSubmit}>Submit Changes</button>
                </div>
         </form>
         :
         null
         }
      {/*if we're editing the bullet point, we want to display the form */}
         {editBullets.editBullet ? 
         <form className="editBulletContainer">
              <label htmlFor="editBullet">Edit Bullet Point
                 <textarea rows="4"cols="50" name="editBullet" className= "editBullet"onChange = {handleChangeBullet}/>
                 <button className="submitButton" onClick = {submitEditBullet}>Submit Changes</button>
             </label>
         </form>
         :
         null
         }
     </div>
     );
    
};
