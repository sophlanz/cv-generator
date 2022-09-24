import React from 'react';
import AdditionalEducation from './AdditionalEducation';
import uniqid from 'uniqid';
import { educationSection, postDelete } from '../redux/cvSlice';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
export default function Education() {
    const dispatch = useDispatch();
    const [education, setEducation] = useState([
        {
        university: "Fun University",
        degree:"B.S. Web Development",
        startDate: "August 2018",
        endDate: "May 2022",
        location: "Miami,FL",
        index:0,
        id:uniqid(),
        edit:false
    }
    ])
    const [edit, setEdit] = useState(false);
    //additional is the number of education items
    const [additional, setAdditional] = useState(1);
/*         this.state={
            education:[{
                university: "Fun University",
                degree:"B.S. Web Development",
                startDate: "August 2018",
                endDate: "May 2022",
                location: "Miami,FL",
                edit:false,
                index:0,
                id:uniqid()
            }],
            edit:false,
            additional:1
        };
    }; */
    const editEducation = (e) => {

        //get index from the value of target
        let index = Number(e.target.value)
        //map through the education and find one that matches the index. change edit to true
        setEducation(prevState => prevState.map(
            study => (study.index === index ? Object.assign(study,{edit:true}) : study)
        ));
       
       //also change the edit property in the general object, so jsx can detext the change
       setEdit(true);
    };
    const handleChange = (e) => {
        //get name to be changed from the event target
        const change = e.target.name;
       //see which one has a true edit value to change that one
        //use the change name to update state, and add to it the value from the target
        setEducation(prevState => prevState.map(
                study => (study.edit? Object.assign(study, {[change]:e.target.value}): study)
            )
        );
    };
    //function for dispatching eduaction, refactoring
    const dispatchEducation = (field) => {
        console.log(education)
    //dispatch to redux store for when it is saved later and sent to the server
    education.forEach((study)=> { 
    console.log(study);
    dispatch(
        //the function name has been passed into the field parameter
    field(
        //map through education array and dispatch the objects
        {
        university: study.university,
        degree:study.degree,
        startDate: study.startDate,
        endDate: study.endDate,
        location: study.location,
        index:study.index,
        id:study.id,
        additional:study.additional
        }      
    )
     )
})
    }
   const handleSubmit = () => {
       
        //change the edit state back to false so the pop up disappears
       setEdit(false);
        //using the edit state find the education object to be changed, and set edit to false
        setEducation(prevState => prevState.map(
                study => (study.edit  ? Object.assign(study,{edit:false}):study)
            )
        );
        //dispatch education state to store
      dispatchEducation(educationSection)
    };
   const addEducation = (e) => {
        e.preventDefault();
          //add another auto fill experience, the user can later edit
        //get additional state, and use that number to set new index
       const index = additional;
       //create new education object
        const newEducation= {
            university: "Fun University",
            degree:"B.S. Web Development",
            startDate: "August 2018",
            endDate: "May 2022",
            location: "Miami,FL",
            edit:false,
            index:index,
            id:uniqid()
        };
        //create new array from the old education array
        const updatedEducation = [...education];
        //push new education object to array
        updatedEducation.push(newEducation);
        //reset education array in state with the updated education
        setEducation(updatedEducation);
          //increase additional state for if another experience is added
        setAdditional(prevState => prevState + 1)
       
      
    };
    const deleteEducation =  async (e) => {
        //get the value from the target to get the index
        const index = e.target.value;
        //create a new array from array of education, spice out index
        let educationOld = [...education];
        educationOld.splice(index,1);
        console.log(educationOld)
        //reset eudcation in state with the updated array
        setEducation(educationOld)
        console.log(education);
        //additional is amount of items in array, so subtract 1
       setAdditional(prevState => prevState -1 );
        //reset index values somehow
        //map through with index, set the index with prev state
        setEducation(prevState => prevState.map(
            (study,idx) => (Object.assign(study, {index:idx}) )
            ))
        console.log(education);
        //now dispatch postDelete  function in redux store, pass in the reducer function name
        educationOld.map((study)=> {
            dispatch(
                postDelete({
                    university: study.university,
                    degree:study.degree,
                    startDate: study.startDate,
                    endDate: study.endDate,
                    location: study.location,
                    index:study.index,
                    id:study.id,
                    additional:study.additional
                })
            )
        });
    };
  
 
  console.log(education)
    return (
        
                <div className="educationDisplay">
                    <h1>Education</h1>
                     {/*what we want to display on the screen as the final product */}
                     {/*display for if there's only 1 education listed */}
                     {additional === 1 ? 
                    <div className="educationList">
                        <div className="uniDegree">
                            <div className="eduEditIcon">
                                <h3>{education[0].university}</h3> 
                                <button className="education"value="0" onClick = {editEducation}></button>
                            </div>
                            <div className="degree">{education[0].degree}</div>
                        </div>
                        <div className="dateLocation"> 
                        <div className="locationEdu">{education[0].location}</div>
                        <div className="dateEdu"> <div>{education[0].startDate}</div> - <div>{education[0].endDate}</div></div>
                        </div>
                    </div>
                    : 
                    <AdditionalEducation education={education} deleteEducation={deleteEducation} addEducation={addEducation} editEducation={editEducation}/>
                     }
                    {/*the popup we want to display on the screen for editing */}
                    {edit ? 
                    (education.map((study) => {
                     let index=[];
                    if(study.edit){
                        index = study.index
                            return(
                        <div key={study.id}>
                            <form className="education"> 
                                <div className="formItems">
                                <label htmlFor="university">University
                                    <input type= "text" id={index} name="university" onChange = {handleChange}/>
                                </label>
                                <label htmlFor="degree">Degree
                                    <input type= "text" id={index} name="degree" onChange = {handleChange} />
                                </label>
                                <label htmlFor="startDate">Start Date
                                     <input type= "text" id={index} name="startDate" onChange = {handleChange}/>
                                </label>
                                <label htmlFor="endDate">End Date
                                    <input type= "text" id={index} name="endDate" onChange = {handleChange}/>
                                </label>
                                <label htmlFor="location">Location
                                    <input type= "text" id={index} name="location" onChange = {handleChange}/>
                                </label>
                                </div>
                                <div className="formButtons">
                                    <button className="add" onClick={(e)=>addEducation(e)}>Add Education</button>
                                    <button className="submitButton"type = "text" id={index} onClick={handleSubmit}>Submit Changes</button>
                                </div>
                            </form>
                        </div>
                                )
                              }    
                            }    
                         ))
                    : null    
                     }
                </div>
            )
     };
    
    




