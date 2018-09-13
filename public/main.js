let appendLocationsArrayToHtml = (locations) => {
  let locationList = document.getElementById('locations')
  locations.forEach(location => {
    locationList.innerHTML += `<li>${location.city}, ${location.country}</li>`
  })
}

let fetchLocations = () => {

}

let postLocation = (event) => {
  event.preventDefault()

}

// run automatically on page load
fetchLocations()
document
  .getElementById('new-location-submit-button')
  .addEventListener('click', postLocation)
