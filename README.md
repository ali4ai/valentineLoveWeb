# Valentine Website Plan for Sumia ❤️

A single-page romantic interactive website with:

- Landing page with romantic entry
- Story slide deck/timeline cards
- Memories and love message section
- Multi-step questionnaire
- Firebase Firestore submission support
- Final surprise screen with confetti

## Run locally

```bash
python3 -m http.server 4173
```

Open: `http://localhost:4173`

## Firebase setup

Edit `app.js` and replace all `REPLACE_ME` values inside `firebaseConfig`.

When config is present, questionnaire responses are uploaded to Firestore collection:

- `valentineResponses`

If Firebase config is not set, answers are saved to browser `localStorage` as a fallback.
