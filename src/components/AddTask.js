import { useState } from "react"


const AddTask = (props) => {
    const [text,setText]=useState('')
    const [day,setDay]=useState('')
    const [reminder,setReminder]=useState(false)
    const onSubmit = (e) =>{
        e.preventDefault()

        if(!text){
          alert('Please add a text') 
          return 
        }

        props.onAdd({text,day,reminder})

        setText('')
        setDay('')
        setReminder(false)

    }
   return (
    <form className='add-form' onSubmit={onSubmit}>
        <div className='form-control'>
            <label>Task</label>
            <input type='text' placeholder='Add Task' value={text} onChange={(e)=>setText(e.target.value)}/> {/* text is the initial state and on typing something the set state is called and the values are updated */}
        </div>
        <div className='form-control'>
            <label>Day and Time</label>
            <input type='text' placeholder='Add Day and Time' value={day} onChange={(e)=>setDay(e.target.value)}/>
        </div>
        <div className='form-control form-control-check'>
            <label>Set Reminder</label>
            <input type='checkbox' checked={reminder}  onChange={(e)=>setReminder(e.currentTarget.checked)}/>
        </div>{/*checked is used to control the checked state of checkboxes and radio buttons, while value is used to set the initial value and capture the current value of input elements like text fields. */}
        <input type='submit' value='Save Task' className='btn btn-block' />
    </form>
  )
}

export default AddTask