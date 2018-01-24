# ScaVision-Hunt
### A real-time multiplayer scavenger hunt, in real life.

Scavenger hunts are a fun group activity. You race against your friends to find a set number of items faster than your peers.

The only problem, is that you have to be together in order to play it. What if we could change that?

ScaVision Hunt uses Google Cloud’s Vision API to detect items in your surroundings and Firebase for real-time communication between devices. Every device receives a prompt that tells them what they have to look for. They are then asked to search for it in the real world and snap a picture with their phone. The image is uploaded to Firebase Storage, and then passed to Vision API to determine it’s contents. This allows anyone, anywhere, can play together, as long as they have an internet connection.

[Learn More about this project on Devpost!](https://devpost.com/software/scavenger-hunt-e8kqup)
