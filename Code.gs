/**
 * ================================================================
 * AeroSkills — Google Apps Script Web App
 * ================================================================
 * Handles form submissions from the AeroSkills React application.
 *
 * Routes (via `type` POST parameter):
 *   type=contact  → appends row to "Contact Submissions" sheet
 *   type=feedback → appends row to "Feedback Submissions" sheet
 *
 * SETUP STEPS (see full guide in setup_guide.md):
 *   1. Open Google Sheets → create two tabs named exactly:
 *        "Contact Submissions"   and   "Feedback Submissions"
 *   2. Copy this file into Extensions → Apps Script
 *   3. Replace SPREADSHEET_ID below with your sheet's ID
 *   4. Deploy → New deployment → Web app
 *        Execute as: Me
 *        Who has access: Anyone
 *   5. Copy the Web App URL → paste into your React .env file
 * ================================================================
 */

// ─── CONFIG ──────────────────────────────────────────────────────────────────
// Find your Spreadsheet ID in the Google Sheets URL:
// https://docs.google.com/spreadsheets/d/  <<<SPREADSHEET_ID>>>  /edit
const SPREADSHEET_ID = "REPLACE_WITH_YOUR_SPREADSHEET_ID";

const SHEETS = {
  contact:  "Contact Submissions",
  feedback: "Feedback Submissions",
};
// ─────────────────────────────────────────────────────────────────────────────


// ─── Entry Points ─────────────────────────────────────────────────────────────

/**
 * GET handler — simple health-check so you can verify the script is live.
 * Visit the Web App URL in your browser to test.
 */
function doGet(e) {
  return jsonResponse({ success: true, message: "AeroSkills API is live ✅" });
}

/**
 * POST handler — reads `type` from form body and routes to the correct sheet.
 * All errors are caught and returned as JSON so the React app can show messages.
 */
function doPost(e) {
  try {
    const params = e.parameter; // URL-encoded form fields land here
    const type   = (params.type || "contact").toLowerCase().trim();

    if (type === "feedback") {
      return saveFeedback(params);
    } else {
      return saveContact(params);
    }
  } catch (err) {
    return jsonResponse({ success: false, message: "Server error: " + err.message });
  }
}


// ─── Sheet Writers ────────────────────────────────────────────────────────────

/**
 * Appends a contact form submission to the "Contact Submissions" sheet.
 * Auto-creates the header row with styled formatting on first use.
 */
function saveContact(params) {
  const headers = ["Timestamp (IST)", "Full Name", "Email", "Goal", "Message"];
  const sheet   = getSheet(SHEETS.contact, headers);

  sheet.appendRow([
    formatTimestamp(),
    sanitize(params.fullName),
    sanitize(params.email),
    sanitize(params.goal),
    sanitize(params.message),
  ]);

  return jsonResponse({
    success: true,
    message: "Message received! We will get back to you within 24 hours.",
  });
}

/**
 * Appends a feedback form submission to the "Feedback Submissions" sheet.
 * Auto-creates the header row with styled formatting on first use.
 */
function saveFeedback(params) {
  const headers = ["Timestamp (IST)", "Name", "Email", "Rating (1–5)", "Feedback"];
  const sheet   = getSheet(SHEETS.feedback, headers);

  sheet.appendRow([
    formatTimestamp(),
    sanitize(params.name),
    sanitize(params.email),
    sanitize(params.rating),
    sanitize(params.feedback),
  ]);

  return jsonResponse({
    success: true,
    message: "Thank you for your feedback! It helps us grow.",
  });
}


// ─── Utilities ────────────────────────────────────────────────────────────────

/**
 * Opens the named sheet. If it has no rows yet, writes and styles the header.
 * Throws a descriptive error if the tab doesn't exist (so you can fix it easily).
 */
function getSheet(sheetName, headers) {
  const ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    throw new Error(
      'Sheet tab "' + sheetName + '" not found. ' +
      'Create a tab with that exact name in your spreadsheet.'
    );
  }

  // Write header row on first use
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);

    // Style the header: dark background, white bold text
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange
      .setBackground("#171710")
      .setFontColor("#FFFFFF")
      .setFontWeight("bold")
      .setFontSize(11);

    // Freeze the header row so it stays visible while scrolling
    sheet.setFrozenRows(1);

    // Auto-resize columns for readability
    sheet.autoResizeColumns(1, headers.length);
  }

  return sheet;
}

/**
 * Returns the current time formatted in IST (Asia/Kolkata).
 * Example: "3 Aug 2026, 2:30 pm"
 */
function formatTimestamp() {
  return new Date().toLocaleString("en-IN", {
    timeZone:  "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });
}

/**
 * Trims whitespace and falls back to empty string if the value is undefined.
 * Prevents undefined from appearing in sheet cells.
 */
function sanitize(value) {
  return (value || "").toString().trim();
}

/**
 * Wraps any plain object as a JSON ContentService response.
 * Google's servers automatically add CORS headers for Web Apps deployed
 * with "Anyone" access, so no manual Access-Control headers are needed.
 */
function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
