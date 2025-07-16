import Form from "./components/Form";
import { useReducer } from "react";
import { activityReducer, initialState } from "./reducers/activity-reducer";
import ActivityList from "./components/ActivityList";

const App = () => {
  const [state, dispatch] = useReducer(activityReducer, initialState);
  return (
    <>
      <header className="bg-orange-600 text-white p-4">
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="text-center text-lg font-bold text-white uppercase">
            Agenda de Actividades
          </h1>
        </div>
      </header>

      <section className="bg-orange-500 py-20 px-5">
        <div className="max-w-4xl mx-auto ">
          <Form dispatch={dispatch} />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList
        activities = {state.activities}
        />
      </section>
    </>
  );
};

export default App;
