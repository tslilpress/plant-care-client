import React, { Component } from 'react'
import { showPlant } from '../../api/plant'
// import axios from 'axios'
// import apiUrl from '../../apiConfig'

class PlantIndex extends Component {
  constructor (props) {
    super(props)
    console.log('props', props)
    this.state = {
      plants: [],
      isLoaded: false
    }
  }

  componentDidMount () {
    const user = this.props.user
    showPlant(user)
      .then(response => {
        this.setState({
          plants: response.data.plants,
          isLoaded: true
        })
      })
      .catch(console.error)
  }
  render () {
    console.log('data', this.data)
    console.log(this.state)
    let jsx
    if (this.state.isLoaded === false) {
      jsx = <p>Loading...</p>
    } else if (this.state.plants.length === 0) {
      jsx = <p>No plants yet, please add one.</p>
    } else {
      jsx =
        <div>
          {this.state.plants.map(({ _id, plantName, plantType, lastWatered, lastFertilized, nextWatering, nextFertilizing }) => (
            <div key={_id}>
              <p>Name: {plantName}</p>
              <p>Type: {plantType}</p>
            </div>
          ))}
        </div>

      return (
        <div>
          {jsx}
        </div>
      )
    }
  }
}

export default PlantIndex
