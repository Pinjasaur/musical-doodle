# Last.fm & Song.link API Integration

Basic idea: want to leverage to Last.fm API to pull what music I've been listening to for e.g. the past week and generate nice little song.link UI widgets. I've done a bit of research around this before and _I believe_ the (albeit somewhat hacky) steps are:

- [x] Create Last.fm account & API key (open question: is this API key supposed to be secret?)
- [ ] Grab the JSON API endpoint results for the top tracks for the past week
- [ ] Use the artist + track string to query the iTunes/Apple Music API for _their_ ID
- [ ] Plop that into the song.link embed API

> Note: the weirdness in the middle steps are because Last.fm returns a [MusicBrainz ID (MBID)](https://musicbrainz.org/doc/MusicBrainz_Identifier) which, from my research, doesn't actually get us anywhere useful.

## Resources

- https://odesli.co/
    - Service behind album.link, song.link
- https://www.last.fm/api
    - Last.fm API docs

## Usage

- `nvm install`
- `npm install`
- `npm start`
- TODO: .env or similar for API key?

## Bruno

For this project I'm trying out [Bruno](https://www.usebruno.com/) which is an API client similar to Postman or Insomnia, except it all lives locally in the repo in the `bruno/` directory.

If you're on a fresh clone you might need to create the `.env` symlink for Bruno from the CRA-compliant `.env.local`:

```sh
ln -s $PWD/.env.local bruno/.env
```


<details>
<summary>Copypasta from CRA install</summary>

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
</details>
