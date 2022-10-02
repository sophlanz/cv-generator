import React, { useState } from 'react';
import uniqid from 'uniqid';
import { useSelector, useDispatch } from 'react-redux';
import { experiencesSection, experienceDelete } from '../redux/cvSlice';

export default function Experience() {
    //dispatch for dispatching to redux
    const dispatch = useDispatch();
    //get cv from redux store to see if there's data of saved values
    const cv = useSelector((state)=> state.cv);
    console.log(cv);
    console.log(cv.experiences.length)
    //saved data boolean, will when we check the cv.experiences length from the redux store. 
   const [savedData, setSavedData] = useState(cv.experiences.length === 0 ? false : true);
   console.log(savedData)
   console.log(cv.experiences)
   const savedExperience= cv.experiences
    //declar states
    //used saved data, and map it into objects if saved data true, else use defaults
    const [experiences, setExperiences] = useState(()=> savedData ? savedExperience.map((experience)=> (
        
            {
                company: experience.company,
                title:experience.title,
                startDate: experience.startDate,
                endDate: experience.endDate,
                location:experience.location,
                description:experience.description,
                edit:false,
                index:experience.index,
                id:experience.id
            }
        
    ))
    :
    [
        { 
        company: "Netflix",
        title:"Senior Web Developer",
        startDate: "July 2022",
        endDate: "Current",
        location:"Remote",
        description:[" Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ex turpis, iaculis sit amet tempor at, sollicitudin id lacus. Praesent ornare lobortis est a ultricies. Nulla ornare ante ut ligula lacinia luctus. Praesent ut neque turpis. Maecenas fringilla accumsan erat pellentesque luctus. ",
                    "Aenean dictum turpis sit amet feugiat dapibus. Mauris eu diam at dolor sodales vulputate. In hac habitasse platea dictumst. Fusce sit amet leo vitae quam sollicitudin mollis. Sed hendrerit aliquam orci vitae eleifend. Nunc tempor semper est, cursus aliquam mi hendrerit eget."],
        edit:false,
        index:0,
        id:uniqid()
       },{
        company: "Uber",
        title:"Junior Developer",
        startDate: "July 2020",
        endDate: "July2022",
        location:"Miami, FL",
        description:[" Quisque sit amet ante at nunc feugiat ultrices. Proin in neque auctor, dignissim lorem id, interdum felis. Duis malesuada vitae ligula sed ullamcorper. Duis blandit ullamcorper augue. Fusce aliquet laoreet interdum. Integer convallis ornare est, eget efficitur ipsum lobortis ut. ",
                    "Donec a est dictum, vestibulum sem a, hendrerit massa. Mauris ac libero nisl. Fusce sodales suscipit nunc non pretium. Praesent eros nulla, varius vitae ipsum sit amet, hendrerit tempus massa."],
        edit:false,
        index:1,
        id:uniqid()
        }
    ]   
     );
   const [additional, setAdditional]= useState(experiences.length);
    const [edit, setEdit] = useState(false);
    const [editBullets, setEditBullets] = useState({
        editBullet:false,
        editExperienceIndex:0,
        editBulletIndex:0
    })
    
  const dispatchRedux = (object) => {
    dispatch(
        experiencesSection({
            company: object.company,
            title:object.title,
            startDate: object.startDate,
            endDate: object.endDate,
            location:object.location,
            description:object.description,
            index:object.index,
            id:object.id
        })
    )
  }
     const editExperience = (e) => {
        //get index to be targeted under the number property
       const index = Number(e.target.value);
       //set edit property to true of the specifc experiencec object
       setExperiences((prevState)=> prevState.map(
           experience => (experience.index === index ? Object.assign(experience, { edit: true }) : experience)
       ));
    //change general edit, so inputs know to render
    setEdit(true);
   
    };
   const handleChange = (e) => {
        //get name to be changed from the event target
        const change = e.target.name;
        //name is what we want to reset in the state
        setExperiences((prevState)=> prevState.map(
            experience => (experience.edit? Object.assign(experience, {[change]:e.target.value}): experience)
        ))
    
    };
    const handleSubmit = (e) => {
       //get index of the experience we just updated
       const index = Number(e.target.value);
       //edit the edit property to false
       setExperiences((prevState) => prevState.map(
           experience => (experience.index === index ? Object.assign(experience, { edit: false }) : experience)
       ))
       //for each array to dispatch each object to redux;
       experiences.forEach((experience)=> (
        dispatchRedux(experience)
       ))
     
    };
    const addAnother = (e) => {
        e.preventDefault();
        //add another auto fill experience, the user can later edit
        //get additional state, and use that number to set new index
       const index = additional;
       //create new experience object
        const newExperience= {
                company: "Google",
                title:"Software Engineer Intern",
                startDate: "July 2020",
                endDate: "July2022",
                location:"Miami, FL",
                description:[" Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ex turpis, iaculis sit amet tempor at, sollicitudin id lacus. Praesent ornare lobortis est a ultricies. Nulla ornare ante ut ligula lacinia luctus. Praesent ut neque turpis. Maecenas fringilla accumsan erat pellentesque luctus. "],
                edit:false,
                index:index,
                id:uniqid()
        };
        //create new array from the old experiences array
        const updatedExperiences = [...experiences];
        //push new experience to array
        updatedExperiences.push(newExperience);
        //reset experiences array in state with the updated experiences
        setExperiences(updatedExperiences)
        setAdditional(index +1)
         //for each array to dispatch each object to redux;
       experiences.forEach((experience)=> (
        dispatchRedux(experience)
       ))
    };
    const deleteExperience = (e) => {
        //get value of index from target
        const index = e.target.value;
        //create a new array of the experiences
        const experiencesDup = [...experiences];
        //splice the index we got from the array
        experiencesDup.splice(index,1);
        //change the indexes
        experiencesDup.map((experience,idx)=> (
            (Object.assign(experience,{index:idx}))
        ))
        //reset state with the update
        setExperiences(experiencesDup)
         //decrease additional state for if future experiences are added using prevstate
         setAdditional((prevState)=> prevState-1)
          //for each array to dispatch each object to redux;
       experiencesDup.forEach((experience)=> (
        dispatch(
            experienceDelete({
                company: experience.company,
                title:experience.title,
                startDate: experience.startDate,
                endDate: experience.endDate,
                location:experience.location,
                description:experience.description,
                index:experience.index,
                id:experience.id
            })
        )
       ))
    };
    const addBullet =(e) => {
        e.preventDefault();
        //we saved the index of the experience in the add bullet button under value
        const index=Number(e.target.value)
        //new bullet text 
        const newText="In ex turpis, iaculis sit amet tempor at, sollicitudin id lacus. Praesent ornare lobortis est a ultricies. Nulla ornare ante ut ligula lacinia luctus. Praesent ut neque turpis. Maecenas fringilla accumsan erat pellentesque luctus."
        //we will store the old bullets and new one in here
        let newDescription =" ";
        //we need to get the experience that matches the index
        //then we want to get it's description, and unshift it into the new description array
        const experiencesDup=[...experiences];
        experiencesDup.forEach((experience) => {
            if(experience.index===index) {
               let oldDescription= experience.description;
                newDescription = Array.from(oldDescription);
               newDescription.push(newText);
            }
        }
        );
        //now we need to reset the state with the new description array
        setExperiences((prevState)=> prevState.map(
            experience => (experience.index===index ? {...experience, description:newDescription} : experience))
        )
         //for each array to dispatch each object to redux;
       experiences.forEach((experience)=> (
        dispatchRedux(experience)
       ))
      
    };
    const deleteBullet=(e)=> {
        //we saved the index to be deleted from description in button value
        const indexDescription = Number(e.target.value);
        //we saved the index of the experience array we want under name
        const indexExperience = Number(e.target.name);
        //get array of experiences
        const experiencesDup = [...experiences]
        //find experience with matching index. 
        //save to new array
        let updatedDescription = "";
        experiencesDup.map(
            experience => experience.index === indexExperience ?  updatedDescription= Array.from(experience.description) : experience
        );
       //split array by index
       updatedDescription.splice(indexDescription,1);
       //reset state using the index again to find the experience
       setExperiences((prevState)=> prevState.map(
           experience => experience.index === indexExperience ? {...experience,description:updatedDescription} : experience
       ));
        //for each array to dispatch each object to redux;
        experiences.forEach((experience)=> (
            dispatchRedux(experience)
           ))

    };
   const editBullet=(e) => {
       //get the experience index from target name
       const indexExperience = Number(e.target.name);
       //get the bullet index from target value
       const indexBullet = Number(e.target.value);
       //set state to access these values later
       //set edit bullet to true so form displays
       setEditBullets({
        editExperienceIndex:indexExperience,
        editBulletIndex:indexBullet,
        editBullet:true
       });
   };
   const handleChangeBullet = (e) => {
    //get the previously saved index values in set
    const indexExperience = editBullets.editExperienceIndex;
    const indexBullet = editBullets.editBulletIndex;
    //updated bullet of target value
    const updatedBullet = e.target.value;
    //we'll save the new description/bullet points in here
    let description = ''
    //map through experiences and get the experience of the matching index
    //we want to get the description
    let experiencesDup =[...experiences];
    experiencesDup.forEach((experience) => {
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
    if(experiences) {
        setExperiences((prevState)=> prevState.map(
           experience => experience.index === indexExperience ? {...experience, description:description} : experience
        ));
        
    }
  
   };
   const submitEditBullet = () => {
       //reset state values so form closes, and index are ready
       setEditBullets({
        editExperienceIndex:0,
        editBulletIndex:0,
        editBullet:false
       })
        //for each array to dispatch each object to redux;
        experiences.forEach((experience)=> (
            dispatchRedux(experience)
           ))
   };
    //map  through the experiences and return the data , render it in the return section
    const experiencesList = experiences.map((experience,idx) => {
     //index of experience to pass to button
     console.log(experience);
     const indexExperience=experience.index
     const descriptionExperience = experience.description
     console.log(descriptionExperience)
     
     return(
         <div key={idx} className="experienceItem">
             <div className="generalInformation">
                 <div className="companyTitle">
                     <div className="expEditIcon">
                     <h3>{experience.company}</h3>
                     <button title="edit" className="experience" value = {idx} onClick = { (e)=> editExperience(e)}></button>
                    
                     <button title = "delete"className="delete" value={idx} onClick={(e)=> deleteExperience(e)}></button>
                    
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
     {descriptionExperience.map((bullet,idx)=> {
         return (
             <div className="bulletEditDiv" key={idx}>
             <li >
             {bullet}
             </li>
             <button title= "edit" value = {idx} name={indexExperience} className="experience" onClick={(e)=> editBullet(e)}></button>
             {idx !==0 ? 
                 <button className="delete" name={indexExperience} value={idx}onClick={(e)=> deleteBullet(e)}></button>
                     :null
                     }
             </div>  
             )
     })}
         </ul>
         </div> 
     )});
     console.log(experiences);
    return (
        <div>
              <div className="experienceDisplay">
                <div className="addAnother">
                <h1>Work Experience</h1> 
                <button className="add"  onClick={(e)=> addAnother(e)}>Add Experience</button>
                </div>
                 {/*what we want to display on the screen as the final product */}
                 {/*If there's only 1 experience, just show the [0] of experiences array */}
                <div>
                {experiencesList}
                </div>
             {/*if edit bullet, display form */}
            {editBullets.editBullet ? 
            <form className="editBulletContainer">
                 <label htmlFor="experienceBullet">Edit Bullet Point
                    <textarea rows="8"cols="100" type= "text" className="editBullet" name="experienceBullet" onChange = {(e)=> handleChangeBullet(e)}/>
                <button className="submitButton" onClick = {submitEditBullet}>Submit Changes</button>
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
                        <form class="experience">
                            <label htmlFor="company">Company
                                <input type= "text" id ={index} name="company" onChange = {(e)=> handleChange(e)}/>
                            </label>
                            <label htmlFor="title">Title
                                <input type= "text" id ={index} name="title" onChange = {(e)=> handleChange(e)} />
                            </label>
                            <label htmlFor="startDate">Start Date
                                <input type= "text" id ={index} name="startDate" onChange = {(e)=> handleChange(e)}/>
                            </label>
                            <label htmlFor="endDate">End Date
                                <input type= "text" id ={index} name="endDate" onChange = {(e)=> handleChange(e)}/>
                            </label>
                            <label htmlFor="location">Location
                                <input type= "text" id ={index} name="location" onChange = {(e)=> handleChange(e)}/>
                            </label>
                            <div className="formButtons">
                                <button className="add"  onClick={(e)=> addAnother(e)}>Add Experience</button>
                                <button className="add" value = {index}onClick={(e)=> addBullet(e)}>Add Bullet</button>
                                <button value = {index} className="submitButton" type = "text" onClick= {(e)=> handleSubmit(e)}>Submit Changes</button>
                            </div>
                        </form>
                    </div>
                    )
                    }
                })}
            </div>
            : null    
           }
        </div>
        </div>
    )
}
