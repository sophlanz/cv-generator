import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { skillSection } from "../redux/cvSlice"
export default function Skills() {
const dispatch = useDispatch();
//get data from cv redux store, to see if there's saved data
const cv = useSelector((state)=> state.cv);
console.log(cv);
//if skills object is empty set false
const [savedData, setSavedData] = useState(Object.keys(cv.skills).length === 0 ? false : true)
console.log(Object.keys(cv.skills).length)
//declare states
//skills should be an object that contains array of tech and soft skills
//check to see if we want to use saved data or default values
const [skills, setSkills] = useState(()=>  savedData === true ? {
    techSkills:cv.skills.techSkills,
    softSkills:cv.skills.softSkills
}

:
 {
    techSkills:["Javascript", "React", "HTML", "CSS", "MySQL", "MongoDB", "Git","Jest","Webpack"],
    softSkills:["Advanced Spanish",
    "Strong Written and Oral Communication", 
    "Abundant Leadership Experience",
    "Lifelong Learner"],
});
const[edit, setEdit] = useState(false);
const[addSkillTech, setAddSkillTech] = useState(false);
const [addSkillSoft, setAddSkillSoft] = useState(false);
const [ skill, setSkill] = useState('');
   


    const editSkills = ()=> {
        //change edit state to true so inputs appear
        setEdit(true);
    };
    const addSkillTechEdit = ()=> {
        //set addSkill state to true
        setAddSkillTech(true)
     
    };
    const addSkillSoftEdit = ()=> {
        setAddSkillSoft(true);
    };
    const handleChange = (e) => {
        //set the value of the target to skill in state
        setSkill(e.target.value)
    };
    const submitAdd = (e) => {
        const skillType = e.target.id;
        
        //get array of soft skills and tech skills
        const softSkills = [...skills.softSkills];
        const techSkills = [...skills.techSkills];
        //if we're updating tech skills
        if(skillType==="submitTechSkill") {

            //push the value saved in state under skill to the array
            const newSkill = skill;
            techSkills.push(newSkill);
            //reset state of techSkills using updated array
            setSkills({
                techSkills:techSkills,
                softSkills:softSkills
            })
       
     
            //updating soft skills
        } else {
             //push the value saved in state under skill to the array
             const newSkill = skill;
             softSkills.push(newSkill);
             //reset state of techSkills using updated array
             setSkills({
                techSkills:techSkills,
                softSkills:softSkills
            })
         
        }
        //reset all of the edits in state and the skill holder
        setSkill({
            techSkills:[],
            softSkills:[]
        });
        setAddSkillSoft(false);
        setAddSkillTech(false);
             //dispatch to redux store
             dispatch(
                skillSection({
                    techSkills: techSkills,
                    softSkills:softSkills,
                    
                })
            )
   
    };
     const deleteSkill = (e) =>  {
         //check the id "deleteTechSkill" or soft skill from the target, so we know which array to update
        const skillType = e.target.id
         //get index from value of target so we now which skill to delete
        const index = e.target.value;
        //dubplicate arrays to be update
        let techSkills = [...skills.techSkills];
        let softSkills = [...skills.softSkills];
        //if tech skill
        if(skillType==="deleteTechSkill") {
            //use the index to splice from array
            techSkills.splice(index,1);
            //update state
            setSkills({
                techSkills:techSkills,
                softSkills:softSkills
            })
         
        } else {
            //use the index to splice from array
            softSkills.splice(index,1);
            //update state
            setSkills({
                techSkills:techSkills,
                softSkills:softSkills
            });
 
        }
     };
  const finishDelete = () => {
      setEdit(false)

  };
  

    const techSkillList = skills.techSkills ? skills.techSkills.map((skill,index)=> <li key={index}>{skill}</li>) : null
    const softSkillList = skills.softSkills? skills.softSkills.map((skill,index)=> <li key = {index}>{skill}</li>) : null
    const techSkillListEdit = skills.techSkills ? skills.techSkills.map((skill,index)=><div className="skillsDelete"> <li key={index}>{skill}</li> <button className= "delete" value={index} title="delete" id="deleteTechSkill" onClick={(e)=> deleteSkill(e)}></button></div>) : null
    const softSkillListEdit = skills.softSkills? skills.softSkills.map((skill,index)=> <div className="skillsDelete"> <li key={index}>{skill}</li> <button className= "delete" value={index} title="delete" id="deleteSoftSkill" onClick={(e)=> deleteSkill(e)}></button></div>) : null
    return (
        <div>
               <div className = "skillSection">
               <div ><h1 className="skillsEdit">Skills <button title = "edit" className = "skillsEditButton"onClick={editSkills}></button></h1></div>
                  {/*Edit skills, re-map all of the skills and add a delete button */}
                  {edit ? 
                <div className="skills" >
                    <div className="techSkills">
                        <h3>Tech Skills</h3>
                        <ul className="techSkillList">
                        {techSkillListEdit}
                        </ul>
                    </div>
                   <div className="softSkills">
                        <h3>Soft Skills</h3>
                        <ul className="softSkillList">
                        {softSkillListEdit}
                        </ul>
                   </div>
                   <div className="skillButtons">
                        <button className="addSkill" onClick = {addSkillTechEdit}>Add Tech Skill</button>
                        <button className="addSoftSkill"onClick = {addSkillSoftEdit}>Add Soft Skill</button>
                        <button className="submitButton"onClick={finishDelete}>Submit</button>
                   </div> 
                </div>
                    :
                <div className="skills">
                    <div className="techSkills">
                        <h3>Tech Skills</h3>
                        <ul className="techSkillList">
                        {techSkillList}
                        </ul>
                    </div>
                    <div className="softSkills">
                        <h3>Soft Skills</h3>
                        <ul className="softSkillList">
                        {softSkillList}
                        </ul>
                    </div>
                </div>
                    }   
                {/*if addTechSkill is true, display input field and submit
                button that will call  */}
                {addSkillTech ? 
                <form>
                    <div className="addSkill"> 
                        <label htmlFor="addSkillTeck">Add Tech Skill
                            <textarea cols="30" rows="5" type="text" onChange ={(e)=> handleChange(e)}/>
                        </label>
                        <button id={"submitTechSkill"} className="add" title= "add" onClick = {(e)=>submitAdd(e)}>Add</button>
                    </div>
                 </form>
                    :
                    null
                }
                 {/*if addSoftSkill is true, display input field and submit
                button that will call  */}
                {addSkillSoft ? 
                <form>
                    <div className="addSkill">
                        <label htmlFor="addSkillSoft"> Add Soft Skill
                            <textarea cols="30" rows="5" type="text" onChange ={handleChange}/>
                        </label>
                        <button id={"submitSoftSkill"} className="add" onClick = {(e)=>submitAdd(e)}>Add</button>
                    </div>
                </form>
                    :
                    null
                }
            </div>
        </div>
    )
}
