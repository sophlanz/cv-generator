import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import {Link} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { aboutSection, addFileName, addId, educationSection, skillSection,experiencesSection, projectSection } from '../redux/cvSlice';
import { reset } from '../redux/cvSlice';
export default function Workstation() {
    //get username from user reducer, saved in an object 
    const username = useSelector((state) => state.user[0].username)
    const userId = useSelector((state)=> state.user[0].id);
    console.log(userId);
    //will store resume data we retrieved from db
    const [userData, setUserData] = useState(null)
   const dispatch = useDispatch();
   
  const body = {
      username:username,
      id:userId
  }
    const getCvs = () => {
        //use axios to make get request to server
        console.log(userId);
        axios.get(`http://localhost:9000/savecv/${userId}`,body)
        .then((response)=> {
            //save just the resumes
            setUserData(response.data.resume);
            console.log(response.data);
            
        })
        .catch((error)=> {
            console.log(error.message)
        }) 

    }
  const sendDispatchHandler=(resume)=> {
      //use resume to get values, and send to redux store
      console.log(resume.fileName);
      console.log(resume._id)
    //education array of ojbects
      const education = resume.education
      //experiences array of objects
      const experiences = resume.experiences
      //projects array of objects
      const projects = resume.projects
      //skills object with 2 arrays
      const skills = resume.skills
    dispatch(
        /*send data to redux to be rendered in components */
        aboutSection ({
            firstName:resume.firstName,
            lastName:resume.lastName,
            title: resume.title,
            phone:resume.phone,
            email:resume.email,
            city: resume.city,
            linkedin:resume.linkedin,
            github:resume.github
        }),
    )
  
    dispatch(
        addFileName ({
            fileName:resume.fileName
        })
    )
    dispatch(
        addId({
            id:resume._id
        })
    )
    education.forEach((study)=> {
        console.log(study)
        dispatch(
            educationSection({
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
    })
    //loop experiences array of objects
    experiences.forEach((experience)=> (
        dispatch(
            experiencesSection({
            company: experience.company,
            title:experience.title,
            startDate: experience.startDate,
            endDate: experience.endDate,
            location:experience.location,
            description:experience.description,
            index:experience.index,
            id:experience.id
            })
        )
    ))
    //loop projects array of objects
    projects.forEach((project)=> (
        dispatch(
            projectSection({
                title:project.title,
                description:project.description,
                technologies:project.technologies,
                liveDemo:project.liveDemo,
                index:project.index,
                id:project.id,
            })
        )
    ))
    //dispatch skills object
    dispatch(
        skillSection({
            techSkills:skills.techSkills,
            softSkills:skills.softSkills
        })
    )

  }
  const handleReset = () => {
      dispatch(
          reset()
      )
  }
    //use effect, call get CV on load
    useEffect(()=> {
        getCvs();
    },[])
    return (
    <div>
        <div>
            <button><Link to={"/create-cv"} onClick={handleReset}>Create New Cv</Link></button>
            <button onClick={getCvs}>View Saved Cv's</button>
            {/*Display the response of the CV, allow to click and send the data to the CV*/}
            {/**/}
        </div>
        {/*Map through the state array and display file information */}
        { userData ?
        [...userData].map((resume,index)=> {
            let resumeData = resume;
            console.log(resumeData)
            return(
                <ul key={uuidv4()}>
                {/*add title name, on click reset the resume in the redux store, then dispatch the saved resume*/}
                    <Link to="/create-cv" onClick={()=> {handleReset(); sendDispatchHandler(resume);}}>{resume.fileName}</Link>
                    <li>{resume.created_at}</li>
                    <li>{resume.updated_at}</li>
                </ul>
            )
          
        })
        : null
            
        }
      
    </div>
    )
}
