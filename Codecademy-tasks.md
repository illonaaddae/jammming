# Jammming Project - Codecademy Tasks

---

## 1. Set Up Your Local Environment

On your computer, create a React app named Jammming (mind the extra "m"!) with your preferred terminal.

Run your application locally to see what it looks like in the browser.

<details>
<summary><strong>💡 Hint</strong></summary>

To create a React app, you can use the create-react-app package. Open up your terminal, navigate to the directory you want to store your project, and use the command create-react-app Jammming.

Navigate to the Jammming project folder using cd and use the command npm start to start a development server and see a preview of your app as you work.

</details>

---

## 2. Set Up Version Control

Set up the folder you created previously to be a Git repository (if you used create-react-app above, you may skip this step because create-react-app automatically configures the local Git repository).

Now, set up a remote origin and push the initial files to a repository on GitHub. You should be consistently committing your changes throughout the project. Make sure to have meaningful commit messages.

<details>
<summary><strong>💡 Hint</strong></summary>

To initialize your Git repository, you can run the below code in your terminal, where application is the name of your project folder.

```bash
git init application
```

If you want a refresher on the syntax, look back at the Git cheat sheet: https://education.github.com/git-cheat-sheet-education.pdf

</details>

---

## 3. Create Static Components

Create components for your Jammming application. You may structure your components as you see fit, but you should have a component representing each of these core components of the interface:

- App
- SearchBar
- SearchResults
- Playlist
- Tracklist
- Track

Additionally, make sure that your interface has a Save To Spotify button and a Search button.

<details>
<summary><strong>💡 Hint</strong></summary>

For now, these components should be static and may contain mock data. At this point, you should focus on how your components will interact with the data rather than on how they will retrieve data from APIs (that comes in a later task). Remember to build reusable components and keep them small.

Organizationally, don't forget to keep your project tidy by creating a folder for each component and keeping your styles separate with a CSS module for each component.

You're also welcome to use any libraries to help you build features.

</details>

---

## 4. Implement Track Listing in The Component Tree

When a user requests data from Spotify, the JSON response will contain a set of song tracks. Your Jammming web app should display the song name, artist, and album for each track in the results list.

Implement this by creating a unidirectional data flow from your root component. The root component should pass down the search results to a child component that will return each individual track to be rendered.

Since the Spotify API is not currently set up to be called, you may hard-code an array of track objects to be passed down for now.

<details>
<summary><strong>💡 Hint</strong></summary>

Things to keep in mind:

- Each hard-coded array of track objects should contain a name, artist, album, and id property.
- Consider using state to store information such as your search results array, allowing you to update the array in response to user inputs and other events.
- Use JavaScript's map() method to iterate over arrays and render multiple components dynamically.
- When returning the list of tracks, make sure to set a unique key attribute for each track. This will help React efficiently update the DOM when changes occur.

</details>

---

## 5. Implement Playlists in The Component Tree

Your Jammming web app should allow the user to customize their playlist title and tracks. When a user creates a playlist, your app should display the playlist name and tracks from the playlist.

Create a unidirectional data flow from your root component to relevant children components. This data flow should pass down the playlist name and tracks.

<details>
<summary><strong>💡 Hint</strong></summary>

Things to keep in mind:

- You can create a mock string containing the playlist name and tracks to test your code.
- If you've set up your static components with the proper representation for the core components of the interface, you can pass the playlist tracks from the component responsible for the Playlist to the component responsible for the Tracklist.
- Consider using state to store information such as the playlist name and playlist tracks.

</details>

---

## 6. Implement Adding Songs To a Custom Playlist

Your Jammming web app should allow users to add songs from the search results to their custom playlist. To achieve this, implement a method that adds a selected song from the search results track list to the user's custom playlist. The method should be triggered when the user clicks an "add" button displayed next to each track in the search results list.

<details>
<summary><strong>💡 Hint</strong></summary>

You will want to create a method that can accept a track as an argument, and check if the passed-in track is in the playlist already — there is a unique property of each track that can help you with this step, and if the song is new, add the song to the playlist.

The "add" button can be anything. For example, a + sign provides a visual aid of "adding" a song. An event listener can wait for the button to be clicked and trigger the method that adds the track to the playlist.

Don't forget to render the playlist component with the updated playlist to reflect the changes made by adding a new track!

</details>

---

## 7. Implement Removing Songs From a Custom Playlist

Along with adding, your Jammming web app should allow users to remove songs from their playlists.

This function should trigger when the user presses the "remove" button next to a displayed track. To achieve this, implement a method that removes a selected song from the user's custom playlist.

<details>
<summary><strong>💡 Hint</strong></summary>

To complete this step, create a method that can accept a track as an argument, and check if the passed-in track is in the playlist — there is a unique property of each track that can help you with this step, and if the song exists in the playlist, remove it.

The "remove" button can be anything. For example, a - sign provides a visual aid of "subtracting" or "removing" a song. An event listener can wait for the button to be clicked and trigger the method that removes the track from the playlist.

Don't forget to render the playlist component with the updated playlist to reflect the changes made by removing the track!

</details>

---

## 8. Implement Playlist Renaming

One essential feature of a music application is customization. Provide users with more control over their music by allowing them to rename their playlists.

Implement code that enables a user to change the name of their playlist. The user should be able to click on the title of their playlist and type in a new name to replace the existing name.

<details>
<summary><strong>💡 Hint</strong></summary>

Displaying the playlist title with the input element can allow users to click on the title of their playlist and edit it directly on the page by clicking on the form field.

The input element can be monitored using the onChange attribute to update the playlist title accordingly.

