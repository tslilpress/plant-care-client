import React, { Component } from 'react'
// import { showPlant } from '../../api/plant'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

class PlantIndex extends Component {
  constructor (props) {
    super(props)
    this.state = {
      plants: [],
      isLoaded: false
    }
  }

  componentDidMount () {
    console.log('props', this.props)
    const user = this.props.user
    axios({
      url: apiUrl + '/plants',
      method: 'GET',
      headers: {
        'Authorization': `Token token=${user.token}`
      },
      data: {}
    })
      .then(response => {
        console.log('response', response)
        this.setState({
          plants: response.data.plants,
          isLoaded: true
        })
      })
      .catch(console.error)
  }

  render () {
    console.log('state', this.state.plants)
    console.log('index props', this.props)
    let jsx
    if (this.state.isLoaded === false) {
      jsx = <p>Loading...</p>
    } else if (this.state.plants.length === 0) {
      jsx = <p>No plants yet, please add one.</p>
    } else {
      jsx = (
        <div className='index-container'>
          <div className='index'>
            <h1>My Plants</h1>
            {this.state.plants.map(plant => {
              console.log('after map', plant.plantName)
              return <h3 key={plant._id}><Link to={`/plants/${plant._id}`}>{plant.plantName}</Link></h3>
            })}
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

export default PlantIndex
