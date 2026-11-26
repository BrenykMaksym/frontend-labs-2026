const SIGNALS = ['red', 'yellow', 'green'];

function doGet(e) {
  if (e?.parameter?.action !== 'list') {
    return apiError_('unknown_action', 'Unsupported action');
  }
  try {
    const rows = getSheet_().getDataRange().getValues().slice(1);
    return apiSuccess_({
      trafficLights: rows.filter(([id]) => id !== '')
        .map(([id, currentSignal]) => ({ id, currentSignal })),
    });
  } catch (error) {
    console.error(error);
    return apiError_('storage_error', 'Could not read TRAFFIC_LIGHTS');
  }
}

function doPost(e) {
  let command;
  try {
    command = JSON.parse(e?.postData?.contents);
  } catch {
    return apiError_('bad_request', 'Expected a JSON object');
  }
  if (command?.action !== 'updateState') {
    return apiError_('unknown_action', 'Unsupported action');
  }

  const { id, currentSignal } = command;
  if (typeof id !== 'string' || !id.trim() || !SIGNALS.includes(currentSignal)) {
    return apiError_('bad_request', 'Expected an id and a valid signal');
  }

  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(5000);
    const sheet = getSheet_();
    const row = sheet.getDataRange().getValues().slice(1).findIndex(([recordId]) => recordId === id);
    if (row === -1) return apiError_('not_found', 'Traffic light not found');

    sheet.getRange(row + 2, 2).setValue(currentSignal);
    SpreadsheetApp.flush();
    return apiSuccess_({ trafficLight: { id, currentSignal } });
  } catch (error) {
    console.error(error);
    return apiError_('storage_error', 'Could not update TRAFFIC_LIGHTS');
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}

function getSheet_() {
  const id = PropertiesService.getScriptProperties().getProperty('DB_SPREADSHEET_ID');
  if (!id) throw new Error('DB_SPREADSHEET_ID is missing');
  const sheet = SpreadsheetApp.openById(id).getSheetByName('TRAFFIC_LIGHTS');
  if (!sheet) throw new Error('TRAFFIC_LIGHTS is missing');

  const [idHeader, signalHeader] = sheet.getRange('A1:B1').getValues()[0];
  if (idHeader !== 'id' || signalHeader !== 'current_signal') {
    throw new Error('Unexpected sheet headers');
  }
  return sheet;
}

function apiSuccess_(data) {
  return json_({ ok: true, data, error: null });
}

function apiError_(code, message) {
  return json_({ ok: false, data: null, error: { code, message } });
}

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
