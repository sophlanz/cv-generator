import React from 'react';

class AdditionalEducation extends React.Component{
    render(){
        const education = this.props.education;
        const addEducation = this.props.addEducation;
        const editEducation  = this.props.editEducation;
        const deleteEducation = this.props.deleteEducation;
       
        return(
            <div>
            {education.map((study,idx) => {
                return (
                <div key={study.id}>
                <div className="educationList">
                <div className="uniDegree">
                <h3>{study.university}</h3>
                <div className="degree">{study.degree}</div>
                </div>
                <div className="dateLocation">
                <div className="locationEdu">{study.location}</div>
                <div className="dateEdu"> <div>{study.startDate}</div> - <div>{study.endDate}</div></div>
                </div>
               
                
                <button  className="education" value={idx} onClick = {editEducation}>Edit</button>
                {/*we don't want to add a delte button to the first one */}
                {idx > 0 ? 
                 <button className = "education" value={idx} onClick={deleteEducation}>Delete</button>
                 : null
                }
                </div>
                </div>
        )
    })}
             <button className= "education"onClick={addEducation}>Add Education</button>
            
            </div>
        );
    }
}
export default AdditionalEducation;