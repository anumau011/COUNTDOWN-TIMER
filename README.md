# Countdown Timer

Simple, responsive countdown timer web page. Pick a future date and time and the timer will count down to that moment.

Files
- `index.html` — main HTML file. Links to the CSS and JS files.
- `styles.css` — all styles (extracted from the original single-file version).
- `script.js` — JavaScript logic (timer, display, input handling).

How to run
1. Open `index.html` in your browser (double-click or use "Open File" in the browser).
2. Select a future date & time (the input enforces at least 1 minute ahead).
3. Click "Start Countdown" to begin.

Notes
- The JS uses modern DOM APIs and runs in any recent browser.
- If you want to serve it from a simple local server instead of opening the file directly, you can run (with Python installed):

```cmd
# from the `COUNTDOWN TIMER` folder
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

License
MIT
