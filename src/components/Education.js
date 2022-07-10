import React from 'react';
import AdditionalEducation from './AdditionalEducation';
import uniqid from 'uniqid';
class Education extends React.Component {
    constructor(props){
        super(props);
        this.state={
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
    }
    editEducation = (e) => {
        //change edit to true, so the edit window will popup
        //get index from the value of target
        let index = Number(e.target.value)
       
    
        //map through the education and find one that matches the index. change edit to true
       this.setState(prevState => ({
           education:prevState.education.map(
               study => (study.index === index ? Object.assign(study,{edit:true}) : study)
           )
       }),()=> console.log(this.state.education))
       //also change the edit property in the general object, so jsx can detext the change
       this.setState({
           edit:true
       });
    }
    handleChange = (e) => {
        //get name to be changed from the event target
        const change = e.target.name;
        console.log(change);
       //see which one has a true edit value to change that one
        //use the change name to update state, and add to it the value from the target
        this.setState(prevState => ({
            education: prevState.education.map(
                study => (study.edit? Object.assign(study, {[change]:e.target.value}): study)
            )
        }),()=>(console.log(this.state.education)))
    };
    handleSubmit = (e) => {
        //change the edit state back to false so the pop up disappears
        this.setState({edit:false});
        //using the edit state find the education object to be changed, and set edit to false
        this.setState(prevState =>({
            education:prevState.education.map(
                study => (study.edit  ? Object.assign(study,{edit:false}):study)
            )
        }));
        //
    };
    addEducation = () => {
          //add another auto fill experience, the user can later edit
        //get additional state, and use that number to set new index
       const index = this.state.additional
       console.log(index);
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
        const updatedEducation = [...this.state.education];
        console.log(updatedEducation)
        //push new education to array
        updatedEducation.push(newEducation);
        console.log(updatedEducation)
        //reset education array in state with the updated education
         //increase additional state for if another experience is added
        this.setState({
            education:updatedEducation,
            additional:index+1
            
        }, () => {console.log(this.state.education) });
    }
    displayEducation = () => {

    }
    deleteEducation = (e) => {
        //get the value from the target to get the index
        const index = e.target.value;
        //create a new array from array of education
        const education = [...this.state.education];
        //splice out that index
        education.splice(index,1);
        //reset eudcation in state with the updated array
        this.setState({
            education: education
        });
        //subtract 1 ffrom additional prevstate to reset state
        this.setState(prevState => ({
            additional:prevState.additional-1
        }),()=> (console.log(this.state.additional)));
        //reset index values somehow
        //map through with index, set the index with prev state
        this.setState(prevState => ({
            education:prevState.education.map(
            (study,idx) => (Object.assign(study, {index:idx}) )
            )
        }), ()=>(console.log(this.state.education)))
    };
    render() {
        const {university, degree, startDate,endDate,location,} = this.state.education[0]
        const{additional,education,edit} = this.state;
        console.log(this.state.education[0])
        
        return (
            <div className="educationDisplay">
                    <h1>Education</h1>
                 {/*what we want to display on the screen as the final product */}
                 {/*display for if there's only 1 education listed */}
                
                 {additional === 1 ? 
                    <div className="educationList">
                    <div className="uniDegree">
                        <h3>{university}</h3>
                        <div className="degree">{degree}</div>
                    </div>
                   <div className="dateLocation"> 
                   <div className="locationEdu">{location}</div>
                   <div className="dateEdu"> <div>{startDate}</div> - <div>{endDate}</div></div>
                   </div>
                  
                    <button className="education"value="0" onClick = {this.editEducation}>Edit</button>
                    <button className="education" onClick={this.addEducation}>Add Education</button>
                </div>
                : 
                
                <AdditionalEducation education={education} deleteEducation={this.deleteEducation} addEducation={this.addEducation} editEducation={this.editEducation}/>
               
                 }
              
                {/*the popup we want to display on the screen for editing */}
           {edit ? 
           (education.map((study) => {
            let index=[];
               if(study.edit){
                index = study.index
                return(
                <div key={study.id}>
                 <label htmlFor="university">University</label>
                <input type= "text" id={index} name="university" onChange = {this.handleChange}/>
                <label htmlFor="degree">Degree</label>
                <input type= "text" id={index} name="degree" onChange = {this.handleChange} />
                <label htmlFor="startDate">Start Date</label>
                <input type= "text" id={index} name="startDate" onChange = {this.handleChange}/>
                <label htmlFor="endDate">End Date</label>
                <input type= "text" id={index} name="endDate" onChange = {this.handleChange}/>
                <label htmlFor="location">Location</label>
                <input type= "text" id={index} name="location" onChange = {this.handleChange}/>
                <button type = "text" id={index} onClick={this.handleSubmit}>Submit Changes</button>
                </div>
                )
               }
           }
           ))
            : null    
           }
            </div>
        
   )};
}

export default Education;