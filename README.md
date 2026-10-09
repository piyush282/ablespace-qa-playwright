AbleSpace Playwright Test

Automated UI test for the AbleSpace staging application using Playwright and TypeScript.

The test covers a student’s Reading goal workflow: open Take Data, select a step, open the Graph tab, and verify that the selected step and today’s date are displayed.

Requirements

Node.js 18 or newer

Google Chrome

Playwright

An existing AbleSpace staging account

A student named Demo Student 3 with a Reading goal containing the step Gets hands wet

Setup

Install project dependencies:

npm install

Install Playwright browsers:

npx playwright install

Create a .env file using .env.example as a template:

BASE_URL=https://staging.ablespace.io
QA_EMAIL=your_test_email
QA_PASSWORD=your_test_password

Credentials are optional fallbacks. The test uses an already-authenticated Chrome session.

Login

The staging login uses a Firebase CAPTCHA/bot check that can prevent automated login. To avoid automating the CAPTCHA, log in manually using a separate Chrome profile.

Close existing Chrome windows if necessary.

Open Windows PowerShell and start Chrome with remote debugging enabled:

& "C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222 --user-data-dir="C:\temp\chrome-qa"

In the new Chrome window, open:

https://staging.ablespace.io/signin

Log in manually and leave the Chrome window open.

Run the test from a second terminal.

Note: The test must be configured to connect to the Chrome debugging session on port 9222. Starting Chrome with this command alone does not automatically connect Playwright to it.

Run the Test

Run the test suite:

npx playwright test

Open the HTML report:

npx playwright show-report

Test Coverage

The test verifies that:

The Caseload page opens.

Demo Student 3 is available.

Take Data opens for the selected student.

The Gets hands wet step can be selected.

The selected step is marked as checked.

The Graph tab displays Gets hands wet.

The graph displays today's date in MM/DD format.

Test Data and Limitations

The test uses an existing staging account and student.

Account registration is not automated.

Each run may record or modify session data on staging. Avoid unnecessary repeated runs.

The test depends on the specified student, Reading goal, and step being available.

Automated login may be blocked by the staging CAPTCHA/bot protection.
