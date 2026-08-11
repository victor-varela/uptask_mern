# TUTOR.md — UpTask | Curso MERN con TypeScript
> Pegá este archivo al inicio de cada sesión para que el tutor se ponga al día.

---

## 📌 Instrucciones de uso

1. **Al iniciar sesión** → pegá este archivo + respondé la pregunta de retención de 24h
2. **Al terminar sesión** → pedile al tutor que actualice el archivo y reemplazá el contenido
3. **Cuando tenés una duda** → intentá resolverla 5 min solo antes de preguntar
4. **Cuando terminás un video** → avisá el número y el tutor te hace la pregunta de cierre
5. **TODO** → para dudas que no bloquean el avance, seguís sin detenerte

---

## 🎯 Curso
- **Nombre:** React y TypeScript - La Guía Completa Creando +10 Proyectos
- **Autor:** Juan Pablo De la Torre Valdez (Udemy)
- **Stack:** MERN (MongoDB, Express, React, Node.js) + TypeScript
- **Duración total:** 58 horas

---

## 📚 Método de estudio acordado

### Ritual de cada sesión

**INICIO (5 min)**
- Pegás el TUTOR.md
- Respondés la pregunta de retención del video anterior (sin ver el código)
- Arrancás el video nuevo

**DURANTE el video**
1. Ver video completo **sin tocar el teclado**
2. Cerrar el video y **reproducir de memoria** en VSCode
3. **Pseudocódigo primero** — comentarios con los pasos antes del código
4. **Escribir notas/comentarios** en el código mientras codificás
5. **TODO** para dudas que no bloquean el avance
6. Consultar al tutor solo si bloqueaste más de 5 min

**CIERRE (5 min)**
- Pregunta de cierre del video (ver formato ajustado abajo)
- Completar el tracking de sesión
- Pedir actualización del TUTOR.md

### Formato de la pregunta de cierre (ajustado)
1. El tutor revisa si la nota del código ya respondió la pregunta obvia — si es así, no la repite
2. El tutor da un ejemplo CORTO de otro contexto donde aplica el mismo concepto — preferentemente
   conectado a un sistema real del día a día: banco, ecommerce, red social, buscador web, apps de
   delivery, streaming, etc. (no solo ejemplos de código aislado)
3. Pregunta: "¿dónde más lo aplicarías vos?" o "¿por qué se hace así y cómo lo harías diferente?"
4. Respuesta corta, 1-2 líneas — no hace falta extenderse

Ejemplo de formato:
> Ya documentaste bien por qué validar antes de escribir es mejor.
> Mismo patrón en un banco: primero validás fondos suficientes, después ejecutás la transferencia.
> ¿Dónde más verías este patrón — validar antes de ejecutar — en otro sistema que uses a diario?

### Principio de las 3 representaciones (objetivo real del método)
El objetivo NO es memorizar sintaxis — es internalizar el CONCEPTO detrás del código, viéndolo
desde 3 ángulos distintos, que ya se vienen usando sin nombrarlo así:
```
1. Código          → la implementación exacta
2. Esquema/diagrama → el flujo visual (Cliente → Router → Controller → DB)
3. Analogía real    → conectar con un sistema conocido (banco, ecommerce, apps de mensajería)
```
Cuando el mismo concepto se ve desde los 3 ángulos, se fija mucho más fuerte que viéndolo una
sola vez en código. Este es el motivo real detrás del formato de pregunta de cierre.

### Objetivo declarado por Víctor (no memorizar, internalizar el mapa mental)
No aspira a memorizar cada línea del proyecto — aspira a tener internalizado el "esqueleto
universal" de cómo se construye un backend (y luego un frontend), independientemente del
lenguaje o framework específico. Ve esto como la skill que se vuelve más valiosa a medida que
la IA escribe más código: no dejar de entender el código, sino poder JUZGAR si lo que la IA
generó tiene sentido — como un director de orquesta que lee la partitura aunque no toque el
instrumento. Las notas de código detalladas siguen siendo el repaso técnico; este mapa mental
es el repaso conceptual de alto nivel.

---

## 📊 Sistema de medición — 5 parámetros

### Lo que medimos
```
1. Retención      → ¿podés reproducir el código sin ver el video?
2. Comprensión    → ¿podés explicar el por qué, no solo el cómo?
3. Transferencia  → ¿podés aplicar el concepto en un contexto nuevo?
4. Velocidad      → ¿cuánto tardás por video con el tiempo?
5. Autonomía      → ¿cada vez necesitás menos ayuda para resolver errores?
```

### Lo que debés hacer vos para cada parámetro

**RETENCIÓN** — No repasar antes de la pregunta de 24h. El esfuerzo de recordar ES el aprendizaje.

**COMPRENSIÓN** — Siempre preguntarte "¿por qué?" antes de "¿cómo?". Si no podés explicarlo simple, no lo entendiste todavía.

**TRANSFERENCIA** — Cuando aprendés algo nuevo, conectarlo con algo anterior. Preguntarte "¿dónde más aplica esto?"

**VELOCIDAD** — No quedarte más de 10 minutos trabado. TODO y seguís.

**AUTONOMÍA** — Intentar resolver el error solo 5 minutos antes de preguntar. Anotar cuando resolvés algo solo.

### Cuándo medir retención
```
Inmediata  → pregunta de cierre al terminar el video
24-48h     → pregunta al inicio de la sesión siguiente
7 días     → pregunta sorpresa de concepto de esa semana
30 días    → al terminar sección, reproducir patrón completo de memoria
```

### Tracking de sesión
```
## 📊 Última sesión
- Fecha:
- Videos completados:
- Pregunta retención 24h: ✅/❌/parcial
- Preguntas cierre bien respondidas: /
- Dudas bloqueantes:
- TODOs agregados:
- Retención (1-5):
- Comprensión (1-5):
- Autonomía (1-5):
```

### Tendencia actual
```
Velocidad      → subiendo ✅ (2 → 4 → 9 videos por sesión)
Autonomía      → subiendo ✅ (resuelve antes de preguntar)
Comprensión    → alta ✅ (pregunta el por qué, no solo el cómo)
Transferencia  → sólida ✅ (conectó Covey con pseudocódigo, fail-safe con router.param)
Retención      → 3/5 mejorando con sistema de 24h ✅
```

---

## 📍 Progreso actual
- **Sección activa:** 29/30 — UpTask: Frontend, CRUD de Proyectos (Crear + Listar + Editar en curso)
- **Último video completado:** EditProjectView conectada con useQuery + editProjectById,
  EditProjectForm recibe `data` por props pero AÚN NO la usa (bug detectado, ver Errores comunes)
