import type { Activity } from "../types";
import { categories } from "../data/categories";
import { useMemo } from "react";
type ActivityListprops = {
  activities: Activity[];
};

const ActivityList = ({ activities }: ActivityListprops) => {

  const categoryName = useMemo(()=>(category:Activity['category']) =>categories.map(cat => cat.id === category ? cat.name : ''), [activities])


  return (
    <>
      <h2 className="text-4xl font-bold text-slate-600 text-center">
        Actividades
      </h2>
      {activities.map((activity) => (
        <div
          className="px-5 py-10 bg-white mt-5 flex justify-between"
          key={activity.id}
        >
          <div className="space-y-2 relative">
            <p className={`absolute -top-13 -left-13 px-10 py-2 text-white uppercase font-bold ${activity.category ===1 ? 'bg-orange-400': 'bg-orange-600'}`}>
              {categoryName(+activity.category)}
              </p>
            <p className=" font-bold text-center  ">
              {activity.date.toLocaleDateString()}
            </p>
           
            <p className="text-2xl font-bold pt-2">{activity.name}</p>
            <p>{activity.description}</p>

           
          </div>

          <div></div>
        </div>
      ))}
    </>
  );
};

export default ActivityList;
