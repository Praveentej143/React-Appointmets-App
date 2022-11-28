// Write your code here

import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails} = props
  const {id, title, date, isStarred} = appointmentDetails
  const isStarredUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onclickStar = () => {
    const {toggleStarred} = props
    toggleStarred(id)
  }

  return (
    <li className="list-items">
      <div className="appointments-container">
        <div className="appointment-details">
          <p className="app-title">{title}</p>
          <button className="star-btn" onClick={onclickStar} testid="star">
            <img src={isStarredUrl} className="star" alt="star" />
          </button>
        </div>
        <p className="date-appointed">{`Date: ${date}`}</p>
      </div>
    </li>
  )
}

export default AppointmentItem
