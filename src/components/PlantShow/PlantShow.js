import React, { Component, Fragment } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'
import { withRouter } from 'react-router-dom'
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
      isLoaded: false
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
      .then(() => history.push('/'))
  }

  render () {
    const formatDate = function () {
      return moment().format('YYYY/MM/DD')
    }

    const { plantName, plantType, lastWatered, nextWatering, lastFertilized, nextFertilizing, wateringFrequency, fertilizingFrequency } = this.state.plant
    let jsx
    if (this.state.isLoaded === false) {
      jsx = <p>Loading...</p>
    } else {
      jsx = (
        <Fragment>
          <div className='show-container'>
            <div className='show'>
              <h4>{plantName}</h4>
              <h5>{plantType}</h5>
              <p>Last watered: {formatDate(lastWatered)}</p>
              <p>Next watering: {formatDate(nextWatering)}</p>
              <p>Last feeding: {formatDate(lastFertilized)}</p>
              <p>Next Feeding: {formatDate(nextFertilizing)}</p>
              <p>Water every {wateringFrequency} days</p>
              <p>Feed every {fertilizingFrequency} days</p>
            </div>
          </div>
          <div className='edit-buttons'>
            <FontAwesomeIcon onClick={this.delete} icon={faTrash} size='2x'/>
            <FontAwesomeIcon icon={faPen} size='2x'/>
          </div>
        </Fragment>
      )
    }

    return (
      <div>
        {jsx}
      </div>
    )
  }
}
export default withRouter(PlantShow)
