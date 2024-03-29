import React from 'react';
import AdditionalEducation from './AdditionalEducation';
import uniqid from 'uniqid';
import { educationSection, postDelete } from '../redux/cvSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
export default function Education() {
    const dispatch = useDispatch();
     //check to see if details have been saved to the store
   const savedCv = useSelector((state)=> state.cv);
   
   
   //state where we'll keep track if the user wants to view saved data
   //if the education array is empty, there's no saved data, we want to use default values
   const savedData = savedCv.education.length === 0 ? false : true;

  //if savedData is true,map the education array, else use the default values and just add one object
    const [education, setEducation] = useState(()=> savedData === true ? savedCv.education.map((study)=> ({
      
        university: study.university,
        degree:study.degree,
        startDate: study.startDate,
        endDate: study.endDate,
        location: study.location,
        index:Number(study.index),
        id:study.id,
        edit:false
       
    }))
    :
   [{
    university: 'University',
    degree:"B.S. Web Development",
    startDate: "August 2018",
    endDate: "May 2022",
    location: "Miami,FL",
    index:0,
    id:uniqid(),
    edit:false,
    
}]
)

    const [edit, setEdit] = useState(false);
    //if saved data is true, additional is the length of the education array, else it's just 1 as that's the default
    const [additional, setAdditional] = useState(()=> savedData === true ? savedCv.education.length : 1 );
    //set edit state to true of education array and the specific study object
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
    //use values from input to set state
    const handleChange = (e) => {
        console.log('hello');
        //get name to be changed from the event target
        const change = e.target.name;
        console.log(change);
       //see which one has a true edit value to change that one
        //use the change name to update state, and add to it the value from the target
        setEducation(prevState => prevState.map(
                study => (study.edit? Object.assign(study, {[change]:e.target.value}): study)
            )
        );
    };
   
    //set edit to false and send state to redux
   const handleSubmit = () => {
       
        //change the edit state back to false so the pop up disappears
       setEdit(false);
        //using the edit state find the education object to be changed, and set edit to false
        setEducation(prevState => prevState.map(
                study => (study.edit  ? Object.assign(study,{edit:false}):study)
            )
        );
        
          //dispatch to redux store for when it is saved later and sent to the server
    education.forEach((study)=> { 
        
        dispatch(
            //the function name has been passed into the field parameter
        educationSection(
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
      
    };
    //add new education object to state
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
    //remove education object from state and update redux
    const deleteEducation =  async (e) => {
        //get the value from the target to get the index
        const index = e.target.value;
        //create a new array from array of education, spice out index
        let educationOld = [...education];
        educationOld.splice(index,1);
        
        //reset eudcation in state with the updated array
        setEducation(educationOld)
        
        //additional is amount of items in array, so subtract 1
       setAdditional(prevState => prevState -1 );
        //reset index values somehow
        //map through with index, set the index with prev state
        setEducation(prevState => prevState.map(
            (study,idx) => (Object.assign(study, {index:idx}) )
            ))
        
        //now dispatch postDelete  function in redux store, pass in the reducer function name
        educationOld.forEach((study)=> {
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
  

  
    return (
        
                <div className="educationDisplay">
                        <div className="addAnother">
                            <h1>Education</h1>
                            <button className="add" onClick={(e)=>addEducation(e)}>Add Education</button>
                        </div>
                    
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
                    education.filter(study => study.edit === true).map((study) => {
                         
                      
                            let index = study.index
                                return(
                            <div key={study.id}>
                                <form className="education"> 
                                    <h1>Education</h1>
                                    <div className="formWrapper"> 
                                        <input type= "text" placeholder="  " id={index} name="university" onChange = {(e)=>handleChange(e)}/>
                                        <label htmlFor="university">University</label>
                                    </div>
                                    <div className="formWrapper">
                                        <input type= "text"  placeholder="  " id={index} name="degree" onChange = {(e)=>handleChange(e)} />
                                        <label htmlFor="degree">Degree</label>
                                    </div>
                                    <div className="formWrapper">
                                        <input type= "text"  placeholder="  " id={index} name="startDate" onChange = {(e)=> handleChange(e)}/>
                                         <label htmlFor="startDate">Start Date</label>
                                    </div>
                                    <div className="formWrapper">
                                        <input type= "text"  placeholder="  " id={index} name="endDate" onChange = {(e)=>handleChange(e)}/>
                                        <label htmlFor="endDate">End Date </label>
                                    </div>
                                    <div className="formWrapper"> 
                                        <input type= "text"  placeholder="  " id={index} name="location" onChange = {(e)=>handleChange(e)}/>
                                        <label htmlFor="location">Location</label>
                                    </div>
                                    <div className="formButtons">
                                        <button className="add" onClick={(e)=>addEducation(e)}>Add Education</button>
                                        <button className="submitButton"type = "text" id={index} onClick={handleSubmit}>Submit Changes</button>
                                    </div>
                               
                                </form>
                            </div>
                                    )
                                   
                                }    
                    )
                    
                    : null    
                     }
                </div>
            )
     };
    
    




