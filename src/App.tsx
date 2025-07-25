import Form from "./components/Form";
import { useReducer, useEffect, useMemo } from "react";
import { activityReducer, initialState } from "./reducers/activity-reducer";
import ActivityList from "./components/ActivityList";


const App = () => {
  const [state, dispatch] = useReducer(activityReducer, initialState);
  useEffect(()=>{
localStorage.setItem('activities', JSON.stringify(state.activities))
  },[state.activities])

  const canRestartApp = useMemo(() => state.activities.length, [state.activities]);
  return (
    <>
     <header className="bg-orange-800 text-white p-4">
  <div className="flex justify-center">
    <h1 className="text-lg font-bold uppercase">
      Agenda de Actividades
    </h1>
    <button
      disabled={!canRestartApp}
      onClick={() => dispatch({ type: "restart-app" })}
      className="ml-4 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 disabled:opacity-50"
    >
      Reiniciar
    </button>
  </div>
</header>

<div className="flex w-full bg-orange-800">
  <section className="mb-10  px-5 w-1/2">
    <div className="mx-auto">
      <Form 
        dispatch={dispatch}
        state={state}
      />
    </div>
  </section>

  <section className="mb-10 mr-5 w-1/2 space-y-4 bg-white shadow p-10 rounded-lg ">
    <ActivityList
      activities={state.activities}
      dispatch={dispatch}
    />
  </section>
</div>


</>
  );
};

export default App;
