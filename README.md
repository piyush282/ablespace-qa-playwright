# AbleSpace Playwright Test

Automates one flow on staging.ablespace.io with Playwright and TypeScript:
open Take Data for a student, select a step on the Reading goal, open the
Graph tab, and verify the step and today's date are shown.

## Requirements
- Node.js 18 or newer and Google Chrome
- An existing staging account (signup is not automated)
- A student named "Demo Student 3" with a Reading goal that has the step "Gets hands wet"

## Setup
1. `npm install`
2. `npx playwright install`
3. Copy `.env.example` to `.env`. Credentials are used only as a fallback if
   the browser is not logged in:
```
   BASE_URL=https://staging.ablespace.io
   QA_EMAIL=your_test_email
   QA_PASSWORD=your_test_password
```

## Login (important)
The login page has a bot check (Firebase captcha), so the test connects to a
Chrome window that you log in to by hand:
1. Close all Chrome windows.
2. Start Chrome with a debugging port and a separate profile (Windows PowerShell):
   `& "C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222 --user-data-dir="C:\temp\chrome-qa"`
3. In that window, open https://staging.ablespace.io/signin and log in by hand.
   Leave the window open.

## Run
In a second terminal:
- `npx playwright test`
- `npx playwright show-report` opens the HTML report

## What is tested
- Caseload opens and Demo Student 3 is listed
- Take Data opens for that student
- Selecting "Gets hands wet" marks the step as checked
- The Graph tab shows "Gets hands wet" and today's date (MM/DD)

## Notes
- Each run records a session on staging, so run it only a few times.
- Locators use roles, visible text and a test id (`graph-tab`), not generated ids.
- `.env` is listed in `.gitignore` and must not be uploaded.