import { useEffect, useState } from 'react'
import './App.css'
import TaskCard from './components/TaskCard';
import { LoadingTaskCard } from './components/TaskCard';
import DeleteModal from './components/DeleteModal';
import server from '../utils/axios';


function App() {
  const [tasks, setTasks] = useState();
  const [inputTask, setInputTask] = useState({
    "name": "",
    "is_checked": false,
    "created_at": new Date()
  });
  const [isDataUpdated, setIsDataUpdated] = useState(true);
  const [taskData, setTaskData] = useState(null);
  const [tasksDone, setTasksDone] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const { data } = await server.get('/todos?_sort=-is_checked,-created_at');
      setTasks(data);

      const doneList = data?.filter((task) => { return task.is_checked });
      setTasksDone(doneList);

      setIsDataUpdated(true);
    } catch (error) {
      console.log(error);
    }
  }

  const addTask = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await server.post("/todos", inputTask);
      document.getElementById('add-input').value = '';
      setIsDataUpdated(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchTasks()
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchTasks()
  }, [isDataUpdated]);

  return (
    <>
      <div className='py-6 flex gap-2 items-center justify-center'>
        <span>
          <svg fill='rgb(30 64 175)' height={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            {/* <!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
            <path d="M192 0c-41.8 0-77.4 26.7-90.5 64L64 64C28.7 64 0 92.7 0 128L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64l-37.5 0C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM72 272a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm104-16l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zM72 368a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm88 0c0-8.8 7.2-16 16-16l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16z" />
          </svg>
        </span>
        <span className='text-2xl font-bold text-blue-800'>Todo App</span>
      </div>

      <div className='w-full flex flex-col gap-2 items-center'>

        <div className='p-8 bg-white shadow-lg'>
          {/* counter */}
          <div className='py-4 px-4 flex justify-between items-center rounded-lg bg-gradient-to-r from-purple-700/70 to-blue-500/60'>
            <div>
              <h1 className='text-xl text-white/90 font-bold'>Task Done</h1>
              <h3 className='text-white/75'>Keep it up</h3>
            </div>
            <div className='w-16 h-16 border-2 border-white rounded-full flex items-center justify-center text-white font-bold'>
              {tasksDone?.length} / {tasks?.length}
            </div>
          </div>
          {/* end counter */}

          {/* form input task */}
          <form className='flex my-6' onSubmit={(e) => addTask(e)}>
            <input id='add-input' autoFocus onChange={(e) => setInputTask({ ...inputTask, name: e.target.value })} placeholder='Task to do...' className='py-2 px-4 w-full border border-r-0 border-blue-600/50 rounded-l-lg focus:outline-none focus:bg-slate-100 peer' />
            <button className='py-2 px-4 rounded-r-lg bg-blue-600/80 text-white hover:bg-blue-800/90 hover:text-white active:bg-blue-600/80 peer-focus:bg-blue-600/70 peer-focus:hover:bg-black/90 peer-focus:text-white'>+</button>
          </form>
          {/* end form input task */}

          {/* task list */}
          {
            isLoading ? <LoadingTaskCard /> :
              tasks?.map((task) => {
                return <TaskCard key={task.id} data={task} setIsDataUpdated={setIsDataUpdated} setTaskData={setTaskData} />
              })
          }
          {/* end task list */}
        </div>
      </div>

      <DeleteModal data={taskData} setIsDataUpdated={setIsDataUpdated} />
    </>
  )
}

export default App
