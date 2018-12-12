let appendLocationsArrayToHtml = (locations) => {
  let locationList = document.getElementById('locations')

  locations.forEach(location => {
    locationList.innerHTML += `<li>${location.city}, ${location.country}</li>`
  })
}

let fetchLocations = () => {
  fetch('/api/v1/locations.json')
  .then(response => {
    if(response.ok) {
      return response
    } else {
      let error = new Error('Something went wrong in GET')
      throw(error)
    }
  })
  .then(response => response.json())
  .then(body => {
    appendLocationsArrayToHtml(body.locations)
  })
}

let postLocation = (event) => {
  event.preventDefault()

  let cityInputField = document.getElementById('city')
  let countryInputField = document.getElementById('country')

  let newLocation = {
    location: {
      city: cityInputField.value,
      country: countryInputField.value
    }
  }

  fetch('/api/v1/locations.json', {
    method: 'POST',
    body: JSON.stringify(newLocation)
  })
  .then(response => {
    if (response.ok) {
      return response
    } else {
      let error = new Error('Error in fetch POST')
      throw(error)
    }
  })
  .then(response => response.json())
  .then(body => {
    appendLocationsArrayToHtml([body.location])
  })
  .catch(error => {
    document.getElementById('error').innerHTML += error.message
  })
}

// run automatically on page load
fetchLocations()
document
  .getElementById('new-location-submit-button')
  .addEventListener('click', postLocation)
