# CS260-Startup

## Elevator pitch
On campus, students put sticky notes in their windows to write messages or draw pictures. My old monitor broke a little while ago so I removed the LCD layer and put it in my window. I am working on setting up a Raspberry Pi that will grab images from Google Drive and display them on the LCD. I will get bored of picking images and I want some help. In this class, I will make a website where people can upload images. I can then approve or veto the images before they get sent to my Google Drive. From there, the Raspberry Pi can grab them.

## key features
- Secure Login
- Upload images
- Images are persistently stored until I approve or reject them
- Approve or Reject images
- Notify people when their image is accepted or rejected
- See the three most recently approved images

## Technologies
- HTML - Three HTML pages. One for login, one for uploading images, and one for approving/rejecting images.
- CSS - The styling for the webpages. Works on PC and mobile. 
- JavaScript - Processes login, images, and notifications.

## Design images
![MainPageMockUI](/mockUI/MainPageMockUI.png)
![LoginMockUI](/mockUI/LoginMockUI.png)
![AdminPageMockUI](/mockUI/AdminPageMockUI.png)

## HTML Deliverable
- Three HTML pages. Home/submit image, login, and the admin page
- Links: all of the pages have links to each other. The admin page will be locked behind the sign-in page but anyone can access it for now.
- Text: There is a description on the main page.
- Images: there are placeholder images on the main and admin pages.
- Login: there is a login page for the admin. The admin page says hi to the user.
- DB: the recent images on the main page will be pulled from the database.
- Websocket: the main page is notified if their image is accepted.
- API: The Google Drive API will be called when an image is accepted on the admin page.

## CSS Deliverable
- Uploaded Simon CSS files to the server.
- There is a link to my GitHub in the footer on all of the pages.
- Here are the notes on what I added for this deliverable.
- I have deployed it to the server.
- I have styled the header, footer, and body on all of the pages.
- There are navigation elements in the header.
- The "recent images" column on the home page shifts to the bottom of the page when the window gets too narrow.
- There are elements including the buttons and cards on all of the pages.
- There are placeholder images until I can replace them with user-generated images.

## JavaScript Deliverable
- Admin login details are added to an object so they can later be pushed to the server.
- When the user enters their name on the homepage, the page says hi back.
- The user's name is saved to the local storage so the page remembers them in the future.
- The changing images on the homepage are the mocked database data.
- The changing images are also the mocked WebSocket because it will update when a new image is accepted.
- I am also using local storage to remember the user's light/dark mode preferences.
- My name and GitHub link are in the footer.

## Websocket Deliverable
- 
