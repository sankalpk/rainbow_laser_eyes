# Introduction
The scripts in here help to create rainbow laser eyes.

There is an example of what the end result looks like after you combine the scripts.

![Rainbow Eyes](rainbow_eyes.png)

- `eye_detection.rb` shows how to generate coordinates for the eyes.
- `canvas` is a directory showing how to draw laser eyes onto a HTML canvas that you can then download. You can run it by setting up a server. Simple command to do it locally is `python -m http.server`

# Architecture
There is still a lot to be done in terms of polishing this and making it all work together into a great user experience. In terms of high level architecture, I would envision something like the following:

Client uploads an image to a secure S3 bucket or Google Cloud equivalent. Client then requests eye coordinates via a serverless function that hosts the `eye_dection.rb` script. The serverless function responds with eye location coordinates. The coordinates are used to draw the rainbow laser eyes onto the canvas. User can manually adjust direction of rainbow eyes and then confirm final image.