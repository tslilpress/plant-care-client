import React, { Component, Fragment } from 'react'
// import { showPlant } from '../../api/plant'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import moment from 'moment'

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
    console.log('index state', this.state.plants)
    console.log('index props', this.props)
    const todaysDate = moment().format('MM/DD/YYYY')
    const formatDate = function (date) {
      return moment(date).format('MM/DD/YYYY')
    }
    const plantsToWater = []
    for (let i = 0; i < this.state.plants.length; i++) {
      if (formatDate(this.state.plants[i].nextWatering) === todaysDate) {
        plantsToWater.push(this.state.plants[i])
      }
      console.log('index loop', formatDate(this.state.plants[i].nextWatering))
      console.log('plants to water', plantsToWater)
    }
    let jsx
    if (this.state.isLoaded === false) {
      jsx = <p>Loading...</p>
    } else if (this.state.plants.length === 0) {
      jsx = <h1 className='no-plants'>No plants yet, please add one.</h1>
    } else if (plantsToWater.length > 0) {
      jsx = (
        <Fragment>
          <div id='to-water-container'>
            <div className='to-water'>
              <h5>PLANTS TO WATER TODAY:</h5>
              {plantsToWater.map(plant => {
                return <div key={plant._id}>
                  <h5 ><Link to={`/plants/${plant._id}`}>{plant.plantName}</Link></h5>
                </div>
              })}
            </div>
          </div>
          <div className='index-container'>
            <div className='index'>
              <h1>My Plants</h1>
              {this.state.plants.map(plant => {
                console.log('after map', plant.plantName)
                return <div key={plant._id}>
                  <h4 ><Link to={`/plants/${plant._id}`}>{plant.plantName}</Link></h4>
                  <p>{plant.plantType}</p>
                </div>
              })}
            </div>
          </div>
        </Fragment>
      )
    } else {
      jsx = (
        <div className='index-container'>
          <div className='index'>
            <h1>My Plants</h1>
            {this.state.plants.map(plant => {
              console.log('after map', plant.plantName)
              return <div key={plant._id}>
                <h4 ><Link to={`/plants/${plant._id}`}>{plant.plantName}</Link></h4>
                <p>{plant.plantType}</p>
              </div>
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
