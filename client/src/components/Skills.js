import React from 'react';
class Skills extends React.Component {
    constructor(props){
        super(props);
        //skills  object which holds soft skills and technical skills array of strings
        this.state={
            skills:{
                techSkills:["Javascript", "React", "HTML", "CSS", "MySQL", "MongoDB", "Git","Jest","Webpack"],
                softSkills:["Advanced Spanish",
                "Strong Written and Oral Communication", 
                "Abundant Leadership Experience",
                "Lifelong Learner"
            ]
            },
            edit:false,
            addSkillTech:false,
            addSkillSoft:false,
            skill: " "
        };
    };
    editSkills = ()=> {
        //change edit state to true so inputs appear
        this.setState({
            edit:true
        });
    };
    addSkillTech = ()=> {
        //set addSkill state to true
        this.setState({
            addSkillTech:true
        });
    };
    addSkillSoft = ()=> {
        this.setState({
            addSkillSoft:true
        });
    };
    handleChange = (e) => {
        //set the value of the target to skill in state
        this.setState({
            skill:e.target.value
        })
    };
    submitAdd = (e) => {
        const skillType = e.target.id;
        //get array of soft skills and tech skills
        const softSkills = [...this.state.skills.softSkills];
        const techSkills = [...this.state.skills.techSkills];
        if(skillType==="submitTechSkill") {
            //get array of tech skills
            const techSkills = [...this.state.skills.techSkills];
            const softSkills = [...this.state.skills.softSkills];
            //push the value saved in state under skill to the array
            const newSkill = this.state.skill;
            techSkills.push(newSkill);
            //reset state of techSkills using updated array
            this.setState({
                skills:{techSkills:techSkills,
                        softSkills:softSkills
                }
            });
        } else {
             //push the value saved in state under skill to the array
             const newSkill = this.state.skill;
             softSkills.push(newSkill);
             //reset state of techSkills using updated array
             this.setState({
                 skills:{softSkills:softSkills,
                        techSkills:techSkills
                }
             });
        }
        //reset all of the edits in state and the skill holder
        this.setState ({
            addSkillTech:false,
            addSkillSoft:false,
            skill:" "
        });
    };
     deleteSkill = (e) =>  {
         //check the id "deleteTechSkill" or soft skill from the target, so we know which array to update
        const skillType = e.target.id
         //get index from value of target so we now which skill to delete
        const index = e.target.value;
        //dubplicate arrays to be update
        let techSkills = [...this.state.skills.techSkills];
        let softSkills = [...this.state.skills.softSkills];
        if(skillType==="deleteTechSkill") {
            //use the index to splice from array
            techSkills.splice(index,1);
            //update state
            this.setState({
                skills:{
                    techSkills:techSkills,
                    softSkills:softSkills
                }
            })
        } else {
            //use the index to splice from array
            softSkills.splice(index,1);
            //update state
            this.setState({
                skills:{
                    techSkills:techSkills,
                    softSkills:softSkills
                }
            })
        }
     };
  finishDelete = () => {
      this.setState({
          edit:false
      })
  };
    render(){
        const {edit, addSkillTech,addSkillSoft} = this.state
        const{techSkills,softSkills} = this.state.skills
        const techSkillList = techSkills ? techSkills.map((skill,index)=> <li key={index}>{skill}</li>) : null
        const softSkillList = softSkills? softSkills.map((skill,index)=> <li key = {index}>{skill}</li>) : null
        const techSkillListEdit = techSkills ? techSkills.map((skill,index)=><div className="skillsDelete"> <li key={index}>{skill}</li> <button className= "delete" value={index} title="delete" id="deleteTechSkill" onClick={this.deleteSkill}></button></div>) : null
        const softSkillListEdit = softSkills? softSkills.map((skill,index)=> <div className="skillsDelete"> <li key={index}>{skill}</li> <button className= "delete" value={index} title="delete" id="deleteSoftSkill" onClick={this.deleteSkill}></button></div>) : null
        return(
            <div className = "skillSection">
               <div ><h1 className="skillsEdit">Skills <button title = "edit" className = "skillsEditButton"onClick={this.editSkills}></button></h1></div>
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
                        <button className="addSkill" onClick = {this.addSkillTech}>Add Tech Skill</button>
                        <button className="addSoftSkill"onClick = {this.addSkillSoft}>Add Soft Skill</button>
                        <button className="submitButton"onClick={this.finishDelete}>Submit</button>
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
                            <textarea cols="30" rows="5" type="text" onChange ={this.handleChange}/>
                        </label>
                        <button id={"submitTechSkill"} className="add" title= "add" onClick = {this.submitAdd}>Add</button>
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
                            <textarea cols="30" rows="5" type="text" onChange ={this.handleChange}/>
                        </label>
                        <button id={"submitSoftSkill"} className="add" onClick = {this.submitAdd}>Add</button>
                    </div>
                </form>
                    :
                    null
                }
            </div>
        )
    };
};
export default Skills;