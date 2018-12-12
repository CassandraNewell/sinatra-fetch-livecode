require 'sinatra'
require 'sinatra/reloader'
require 'pry'

set :bind, '0.0.0.0'

def write_to_json_file(location)
  file = File.read("locations.json")
  locations_hash = JSON.parse(file)

  new_location_id = locations_hash["locations"].last["id"] + 1
  new_location = {
    id: new_location_id,
    city: location["city"],
    country: location["country"]
  }

  updated_locations = {
    locations: locations_hash["locations"].concat([new_location])
  }

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
  request_json = JSON.parse(request.body.read)

  if request_json["location"]
    write_to_json_file(request_json["location"])
    status 200
    request_json.to_json
  else
    status 500
    {error: "Oops, your data were weird and I hate it"}
  end
end
