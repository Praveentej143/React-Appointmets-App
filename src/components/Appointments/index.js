// Write your code here
import {Component} from 'react'
import {format} from 'date-fns'
import {v4} from 'uuid'
import './index.css'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentsList: [],
    isFilterActive: false,
  }

  onFormSubmit = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  toggleStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(each => {
        if (each.id === id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  getFilterdResult = () => {
    const {appointmentsList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentsList.filter(each => each.isStarred === true)
    }
    return appointmentsList
  }

  onRenderAppointment = () => {
    const {appointmentsList} = this.state

    const filteredCompList = this.getFilterdResult()

    return filteredCompList.map(eachAppointment => (
      <AppointmentItem
        appointmentDetails={eachAppointment}
        key={eachAppointment.id}
        toggleStarred={this.toggleStarred}
      />
    ))
  }

  onFilter = () => {
    const {isFilterActive} = this.state
    this.setState({isFilterActive: !isFilterActive})
  }

  onTitleInputChange = event => {
    this.setState({titleInput: event.target.value})
  }

  onDateChange = event => {
    this.setState({
      dateInput: event.target.value,
    })
  }

  render() {
    const {titleInput, dateInput, appointmentsList, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-active' : 'filter-btn'

    return (
      <>
        <div className="app-container">
          <div className="card-container">
            <h1 className="card-heading">Add Appointment</h1>
            <div className="user-input-img-container">
              <div className="user-input-container">
                <form className="form" onSubmit={this.onFormSubmit}>
                  <label className="title" htmlFor="title">
                    TITLE
                  </label>
                  <br />
                  <input
                    type="text"
                    id="title"
                    className="user-title-input"
                    placeholder="Title"
                    onChange={this.onTitleInputChange}
                    value={titleInput}
                  />
                  <br />
                  <label className="date" htmlFor="date">
                    DATE
                  </label>
                  <br />
                  <input
                    type="date"
                    id="date"
                    className="date-input"
                    value={dateInput}
                    onChange={this.onDateChange}
                  />
                  <br />
                  <button type="submit" className="submit-btn">
                    Add
                  </button>
                </form>
              </div>
              <div className="img-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                  alt="appointments"
                  className="img"
                />
              </div>
            </div>
            <hr />
            <div className="appointments-heading">
              <h1 className="heading">Appointments</h1>
              <div>
                <button
                  className={filterClassName}
                  type="button"
                  onClick={this.onFilter}
                >
                  Starred
                </button>
              </div>
            </div>
            <ul className="list-container">{this.onRenderAppointment()}</ul>
          </div>
        </div>
      </>
    )
  }
}

export default Appointments