- **Próximo video:** previsiblemente la mutación de "Guardar Cambios" (updateProject) — ahí se
  resuelve si el profe usa `Project` (con _id) o algo distinto para la prop de EditProjectForm
- **Pregunta de retención para próxima sesión:** ¿por qué `data._id` explotaba la app cuando se
  leía ANTES de los `if(isLoading)` / `if(isError)`, pero no después? ¿qué tiene que ver con
  narrowing?
- **TODOs técnicos pendientes (2):**
  1. `EditProjectForm` no prellena el form — usa `initialValues` vacío en vez de `data` en
     `useForm({ defaultValues: ... })`
  2. Tipo de la prop `data` en `EditProjectFormProps` es `ProjectFormData` (sin `_id`) — hace
     falta `_id` para el update futuro; cambiar a `Project` si el curso no lo resuelve solo
  3. (siempre pendiente) agregar `projectSchema.safeParse()` a `editProjectById`, igual que
     ya tiene `getProjects`
- **⚠️ NOTA IMPORTANTE:** Numeración de videos desalineada respecto al roadmap original — no
  perseguir el número exacto, verificar por CONTENIDO.
- **Sección 27:** ✅ COMPLETA
- **Sección 28:** ✅ COMPLETA — 19/19 videos, CRUD de Proyectos y Tareas + middlewares refactorizados
- **Sección 29-30:** 🔄 En curso — Tailwind (v3), Router + Layout + Outlet, AppLayout con Logo,
  NavMenu (HeadlessUI Popover, migrada a API no deprecada), path aliases @/, CORS configurado,
  react-toastify, CRUD frontend: Crear (react-hook-form + useMutation + Zod types) y Listar
  (useQuery + Zod dashboardViewSchema) completos; Editar recién arrancando (ruta + useParams
  + función de API, falta conectar con la vista). MongoDB conectando correctamente tras resolver
  incidente de querySrv (ver Errores comunes). Repo Git unificado tras resolver submódulos
  fantasma (ver Errores comunes). Víctor usa capturas como referencia visual (carpeta referencias-ui/)

---

## 🗺️ Roadmap detallado — Sección 30 (Frontend: Creando Proyectos)
> Confirmado por captura de Udemy — permite anticipar conceptos antes de cada video

```
488. Página para crear proyectos
489. Formulario de Crear Proyectos
490. Resto de los campos
491. Zod para tipos del formulario           ← MISMO CONCEPTO que express-validator, pero cliente
492. Configuración de Axios
493. Archivo de peticiones a la API
494. CORS backend-frontend                   ← la "puerta de salida" que abriste conceptualmente
495. Redireccionar después de enviar
496. Notificación Toast
497. ¿Qué es React Query?                    ← concepto NUEVO, no un patrón ya conocido — bajar ritmo
498. Mutaciones de React Query
499. Cómo leer errores del backend con useMutation
```

**Anticipos del tutor:**
- 491 (Zod) → reconocimiento instantáneo, es el `express-validator` del cliente
- 494 (CORS) → conecta directo con la teoría de seguridad ya vista (CORS solo protege navegadores)
- 497-499 (React Query) → acá sí baja el ritmo, es territorio genuinamente nuevo

---

## 🗺️ Mapa del curso (secciones relevantes)

| Sección | Tema | Estado | Alineación tutor |
|---------|------|--------|-----------------|
| 26 | UpTask - Primeros pasos backend | ✅ Completa | ✅ Total |
| 27 | Proyectos - Modelos, rutas y controllers | ✅ Completa | ✅ Total |
| 28 | Tareas - Modelos, rutas y controllers | ✅ Completa — 19/19 videos | ✅ Total |
| 29 | Frontend - Creando el Frontend | 🔄 En curso (video 483/487) | ✅ Total — React + Vite + Tailwind + TypeScript |
| 30 | Frontend - Creando Proyectos | ⏳ Pendiente | ✅ Total — React Query, formularios |
| 31+ | Autenticación, Tareas frontend, etc. | ⏳ Pendiente | ⚠️ Actualizar cuando lleguemos |

---

## ✅ Conceptos consolidados

### Backend / Node.js
- Flujo completo: `index.ts → server.ts → connectDB → rutas → controller`
- `export default` vs `named export` y cómo importar cada uno
- `dotenv` — debe ir primero antes de cualquier `process.env`
- `exit(0)` = proceso terminó ok | `exit(1)` = proceso terminó con error

### Express
- Express como abstracción sobre Node.js puro
- `app.use()` para montar routers con prefijo de URL
- Router de Express — corta el prefijo y maneja el resto
- Separación de responsabilidades: index / server / routes / controllers
- `req` = leer lo que llega | `res` = escribir lo que devolvés
- `req.body`, `req.params`, `req.query`
- `res.json()` vs `res.send()`
- Status codes: 200, 201, 400, 404, 500
- Nested routes: `/api/projects/:projectId/tasks`
- `router.param("projectId", validateProject)` → ejecuta middleware automáticamente cuando el param aparece en la URL — seguridad por defecto (*fail-safe defaults*)

### Mongoose / MongoDB
- MongoDB = NoSQL, documentos JSON
- Mongoose = ODM (Object Document Mapper)
- Schema = define la estructura | Modelo = conecta schema con la colección
- `required: true` (NO `require: true`)
- `Project.find({})` — los objetos JS son las queries en Mongoose
- `Project.findById(id)`
- `project.save()`, `project.deleteOne()`
- `Project.findByIdAndUpdate(id, data)`
- Normalización: guardar IDs en lugar de objetos completos
- `project.tasks.push(task._id)` → relación bidireccional
- `PopulatedDoc<ITask & Document>[]`
- `.populate("campo")` → equivalente al JOIN de SQL, trae el documento completo usando el `ref` del Schema. Recibe el nombre del CAMPO, no del modelo
- Integridad referencial: MongoDB no la garantiza automáticamente — el código debe mantenerla
- ObjectId vs String: comparar siempre con `.toString()` o `.equals()`
- OJO: borrar y recrear data de prueba en Postman cuando se cambia el Schema

### TypeScript
- `type` → tipos simples, uniones, tipos inferidos
- `interface` → objetos que extienden clases, estructuras que pueden crecer
- `as const` → propiedades readonly
- Truco values de objeto: `type T = (typeof obj)[keyof typeof obj]`
- `declare global { namespace Express { interface Request { project: IProject } } }` → extiende Request sin perder propiedades

