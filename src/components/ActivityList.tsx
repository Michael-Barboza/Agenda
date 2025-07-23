import type { Activity } from "../types";
import { categories } from "../data/categories";
import { useMemo } from "react";
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/solid";
import type { ActivityActions } from "../reducers/activity-reducer";

type ActivityListprops = {
  activities: Activity[];
  dispatch: React.Dispatch<ActivityActions>;
};

const ActivityList = ({ activities, dispatch }: ActivityListprops) => {
  const categoryName = useMemo(
    () => (category: Activity["category"]) =>
      categories.map((cat) => (cat.id === category ? cat.name : "")),
    [activities]
  );
  const isEmptyActivities = useMemo(
    () => activities.length === 0,
    [activities]
  );

  return (
    <>
      <h2 className="text-2xl font-bold text-slate-600 text-center">
        Actividades
      </h2>
      {isEmptyActivities ? (
        <p className="text-center mt-4">No hay Actividades Agendadas..... </p>
      ) : (
        activities.map((activity) => (
          <div
            className="bg-white mt-5 flex justify-between  p-2 rounded shadow-lg"
            key={activity.id}
          >
            <div className="relative flex-1  space-y-2 ">
              <p
                className={`absolute -top-6 -left-6 px-4 py-1 text-white uppercase font-bold text-sm ${
                  activity.category === 1 ? "bg-orange-400" : "bg-orange-600"
                }`}
              >
                {categoryName(+activity.category)}
              </p>
              <p className="font-bold ml-4 text-center text-sm text-gray-700">
                {activity.date.toLocaleDateString()}
              </p>
              <p className="text-xl font-bold pt-2">{activity.name}</p>
              <p className="text-gray-600">{activity.description}</p>
            </div>

            <div className=" flex  items-center">
              <button
                onClick={() =>
                  dispatch({
                    type: "set-activeId",
                    payload: { id: activity.id },
                  })
                }
                className="p-2 rounded hover:bg-gray-100"
              >
                <PencilSquareIcon className="h-6 w-6 text-gray-600" />
              </button>
              <button
                onClick={() =>
                  dispatch({
                    type: "delete-activity",
                    payload: { id: activity.id },
                  })
                }
                className="p-2 rounded hover:bg-gray-100"
              >
                <XCircleIcon className="h-6 w-6 text-red-600" />
              </button>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default ActivityList;
