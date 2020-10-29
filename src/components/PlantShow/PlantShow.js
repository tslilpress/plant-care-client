import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { withRouter } from 'react-router-dom'
import moment from 'moment'

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
