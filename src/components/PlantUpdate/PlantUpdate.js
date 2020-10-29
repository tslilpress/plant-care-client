import React from 'react'
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import moment from 'moment'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'

class PlantUpdate extends React.Component {
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

  componentDidMount () {
    const plantId = this.props.match.params.id
    const user = this.props.user
    axios({
      url: apiUrl + '/plants/' + `${plantId}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${user.token}`
      },
      data: {}
    })
      .then(response => {
        console.log('updadte response', response)
        this.setState({
          plant: response.data.plant
        })
      })
      .catch(console.error)
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

  handleUpdate = (event) => {
    event.preventDefault()
    const { msgAlert, history } = this.props
    const plant = this.state.plant
    const user = this.props.user
    axios({
      url: apiUrl + '/plants/' + plant._id,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${user.token}`
      },
      data: {
        plant: plant
      }
    })
      .then(() => msgAlert({
        heading: 'Plant Updated',
        message: messages.plantUpdateSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/'))
      .catch(error => {
        msgAlert({
          heading: 'Plant Update Failure: ' + error.message,
          message: messages.plantUpdateFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    console.log('update state', this.state)
    const { plantName, plantType, lastWatered, lastFertilized, wateringFrequency, fertilizingFrequency,
      nextWatering, nextFertilizing } = this.state.plant

    const formatDate = function (lastWatered, lastFertilized, nextWatering, nextFertilizing) {
      return moment(lastWatered, lastFertilized, nextWatering, nextFertilizing).format('MM/DD/YYYY')
    }
    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Edit Your Plant</h3>
          <Form onSubmit={this.handleUpdate}>
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
                value={formatDate(lastWatered)}
                type="text"
                placeholder="mm/dd/yyyy"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="lastFertilized">
              <Form.Label>Last Feeding</Form.Label>
              <Form.Control
                required
                name="lastFertilized"
                value={formatDate(lastFertilized)}
                type="text"
                placeholder="mm/dd/yyyy"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="nextWatering">
              <Form.Label>Next Watering</Form.Label>
              <Form.Control
                required
                name="nextWatering"
                value={formatDate(nextWatering)}
                type="text"
                placeholder="mm/dd/yyyy"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="nextFertilizing">
              <Form.Label>Next Feeding</Form.Label>
              <Form.Control
                required
                name="nextFertilizing"
                value={formatDate(nextFertilizing)}
                type="text"
                placeholder="mm/dd/yyyy"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button className='mb-5'
              variant="primary"
              type="submit"
            >
              Done
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}
export default withRouter(PlantUpdate)
