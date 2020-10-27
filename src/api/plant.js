import apiUrl from '../apiConfig'
import axios from 'axios'

export const createPlant = (plant) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/plant',
    data: plant
  })
}

export const showPlant = (user) => {
  return axios({
    url: apiUrl + '/plants',
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {}
  })
}

export const updatePlant = (data, plantId, user) => {
  return axios({
    url: apiUrl + '/plant/' + `${plantId}`,
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: data
  })
}

export const deletePlant = (plantId, user) => {
  return axios({
    url: apiUrl + '/plant' + plantId,
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {}
  })
}
