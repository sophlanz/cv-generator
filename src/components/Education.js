import React from 'react';

class Education extends React.Component {
    constructor(props){
        super(props);
        this.state={
            university: "Fun University",
            degree:"B.S. Web Development",
            startDate: "August 2018",
            endDate: "May 2022",
            location: "Miami,FL",
            minor:"React",
            gpa:"4.0",
            edit:false
        };
    }
    editEducation = () => {
        //change edit to true, so the edit window will popup
        this.setState({
            edit:true
        });
    };
    handleChange = (e) => {
        //get name to be changed from the event target
        const change = e.target.name;
        //name is what we want to reset in the state
        this.setState({
            [change]:e.target.value
        });
    }
    handleSubmit = () => {
        //change the edit state back to false so the pop up disappears
        this.setState({edit:false});
    };
    render() {
        const {university, degree, startDate,endDate,location,minor,gpa,edit} = this.state;
        return (
            <div>
                    <h1>Education</h1>
                 {/*what we want to display on the screen as the final product */}
                <div>
                    <div>{startDate}</div> - <div>{endDate}</div>
                    <div>{degree}</div>
                    <div>{university}</div>
                    <div>{location}</div>
                    <div>Minor:{minor}</div>
                    <div>GPA:{gpa}</div>
                    <button onClick = {this.editEducation}>Edit</button>
                </div>
                {/*the popup we want to display on the screen for editing */}
           {edit ? 
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="university">University</label>
                <input type= "text" name="university" onChange = {this.handleChange}/>
                <label htmlFor="degree">Degree</label>
                <input type= "text" name="degree" onChange = {this.handleChange} />
                <label htmlFor="startDate">Start Date</label>
                <input type= "text" name="startDate" onChange = {this.handleChange}/>
                <label htmlFor="endDate">End Date</label>
                <input type= "text" name="endDate" onChange = {this.handleChange}/>
                <label htmlFor="location">Location</label>
                <input type= "text" name="location" onChange = {this.handleChange}/>
                <label htmlFor="minor">Minor</label>
                <input type= "text" name="minor" onChange = {this.handleChange}/>
                <label htmlFor="gpa">GPA</label>
                <input type= "text" name="gpa" onChange = {this.handleChange}/>
                <button type = "submit">Submit Changes</button>
            </form>
            : null    
           }
            </div>
        );
    };
}
export default Education;