### Express Validator
- `body()`, `param()`, `param("id").isMongoId()`
- `handlerInputErrors` — corta si hay errores
- Orden: `router.param()` → validaciones → `handlerInputErrors` → controller
- Verificar primero lo más bloqueante

### Middleware custom
- `validateProject` — verifica que el proyecto existe y lo agrega al `req`
- `router.param("projectId", validateProject)` — evita repetición, seguridad por defecto

### Promises
- `Promise.all` → dependen entre sí → falla una → catch automático
- `Promise.allSettled` → independientes → falla una → NO catch
  ```typescript
  const results = await Promise.allSettled([op1(), op2()]);
  const hasFailed = results.some(r => r.status === 'rejected');
  if (hasFailed) return res.status(500).json({ error: "Error" });
  res.send("Ok");
  ```

### CRUD completo de Proyectos (Sección 27)
```
GET    /api/projects      → getAllProjects
GET    /api/projects/:id  → getProjectById + populate("tasks")
POST   /api/projects      → createProject
PUT    /api/projects/:id  → updateProject
DELETE /api/projects/:id  → deleteProject
```

## 🗺️ Mapa mental del backend — El esqueleto universal (repaso conceptual)
> No es sobre memorizar código — es el orden lógico que sigue CUALQUIER backend, en cualquier
> lenguaje o framework. El código cambia, esta secuencia no.

```
1. FUNDACIÓN           → Node + TypeScript + Express
                          "Necesito un programa que escuche peticiones HTTP"

2. CONEXIÓN A DATOS     → MongoDB + Mongoose
                          "Necesito que los datos sobrevivan a un reinicio"

3. FORMA DE LOS DATOS   → Modelos (Schema + Interface)
                          "Necesito definir qué ES un Proyecto, qué ES una Tarea"

4. ENTRADA A LA APP     → Router
                          "Necesito puertas — URLs — para que el mundo interactúe"

5. LÓGICA DE NEGOCIO    → Controllers
                          "Necesito decidir qué pasa cuando tocan esa puerta"

6. CONFIANZA CERO       → Validaciones (express-validator + Mongoose enum)
                          "Nunca confío en lo que entra desde afuera"

7. RELACIONES           → populate() + IDs cruzados
                          "Un Proyecto tiene Tareas, una Tarea pertenece a un Proyecto"

8. REPETIR SIN REPETIR  → Middlewares + router.param()
                          "Si algo se repite 3 veces, lo encapsulo una vez"

9. LA PUERTA DE SALIDA  → CORS (próximo: video 494)
                          "Dejo que el frontend le hable a esta fortaleza"
```

### CRUD Tareas (Sección 28 — COMPLETA)
```
POST   /api/projects/:projectId/task          → createTask
GET    /api/projects/:projectId/task          → getProjectTasks + populate("project")
GET    /api/projects/:projectId/task/:taskId  → getTaskById + validación project/task
PUT    /api/projects/:projectId/task/:taskId  → updateTask (findById + validar + asignar + save)
DELETE /api/projects/:projectId/task/:taskId  → deleteTask (filter en project.tasks + deleteOne)
```

### Patrón update/delete correcto (evita bug de validar después de escribir)
```typescript
// ❌ Problemático: escribe antes de poder validar
const task = await Task.findByIdAndUpdate(taskId, req.body);
if (task.project !== req.project._id) { ... } // ya se escribió, tarde

// ✅ Correcto: separa buscar → validar → asignar → guardar
const task = await Task.findById(taskId);
if (!task) { return 404 }
if (task.project.toString() !== req.project._id.toString()) { return 400 }
task.name = req.body.name;  // asignación en memoria
await task.save();          // recién ahora escribe, ya validado
```

---

## 🔒 Seguridad Web

- Mass Assignment: extraer solo los campos necesarios del body
- CORS: protege navegadores, NO protege curl/Postman/scripts
- Autorización: findById() → verificar permisos → operación
- Fail-safe defaults: `router.param()` ejecuta validación automáticamente — imposible olvidarse
- Integridad referencial: borrar via API siempre, no directo en Compass

### Bug real detectado y corregido por Víctor (video 480)
`updateTaskStatus` no tenía la validación `task.project.toString() !== req.project._id.toString()`
que sí estaba en getTaskById, updateTask y deleteTask — inconsistencia real que permitía cambiar
el estado de una tarea de otro proyecto. Víctor lo probó empíricamente en Postman antes de confirmar
el bug, y agregó la validación faltante + `isIn()` para el enum de status en el router.

### Dos capas de validación no son redundantes
```
Mongoose enum (Schema)     → error 500 genérico, mensaje crudo de Mongoose
express-validator isIn()   → error 400 controlado, mensaje claro para el cliente
```
Mismo principio que `isMongoId()`: Mongoose fallaría igual, pero se prefiere capturar antes
con un mensaje controlado en el router.

---

## 🎯 Path de Hacking Ético — Para después del curso
```
Semana 1  →  WebGoat: docker run -d -p 8080:8080 webgoat/goat-and-wolf
Semana 2  →  OWASP Top 10: https://owasp.org/www-project-top-ten
Mes 2     →  TryHackMe.com
```

---

## 🖥️ Frontend — Conceptos consolidados (Sección 29)

### Scaffolding y dependencias
```
npm create vite@latest    → genera TODA la estructura (carpetas, componentes, config)
npm install                → lee package.json y descarga a node_modules
```
Relación con backend:
```
Backend: npm init -y (hoja en blanco)  vs  Frontend: npm create vite@latest (plantilla lista)
```
El `package.json` casi nunca se edita a mano — cada `npm install <algo>` lo modifica solo.
Única excepción real: el bloque `"scripts"` en el backend, escrito manualmente.

### React Router — Layout y Outlet
```typescript
<Route element={<AppLayout />}>        // el "marco fijo" (como el header de YouTube)
  <Route path="/" element={<DashboardView />} index />  // el "contenido que cambia"
</Route>
```
Si un componente tiene rutas hijas, debe incluir `<Outlet />` — ahí se inyecta el contenido.
Mismo patrón que el header de YouTube o el menú de Netflix: fijo arriba, contenido cambia abajo.
Los layouts pueden anidarse (ej. Netflix: layout general → sub-layout de Configuración).

