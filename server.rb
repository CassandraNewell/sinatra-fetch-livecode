require 'sinatra'
require 'sinatra/reloader'
require 'pry'

set :bind, '0.0.0.0'

def write_to_json_file(location)
  file = File.read("locations.json")
  locations_array = JSON.parse(file)

  new_location_id = locations_array["locations"].last["id"] + 1

  new_location = {
    id: new_location_id,
    city: location["city"],
    country: location["country"]
  }

  updated_locations = {
    locations: locations_array["locations"].concat([new_location])
  }

  # updated_locations_json = updated_locations.to_json
  updated_locations_json = JSON.pretty_generate(updated_locations, indent: ' ')

  File.write("locations.json", updated_locations_json)
end

get "/" do
  redirect to "/locations"
end

get "/locations" do
  File.read('public/index.html')
end

get '/api/v1/locations.json' do
  status 200
  content_type :json
  File.read('locations.json')
end

post '/api/v1/locations.json' do
  new_location = JSON.parse(request.body.read)["location"]
  if new_location["city"] != ""
    write_to_json_file(new_location)
    status 200
  else
    status 500
  end
end
