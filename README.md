This spotify test app was primarily created following this tutorial:
https://www.newline.co/courses/build-a-spotify-connected-app/welcome

I mostly used this to play around with Spotify's API, and left out the playlist page in the tutorial
because I could not ever see myself using it in a future project. Added an average popularity score
to the profile page because I'm leaning towards centering a future project on that.

Not publishing to a live site until I figure out what direction exactly I want to go with this project
AND I also have to manually add users to test the app - possible second semester project idea could be 
to create something with this new API knowledge and new styling ideas. 

IN ORDER TO RUN AFTER DOWNLOAD: 
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

Popularify README:

Popularify can be located here - insert link

Because it is still in development mode, all users need to be approved. Contact me if you need to added to the list of approved users.

Some of the things to do in the future if I decide I want to truly keep working on this app and push it live: 

1. Add a Search for songs/artists
2. Clean up the design at parts
3. Request a quota extension from Spotify - which moves it out of development mode and allows any users to view the app.