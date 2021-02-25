# route-tracker
Route Tracker React Native App

Workflow:
1. User signs up or sing in using existing credentials. (Connected with MongoDB and password hashed and salted)
![Signup_SignIn](https://github.com/dishitk/route-tracker/blob/main/Signup_SignIn.png?raw=true)
2. Track List Screen Appears. Here the user can see all the existing tracks recorded, if any.
![TrackList](../master/TrackList.png?raw=true)
3. User can click on any existing track recorded and view the total route.
![TrackDetail](../master/TrackDetail.png?raw=true)
4. User can click on "Add Track" in the bottom navigation bar. Track Create Screen appears where user enters the track name and hit on "Start Recording". When done user clicks on "Stop Recording" and press "Save Recording". After save is clicked, it gets stored in the database and the user is taken to Track List Screen.
![TrackCreate](../master/TrackCreate.png?raw=true)
![TrackRecording](../master/TrackRecording.png?raw=true)
![TrackRecorded](../master/TrackRecorded.png?raw=true)
5. To logout, one has to click on "Account" in the bottom navigation and click on Logout.
![Account](../master/Account.png?raw=true)
