import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import axios from 'axios'
// import { createPlant } from '../../api/plant'
import messages from '../AutoDismissAlert/messages'
import moment from 'moment'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class CreatePlant extends Component {
  constructor (props) {
    super(props)

    this.state = {
      plant: {
        plantName: '',
        plantType: '',
        lastWatered: '',
        lastFertilized: '',
        wateringFrequency: '',
        fertilizingFrequency: '',
        nextWatering: '',
        nextFertilizing: '',
        note: ''
      },
      createdPlantId: '',
      timeToWater: false,
      timeTofertilize: false
    }
  }

  handleChange = (event) => {
    // user input value
    const userInput = event.target.value
    // name of input by user
    const plantKey = event.target.name
    // make a copy of the state
    const plantCopy = Object.assign({}, this.state.plant)
    // updating the key in our copy with what the user typed
    plantCopy[plantKey] = userInput
    // updating the state with our new copy
    this.setState({ plant: plantCopy })
  }

  handleDateChange = (event) => {
    // user input value
    const newDate = moment.utc(event.target.value).format('MM/DD/YYYY')
    const userInput = newDate
    // name of input by user
    const plantKey = event.target.name
    // make a copy of the state
    const plantCopy = Object.assign({}, this.state.plant)
    // updating the key in our copy with what the user typed
    plantCopy[plantKey] = userInput
    // updating the state with our new copy
    this.setState({ plant: plantCopy })
  }

  handleCreate = event => {
    event.preventDefault()
    const { msgAlert, history } = this.props
    const plant = this.state.plant
    console.log('before create', plant)
    axios({
      url: apiUrl + '/plants',
      method: 'POST',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        plant: plant
      }
    })
    // console.log('data', this.data)
      .then((response) => this.setState({ createdPlantId: response.data.plant._id }))
      .then(() => msgAlert({
        heading: 'Plant Added',
        message: messages.plantCreatedSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/my-plants'))
      .catch(error => {
        msgAlert({
          heading: 'Plant Create Failure: ' + error.message,
          message: messages.plantCreatedFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { plantName, plantType, wateringFrequency, fertilizingFrequency } = this.state

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Add New Plant</h3>
          <Form onSubmit={this.handleCreate}>
            <Form.Group controlId="plantName">
              <Form.Label>Plant Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="plantName"
                value={plantName}
                placeholder="Your plants name"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="plantType">
              <Form.Label>Plant Type (optional)</Form.Label>
              <Form.Control
                required
                name="plantType"
                value={plantType}
                type="text"
                placeholder="What type is your plant"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="wateringFrequency">
              <Form.Label>Watering Frequency</Form.Label>
              <Form.Control
                required
                name="wateringFrequency"
                value={wateringFrequency}
                type="number"
                placeholder='How often to water (in days)'
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="fertilizingFrequency">
              <Form.Label>Feeding Frequency</Form.Label>
              <Form.Control
                required
                name="fertilizingFrequency"
                value={fertilizingFrequency}
                type="number"
                placeholder='How often to feed (in days)'
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="lastWatered">
              <Form.Label>Last Watering</Form.Label>
              <Form.Control
                required
                name="lastWatered"
                type="date"
                onChange={this.handleDateChange}
              />
            </Form.Group>
            <Form.Group controlId="lastFertilized">
              <Form.Label>Last Feeding</Form.Label>
              <Form.Control
                required
                name="lastFertilized"
                type="date"
                onChange={this.handleDateChange}
              />
            </Form.Group>
            <Form.Group controlId="nextWatering">
              <Form.Label>Next Watering</Form.Label>
              <Form.Control
                required
                name="nextWatering"
                type="date"
                placeholder='mm/dd/yyyy'
                onChange={this.handleDateChange}
              />
            </Form.Group>
            <Form.Group controlId="nextFertilizing">
              <Form.Label>Next Feeding</Form.Label>
              <Form.Control
                required
                name="nextFertilizing"
                type="date"
                onChange={this.handleDateChange}
              />
            </Form.Group>
            <Button className='mb-5'
              variant="primary"
              type="submit"
            >
              Add
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(CreatePlant)
