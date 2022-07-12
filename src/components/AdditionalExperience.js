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
                <div className="experienceItem">
                 <div className="generalInformation">
                    <div className="companyTitle">
                    <div className="expEditIcon">
                    <h2>{experience.company}</h2>
                    <button className="experience" value = {idx} onClick = {editExperience}></button>
                     {/*We don't want to add a delte button to the first experience */}
                {idx > 0 ?
                <button className="delete"value={idx} onClick={deleteExperience}></button>
                :
                null
                 }
                    </div>
                    <div >{experience.title}</div>
                    </div>
                    <div className="dateLocationExp">
                    <p>{experience.location}</p>
                   <div className="dateExperience"> <div>{experience.startDate}</div> - <div>{experience.endDate}</div></div>
                    </div>
                </div>
                    <ul className="descriptionExperience">
                    {experience.description.map((bullet,idx)=> {
                        return (
                            <li key={idx}>
                            {bullet}
                            </li>
                        )
                    })}
                   
                    </ul>
                    </div>
    
               
            </div> 
            );
    })}
  
    </div>
       ); 
    }
}
export default AdditionalExperience;