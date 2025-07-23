import { categories } from "../data/categories";
import { v4 as uuidv4 } from "uuid";
import type { ActityState, ActivityActions } from "../reducers/activity-reducer";
import type { Activity } from "../types";
import { useState, useEffect } from "react";
import type { ChangeEvent, Dispatch, FormEvent } from "react";


type FormProps = {
  dispatch: Dispatch<ActivityActions>,
  state:ActityState
  
};
const initialState: Activity = {
  id: uuidv4(),
  category: 1,
  date: new Date(),
  name: "",
  description: "",
};

const Form = ({ dispatch, state }: FormProps) => {
  const [activity, setActivity] = useState<Activity>(initialState);

  useEffect(()=>{
    if(state.activeId){
      const selectedActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
      setActivity(selectedActivity)
    }

  },[state.activeId])

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setActivity((prev) => ({
      ...prev,
      [id]:
        id === "date"
          ? new Date(value)
          : id === "calorias"
          ? Number(value)
          : id === "category"
          ? Number(value)
          : value,
    }));
  };

  const isValidActivity = () => {
    const { name } = activity;
    return name.trim();
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "save-activity", payload: { newActivity: activity } });

    setActivity({
      ...initialState,
    id:uuidv4()
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-white shadow p-10 rounded-lg"
    >
      <h1 className="text-2xl font-bold text-center mb-5">
        Registro de Actividades
      </h1>
      <div className=" flex justify-center  ">
        <div>
          <label htmlFor="category">Categoria:</label>
          <select
            id="category"
            value={activity.category}
            onChange={handleChange}
            className="border border-slate-300 p-1  m-3 rounded-md "
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="date">Fecha:</label>
          <input
            type="date"
            id="date"
            value={
              activity.date instanceof Date && !isNaN(activity.date.getTime())
                ? activity.date.toISOString().split("T")[0]
                : ""
            }
            onChange={handleChange}
            className="border border-slate-300 p-1 m-2 rounded-md "
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name">Titulo de la Actividad:</label>
        <input
          type="text"
          id="name"
          value={activity.name}
          onChange={handleChange}
          className="border border-slate-300 p-2 rounded-md w-full"
        />
      </div>

      

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="description">Descripcion:</label>
        <textarea
          id="description"
          placeholder="Descripcion de la actividad "
          value={activity.description}
          onChange={handleChange}
          className="border border-slate-300 p-2 rounded-md w-full"
          rows={4}
        ></textarea>
      </div>

      <input
        type="submit"
        value={
          activity.category === 1 ? "Guardar Importante " : "Guardar Urgente "
        }
        disabled={!isValidActivity()}
        className="bg-orange-600 text-white justify-center p-2 rounded-md cursor-pointer
         hover:bg-orange-700 transition-colors disabled:opacity-10"
      />
    </form>
  );
};

export default Form;