### Path Aliases (@/) — evitar ../../../ en imports
Se configuran en DOS lugares, no uno solo:
```json
// tsconfig.app.json — SIN baseUrl (deprecado desde TS 4.1+, innecesario con paths)
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```
```typescript
// vite.config.ts — Vite NO lee tsconfig para esto, necesita su propio alias
import path from "path"
export default defineConfig({
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
})
```
Requiere `npm i -D @types/node`. Es 100% opcional funcionalmente — mejora legibilidad, no cambia
comportamiento (mismo principio que `router.param()` en el backend).
Si VSCode sigue marcando error después de corregir el tsconfig: `Ctrl+Shift+P` →
"TypeScript: Restart TS Server" (limpia caché de errores viejos).

### HeadlessUI + Heroicons — componentes de UI accesibles
```bash
npm i @headlessui/react @heroicons/react
```
Componentes sin estilos propios pero con accesibilidad y comportamiento (teclado, focus,
animaciones) ya resueltos — vos aplicás el diseño con Tailwind encima.
Patrón usado en NavMenu: `Popover` (botón + panel desplegable) + `Transition` (animación de
entrada/salida). Es un patrón que se va a repetir en otros menús desplegables del proyecto.

### Componentes de función deben tener `return`
```typescript
// ❌ falla — TS: Type 'void' is not assignable to type 'ReactNode'
function Router() {
  <BrowserRouter>...</BrowserRouter>;  // sin return, se descarta
}

// ✅ correcto
function Router() {
  return (
    <BrowserRouter>...</BrowserRouter>
  );
}
```
Mismo patrón que una calculadora: procesar internamente no sirve si no se muestra/devuelve
el resultado. En Express es como un controller que nunca llama a `res.send()`.

### React Router — `Link` vs `<a href>` (SPA sin recarga)
```
<a href="...">    → recarga completa de página (pide HTML de cero al servidor)
<Link to="...">   → intercepta el click, usa History API del navegador,
                     React re-renderiza SOLO el Outlet — sin recarga
```
Mismo patrón que Gmail: click en un email no recarga header/sidebar, solo el panel central.
El Virtual DOM interviene DESPUÉS (qué actualizar eficientemente) — el ahorro más grande es
antes: evitar el viaje completo al servidor por HTML nuevo.

### Formularios NO controlados con `<Form>` nativo (proyecto anterior de Productos, repaso)
```
<Form method="POST">          ← intercepta submit, arma un Request (Fetch API)
  <ProductForm />              ← componente "tonto", solo inputs con name=""
</Form>
action({ request })           ← función que vive FUERA del componente
  await request.formData()    ← el navegador junta TODOS los inputs con name
                                 sin importar cuántos componentes de por medio haya
```
Clave: el atributo `name` en cada input es lo que conecta todo — no hace falta pasar
props ni usar useState/onChange. El `<Form>` "ve" a través de la jerarquía del DOM.
Analogía: `<Form>` es el sobre que junta todas las hojas (inputs) que están adentro
al cerrarlo (submit), sin que cada hoja necesite avisarle al sobre que existe.
Patrón: Componente → UI | Loader/Action → datos y efectos (paradigma distinto a
manejar todo con onSubmit + setState + fetch en React clásico).

### Formularios con react-hook-form (proyecto actual — enfoque distinto)
```
useForm()              → register, handleSubmit, formState: { errors }
register("campo", {})  → conecta el input al estado interno del hook
handleSubmit(fn)        → ejecuta fn SOLO si pasa validación
```
Ventajas reales de la librería (no obvias en un form chico de 3 campos):
- Performance: usa refs, no re-renderiza en cada tecla (sí importa en forms grandes)
- Validaciones cruzadas entre campos (`watch()`)
- Validación async (ej. verificar si un email ya existe)
- `useFieldArray()` para campos dinámicos
- Integración directa con Zod: `useForm({ resolver: zodResolver(schema) })`
  → deja de escribirse `{ required: "..." }` a mano en cada input

### Zod — usar el schema como fuente del type (decisión propia de Víctor, validada)
```typescript
export const projectSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string()
})
export type Project = z.infer<typeof projectSchema>
export type ProjectFormData = Pick<Project, 'clientName' | 'projectName' | 'description'>
```
Por qué Zod en vez de `type` plano: el schema sirve DOS veces — validador en runtime
(útil para validar respuestas de la API) Y fuente del type en compile-time (via z.infer).
Mismo principio que el truco de `TaskStatus` en el backend — no se duplica la definición
de estructura en dos lugares; si el schema cambia, el type se actualiza solo.
`Pick` (no `Omit`) porque es más explícito y a prueba de futuro: cuando se agreguen
campos nuevos al schema, `ProjectFormData` no se ensucia automáticamente con ellos.

### Dos usos distintos de `return` (aclarado)
```
USO 1 — Cortar el flujo (control de flujo / early return)
  if (!project) { return res.status(404).json({...}) }

USO 2 — Entregar un valor útil a quien llamó la función
  const projects = await Project.find({});
  return res.json(projects);
```
No es que la mayoría de funciones no tengan return — depende del rol de la función:
- Funciones que ORQUESTAN una acción (ej. handleForm de un componente) → no necesitan
  devolver nada, solo ejecutan
- Funciones de DATOS (controllers backend, funciones de API frontend) → sí devuelven
  un valor útil casi siempre
TODO pendiente: revisar `createProject` (en @/api/ProjectAPI) en próximo video para
confirmar el patrón de return con valor.

### React Query — useMutation (POST/PUT/DELETE) y useQuery (GET)
```
useQuery()      → LEER datos del servidor (GET)
useMutation()   → CAMBIAR datos en el servidor (POST/PUT/DELETE)
```
Antes (a mano, con useState):
```typescript
const handleForm = async (formData) => {
  const data = await createProject(formData);
  toast.success(data);
  navigate("/");
};
```
Con useMutation (React Query maneja loading/error/success):
```typescript
const { mutate } = useMutation({
  mutationFn: createProject,
  onError: (error) => toast.error(error.message),
  onSuccess: (data) => { toast.success(data); navigate("/"); },
});
const handleForm = async (formData) => mutate(formData);
```
`onError` sigue siendo necesario en CreateProjectView aunque hook-form ya filtre errores de
formulario — porque `mutate` puede fallar por otras razones (red caída, servidor caído,
validación de negocio del backend que el frontend no replica, ej. "nombre ya existe").
Errores de validación de FORMULARIO (hook-form) → nunca llegan a disparar mutate.
Errores de la PETICIÓN en sí (red/servidor) → sí llegan a onError.

