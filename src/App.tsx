import { useState, useEffect } from "react";
import { Routes, Route, Outlet, Link, useParams } from "react-router-dom";
import Axios from "axios";

export default function App() {
  const example = "Oasis Wonderwall (Remastered)"

  return (
    <div>
      <h1>Last.fm & Song.link Integration</h1>

      <p>
        Pull in recent top tracks from the Last.fm API, query the iTunes Search
        API for a track ID, and finally build a Song.link embed UI widget.
      </p>

      <p>
        You can also directly put the track (and artist) name in the URL, delimited by pluses, like so:{' '}
        <Link to={example.split(" ").join("+")}>/{example.split(" ").join("+")}</Link>
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
      <h2>Top Tracks For The Last Month</h2>
      <ol>
      {tracks.map((track: any) => {
        // _sigh_, not all results have a MusicBrainz ID...
        return <li key={track.mbid || (track.name + " by " + track.artist.name)}>
          <Link to={[track.artist.name, track.name].join(" ").split(" ").join("+")}>{track.name} by {track.artist.name}</Link> (played {track.playcount} time{track.playcount > 1 && 's'})
          </li>
      })}
      </ol>
    </div>
  );
}

function Detail() {
  const { mbid } = useParams()
  const [track, setTrack] = useState(undefined as any)
  useEffect(() => {
    ;(async () => {
      const { data: res } = await Axios.get(`https://itunes.apple.com/search?term=${encodeURIComponent(mbid!.split("+").join(" "))}&country=US&entity=song`)
      setTrack(res.results[0])
    })()
  }, [mbid])
  const isDarkMode = () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;


  return (
    <div>
      {mbid !== undefined && track !== undefined && <>
      <h2>{track.trackName} by {track.artistName}</h2>

      <p>Here&rsquo;s what the Song.link widget looks like:</p>

      <iframe width="100%" height="150" src={`https://embed.odesli.co/?url=https%3A%2F%2Fsong.link%2Fi%2F${track.trackId}&theme=${isDarkMode() ? 'dark' : 'light'}`} allowFullScreen sandbox="allow-same-origin allow-scripts allow-presentation allow-popups allow-popups-to-escape-sandbox" allow="clipboard-read; clipboard-write"></iframe>

      <hr />

      <p>And here&rsquo;s the code to implement it:</p>

      <pre>
        <code>
          {`<iframe width="100%" height="150" src="https://embed.odesli.co/?url=https%3A%2F%2Fsong.link%2Fi%2F${track.trackId}&theme=${isDarkMode() ? 'dark' : 'light'}" allowfullscreen sandbox="allow-same-origin allow-scripts allow-presentation allow-popups allow-popups-to-escape-sandbox" allow="clipboard-read; clipboard-write"></iframe>`}
        </code>
      </pre>
      </> || <>
      <p>Hmmm&hellip;looks like that didn't work. Try again or <Link to="/">go home</Link>.</p>
      </>}
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
