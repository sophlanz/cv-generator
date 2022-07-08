import React from 'react'

class AdditionalExperience extends React.Component {
    render() {
        const experiences = this.props.experiences;
        const editExperience = this.props.editExperience;
        const addAnother = this.props.addAnother;
        const deleteExperience = this.props.deleteExperience;
      

       return(
           <div>
            {experiences.map((experience,idx) => {
         
            
            return(
                <div key={idx}>
                <div>{experience.startDate}</div> - <div>{experience.endDate}</div>
                <div>{experience.company}</div>
                <div>{experience.title}</div>
                <div>{experience.location}</div>
                <div>{experience.description}</div>
                <button value = {idx} onClick = {editExperience}>Edit</button>
                {/*We don't want to add a delte button to the first experience */}
                {idx > 0 ?
                <button value={idx} onClick={deleteExperience}>Delete</button>
                :
                null
                 }
            </div> 
            );
    })}
    <button onClick={addAnother}> Add Another</button>
    </div>
       ); 
    }
}
export default AdditionalExperience;