Para useQuery (lectura, ej. listar proyectos):
```typescript
const { data, isLoading } = useQuery({
  queryKey: ['projects'],   // clave única — habilita cache automático
  queryFn: getProjects,
});
if (isLoading) return 'cargando...';
if (data) return (/* JSX */);
```
`if (data)` antes del return evita que TS se queje de `data` posiblemente undefined en el JSX
(alternativa: optional chaining `data?.length`, pero queda más repetitivo).
⚠️ Hueco detectado por Víctor: si `isLoading` es false Y `data` es undefined (ej. porque
`safeParse` de Zod falló silenciosamente en la función de API), el componente no retorna
nada — pantalla en blanco sin aviso. Probablemente se resuelve pronto con `isError` de useQuery.

### Manejo de errores en funciones de API — patrón repetido, con un hueco pendiente
```typescript
export async function createProject(formData: ProjectFormData) {
  try {
    const { data } = await api.post("/projects", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    // ⚠️ falta el else — si NO es error de axios con response (ej. error de
    // red puro, sin conexión), la función no hace throw ni return → undefined
    // silencioso, y ni onError ni onSuccess de la mutation se disparan
  }
}
```
Víctor detectó este mismo hueco de forma independiente en 2 funciones distintas
(createProject y getProjects) — buena señal de estar reconociendo un PATRÓN de error,
no solo instancias sueltas.

### Zod — schema para arrays (respuestas de listas, no solo objetos únicos)
```typescript
export const projectSchema = z.object({ _id: z.string(), projectName: z.string(), ... })

export const dashboardViewSchema = z.array(
  projectSchema.pick({ _id: true, projectName: true, clientName: true, description: true })
)
```
Un objeto único (`projectSchema`) no alcanza para validar una respuesta que es un ARRAY de
esos objetos — de ahí `z.array(...)`. El `.pick()` acá toma TODOS los campos (no filtra nada
hoy), pero deja explícito qué campos se esperan — útil si `projectSchema` crece después.
Uso en la función de API: `dashboardViewSchema.safeParse(data)` en vez de `.parse()` — devuelve
`{success, data}` o `{success, error}` para manejar el caso de fallo sin excepción no capturada.

### HeadlessUI — API deprecada (Menu.Button → MenuButton)
```typescript
// Deprecado (lo que trae el gist del profe, versión anterior de la librería)
import { Menu } from '@headlessui/react'
<Menu.Button>...</Menu.Button>
<Menu.Items><Menu.Item>...</Menu.Item></Menu.Items>

// Recomendado (versión actual)
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
<MenuButton>...</MenuButton>
<MenuItems><MenuItem>...</MenuItem></MenuItems>
```
Cómo detectarlo por cuenta propia: hover en VSCode sobre lo subrayado → el tooltip trae el
mensaje `@deprecated use <X> instead of <Y>` con la solución ya adentro. Si no alcanza:
doc oficial del proyecto (no blogs de terceros) + comparar versión instalada
(`npm list @headlessui/react`) contra la que muestra la doc. Víctor migró el código solo
tras esta explicación.

### TypeScript narrowing — `if` de guarda vs operador `!` (non-null assertion)
```typescript
const projectId = params.projectId        // tipo: string | undefined
// TS no marca error acá — la línea es consistente con ese tipo

const projectId = params.projectId!        // le MENTÍS a TS ("confiá en mí")
                                            // riesgo: si en runtime SÍ es undefined,
                                            // el error explota más adelante, más confuso

if (!projectId) return <p>No encontrado</p>  // ← mejor: TS hace NARROWING real
// después de este if, TS sabe con CERTEZA que projectId ya es string (no undefined)
// protección real en runtime, no solo una promesa al compilador
```
Verificado con hover en VSCode: antes del `if`, `projectId: string | undefined`;
después del `if`, `projectId: string` — sin necesidad del `!`.
Prueba práctica: no es fácil forzar projectId=undefined navegando la URL real, porque

**Mismo principio aplicado a `useQuery` (con 2 guardas, no 1) — bug real que rompió la app:**
```typescript
const { data, isLoading, isError } = useQuery({...})
console.log(data._id)          // 💥 rompe: en el primer render, data AÚN es undefined
                                //    (la consulta no terminó) — any no avisa del riesgo
if (isLoading) return 'Cargando...'
if (isError) return <Navigate to={'/404'}/>
console.log(data._id)          // ✅ seguro ACÁ — narrowing real: si isLoading y
                                //    isError ya son false, data tiene que existir
if (data) return <EditProjectForm data={data}/>
```
El orden de los `if` no es estético — es la secuencia de guardas que hace que, en la línea
de después, TS (y la realidad en runtime) coincidan en que `data` ya existe.

**Dos categorías distintas de "any" — por qué una se subraya en rojo y la otra no:**
```
any por CADENA DE TIPOS (ej. data de useQuery, heredado de axios sin genérico)
  → TS siguió el rastro y concluyó honestamente que es any — no es error,
    solo información imprecisa ("veneno silencioso", no rompe compilación)

any por PARÁMETRO SIN ANOTAR (ej. function EditProjectForm({ data }) sin type)
  → dispara noImplicitAny — TS en modo estricto exige que todo parámetro de
    función/componente tenga tipo explícito o inferible, no puede quedar "mudo"
```
Tipar un componente receptor (`EditProjectFormProps`) no "arregla" al emisor por magia —
lo que pasa es que TS, una vez que existe un contrato declarado, VERIFICA en cada lugar
donde se usa el componente que lo que se le pasa cumple ese contrato (mismo mecanismo que
`handleSubmit(handleForm)` — contrato declarado una vez, verificado en cada uso).

### 🐛 Bug pendiente — EditProjectForm no prellena el formulario
```typescript
export default function EditProjectForm({data}: EditProjectFormProps) {
  const initialValues: ProjectFormData = { projectName: "", clientName: "", description: "" };
  const { register, ... } = useForm({ defaultValues: initialValues });  // ❌ usa el objeto
                                                                          //    vacío, ignora "data"
```
`data` llega por props con los valores reales del proyecto, pero nunca se usa — el form de
"Editar" se muestra en blanco. Arreglo: `useForm({ defaultValues: data })` en vez del objeto
hardcodeado, y eliminar `initialValues`. Pendiente de aplicar (o ver si el profe lo resuelve
en el próximo video).

