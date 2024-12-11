import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import TaskCard from './components/TaskCard';
import DeleteModal from './components/DeleteModal';

function App() {
  const [tasks, setTasks] = useState();
  const [inputTask, setInputTask] = useState({
    "name": "",
    "is_checked": false,
    "created_at": new Date()
  });
  const [isDataUpdated, setIsDataUpdated] = useState(true);
  const [taskData, setTaskData] = useState(null);

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/todos?_sort=-is_checked,-created_at');
      setTasks(data);
      setIsDataUpdated(true);
    } catch (error) {
      console.log(error);
    } finally {

    }
  }

  const addTask = async () => {
    try {
      await axios.post("http://localhost:3000/todos", inputTask);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTasks()
  }, []);

  useEffect(() => {
    fetchTasks()
  }, [isDataUpdated]);

  return (
    <>
      <div className='container'>
        <div className='w-full flex flex-col gap-2 items-center mt-8'>

          {/* form input task */}
          <form className='w-64 flex gap-2 mb-6' onSubmit={() => addTask()}>
            <input onChange={(e) => setInputTask({ ...inputTask, name: e.target.value })} className='py-2 px-4 w-full border-2 border-black focus:outline-none focus:bg-[#eee] peer' />
            <button className='py-2 px-4 border-2 border-black hover:bg-black/50 hover:text-white active:bg-white active:text-black peer-focus:bg-black peer-focus:hover:bg-black/50 peer-focus:text-white'>+</button>
          </form>
          {/* end form input task */}

          {/* task list */}
          {
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
