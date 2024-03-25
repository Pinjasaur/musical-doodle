import React from "react";
import { render, screen } from "@testing-library/react";
import { IndexComponent, DetailComponent } from "./App";
import { BrowserRouter } from "react-router-dom";

const mocks: { user: string; mbid: string; tracks: any; track: any } = {
  user: "does-not-exist",
  mbid: "untitled+unnamed",
  tracks: [
    {
      name: "Test Track",
      artist: {
        name: "Test Artist",
      },
      playcount: "1",
    },
  ],
  track: {
    trackName: "Test Track",
    artistName: "Test Artist",
    trackId: "abc123",
  },
};

test("loads tracks", () => {
  render(<IndexComponent tracks={mocks.tracks} user={mocks.user} />, {
    wrapper: BrowserRouter,
  });
  const $tracks = screen.getByTestId("tracks");
  expect($tracks).toHaveTextContent(
    `${mocks.tracks[0].name} by ${mocks.tracks[0].artist.name}`,
  );
});

test("loads track (dark mode)", () => {
  render(
    <DetailComponent track={mocks.track} mbid={mocks.mbid} isDarkMode={true} />,
    { wrapper: BrowserRouter },
  );
  const $tracks = screen.getByTestId("track");
  expect($tracks).toHaveTextContent(
    `${mocks.track.trackName} by ${mocks.track.artistName}`,
  );
  expect($tracks).toHaveTextContent(`&theme=dark`);
});

test("loads track (light mode)", () => {
  render(
    <DetailComponent
      track={mocks.track}
      mbid={mocks.mbid}
      isDarkMode={false}
    />,
    { wrapper: BrowserRouter },
  );
  const $tracks = screen.getByTestId("track");
  expect($tracks).toHaveTextContent(
    `${mocks.track.trackName} by ${mocks.track.artistName}`,
  );
  expect($tracks).toHaveTextContent(`&theme=light`);
});
