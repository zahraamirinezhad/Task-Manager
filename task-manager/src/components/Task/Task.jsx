import classes from './Task.module.scss'
import { useDispatch } from 'react-redux/es/exports'
import { taskActions } from '../../store/index.js'
import { Link } from 'react-router-dom'

const Task = ({ title, date, details }) => {
  const dispatch = useDispatch()

  const deleteTaskHandler = () => {
    dispatch(
      taskActions.deleteTask({
        title: title,
      }),
    )
  }

  return (
    <li>
      <Link to={`task/${title.replaceAll(/\s/g, '')}`}>
        <div className={classes.task}>
          <h1 className={classes.title}>{title}</h1>
          <p>{`${date.day} / ${date.month} / ${date.year} | ${date.hour} : ${date.minutes} : ${date.seconds}`}</p>
          <p className={classes.details}>{details.substring(0, 60) + ' ...'}</p>
          <button className={classes.remove} onClick={deleteTaskHandler}>
            x
          </button>
        </div>
      </Link>
    </li>
  )
}

export default Task