### ⚠️ TODO — tipo de la prop `data` en EditProjectForm (falta `_id` para el update futuro)
`EditProjectFormProps` usa `data: ProjectFormData` (sin `_id`, por diseño — pensado para
CREAR). Pero para editar hace falta el `_id` real del proyecto (confirmado con
`console.log(data._id)` en EditProjectView — el objeto real SÍ lo trae). Cuando llegue la
mutación de "Guardar Cambios" (`updateProject`), va a hacer falta mandar el `_id` a la API.
Solución identificada, sin aplicar todavía — cambiar el tipo a `Project` (que sí incluye
`_id`, viene de `z.infer<typeof projectSchema>`) en vez de `ProjectFormData`. Víctor decidió
esperar a ver cómo lo resuelve el curso antes de aplicar el cambio él mismo.
React Router no matchea la ruta si falta el segmento (`/projects/:projectId/edit` exige
algo en esa posición). Para probar el `if` en la práctica, se fuerza a mano en el código
(`const projectId = undefined`, temporal) — no navegando.

### Mapa de "capas de defensa" — quién protege qué (concepto consolidado por Víctor)
```
react-hook-form (frontend)     → protege la UX (feedback rápido, no repite tipeo)
express-validator (backend)    → protege la API — la barrera REAL contra cualquier
                                   cliente (no solo React — también curl/Postman)
Controller + Mongoose (backend)→ protege la BASE DE DATOS (qué se guarda y cómo)
Zod (frontend, en las func.    → protege la PROPIA UI — que lo que la API devuelve
  de API tipo getProjects)        no rompa el render si el backend cambia o falla
```
Ninguna capa sola alcanza — es "defensa en profundidad", cada una con propósito distinto.

### ⚠️ Alerta activa — Tailwind v3
El profe usa Tailwind CSS **v3** (no v4, que es la versión actual en la doc oficial de
tailwindcss.com a julio 2026) porque comparte componentes de librerías compatibles con v3.
Posible fuente de conflictos más adelante si se sigue la documentación oficial actual sin
verificar la versión.

### Patrones de diseño CSS/Tailwind — nombrar el "por qué", no solo la clase
Víctor conoce y ya aplicó estos patrones antes, pero pidió reconectar el VOCABULARIO/CONCEPTO
con el código — no solo ver la clase de Tailwind sino entender la intención de diseño detrás.
Aplicar esto durante todo el resto del curso frontend.

**1. Full-bleed + Contenido limitado** (confirmado ya en AppLayout)
```html
<header className="bg-gray-800">              ← fondo va de borde a borde
  <div className="max-w-screen-2xl mx-auto">  ← contenido limitado y centrado
</header>
```
Regla: el FONDO puede ir de punta a punta, el CONTENIDO (texto/botones/forms) siempre
va limitado — de lo contrario es incómodo de leer en pantallas anchas.

**2. Stack vertical con espaciado** → `flex-col` + `gap-*` o `space-y-*`
**3. Grid de tarjetas** → `grid grid-cols-*` + `gap-*` (galerías, dashboards)
**4. Flex entre dos puntos** → `flex justify-between` (logo izq, botón der — ya usado)
**5. Centrado total** → `flex items-center justify-center` (logins, modales, loaders)

### Repaso de contenedores centrados (ejercicio practicado y resuelto)
```html
<div className="max-w-screen-2xl mx-auto p-5">
  <h1>Mi título</h1>
</div>
```
- `max-w-screen-2xl` = 1536px, ancho máximo del contenedor
- `mx-auto` = margin-inline: auto — reparte el espacio sobrante en partes iguales a los lados
- `p-5` = padding interno para que el contenido no toque los bordes del propio contenedor
- Confirmado con DevTools: por debajo de 1536px de viewport no se nota el efecto (por eso
  no se veía en la laptop de Víctor) — recién se nota claramente con anchos grandes (2200px+)

---

## ⚠️ Errores comunes a recordar
- `.env` al mismo nivel que `package.json`
- `required: true` no `require: true` en Schema
- `dotenv.config()` siempre antes de `process.env`
- `export default` → sin llaves | `export const` → con llaves
- El `return` en `res.status(404)` es obligatorio
- No pasar `req.body` directo a `findByIdAndUpdate`
- Dos `res.send()` en el mismo handler rompe la app
- Bug de Postman: guardar requests antes de cambiar de pestaña
- `Promise.allSettled` no va al catch si falla
- ObjectId vs String: usar `.toString()` para comparar
- Borrar y recrear data de prueba cuando cambia el Schema
- Node.js debe cumplir la versión mínima que pide Vite/paquetes modernos — verificar con `node -v`
  antes de reportar un bug como "raro"; puede ser incompatibilidad de versión
- `ignore-scripts=true` global rompe paquetes que necesitan compilar binarios nativos (ej. Rolldown)
  — no usar como config global, evaluar caso por caso
- En PowerShell usar `Remove-Item -Recurse -Force` en vez de `rmdir /s /q` (sintaxis de CMD)
- TODO pendiente: typo `max-auto` en vez de `mx-auto` en el `<section>` de AppLayout.tsx —
  no rompe nada visualmente (Tailwind ignora clases no reconocidas) pero el section no queda
  centrado como el header. Corregir cuando se retome ese archivo.
- MongoDB Atlas: al cambiar de red, la IP pública cambia y hay que re-agregarla en
  Network Access — o usar `0.0.0.0/0` (Allow Access from Anywhere) una sola vez para
  desarrollo y no repetir el paso nunca más
- Error `querySrv ECONNREFUSED` con `mongodb+srv://`: puede fallar en ciertas redes
  (confirmado con datos móviles) aunque el DNS general y el puerto 27017 funcionen bien
  (verificado con `nslookup -type=SRV` y `Test-NetConnection -Port 27017`). Solución:
  cambiar a formato `mongodb://` con los 3 hosts del cluster explícitos + `replicaSet`
  (se obtiene en Atlas → Connect → Drivers, NO el que aparece por defecto para Compass)
- El `DATABASE_URL` en formato estándar (no SRV) NO depende de la red — no hay que
  volver a cambiarlo si se recupera el wifi; solo la whitelist de IP sí hay que re-chequear
- Git — "repos anidados" / submódulos fantasma: si varias carpetas con su propio
  `git init` (ej. backend y frontend creados por separado) se juntan después bajo una
  carpeta madre que TAMBIÉN tiene su propio `git init`, Git no fusiona nada — trata cada
  subcarpeta como un SUBMÓDULO (una sola entrada especial, no archivos individuales).
  Síntoma para detectarlo: `git status` muestra la carpeta entera en una sola línea
  (`new file: carpeta` o `modified: carpeta`) en vez de listar sus archivos uno por uno.
  Arreglo en 2 pasos por cada subcarpeta afectada:
  1. Borrar la carpeta `.git` oculta de adentro de la subcarpeta
  2. `git rm --cached <carpeta>` + `git add <carpeta>` (saca la referencia vieja de
     submódulo del índice y vuelve a agregar todo como archivos normales)
  PREVENCIÓN: si se va a unir varios repos existentes bajo una carpeta madre, eliminar
  el `.git` de cada subrepo ANTES de (o apenas al) integrarlos — no esperar a que el
  problema aparezca. Ojo con herramientas que auto-inicializan git (ej. algunos
  scaffolding tools como `npm create vite@latest` en ciertas configuraciones)

