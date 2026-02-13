# Romantic Valentine Website ❤️

This build now follows a 6-section storytelling flow:

1. Romantic Hero Intro (full-screen)
2. Two Worlds split gallery
3. Love Merge animation
4. Memory collage gallery
5. Love Message with typewriter
6. Final Romantic Ending with heart burst

## Run locally

```bash
python3 -m http.server 4173
```

Open: `http://localhost:4173`

## Add your own images

Primary cards:
- `images/cards/card1.png` ... `images/cards/card11.png`

Personal photos:
- `images/personal/card1.jpg` ... `images/personal/card6.jpg`

## Add your own audio

Place your file (example):
- `audio/our-song.mp3`

Then in `app.js` set:

```js
const customAudio = "audio/our-song.mp3";
```

If files are missing, fallback images appear automatically.
