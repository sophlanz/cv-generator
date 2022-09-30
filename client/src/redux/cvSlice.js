import { createSlice, current } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
export const cvSlice = createSlice({
    name:'cv',
    initialState:{
        //initialize object with the category names we will be using
        id:uuidv4(),
        about:[
        ],
        //arrays of objects
        education:[ ],
        experiences:[ ],
        projects:[ ],
        //skills is an object of 2 arrays
        skills:{},
        fileName:"",
        
        
    },
    reducers: {
        aboutSection: (state, action) => {
            console.log(current(state));
           const about = {
            firstName:action.payload.firstName,
            lastName:action.payload.lastName,
            title: action.payload.title,
            phone:action.payload.phone,
            email:action.payload.email,
            city: action.payload.city,
            linkedin:action.payload.linkedin,
            github:action.payload.github
           }
           //clear array
           state.about.length = 0;
           //push new details
           state.about.push(about);
           console.log(current(state));
        },
        skillSection: (state,action)=> {
            const skill = {
                techSkills: action.payload.techSkills,
                softSkills:action.payload.softSkills
            }
            //reset state to the new skill object
            state.skills= skill
    
            console.log(current(state))
        },
      
        projectSection: (state,action) => {
            console.log(current(state));
            const project = {
                title:action.payload.title,
                description:action.payload.description,
                technologies:action.payload.technologies,
                liveDemo:action.payload.liveDemo,
                index:action.payload.index,
                id:action.payload.id
            }
               //in case of editing the project,if the index already exists , get the index of the education object and delete it to replace it with the new one
               const i = state.projects.findIndex(project => project.id === action.payload.id)
               console.log(action.payload.id)
              console.log(i);
               //if > -1 it exists, delete it
               if(i > -1) {
                   //filter state keeping all projects that don't match the id of the one we want to delete
                   const newProject = state.projects.filter(project => project.id !== action.payload.id)
                   console.log(newProject);
                   //splice in the declared education object using the index
                   newProject.splice(i,0,project)
                   console.log(newProject)
                   //clear education
                   state.projects = [];
                   //map and push into index to avoid push an array into index 0
                   newProject.map((project)=> {
                      return state.projects.push(project)
                   })
                   
   
                  console.log(current(state))
               } else {
                   //in the case of adding a new project , it doesn't exist, so push the new one
                    state.projects.push(project)
                    console.log(current(state))
                   
               }
               console.log(current(state))
          
        },
        experiencesSection: (state,action)=> {
           const experience = {
                company: action.payload.company,
                title:action.payload.title,
                startDate: action.payload.startDate,
                endDate: action.payload.endDate,
                location:action.payload.location,
                description:action.payload.description,
                index:action.payload.index,
                id:action.payload.id
            }
            console.log(current(state))
            //if the index already exists , get the index of the education object and delete it to replace it with the new one
            const i = state.experiences.findIndex(experience => experience.id === action.payload.id)
           console.log(i);
            //if > -1 it exists, delete it
            if(i > -1) {
                //splice state at this index, so we can then push the new object
                const newExperience = state.experiences.filter(experience => experience.id !== action.payload.id)
                console.log(newExperience);
                //splice in the declared education object using the index
                newExperience.splice(i,0,experience)
                console.log(newExperience)
                //clear education
                state.experiences = [];
                //map and push into index to avoid push an array into index 0
                newExperience.map((experience)=> {
                   return state.experiences.push(experience)
                })
                

               console.log(current(state))
            } else {
                //doesn't exist, push the new one
                 state.experiences.push(experience)
                 console.log(current(state))
                
            }

        },
        educationSection: (state, action) => {
            
            const education = {
                university: action.payload.university,
                degree:action.payload.degree,
                startDate: action.payload.startDate,
                endDate: action.payload.endDate,
                location: action.payload.location,
                index:action.payload.index,
                id:action.payload.id,
                additional:action.payload.additional
            }
            console.log(current(state))
            //if the index already exists , get the index of the education object and delete it to replace it with the new one
            const i = state.education.findIndex(study => study.id === action.payload.id)
            console.log(action.payload.id)
           console.log(i);
            //if > -1 it exists, delete it
            if(i > -1) {
                //splice state at this index, so we can then push the new object
                const newEducation = state.education.filter(study => study.id !== action.payload.id)
                console.log(newEducation);
                //splice in the declared education object using the index
                newEducation.splice(i,0,education)
                console.log(newEducation)
                //clear education
                state.education = [];
                //map and push into index to avoid push an array into index 0
                newEducation.map((study)=> {
                   return state.education.push(study)
                })
                

               console.log(current(state))
            } else {
                //doesn't exist, push the new one
                 state.education.push(education)
                 console.log(current(state))
                
            }
        },
        projectDelete: (state,action) => {
             //clear array if it's the first iteration, index 0, we already updated the entire array of object in jsx
             if(action.payload.index === 0) {
                state.projects = [];
            }
            console.log(action.payload.index)
            //new object schema, everything has to be replaced because we changed the indexes
            const project = {
                title:action.payload.title,
                description:action.payload.description,
                technologies:action.payload.technologies,
                liveDemo:action.payload.liveDemo,
                index:action.payload.index,
                id:action.payload.id
            }
            //push to state
            state.projects.push(project);
            console.log(current(state))

        },
        experienceDelete: (state,action)=> {
                 //clear array if it's the first iteration, index 0, we already updated the entire array of object in jsx
                 if(action.payload.index === 0) {
                    state.experiences = [];
                }
                console.log(action.payload.index)
                //new object schema, everything has to be replaced because we changed the indexes
                const experience = {
                    company: action.payload.company,
                    title:action.payload.title,
                    startDate: action.payload.startDate,
                    endDate: action.payload.endDate,
                    location:action.payload.location,
                    description:action.payload.description,
                    index:action.payload.index,
                    id:action.payload.id
                }
                //push to state
                state.experiences.push(experience);
                console.log(current(state))
        },
        postDelete: (state,action) => {
            //clear array if it's the first iteration, index 0, we already updated the entire array of object in jsx
            if(action.payload.index === 0) {
                state.education = [];
            }
            console.log(action.payload.index)
            //new object schema, everything has to be replaced because we changed the indexes
            const education = {
                university: action.payload.university,
                degree:action.payload.degree,
                startDate: action.payload.startDate,
                endDate: action.payload.endDate,
                location: action.payload.location,
                index:action.payload.index,
                id:action.payload.id,
                additional:action.payload.additional
            }
            //push to state
            state.education.push(education);
            console.log(current(state))
        },
        addFileName: (state,action) => {
            console.log(state)
         return {...state, fileName:action.payload.fileName}
        },
        addId: (state,action) => {
            return {...state, id:action.payload.id}
        },
        reset: (state, action) => {
            //clear about
            state.about.length=0
            state.education = [ ];
            state.experiences=[ ] ;
            state.projects=[ ];
            state.skills={ };
            state.fileName=""
            state.id=""
            console.log(state);
            
        }
}});
export const { 
                editCv, aboutSection, reset, addFileName,
                 addId, educationSection, 
                postDelete, projectSection, projectDelete,
                experiencesSection, experienceDelete,
                skillSection } = cvSlice.actions
export default cvSlice.reducer;
