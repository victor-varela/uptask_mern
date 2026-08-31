import type { Task } from "@/types";
import TaskCard from "./TaskCard";

type TaskListProps = {
  tasks: Task[];
};

//Definimos Type de GroupedTask para que no sea 'never'
type GroupedTasks = {
  [key: string]: Task[];
};

//Definimos el estado inicial de los arreglos de estados para que Ts no se queje ya que sino estos estados se crean al 'vuelo' cuando el codigo corre-
const initialStatusGroups: GroupedTasks = {
  pending: [],
  onHold: [],
  inProgress: [],
  underReview: [],
  completed: [],
};

export default function TaskList({ tasks }: TaskListProps) {
  //Agrupamos las tareas
  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task];
    return { ...acc, [task.status]: currentGroup };
  }, initialStatusGroups);

  return (
    <>
      <h2 className="text-5xl font-black my-10">Tareas</h2>

      <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32">
        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <div key={status} className="min-w-75 2xl:min-w-0 2xl:w-1/5">
            <ul className="mt-5 space-y-5">
              {tasks.length === 0 ? (
                <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
              ) : (
                tasks.map(task => <TaskCard key={task._id} task={task} />)
              )}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

/**
 * Para evigtar este error en Ts: const groupedTasks: never[] - definimos el estado inicial de los arreglos de estado porque el reduce arranca como un array vacio [] en lugar de eso ya creado el estado inicial o initialValues / initialStatusGroups se lo pasamos al reducer como valor inicial.-- Por eso definimos el estado inicial de los arreglos.
 *
 * El codigo Relevante en este archivo es el reduce groupBy: "cuando necesito convertir un array plano en un objeto agrupado por alguna propiedad, uso reduce con spread para no mutar nada." Esa frase es la que te tiene que disparar la memoria, no la sintaxis exacta."
 *
 *
 *
 *
 *
 *
 *
 */
