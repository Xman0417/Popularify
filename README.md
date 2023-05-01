Popularify was initially created following this tutorial - has since become paywalled:
https://www.newline.co/courses/build-a-spotify-connected-app/welcome

Popularify can be located here - https://popularify.herokuapp.com/

Because it is still in development mode, all users need to be approved. Contact me if you need to added to the list of approved users.

Some of the things to do in the future if I decide I want to truly keep working on this app and push it live: 

1. Add a Search for songs/artists
2. Clean up the design at parts
3. Request a quota extension from Spotify - which moves it out of development mode and allows any users to view the app. This may not happen because I'm not sure if I want to actually spend money to keep the website running - basically using Github for Education credits for Heroku at the current moment. 


Some important things to note for documentation:

Procfile is a Heroku specific file.
The Client directory is all of the React app stuff. 

Within the /client/src/ directory:
- Components has some repeated elements that could also be useful in future spotify projects and the navbar
- Pages has each individual page for the website
- Styles has some of the repeated stylized components - i could move all of them in there to make some of it more readable, but I felt it was simpler to just put several of the new ones with the page/component to make it clear where each one specifically went to. 
- .babelrc is a requirement for the Stylized Components
- spotify.js has all of the spotify specific functions in accessing their API
- utils.js contains some more generally useful functions

If you are planning on downloading and working on this app yourself, follow these steps. 

1. Go to https://developer.spotify.com/dashboard/login and sign in to spotify
2. Click Create New App - name it whatever you want
3. Click on the new app that was created, and click edit settings
4. Add a Redirect URI of http://localhost:8888/callback
5. Click Save
6. Click on Users and Access + Scroll Down
7. Click Add New User
8. Add your email that you use for spotify as a verified user.
9. IN THE ROOT DIRECTORY OF THE FOLDER: Create a .env file based on the .env.example
10. Set CLIENT_ID to the value of Client ID that is on the spotify developer dashboard
11. Click Show Client Secret, and set the CLIENT_SECRET to this value.
12. Leave REDIRECT_URI as the value given in the .env.example folder.
13. In a terminal, run the command "npm install"
14. run "npm start"
15. The app should be running!

From here you can make changes. 