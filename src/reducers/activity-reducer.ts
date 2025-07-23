import type { Activity } from "../types";

export type ActivityActions = 
  { type: 'save-activity', payload: { newActivity: Activity } } |
  { type: 'set-activeId', payload: { id: Activity['id'] } } 

  

export type ActityState = {
  activities: Activity[],
  activeId: Activity['id']
};

export const initialState: ActityState = {
  activities: [],
  activeId:''
};

export const activityReducer = (
  state : ActityState = initialState,
  action : ActivityActions
) => {

 if(action.type === 'save-activity') {

  let updatedActivities: Activity[]=[]
  if(state.activeId){
     updatedActivities= state.activities.map(activity => activity.id === state.activeId ? 
      action.payload.newActivity : activity
     )
  }else{
   updatedActivities= [...state.activities, action.payload.newActivity]
  }
  return {
    ...state,
    activities: updatedActivities,
    activeid: ''
  }
 }
 if (action.type === 'set-activeId'){
  return{
    ...state,
    activeId: action.payload.id
  }
 }
 return state
}
