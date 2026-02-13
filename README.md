# Valentine Website Plan for Sumia ❤️

A single-page romantic interactive website with:

- Landing page with romantic entry
- Story slide deck/timeline cards with portrait images (supports 1024×1536 love-letter cards)
- Memories and love message section + portrait gallery
- Multi-step questionnaire with text, paragraph, slider, and emoji multiple-choice questions
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

These are displayed using `object-fit: contain`, so portrait cards with text (like 1024×1536) are shown fully without cropping important words.

## Firebase setup

Edit `app.js` and replace all `REPLACE_ME` values inside `firebaseConfig`.

When config is present, questionnaire responses are uploaded to Firestore collection:

- `valentineResponses`

If Firebase config is not set, answers are saved to browser `localStorage` as a fallback.
