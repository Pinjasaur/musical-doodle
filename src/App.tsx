import { useState, useEffect } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Axios from "axios";

export default function App() {
  return (
    <div>
      <h1>Last.fm & Song.link Integration</h1>

      <p>
        Pull in recent top tracks from the Last.fm API, query the iTunes Search
        API for a track ID, and finally build a Song.link embed UI widget.
      </p>

      <p>
        If you happen to know the <Link to="https://musicbrainz.org/doc/MusicBrainz_Identifier">MusicBrainz ID</Link>{' '}
        you can use that in the URL directly e.g. <code>/musicbrainz-id-goes-here</code>.
      </p>

      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path=":mbid" element={<Detail />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}

function Index() {
  const [tracks, setTracks] = useState([])
  useEffect(() => {
    ;(async () => {
      const { data: res } = await Axios.get(`http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=pinjasaur&api_key=${process.env.REACT_APP_LAST_FM_API_KEY}&format=json&period=1month&limit=10`)
      setTracks(res.toptracks.track)
    })()
  }, [])

  return (
    <div>
      <h2>Index</h2>
      <ol>
      {tracks.map((track: any) => {
        return <li>
          <Link to={[track.artist.name, track.name].join(" ").split(" ").join("+")}>{track.name} by {track.artist.name}</Link> (played {track.playcount} time{track.playcount > 1 && 's'})
          </li>
      })}
      </ol>
    </div>
  );
}

function Detail() {
  return (
    <div>
      <h2>Detail</h2>
    </div>
  );
}

function NotFound() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go home</Link>
      </p>
    </div>
  );
}
