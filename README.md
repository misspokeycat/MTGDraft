MTGDraft
========

Node JS application to simulate Magic: The Gathering drafts (in multiplayer)

*This doesn't actually work yet*

`index.js` contains the server-side stuff.
`public/script.js` has the client-side logic.

`script/cards.js` takes care of creating random boosters (for now) and will eventually contain all the card-related logic. Cards are saved in JSON format but should probably be saved to a database (it would make creating decks a lot easier)

`views/room.jade` handles the UI for private rooms.

There's a lot left to do.