</details>

---

## 9. Implement Saving the Playlist to a User's Account

Jammming's main feature is allowing users to export their created playlist and save it to their personal Spotify account. Implement a feature to save a user's playlist to their Spotify account and reset the existing playlist on the web app.

As a part of this goal, you should access a track property named uri. Spotify uses this field to reference tracks in the Spotify library. You should create an array containing the uri of each track in the playlist.

At this point, you don't need to interact with the Spotify API quite yet. Use mock data to test your implementation.

<details>
<summary><strong>💡 Hint</strong></summary>

It's important to familiarize yourself with the Spotify API documentation to gain a clear understanding of how Spotify's uris works. For testing purposes, you can create a hardcoded array of uri values. To obtain a Spotify uri, simply right-click (on Windows) or ctrl-click (on Mac) on a song's name.

</details>

---

## 10. Obtain a Spotify Access Token

To use the Spotify API with Jammming, you need to get a user's Spotify access token to make Spotify API requests.

Create a JavaScript module that will handle the logic for getting an access token and using it to make requests. The method should have a way to get a user's access token and store it.

<details>
<summary><strong>💡 Hint</strong></summary>

You can use the Implicit Grant Flow to set up a user's account and make requests. The implicit grant flow returns a user's token in the URL.

From the URL, you should extract the access token values and set them up in your app. You should also set up a variable for the expiration time and configure the access token to expire at the appropriate time.

Remember to clear parameters from the URL to avoid issues with expired access tokens.

You may encounter errors if the access token is not in the URL. It can happen if the user has not logged in and granted your app access to their Spotify account yet. Handle these errors appropriately.

</details>

---

## 11. Implement Spotify Search Request

Connect the search bar to Spotify so that it can query data from the Spotify API. Your implementation should enable users to enter a search parameter and receive a response from the Spotify API. You should display the results from the request to the user.

To make your request to the API, use the /v1/search?type=TRACK endpoint. You can refer to the Spotify Web API Endpoint Reference for guidance on formatting your request. You can use fetch() to make your GET requests and you should be expecting the response back as a list of tracks in JSON format.

It is best to convert the JSON to an array of tracks, the array should be a list of track objects with the following properties: id, name, artist, album, and uri.

Common errors to avoid:

- Invalid access tokens: Make sure that you use valid access tokens before making your requests.
- Incorrect API endpoint: Make sure you use /v1/search?type=TRACK as outlined in the documentation.
- Incorrectly formatted requests: Refer to the Endpoint Reference documentation for guidance on how to format your requests.

<details>
<summary><strong>💡 Hint</strong></summary>

You can use fetch() to make your GET requests and you should be expecting the response back as a list of tracks in JSON format.

It is best to convert the JSON to an array of tracks, the array should be a list of track objects with the following properties: id, name, artist, album, and uri.

Common errors to avoid:

- Invalid access tokens: Make sure that you use valid access tokens before making your requests.
- Incorrect API endpoint: Make sure you use /v1/search?type=TRACK as outlined in the documentation: https://developer.spotify.com/documentation/web-api
- Incorrectly formatted requests: Refer to the Endpoint Reference documentation for guidance on how to format your requests.

</details>

---

## 12. Save a User's Playlist

Create a method that writes the user's custom playlist in Jammming to their Spotify account. The user should be able to save their custom playlist from Jammming into their account when they click the "Save To Spotify" button.

To implement this feature, you will need to make requests to create new playlists on the user's Spotify account with the playlist's custom name and add the tracks from the user's custom playlist to the new playlist.

<details>
<summary><strong>💡 Hint</strong></summary>

To hit the necessary endpoints, you'll need the user's ID, you can make a request that returns the user's Spotify username by making a request to https://api.spotify.com/v1/me.

To create a new playlist, you will need to make a POST request to the /v1/users/{user_id}/playlists endpoint. You can set the name and description of the new playlist in the request body.

To add tracks to the new playlist, you will need to make a POST request to the //v1/users/{user_id}/playlists/{playlist_id}/tracks endpoint. You can provide a list of track IDs in the request body to add them to the playlist.

</details>

---

## 13. Testing and Debugging

Test often and test early. Testing frequently during the development process can help you identify issues and bugs sooner, making them easier and less time-consuming to fix. Wrap up your project by testing and debugging each component.

Identify the components and functionalities of your project that need to be tested.
Create test cases
Execute the test cases
Identify any issues or bugs that need to be fixed
Implement your fix and perform a final test to ensure that all components and functionalities of your project are working as expected

<details>
<summary><strong>💡 Hint</strong></summary>

Consider documenting your testing and debugging process, including test cases and their results, to help you better understand and improve your code.

To help identify and resolve problems in your code, utilize debugging tools like React Developer Tools.

Additionally, you may find it helpful to set breakpoints throughout your code to pause execution and evaluate the state of your application. Consider adding logging statements to provide additional information about your application, particularly in cases where the issue is not immediately apparent.

</details>

---

## 14. Review Your Project

Congratulations! You've completed the Jammming project.

You've come a long way. Let's review what you've accomplished:

- You gained a strong understanding of React.js by creating a web application that interacts with the Spotify API.
- You gained an understanding of how to interact with an external API to make HTTP requests and make changes to a user's account.
- You implemented user authentication that allows your web app users to log in and securely interact with the account.
- Over the course of this project, you utilized the React library, importing and exporting components, the Spotify API, props, and more to achieve a fully functioning music web application.

You should be proud of how far you've come. Completing this project is a significant accomplishment for any learners looking to gain practical experience!
