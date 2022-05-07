require "google/cloud/vision/v1"

Google::Cloud::Vision.configure do |config|
  config.credentials = "#{__dir__}/rainbow-dao-key.json"
  config.timeout = 10.0
end

client = Google::Cloud::Vision.image_annotator
result = client.face_detection(image: "gs://rainbowdao-dev/sank_image.jpg", max_results: 1)

facial_landmarks = result.responses.first.to_h[:face_annotations].first[:landmarks]
left_eye_coordinates = facial_landmarks[0]
right_eye_coordinates = facial_landmarks[1]