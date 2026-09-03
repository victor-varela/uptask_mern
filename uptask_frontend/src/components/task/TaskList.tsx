import type { Task } from "@/types";
import TaskCard from "./TaskCard";

type TaskListProps = {
  tasks: Task[];
};

//Definimos Type de GroupedTask para que no sea 'never'--> usamos index signature [key:string | number | symbol] : Tipo
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

//Diccionario de tasks para pintar en UI
const statusTransalations: { [key: string]: string } = {
  pending: "Pendiente",
  onHold: "En espera",
  inProgress: "En progreso",
  underReview: "En revision",
  completed: "Completada",
};

//Diccionario para pintar los border un UI
const statusStyles: {[key:string]:string} ={
  pending: 'border-t-slate-500',
  onHold: 'border-t-red-500',
  inProgress: 'border-t-blue-500',
  underReview: 'border-t-amber-500',
  completed: 'border-t-emerald-500',
}

export default function TaskList({ tasks }: TaskListProps) {
  //Agrupamos las tareas
  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task];
    return { ...acc, [task.status]: currentGroup }; //devuelve un OBJECT {   }
  }, initialStatusGroups);

  console.log(groupedTasks);

  return (
    <>
      <h2 className="text-5xl font-black my-10">Tareas</h2>

      <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32">
        {/* groupedTask en un Objeto que tiene arreglos dentro por eso Object.entries| [status, tasks] esto es destructuring de arreglos */}

        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <div key={status} className="min-w-75 2xl:min-w-0 2xl:w-1/5">
            <h3 
              className={`capitalize text-xl font-light border border-slate-300 bg-white p-3 border-t-8 ${statusStyles[status]} `}>
              {statusTransalations[status]}
            </h3>
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
 * El Object.entries convierte esto (el objeto con los arrays dentro ) 
 groupedTasks = {pending: Array(1), onHold: Array(1), inProgress: Array(1), underReview: Array(0), completed: Array(0)}

 --- lo convierte a esto--- una TUPLA []:

 Object.entries(groupedTasks) = 
0
: 
(2) ['pending', Array(1)]
1
: 
(2) ['onHold', Array(1)]
2
: 
(2) ['inProgress', Array(1)]
3
: 
(2) ['underReview', Array(1)]
4
: 
(2) ['completed', Array(1)]

y luego en el UL se itera sobre esto---:

tasks = 

0
: 
{_id: '6a8dd1aaf886c3adb20782e3', name: 'tarea', description: 'descripcion', status: 'pending', project: '6a6a8bffcb4440e6d3d884c9', …}
1
: 
{_id: '6a8dd3eff886c3adb20782e4', name: 'tarea 2', description: 'descripcion 2', status: 'onHold', project: '6a6a8bffcb4440e6d3d884c9', …}
2
: 
{_id: '6a8eef10f922a9e30e60aeee', name: 'tarea 3', description: 'descripcion 3', status: 'inProgress', project: '6a6a8bffcb4440e6d3d884c9', …}
3
: 
{_id: '6a8ef1a0f922a9e30e60aeef', name: 'tarea 4', description: 'descripcion 4', status: 'underReview', project: '6a6a8bffcb4440e6d3d884c9', …}
4
: 
{_id: '6a8ef533f922a9e30e60aef0', name: 'tarea 5', description: 'descripcion 5', status: 'completed', project: '6a6a8bffcb4440e6d3d884c9', …}
length
: 
5
[[Prototype]]
: 
Array(0)
﻿

 * TODO: ESCRIBIR CON MIS PROPIAS PALABARS LO QUE HACE EL OBJECTENTRIES : el .map no  toma 2 variables lo destructura con [ status, tasks ] es un solo parametro pero aca ya los nombro separado para usarlos mas abajo. Los nombres son temporales porque son variables temporales del .map . Necesito status para crear un div por CADA status (5 divs| 5 status) y DENTRO de cada <div/> voy a mostrar TASKS si y solo si HAY ALGO en tasks tasks.length | si hay algo entonces muestro <TaskCard task={task}/>. Object.entries convierte a ARRAY [key, value] el objeto (lo tuvimos que definir como objeto a groupedTask porque es lo mas conveiente como estructura de dato) luego, para iterarlos debemos separar las variables 'status' 'tasks' porque normalmente un .map es sobre un arreglo de una sola cosa (tasks por ejemplo que se itera en el UL es un ARRAYS DE OBJECTS, es lo mas comun, en cambio ObjectEntries(gropuedTasks) es un ARRAY DE ARRAYS. Usamos sus 2 ¿variables | valores? el string 'pending, onHold, ...' y el array [tasks] las tareas para armar el componente  ) "groupedTasks es un objeto agrupado por status. Object.entries(groupedTasks) lo convierte en un array de arrays, y ese sí lo recorremos con map, destructurando cada par en status y tasks para poder usarlos por separado."

 * Claude dice>>>

Object.entries(groupedTasks).map(...)
  └─ <div> (una por cada status: pending, onHold, inProgress...)
       └─ <ul>
            └─ ¿hay tareas en ESTE grupo?
                 ├─ NO → <li>No Hay tareas</li>
                 └─ SÍ → tasks.map(...) → <TaskCard /> por cada tarea de ESE grupo

Es un map anidado dentro de otro map — el externo recorre los grupos, el interno recorre las tareas dentro de cada grupo. Y el ternario decide, grupo por grupo, si hay que mostrar el mensaje vacío o la lista real de tarjetas.
 *
 * el término correcto para lo que sale de Object.entries() no es "variable", es tupla — un array de tamaño fijo donde cada posición tiene un significado específico (posición 0 = key, siempre string; posición 1 = value, lo que sea). Y lo que vos armás al destructurar (status, tasks) ahí sí ya son variables — nombres locales que le ponés vos a cada posición de la tupla.
 *
 * Fijate esto: statusTransalations[status] statusTranslations en un objeto pero accedemos a sus propiedades con notacion de corchete [] y no de punto '.' porque le pasamos [status] que es la variable que tenemos a mano en el codigo para que acceda a ese VALUE en el objeto- OJO hay que tipar statusTranslations para que no se queje TS.- El type de statusTranslations es igual al de GroupedTask===> [key:string] : string <==== dice, las claves 'keys' con corchete[] son type string y los valores 'values' son type string tambien. los corchetes es por sintaxis porque pueden ser dinamicas.
 * 
 * Una TUPLA, en sí misma, no sabe ni le importa qué significan sus posiciones — es simplemente "una cantidad fija de valores, en un orden fijo, cada uno con su tipo". | una tupla es "un array de longitud fija, donde cada posición tiene su propio tipo definido" — punto, sin importar cuántas posiciones tenga ni qué signifique cada una.
 * 
 * Ej de TUPLA ya conocido pero no RE-conocidos como tales: 
 * const [count, setCount] = useState(0);
// tupla: [valor_actual, funcion_para_actualizarlo]
 * 
 * 
 * initialStatusGroups y statusTransalations se tipan con INDEX SIGNATURE porque son objetos con múltiples claves conocidas de antemano en este caso, pero TypeScript no exige enumerarlas una por una — alcanza con declarar la regla general: "toda clave es string(tambien puede ser number o symbol), todo valor es de tal tipo(array, object...)". Sintaxis: {[key: string]: Tipo}. Se accede por nombre de clave, no por posición.

Object.entries() devuelve una tupla y se tipa de esta forma: cada elemento del array resultante es [string, Tipo] — posición 0 siempre string (la clave original del objeto), posición 1 el tipo del valor original (en tu caso, Task[]). Se accede por posición fija, no por nombre, y por eso al destructurar ([status, tasks]) TypeScript ya sabe el tipo de cada uno sin que lo escribas a mano.
/**
 *   Ejemplo de tipado de Tupla (no hay en este archivo, por eso el ejemplo) una de las caracteristicas principales de una tupla es que tiene un numero DEFINIDO de valores (por lo general se usan pares) pero pueden ser 3-4-5-6 n valores y el tipado es en ese MISMO ORDEN que estan las cosas: el array es de 2 posiciones y son 2 nombres entonces el tipado es string, string
 * 
 *  let par : [string, string] = ['Victor', 'Alejandro'] 
 * 
 * Fijate la diferencia entre un array normal no una tupla el tipado seria:
 * 
 * let array: string[] = ['a', 'b', 'c', 'd', 'e'] y seria irrelevante la cantidad de valores del array y el tipado estaria correcto es un array de strings : string[]
 * 
 * ¿Por que todo este lio con las tuplas? Convertimos el objeto a array porque .map()/.reduce()/.filter() solo existen para arrays, no para objetos. Y como cada elemento de un objeto es un par clave-valor, la única forma de representar ese par sin perder la distinción entre 'cuál es la clave' y 'cuál es el valor' es empaquetarlos en una tupla de 2 posiciones fijas.
 * == FORMA A MANO DE HACER LOS TYPES==
 * //Con TYPE nombrado
 * type GroupedTasksManual = {
  pending: Task[];
  onHold: Task[];
  inProgress: Task[];
  underReview: Task[];
  completed: Task[];
};

const initialStatusGroups: GroupedTasksManual = {
  pending: [],
  onHold: [],
  inProgress: [],
  underReview: [],
  completed: [],
};

//INLINE
const initialStatusGroups:{
  pending: Task[];
  onHold: Task[];
  inProgress: Task[];
  underReview: Task[];
  completed: Task[];
} = {
  pending: [],
  onHold: [],
  inProgress: [],
  underReview: [],
  completed: [],
};
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
