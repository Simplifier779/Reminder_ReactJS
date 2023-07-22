import Task from './Task'

const Tasks = (props) => {
    
  return (
    <>{/*tasks is an array of objects representing individual tasks. Each task object has properties like id and text.
The map function is called on the tasks array. It iterates over each task in the array and returns a new array of <h3> elements. The key prop is set to task.id. It helps React efficiently update and reconcile the rendered elements when the array changes. Each key should be unique within the array.
The resulting array of <h3> elements is rendered within the parent component's(h3) JSX.*/}
    {props.tasks.map((task)=>(<Task key={task.id} task={task} onDelete={props.onDelete} onToggle={props.onToggle}/>))}
    </>
  )
}

export default Tasks