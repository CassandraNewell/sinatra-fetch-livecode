let appendLocationsArrayToHtml = (locations) => {
  let locationList = document.getElementById('locations')

  locations.forEach(location => {
    locationList.innerHTML += `<li>${location.city}, ${location.country}</li>`
  })
}

let fetchLocations = () => {
  # Your code here
}

let postLocation = (event) => {
  # Your code here
}

fetchLocations()

document
  .getElementById('new-location-submit-button')
  .addEventListener('click', postLocation)