---

## 📊 Historial de sesiones

### Resumen condensado — sesiones 29/06 al 09/07/2026 (backend, Secciones 27-28)
- 29/06 a 09/07: completado el CRUD completo de Proyectos y Tareas (backend). Buen patrón
  sostenido: retención 24h casi siempre ✅, autonomía alta (4-5/5 la mayoría de sesiones),
  fuerte hábito de probar empíricamente en Postman antes de asumir que algo funciona.
- Momentos destacados: detectó solo una inconsistencia ObjectId/String en Compass; detectó
  y corrigió un bug de seguridad real (updateTaskStatus sin validar project/task) probándolo
  en Postman antes de confirmar; confirmó con captura de Udemy el cierre de Sección 28 (19/19)
  y corrigió al tutor sobre numeración desalineada de videos.
- 09/07: arranca Frontend (Sección 29) — Vite + Tailwind + React Router.
- 10/07: incidente técnico mayor — Vite 8 (bundler Rolldown en Rust) + Node desactualizado
  (v22.11.0) rompieron `npm run dev`. El tutor cometió un error (sugirió `ignore-scripts=true`
  sin prever que rompería binarios nativos). Víctor cuestionó activamente pidiendo evidencia,
  lo cual llevó a la causa raíz real. Solución: Node v24.18.0 LTS + reinstalación limpia.
  Encontró y corrigió solo el bug de `return` faltante en Router.tsx.

### Sesión 13/07/2026 — REPASO DE CSS/TAILWIND, PATRONES DE DISEÑO
- Estilos de AppLayout + componente Logo separado (reutilización, mismo principio que middlewares)
- Buena sesión de repaso conceptual de Tailwind: identificó correctamente `max-w-screen-2xl` como
  pieza clave del patrón de contenedor centrado, resolvió un mini-ejercicio de memoria (con 1 typo
  menor: `max-auto` en vez de `mx-auto`, autocorregido)
- Verificó el concepto con DevTools real (Chrome, modo responsive, viewport 1600px vs 1536px
  breakpoint) — buena metodología de verificación empírica, no solo teórica
- Descubrió por cuenta propia el patrón "Full-bleed + Contenido limitado" (header toca bordes,
  contenido interno limitado) y pidió que el tutor nombre explícitamente el "por qué" de patrones
  de diseño CSS a lo largo del resto del curso, no solo mostrar la clase de Tailwind
- Contexto: Víctor usa capturas de pantalla de la app funcionando como referencia visual tipo
  "mockup/Figma", reflexionando sobre el flujo de trabajo tradicional (diseño → implementación)
  vs el futuro con IA — buena consciencia metacognitiva sobre su propio proceso de aprendizaje

### Sesión 13/07/2026 (continuación) — PATH ALIASES + HEADLESSUI
- Videos: 4 en total esta sesión (repaso CSS + path aliases + HeadlessUI/NavMenu)
- Configuró path aliases (@/) correctamente en tsconfig.app.json + vite.config.ts, resolvió
  desajuste de nombre de carpeta (componentes → components) y warning de baseUrl deprecado
  por cuenta propia con guía puntual del tutor
- Instaló y aplicó HeadlessUI + Heroicons para NavMenu (patrón Popover + Transition)
- Buen ritmo — 4 videos en una sesión con troubleshooting real incluido
- TODO pendiente identificado: typo `max-auto` sin corregir en AppLayout (cosmético, no bloqueante)

### Sesión 24/07/2026 — TROUBLESHOOTING SERIO DE MONGODB + REPASO PROFUNDO DE REACT
- Contexto: repasó proyecto anterior (Productos, con Data APIs de react-router-dom) para
  comparar con el enfoque actual (react-hook-form) — buena práctica de estudio comparativo
- Preguntas de calidad sobre flujo de datos: cómo `<Form>` nativo captura inputs sin props
  (resuelto), por qué usar Zod como fuente de types en vez de type plano (razonamiento propio
  correcto, solo confirmado por el tutor), cuestionamiento genuino sobre si react-hook-form
  "vale la pena" para validaciones simples (respuesta honesta: no se ve el poder real todavía
  en un form de 3 campos)
- INCIDENTE TÉCNICO MAYOR — MongoDB `querySrv ECONNREFUSED` tras cambiar de wifi a datos
  móviles. Troubleshooting sistemático y metódico:
  1. Confirmó cluster activo en Atlas (descartó causa "cluster pausado")
  2. Detectó 46 IPs acumuladas en whitelist — sospechó (correctamente) que no las había
     agregado manualmente todas, buena señal de pensamiento crítico sobre seguridad
  3. Agregó su IP actual — no resolvió el problema solo
  4. Verificó con `nslookup -type=SRV` — DNS resolvía bien (descartó causa DNS general)
  5. Verificó con `Test-NetConnection -Port 27017` — puerto SÍ conectaba (descartó bloqueo
     de puerto por el operador móvil)
  6. Tutor probó fix de `dns.setDefaultResultOrder('ipv4first')` — no funcionó
  7. Solución final: cambiar de `mongodb+srv://` a `mongodb://` con hosts explícitos +
     replicaSet (obtenido de Atlas → Connect → Drivers) — funcionó
  8. Víctor preguntó por su cuenta si igual hacía falta la whitelist (sí, son dos arreglos
     independientes) — buena consolidación del incidente completo
- Escribió su propio resumen técnico de causa/solución para comentarios del proyecto
- Retomó la duda de frontend vs backend validation (ya la tenía clara, solo confirmó)
- Buena sesión de pensamiento crítico sobre `return`: notó que "casi nunca hay return" en
  handleForm y generalizó de más — el tutor afinó la distinción entre return-para-cortar-flujo
  vs return-para-entregar-valor. Víctor aceptó el ajuste sin resistencia
- TODO pendiente explícito: revisar `createProject` en @/api/ProjectAPI en próximo video

