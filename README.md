# Valentine Website Plan for Sumia ❤️

A single-page romantic interactive website with:

- Landing page with romantic entry
- Story slide deck/timeline cards with **portrait images**
- Memories and love message section + portrait gallery
- Multi-step questionnaire with emoji reactions
- Firebase Firestore submission support
- Final surprise screen with confetti

## Run locally

```bash
python3 -m http.server 4173
```

Open: `http://localhost:4173`

## Add your portrait card images

Put your portrait images in this folder:

- `images/cards/card1.jpg`
- `images/cards/card2.jpg`
- `images/cards/card3.jpg`
- `images/cards/card4.jpg`
- `images/cards/card5.jpg`

The app uses these by default for the 5 love-story cards and memory gallery.
If any file is missing, it automatically falls back to built-in sample portraits.

## Firebase setup

Edit `app.js` and replace all `REPLACE_ME` values inside `firebaseConfig`.

When config is present, questionnaire responses are uploaded to Firestore collection:

- `valentineResponses`

If Firebase config is not set, answers are saved to browser `localStorage` as a fallback.
