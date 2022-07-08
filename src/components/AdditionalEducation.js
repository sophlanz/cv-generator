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
                <div>{study.startDate}</div> - <div>{study.endDate}</div>
                <div>{study.degree}</div>
                <div>{study.university}</div>
                <div>{study.location}</div>
                <button value={idx} onClick = {editEducation}>Edit</button>
                {/*we don't want to add a delte button to the first one */}
                {idx > 0 ? 
                 <button value={idx} onClick={deleteEducation}>Delete</button>
                 : null
                }
                
                </div>
        )
    })}
             <button onClick={addEducation}>Add Education</button>
            </div>
        );
    }
}
export default AdditionalEducation;