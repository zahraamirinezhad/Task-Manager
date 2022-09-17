import Task from '../Task/Task'
import classes from './Home.module.scss'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { taskActions } from '../../store/index.js'
import { Search, EventNote } from '@mui/icons-material'

const Home = () => {
  const dispatch = useDispatch()
  const tasks = useSelector((state) => state.task.tasks)
  const tasksNum = useSelector((state) => state.task.tasksNum)

  const title = useRef()
  const details = useRef()

  const [searchedTask, setSearchedTask] = useState('')

  const addTaskHandler = () => {
    if (title.current.value !== '' && details.current.value !== '') {
      let newDate = new Date()
      let day =
        newDate.getDate() >= 10 ? newDate.getDate() : '0' + newDate.getDate()
      let month =
        newDate.getMonth() + 1 >= 10
          ? newDate.getMonth() + 1
          : '0' + (newDate.getMonth() + 1)
      let year = newDate.getFullYear()
      let hour = newDate.getHours()
      let min =
        newDate.getMinutes() >= 10
          ? newDate.getMinutes()
          : '0' + newDate.getMinutes()
      let sec =
        newDate.getSeconds() >= 10
          ? newDate.getSeconds()
          : '0' + newDate.getSeconds()

      dispatch(
        taskActions.addTask({
          id: title.current.value.replaceAll(/\s/g, ''),
          title: title.current.value,
          date: {
            day: day,
            month: month,
            year: year,
            hour: hour,
            minutes: min,
            seconds: sec,
          },
          details: details.current.value,
        }),
      )
    }
  }

  const searchHandler = (e) => {
    setSearchedTask(e.target.value.toLowerCase())
  }

  return (
    <div className={`${classes.home} ${classes.shadow}`}>
      <h1 className={classes.gradient_text}>Task Manager</h1>
      <div className={`${classes.task_data} ${classes.shadow}`}>
        <input
          className={`${classes.data} ${classes.task_title}  ${classes.inner_shadow}`}
          type="text"
          placeholder="Title"
          ref={title}
        />
        <textarea
          className={`${classes.data} ${classes.task_details}  ${classes.inner_shadow}`}
          placeholder="Details"
          ref={details}
        />
      </div>

      <button className={classes.add_task} onClick={addTaskHandler}>
        Add Task
      </button>

      <div className={classes.taskNum}>
        <div>
          <EventNote />
          {`${tasksNum} Task${tasksNum > 1 ? 's' : ''} Available`}
        </div>

        <div>
          <Search className={classes.search_icon} />
          <input
            className={classes.search_bar}
            type="text"
            placeholder="Task Title"
            onKeyUp={searchHandler}
          />
        </div>
      </div>

      <div className={classes.task_list}>
        <ul>
          {tasksNum !== 0 ? (
            tasks.map((item) =>
              searchedTask === '' ? (
                <Task
                  key={item.id}
                  title={item.title}
                  date={item.date}
                  details={item.details}
                />
              ) : (
                item.title.toLowerCase().includes(searchedTask) && (
                  <Task
                    key={item.id}
                    title={item.title}
                    date={item.date}
                    details={item.details}
                  />
                )
              ),
            )
          ) : (
            <li>No Task Here</li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Home
