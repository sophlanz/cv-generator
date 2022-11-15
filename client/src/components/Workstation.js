import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import {Link} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { aboutSection, addFileName, addId, educationSection, skillSection,experiencesSection, projectSection } from '../redux/cvSlice';
import { reset } from '../redux/cvSlice';
import Nav from './navs/NavWorkstation';
import trashcan from '../images/delete.png'
export default function Workstation() {
    //get username from user reducer, saved in an object 
    const username = useSelector((state) => state.user[0].username)
    const userId = useSelector((state)=> state.user[0].id);
    //will store resume data we retrieved from db
    const [userData, setUserData] = useState(null)
   const dispatch = useDispatch();
   

const url = process.env.NODE_ENV === 'production' ? 'https://cv-curator.up.railway.app' : 'http://localhost:9000' 
const getCvs = () => {
    //use axios to make get request to server
    console.log('getting CVS')
    const body = {
        username:username,
        id:userId
    }
    console.log(body);
    axios.get(`${url}/savecv/${userId}`,body)
    .then((response)=> {
        //save just the resumes
        console.log(response)
        setUserData(response.data.resume);
        console.log(response.data.resume)
        
    })
    .catch((error)=> {
        console.log(error)
    }) 

}

  const sendDispatchHandler=(resume)=> {
      //use resume to get values, and send to redux store
      console.log(resume);
      
      
    //education array of ojbects
      const education = resume.education
      //experiences array of objects
      const experiences = resume.experiences
      //projects array of objects
      const projects = resume.projects
      //skills object with 2 arrays
      const skills = resume.skills
      //check to see if there's data
      if(resume.firstName){
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
      
      }
    
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
    if(resume.education.length >0){
    education.forEach((study)=> {
        
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
}
    //loop experiences array of objects
  if(resume.experiences.length >0)  {
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
}
    //loop projects array of objects
  if(resume.projects.length >0){

    projects.forEach((project)=> (
        dispatch(
            projectSection({
                title:project.title,
                description:project.description,
                technologies:project.technologies,
                liveDemo:project.liveDemo,
                sourceCode:project.sourceCode,
                index:project.index,
                id:project.id,
            })
        )
    ))
}
    //dispatch skills object if there's data
   if(skills.techSkills.length >0 || skills.softSkills.length >0) {

    dispatch(
        skillSection({
            techSkills:skills.techSkills,
            softSkills:skills.softSkills
        })
    )
  }
}
  const handleReset = () => {
      dispatch(
          reset()
      )
  }
  const handleDelete = async (e) => {
    //delete post using the id we stored in target value (the image)
    const id = e.target.id
    console.log(id);
   await axios.delete(`${url}/delete-cv/${id}`)
        .then(() => {
         
            getCvs();
            }
        )
        .catch((err)=> {
            console.log(err)
        })
  };
    //use effect, call get CV on load
    useEffect(()=> {
      
      
        getCvs();
         //eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
    <>  
        <Nav/>
       
        <div className="workStationContent">
            <header>
             {/*Header */}
             <h1>Curriculum Vitaes that land us our dream job<span>.</span></h1>
            {/*Menu */}
            <button><Link to={"/create-cv"} onClick={handleReset}>Create New CV</Link></button>
             {/* <button onClick={getCvs}>View Saved Cv's</button> */}
            {/*Display the response of the CV, allow to click and send the data to the CV*/}
            </header>
            {/*Display user data */}
            <div className="dataTable">
                <div className="properties">
                    <h4>FILE NAME</h4>
                    <h4>CREATED AT</h4>
                    <h4>UPDATED AT</h4>
                </div>
                {/*Map through the state array and display file information */}
                { userData ?
                [...userData].map((resume,index)=> {
                 console.log(resume);
                    const date = new Date(resume.created_at).toLocaleString()
                    console.log(date)
                    return(
                        <ul className="cvList" key={uuidv4()}>
                        {/*add title name, on click reset the resume in the redux store, then dispatch the saved resume*/}
                           <li ><Link to="/create-cv" onClick={()=> {handleReset(); sendDispatchHandler(resume);}}>{resume.fileName}</Link></li> 
                            <li>{new Date(resume.created_at).toLocaleString( ('en-US'), { year: 'numeric', month: 'numeric', day: 'numeric',hour: '2-digit', minute: '2-digit', hour12: true})}</li>
                            <li>{new Date(resume.updated_at).toLocaleString(('en-US'), { year: 'numeric', month: 'numeric', day: 'numeric',hour: '2-digit', minute: '2-digit', hour12: true})}</li>
                            <img id={resume._id} onClick={(e)=>handleDelete(e)} src={trashcan} alt="trashcan"/>
                        </ul>
                    )
                })
                : null
                }
            </div>
        </div>
    </>
    )
}
