# Music-Player-App-Final-product
This music app gets the music files from the stored array

Step 1
I defined all the variables i'll be using in the project.
Then I added some later

The first function is an eventlisterner that listens to when the window is loaded
it then calls the updateTrackInfo() function whose work is to update the track name 
and track artist name

The updateTrackInfo() 
here first we set a variable currentSongIndex to a number 0
then we declare a variable currentsong which is equal to the playlist
which is the array where the songs are stored then get the songindex which is 0
i set another variable var songParts = currentSong.split("-"); which splits the currenst song 
from the hyphen as ["Song Title ", " Artist Name"].
var trackName = songParts[1].split(".")[0].trim(); this variable then takes the Artist name.mp3 and splists it to 
[Artistname, MP3]
var trackArtist = songParts[0].trim(); this variable will take the first index element which will be the artist name
next I called the trackname element variable and called the textContent properyty and set the content to read the trackName
next i called rge trackArtistsElement variable and called the textcontent property on it to set the contenet equal to the trackArtist I trimmed eralier
next i called the nowPlaying element and set the text content using string literals to just change the name of the artist and trackname

The playpauseTrack()
First I set a variable songUrl which takes in the playlistArray and takes the cureentsong index
So I took the audiosource variable which referes to the audio and called the src property and made it equal to the song Url i had created earlier
I then called audio.load(); function which loads the song in the browser
I then called an addeventlisterner and called the //canplaythrough event to ensure that the audio source has finished loading before calling the play() method
i then created an if condition which checks if the song is paused and if that is true
i would call the audio.play function to play the song and remover the play class list on the playPauseIcon
then i would add the pause circle
else
I would call the audio.pause() function to pause the song and remove the pause class list and add the play classlist.

in this function I also added a functionality  to update the progress bar dynamically as the song plays along
so I called audio.play() method to play the audio
.then()method I used in combination with the play method to perform an action after the song starts playing and the action it performs is
to setInterval and it does this after calculating the progress of the song and updates the progress bar as the song continues playing and it does thids every 0.1 seconds
the .catch method is used to handle any errors when the song is playing. If there is any error it will be logged on to the console

The function prevTrack()
In this function I wrote and If else condition which checks if the currentSongIndex == 0
then it assigns the currentSongIndex to the total number of elements in the array - 1 because the array are zero indexed
else if the currentsongindex is not equal to 0 
then I subtracted the currentsongindex -1 
After that i called playpauseTrack();
  updateTrackInfo(); functions

The function nextTrack()
In this function I wrote and if else condition statement 
if the currentSongIndex === playList.length - 1  if true then I would set the currentSongindex to 0
else
I would increment the currentsongindex++
After that i called playpauseTrack();
  updateTrackInfo(); functions

The function setVolume()
here i used an if else conditional statement to set the audio.volume depending on where the user would click
 I would then call an add event listener function to increase the volume
volumeSlider.addEventListener("input", setVolume);

I then added an event listener on the volumedwnbtn that when it was clicked I used an if else condition
if the audio.volume === 0
i first created a var previous Volume and made the audio.volume = to the previous volume
else
i would store the current volume level and set it to 0 to mute

The function formatTime
Function to format the time to minutes and seconds

function updateCurrentTime()
Function to update the current time dynamically
I would then call the audio.addeventlisterner and ask it to run the above function on timeupdate

function updateTotalDuration()
Function to update the total duration dynamically
The code audio.addEventListener("loadedmetadata", updateTotalDuration); is used to add an event listener to an HTML <audio> element represented 
by the variable audio. 
When the "loadedmetadata" event occurs, it will trigger the function updateTotalDuration

function seekTo()
This function changes the position of the progress bar and the song according to where the user has clicked
const progressBarWidth = progressBar.offsetWidth; //calculates the width of the progress bar
const clickPosition = event.offsetX; // gives the X-coordinate of the click relative to the progressBar


