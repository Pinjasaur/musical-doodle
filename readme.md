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
