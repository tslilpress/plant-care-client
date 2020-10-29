import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'

class PlantShow extends Component {
  constructor (props) {
    console.log('show', props)
    super(props)
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
    let jsx
    if (this.state.isLoaded === false) {
      jsx = <p>Loading...</p>
    } else {
      jsx = (
        <ul>
          <li>{this.state.plant._id}</li>
          <li>{this.state.plant.plantName}</li>
          <li>{this.state.plant.plantType}</li>
        </ul>
      )
    }

    return (
      <div>
        {jsx}
      </div>
    )
  }
}
export default PlantShow
