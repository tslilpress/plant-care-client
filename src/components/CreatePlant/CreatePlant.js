import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { createPlant } from '../../api/plant'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class CreatePlant extends Component {
  constructor (props) {
    super(props)

    this.state = {
      plantName: '',
      plantType: '',
      lastWatered: '',
      lastFertilized: '',
      wateringFrequency: '',
      fertilizingFrequency: '',
      nextWatering: '',
      nextFertilizing: '',
      note: '',
      timeToWater: false,
      timeTofertilize: false
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onCreate = event => {
    event.preventDefault()

    const { msgAlert, history } = this.props

    createPlant(this.state)
      .then(() => msgAlert({
        heading: 'Sign Up Success',
        message: messages.signUpSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/'))
      .catch(error => {
        this.setState({ email: '', password: '', passwordConfirmation: '' })
        msgAlert({
          heading: 'Sign Up Failed with error: ' + error.message,
          message: messages.signUpFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { plantName, plantType, lastWatered, lastFertilized, wateringFrequency, fertilizingFrequency,
      nextWatering, nextFertilizing } = this.state

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Add New Plant</h3>
          <Form onSubmit={this.onCreate}>
            <Form.Group controlId="plantName">
              <Form.Label>Plant Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="plantName"
                value={plantName}
                placeholder="Your plants nickname"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="plantType">
              <Form.Label>Plant Type</Form.Label>
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
                value={lastWatered}
                type="date"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="lastFertilized">
              <Form.Label>Last Feeding</Form.Label>
              <Form.Control
                required
                name="lastFertilized"
                value={lastFertilized}
                type="date"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="nextWatering">
              <Form.Label>Next Watering</Form.Label>
              <Form.Control
                required
                name="nextWatering"
                value={nextWatering}
                type="date"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="nextFertilizing">
              <Form.Label>Next Feeding</Form.Label>
              <Form.Control
                required
                name="nextFertilizing"
                value={nextFertilizing}
                type="date"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button
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