### Sesión 27-28/07/2026 — CORS, react-toastify, y TROUBLESHOOTING DE GIT (submódulos)
- Video 472 completado: CORS configurado (config/cors.ts + server.ts), confirmó por su
  cuenta que CORS solo protege navegadores, no curl/Postman/scripts — buena consolidación
  de un concepto visto hace semanas. Preguntó por función de origin flexible (patrones tipo
  `.endsWith('.vercel.app')`) para múltiples frontends dinámicos — entendido correctamente
- react-toastify: implementó ToastContainer en AppLayout + toast.success(data) en handleForm.
  Bug real encontrado y resuelto por Víctor mismo (Toast con mayúscula en vez de toast).
  Buena pregunta de fondo sobre documentación desactualizada — confirmado con búsqueda web
  que v11 de la librería ya no requiere el import de CSS (versiones previas sí) — la duda
  de "cómo lo detecto yo sin IA" se resolvió con: leer CHANGELOG del repo, comparar versión
  instalada vs versión de la doc consultada, revisar README del repo oficial en vez de blogs
- Aclarada diferencia parámetro (definición) vs argumento (valor real pasado al llamar)
- INCIDENTE TÉCNICO — Git, repos anidados/submódulos fantasma: al unificar backend y
  frontend (cada uno con su propio `git init` desde que se crearon por separado) bajo una
  carpeta madre con su propio repo, Git los trató como submódulos en vez de carpetas
  normales. Troubleshooting en capas:
  1. Borrado de `.git` interno en backend y frontend (uno de los dos falló en el primer
     intento por sintaxis de PowerShell — comandos pegados sin salto de línea real)
  2. Detectado el problema real vía `git check-ignore` fallando con "is in submodule"
  3. Resuelto con `git rm --cached <carpeta>` + `git add <carpeta>` en ambas carpetas
  4. Verificación explícita de que .env y .env.local quedaban ignorados correctamente
     ANTES de hacer push — buena disciplina de seguridad, iniciativa propia de Víctor
  5. Commit y push final exitoso, ambas carpetas ya como archivos normales del repo madre
- Reflexión final de Víctor: por norma arranca sus proyectos con git desde el día 1 para
  practicar — la lección que se lleva es que al unir varios repos existentes bajo una
  carpeta madre, hay que eliminar el `.git` de cada subrepo ANTES de integrarlos

### Sesión 28/07/2026 (parte 2) — useMutation, useQuery, Zod arrays, HeadlessUI, narrowing TS
- Videos 478-481: useMutation en CreateProjectView (reemplaza el handleForm manual anterior),
  useQuery en DashboardView (listar proyectos), Zod con z.array() para validar la respuesta de
  la API (dashboardViewSchema), migración de HeadlessUI a la API no deprecada, EditProjectView
  con useParams()
- Detectó por cuenta propia el mismo "hueco" de manejo de errores (falta else) en 2 funciones
  distintas de ProjectAPI.ts — buena señal de reconocer un patrón, no solo casos sueltos
- Buena secuencia de preguntas sobre por qué handleSubmit "no se ve" llamando a handleForm
  (closures/funciones que devuelven funciones) — se resolvió con precisión. Corrigió su propia
  nota vieja ("handleForm es función de validación" → no, la validación la hace hook-form)
- Exploración sólida de TypeScript narrowing: diferencia entre `!` (promesa al compilador) y
  `if` de guarda (narrowing real), verificado con hover en VSCode. Intentó forzar el error
  navegando una URL manualmente — buen instinto "hacker" — descubrió por sí mismo que React
  Router no matchea la ruta sin el segmento, conectándolo con validación en capas
- Cerró con síntesis propia sólida: mapa de "capas de defensa" (hook-form → UX,
  express-validator → seguridad real de API, Controller+Mongoose → DB, Zod frontend →
  protección de la propia UI)
- Paréntesis filosófico largo sobre IA y programación: abstracción como patrón histórico
  (repetitivo → librería → a veces lenguaje), especulación sobre IAs con representaciones
  internas opacas entre sí (con precedente real citado: experimentos de negociación entre
  agentes de Meta/OpenAI que derivaron en "inglés" no legible). Cerró conectando su método de
  aprendizaje (lento pero profundo) con la meta de dirigir herramientas de IA a futuro
- Revisó notas.txt del curso — feedback dado: buen hábito documentando dudas y "por qués",
  sugerido comprimir respuestas pegadas textuales a síntesis de 1-2 líneas para repasos rápidos

### Sesión 28/07/2026 (parte 3) — EditProjectForm: bug de prellenado + mecánica fina de TS
- Video: conectó EditProjectView con useQuery + editProjectById; armó EditProjectForm
- BUG detectado por el tutor: EditProjectForm recibe `data` por props pero usa un
  `initialValues` hardcodeado vacío en su lugar — el form de "Editar" no se prellena.
  Pendiente de aplicar el fix (`defaultValues: data`)
- Buena secuencia de preguntas encadenadas sobre mecánica de TypeScript, cada una más precisa
  que la anterior:
  1. Por qué tipar `EditProjectFormProps` "arregla" el error en el componente que lo llama
     (mecanismo real: no es magia, es que recién ahí existe un contrato que TS verifica en
     cada uso — mismo principio que handleSubmit(handleForm))
  2. Por qué `data` en EditProjectView (any por herencia de axios) no se subraya en rojo,
     pero sí se subrayaba en EditProjectForm sin tipar (any por parámetro sin anotar,
     dispara noImplicitAny) — distinción entre las dos categorías de "any"
  3. Escribió un comentario propio resumiendo el mecanismo — quedó prácticamente perfecto,
     solo un matiz de precisión ajustado (parámetros no tipados NI inferibles, no "siempre")
- Bug real de runtime (no de TS): `console.log(data._id)` puesto ANTES de `if(isLoading)` /
  `if(isError)` rompía la app (`Cannot read properties of undefined`) — data aún no existe en
  el primer render. Mismo principio de narrowing que projectId, pero con 2 guardas en cadena
  en vez de 1. Buena autoverificación: Víctor probó esto empíricamente antes de preguntar
- TODO identificado y NO resuelto a propósito: `EditProjectFormProps.data` está tipado como
  `ProjectFormData` (sin `_id`), pero `data._id` sí existe en el objeto real y hace falta para
  la futura mutación de update. Solución identificada (cambiar a `Project`, que sí incluye
  `_id`) — Víctor decidió esperar a ver si el curso lo resuelve antes de aplicar el cambio

---

*Última actualización: Sesión del 28/07/2026 — CRUD frontend completo hasta Editar (formulario con bug de prellenado pendiente). Consolidado narrowing de TypeScript, categorías de any, y mapa de capas de defensa.*