import React, { Component, Fragment } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'
import { withRouter, Link } from 'react-router-dom'
import moment from 'moment'
// import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'

class PlantShow extends Component {
  constructor (props) {
    super(props)
    console.log('show props', props)
    this.state = {
      plant: {},
      isLoaded: false,
      isDeleted: false
    }
  }

  componentDidMount () {
    console.log('show state in CDM', this.state)
    console.log('show data in CDM', this.data)
    const user = this.props.user
    axios({
      url: apiUrl + '/plants/' + this.props.match.params.id,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${user.token}`
      },
      data: {}
    })
      .then(response => {
        console.log('show', response)
        this.setState({
          isLoaded: true,
          plant: response.data.plant
        })
      })
      .catch(console.error)
  }

  delete = () => {
    const { msgAlert, history } = this.props
    console.log('delete state', this.state)
    const plantId = this.state.plant._id
    const user = this.props.user
    axios({
      url: apiUrl + '/plants/' + plantId,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${user.token}`
      },
      data: {}
    })
      .then(() => msgAlert({
        heading: 'Plant Deleted',
        message: messages.plantDeletedSuccess,
        variant: 'success'
      }))
      .then(() => {
        this.setState({
          isDeleted: true
        })
      })
      .then(() => history.push('/my-plants'))
      .catch(error => {
        msgAlert({
          heading: 'Plant Delete Failure: ' + error.message,
          message: messages.plantDeletedFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    console.log('render date', this.state.plant.lastWatered)
    const { plantName, plantType, lastWatered, nextWatering, lastFertilized, nextFertilizing, wateringFrequency, fertilizingFrequency } = this.state.plant

    const formatDate = function (date) {
      return moment(date).format('MM/DD/YYYY')
    }

    const nextWaterDate = function (lastWatered) {
      return formatDate(moment(lastWatered).add(wateringFrequency, 'days').calendar())
    }

    const todaysDate = moment().format('MM/DD/YYYY')

    console.log('next water date', nextWaterDate(lastWatered))

    let jsx
    if (todaysDate === formatDate(nextWatering) && todaysDate === formatDate(nextFertilizing)) {
      // console.log('today date', todaysDate)
      // console.log('next wtering', formatDate(nextWatering))
      jsx =
      <Fragment>
        <div className='show-container'>
          <div className='show'>
            <h3 className='name-type'>{plantName}</h3>
            <h5 className='name-type'>{plantType}</h5>
            <p><span className='show-span'>Last watered:</span> {formatDate(lastWatered)}</p>
            <p><span className='show-span'>Next watering:</span> {formatDate(nextWatering)}</p>
            <p><span className='show-span'>Last feeding:</span> {formatDate(lastFertilized)}</p>
            <p><span className='show-span'>Next Feeding:</span> {formatDate(nextFertilizing)}</p>
            <p>Water every {wateringFrequency} days</p>
            <p>Feed every {fertilizingFrequency} days</p>
            <div className='edit-buttons'>
              <Link to='' className='delete-icon'>
                <FontAwesomeIcon onClick={this.delete} icon={faTrash} size='2x'/>
              </Link>
              <Link to={`/plants/${this.state.plant._id}/edit-plant`}>
                <FontAwesomeIcon icon={faPen} size='2x'/>
              </Link>
            </div>
            <div className='water-time'>
              <h2>Water and feed {plantName} Today!</h2>
            </div>
          </div>
        </div>
      </Fragment>
    } else if (todaysDate === formatDate(nextFertilizing)) {
      jsx = <Fragment>
        <div className='show-container'>
          <div className='show'>
            <h3 className='name-type'>{plantName}</h3>
            <h5 className='name-type'>{plantType}</h5>
            <p><span className='show-span'>Last watered:</span> {formatDate(lastWatered)}</p>
            <p><span className='show-span'>Next watering:</span> {formatDate(nextWatering)}</p>
            <p><span className='show-span'>Last feeding:</span> {formatDate(lastFertilized)}</p>
            <p><span className='show-span'>Next Feeding:</span> {formatDate(nextFertilizing)}</p>
            <p>Water every {wateringFrequency} days</p>
            <p>Feed every {fertilizingFrequency} days</p>
            <div className='edit-buttons'>
              <Link to='' className='delete-icon'>
                <FontAwesomeIcon onClick={this.delete} icon={faTrash} size='2x'/>
              </Link>
              <Link to={`/plants/${this.state.plant._id}/edit-plant`}>
                <FontAwesomeIcon icon={faPen} size='2x'/>
              </Link>
            </div>
            <div className='water-time'>
              <h2>Feed {plantName} Today!</h2>
            </div>
          </div>
        </div>
      </Fragment>
    } else if (todaysDate === formatDate(nextWatering)) {
      jsx = <Fragment>
        <div className='show-container'>
          <div className='show'>
            <h3 className='name-type'>{plantName}</h3>
            <h5 className='name-type'>{plantType}</h5>
            <p><span className='show-span'>Last watered:</span> {formatDate(lastWatered)}</p>
            <p><span className='show-span'>Next watering:</span> {formatDate(nextWatering)}</p>
            <p><span className='show-span'>Last feeding:</span> {formatDate(lastFertilized)}</p>
            <p><span className='show-span'>Next Feeding:</span> {formatDate(nextFertilizing)}</p>
            <p>Water every {wateringFrequency} days</p>
            <p>Feed every {fertilizingFrequency} days</p>
            <div className='edit-buttons'>
              <Link to='' className='delete-icon'>
                <FontAwesomeIcon onClick={this.delete} icon={faTrash} size='2x'/>
              </Link>
              <Link to={`/plants/${this.state.plant._id}/edit-plant`}>
                <FontAwesomeIcon icon={faPen} size='2x'/>
              </Link>
            </div>
            <div className='water-time'>
              <h2>Water {plantName} Today!</h2>
            </div>
          </div>
        </div>
      </Fragment>
    } else {
      jsx =
      <Fragment>
        <div className='show-container'>
          <div className='show'>
            <h3 className='name-type'>{plantName}</h3>
            <h5 className='name-type'>{plantType}</h5>
            <p><span className='show-span'>Last watered:</span> {formatDate(lastWatered)}</p>
            <p><span className='show-span'>Next watering:</span> {formatDate(nextWatering)}</p>
            <p><span className='show-span'>Last feeding:</span> {formatDate(lastFertilized)}</p>
            <p><span className='show-span'>Next Feeding:</span> {formatDate(nextFertilizing)}</p>
            <p><span className='show-span'>Water every {wateringFrequency} days</span></p>
            <p><span className='show-span'>Feed every {fertilizingFrequency} days</span></p>
            <div className='edit-buttons'>
              <Link to='' className='delete-icon'>
                <FontAwesomeIcon onClick={this.delete} icon={faTrash} size='2x'/>
              </Link>
              <Link to={`/plants/${this.state.plant._id}/edit-plant`}>
                <FontAwesomeIcon icon={faPen} size='2x'/>
              </Link>
            </div>
          </div>
        </div>
      </Fragment>
    }
    return (
      <div>
        {jsx}
      </div>
    )
  }
}
export default withRouter(PlantShow)
