<h3 align="center">
<img width="200" src="frontend/handemonium/public/handemonium-logo.png" alt="Phab Pharmacy"/>
<br>
Overall Winning submission for IC Hack 24 - Best EdTech Solution sponsored by Marshall Wace \
DevPost Link - https://devpost.com/software/handemonium
</h3>


## Try it yourself
Clone the repository then:

### Add yourself to facial recognition
The backend currently uses a static 'student' database so you will need to add your headshot to ./backend/data/headshots and add your name and path to photo to backend/data/students.csv. 

Then navigate to ./frontend/handemonium/src/GameState.ts and add your name to the GameStat users like: ['name', 0]

### Run the web server locally
You can run our containerised web server locally by using our 'dev' docker-compose.yml. 

cd dev/ \
docker-compose up --build -d

Then navigate to http://localhost:3000

## Considerations
Our image analysis is computationally expensive and runs best on a GPU. It will run on a CPU but quite slowly.
