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

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path=":mbid" element={<Detail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
}

function Index() {
  const [tracks, setTracks] = useState([])
  useEffect(() => {
    ;(async () => {
      const { data: res } = await Axios.get(`http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${process.env.REACT_APP_LAST_FM_USER}&api_key=${process.env.REACT_APP_LAST_FM_API_KEY}&format=json&period=1month&limit=10`)
      setTracks(res.toptracks.track)
    })()
  }, [])

  return (
    <div>
      <h2>Top Tracks For The Last Month</h2>
      <ol>
      {tracks.map((track: any) => {
        // _sigh_, not all results have a MusicBrainz ID...
        return <li key={track.mbid || track.artist.mbid || (track.name + " by " + track.artist.name)}>
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
      {(mbid !== undefined && track !== undefined && <>
      <h2>{track.trackName} by {track.artistName}</h2>

      <p>Here&rsquo;s what the Song.link widget looks like:</p>

      <iframe title={`${track.trackName} by ${track.artistName}`} width="100%" height="150" src={`https://embed.odesli.co/?url=https%3A%2F%2Fsong.link%2Fi%2F${track.trackId}&theme=${isDarkMode() ? 'dark' : 'light'}`} allowFullScreen sandbox="allow-same-origin allow-scripts allow-presentation allow-popups allow-popups-to-escape-sandbox" allow="clipboard-read; clipboard-write"></iframe>

      <hr />

      <p>And here&rsquo;s the code to implement it:</p>

      <pre>
        <code>
          {`<iframe width="100%" height="150" src="https://embed.odesli.co/?url=https%3A%2F%2Fsong.link%2Fi%2F${track.trackId}&theme=${isDarkMode() ? 'dark' : 'light'}" allowfullscreen sandbox="allow-same-origin allow-scripts allow-presentation allow-popups allow-popups-to-escape-sandbox" allow="clipboard-read; clipboard-write"></iframe>`}
        </code>
      </pre>
      </>) || <>
      <p>Hmmm&hellip;looks like that didn&rsquo;t work. Try again or <Link to="/">go home</Link>.</p>
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
