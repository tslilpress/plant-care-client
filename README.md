# Plant Care

A single page application that allows users to keep track of their houseplants watering and fertilizing schedule and reminds them when it's time to water or fertilize their plants.

## important Links
[Server side app repo on github](https://github.com/tslilpress/plant-care-server) ----
[Server side app site on Heroku](https://sheltered-badlands-12317.herokuapp.com)

## Planning Story
After finishing the API for this app I started creating the front end side of the application. I already had my wireframes and user stories done so I followed that basic structure and expanded on it as I went.
I started by creating components for the basic CRUD action, first I the create component, setting the state to match the model schema that I built with mongoose in my API, then rendering a form for the user to fill in. Next, I created the index component that shows all the user added plants names as links that lead to the show component that shows the single plant with all the details the user input plus the calculation for when to next feed and water. In the show component I also added a delete request for when the delete button is clicked. Lastly I created the update component which renders a form with the single plants information that could be edited and then saved by using a post request.
The last thing I worked on was the logic to calculate and display a message for when it's time to water or fertilize the plant. I used moment.js to help manage dates.

### User Stories

- As a user I would like to sign up/in
- As a user I would like to sign out
- As a user I would like to change my password
- As a user I would like to add a plant and its details
- As a user I would like see all my plants
- As a user I would like search for a single plant
- As a user I would like to update a plant
- As a user I would like to delete a plant
- As a user I would like to be see when the next watering and fertilizing is
- As a user I would like to be able to set my watering and fertilizing schedule for each plant
- As a user I  would to have a reminder to water or fertilize a plant on the scheduled day

### Technologies used
- HTML/CSS
- JavaScript
- React
- Bootstrap
- Moment.js

### Unsolved Problems
I would like to eventually split up the locations of the plants by rooms. Also, have more information about each plant and their needs.

### Wireframes
![Plant Care App Wireframe](https://user-images.githubusercontent.com/68870466/98407284-65538b80-203d-11eb-8851-b1b2df0a45cd.jpg)
