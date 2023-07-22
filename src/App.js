//In summary, useState is used to manage and update the state within a component, while useEffect is used to perform side effects and interact with the browser environment. They serve different purposes but are often used together to create dynamic and interactive React components.
/*useState:

useState is a hook that allows you to add state to a functional component.
It returns a state variable and a function to update that variable.
You typically use it to manage and update the state of a specific value within a component.
Example usage: const [count, setCount] = useState(0);
In the example above, count is the state variable, and setCount is the function to update count.
useEffect:

useEffect is a hook that enables you to perform side effects in a functional component.
It runs after every render of the component.
You can use it to execute code that interacts with the browser (e.g., fetching data, subscribing to events, manipulating the DOM, etc.).
The callback function passed to useEffect is executed after the component renders, and the dependencies in the dependency array change.
If the dependency array is empty ([]), the effect only runs once, after the initial render.
If the dependency array is not provided, the effect runs after every render.*/

import React, { useEffect } from 'react'; //required if we are using class based components.
import {useState} from 'react'
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Footer from './components/Footer';
import AddTask from './components/AddTask';
import About from './About';
import Tasks from './components/Tasks';
/*class App extends React.Component{  //This is a class based component. But react has been updated and we dont need class based components rather we use functions with hooks.
  render(){
    return <h1>Hello</h1>
  }
}*/
import Header from './components/Header';
//React uses a syntax extension of JavaScript called JSX (JavaScript XML) for defining components. JSX allows you to write HTML-like code within JavaScript, making it easier to describe the structure and rendering of user interfaces. JSX is then transformed into regular JavaScript code during the build process, using tools like Babel.
//In the above code, the MyComponent function is a JavaScript function that returns JSX code within parentheses. The JSX code resembles HTML but is embedded within JavaScript.
//It's important to note that while React uses JavaScript and JSX, it also introduces its own concepts and APIs for managing component state, handling events, and rendering UI. React components are typically written as classes or functional components that extend or utilize React's APIs.
//So, to summarize, React syntax is primarily based on JavaScript, and JSX is a JavaScript extension used for defining components in a more declarative manner.
function App() {
  const [showAddTask,setShowAddTask]=useState(false)
  const[tasks,setTasks]=useState([])
//The useEffect hook is used to perform side effects in a React component. It takes two arguments: a callback function and a dependencies array.
//The callback function passed to useEffect is executed after the component renders and whenever the dependencies in the dependencies array change. If the dependencies array is empty ([]), the effect only runs once, after the initial render.

//By providing an empty dependency array ([]), you are telling React that the effect doesn't depend on any values from the component's state or props. Therefore, it only needs to run once, after the initial render.
//This is commonly used when you want to perform an action that doesn't depend on any specific values and should only be executed once, such as fetching data on component mount or setting up event listeners.  
useEffect(()=>{
    const getTasks=async()=> {
      const tasksFromServer=await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  },[])
  //Fetch Tasks
const fetchTasks=async ()=>{
  const res =await fetch('http://localhost:5000/tasks')
  const data=await res.json()
  return data
}
//Fetch Task
const fetchTask =async (id)=>{
  const res =await fetch(`http://localhost:5000/tasks/${id}`)
  const data=await res.json()
  return data
}


//Add Task
 const addTask=async (task)=>{
  const res=await fetch('http://localhost:5000/tasks',{method:'POST',headers:{
    'Content-type':'application/json'
  },body:JSON.stringify(task)}) //The headers object is provided to specify the 'Content-type' as 'application/json'. This indicates that the request body is in JSON format.
  //The body property is set to JSON.stringify(task) to convert the task object into a JSON string to be sent in the request body.

  const data=await res.json()
  setTasks([...tasks,data])
 // const id=Math.floor(Math.random()*10000)+1
 // const newTask={id,...task}  
{/* The spread operator (...) is used to create a new object by copying the properties of task into the new object, and then the id property is added.*/}
  //setTasks([...tasks,newTask])
 }

//Delete Task
 const deleteTask=async (id)=>{
  await fetch(`http://localhost:5000/tasks/${id}`,{method:'DELETE',})
  setTasks(tasks.filter((task)=>task.id !==id))
 } //The use of the useEffect hook would typically be necessary in scenarios where you need to perform additional actions or side effects after the state update, such as refetching data from the server or updating other parts of the component's logic in response to the state change.

 //Toggle Reminder 
 const toggleReminder = async (id) => {
  const taskToToggle = await fetchTask(id)
  const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(updTask),
  })

  const data = await res.json()

  setTasks(
    tasks.map((task) =>
      task.id === id ? { ...task, reminder: data.reminder } : task
    )
  )
}
  const name='Sai' // these are then accessed inside the div with {} eg: {name} we can also perform {1+1}, ternary operations {x ?'Yes':'No'}
  return (//JSX can return only a single parent all the code has to be inside the div
  <Router>
  <div className='container'>
    <Header
      onAdd={() => setShowAddTask(!showAddTask)}
      showAdd={showAddTask}
    />
    <Routes>
      <Route
        path='/'
        element={
          <>
            {showAddTask && <AddTask onAdd={addTask} />}
            {tasks.length > 0 ? (
              <Tasks
                tasks={tasks}
                onDelete={deleteTask}
                onToggle={toggleReminder}
              />
            ) : (
              'No Tasks To Show'
            )}
          </>
        }
      />

      <Route path='/about' element={<About />} />
    </Routes>
    <Footer />
  </div>
</Router>
  );
}

export default App;
