import classes from './TaskDetails.module.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import { taskActions } from '../../store/index.js'
import { useSelector, useDispatch } from 'react-redux'
import { Home } from '@mui/icons-material'
import { useRef } from 'react'

const TaskDetails = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const editedDetails = useRef()

  const taskID = location.pathname.substring(
    location.pathname.lastIndexOf('/') + 1,
  )
  const tasks = useSelector((state) => state.task.tasks)
  const existingItem = tasks.find((item) => item.id === taskID)
  const Title = existingItem.title
  const TaskDate = existingItem.date
  const Details = existingItem.details

  const goHomeHandler = () => {
    navigate('/')
  }

  const editTaskHandler = () => {
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

    console.log(editedDetails.current.value)

    dispatch(
      taskActions.editTask({
        id: taskID,
        title: Title,
        date: {
          day: day,
          month: month,
          year: year,
          hour: hour,
          minutes: min,
          seconds: sec,
        },
        details: editedDetails.current.value,
      }),
    )
  }

  return (
    <div className={`${classes.taskDetails} ${classes.shadow}`}>
      <div className={classes.options}>
        <button onClick={goHomeHandler}>
          <Home />
        </button>
      </div>
      <h1 className={`${classes.gradient_text} ${classes.title}`}>{Title}</h1>
      <p
        className={classes.date}
      >{`${TaskDate.day} / ${TaskDate.month} / ${TaskDate.year} | ${TaskDate.hour} : ${TaskDate.minutes} : ${TaskDate.seconds}`}</p>
      <textarea
        className={`${classes.details} ${classes.inner_shadow}`}
        onChange={editTaskHandler}
        ref={editedDetails}
        value={Details}
      />
    </div>
  )
}

export default TaskDetails
