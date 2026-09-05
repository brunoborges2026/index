// --- VETORIAL IMÓVEIS: GOOGLE APPS SCRIPT BACKEND ---
const SPREADSHEET_ID = '1pWwlZdhMJfz5cxPHgCc4SUqwlfOHVV5gt4wX_8ZtaMg';
const FOLDER_ID = '1MVFxR2sKFjPTuuP4mm4n-h2X0kfMl9W0';

// --- CORS PREFLIGHT HANDLER ---
function doOptions(e) {
  // Isso não funciona 100% no Apps Script para evitar CORS,
  // mas é uma boa prática manter caso o modo mude
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;

    if (action === 'login') return handleLogin(data);
    if (action === 'setPassword') return handleSetPassword(data);

    // Admin Actions
    if (action === 'getUsers') return handleAdminUsers(data);
    if (action === 'adminAddUser') return adminAddUser(data);
    if (action === 'adminResetUser') return adminResetUser(data);
    if (action === 'adminDeleteUser') return adminDeleteUser(data);

    // Form/Dashboard Actions
    if (action === 'getForms') return getDashboardData(data);
    if (action === 'createForm') return createForm(data);
    if (action === 'getFormByToken') return getFormByToken(data);
    if (action === 'signForm') return signForm(data);

    return jsonResponse({ error: 'Ação desconhecida' }, 400);
  } catch (error) {
    return jsonResponse({ error: error.toString() }, 500);
  }
}

function handleLogin(data) {
  const email = data.email.trim().toLowerCase();
  const pass = data.password;

  const sheet = getSheet('Users');
  const rows = sheet.getDataRange().getValues();

  for (let i = 1; i < rows.length; i++) { // Skip header
    const rowEmail = (rows[i][0] || '').toString().toLowerCase();
    const rowPass = (rows[i][1] || '').toString();

    if (rowEmail === email) {
      if (rowPass === '') {
        return jsonResponse({ isFirstAccess: true, success: false });
      }
      if (rowPass === pass) {
        return jsonResponse({ success: true });
      } else {
        return jsonResponse({ success: false, error: 'Senha incorreta.' });
      }
    }
  }
  return jsonResponse({ success: false, error: 'Usuário não encontrado.' });
}

function handleSetPassword(data) {
  const email = data.email.trim().toLowerCase();
  const pass = data.password;

  const sheet = getSheet('Users');
  const rows = sheet.getDataRange().getValues();

  for (let i = 1; i < rows.length; i++) {
    const rowEmail = (rows[i][0] || '').toString().toLowerCase();
    const rowPass = (rows[i][1] || '').toString();

    if (rowEmail === email) {
      if (rowPass === '') {
        sheet.getRange(i + 1, 2).setValue(pass); // Save password
        return jsonResponse({ success: true });
      } else {
        return jsonResponse({ success: false, error: 'Senha já definida anteriormente.' });
      }
    }
  }
  return jsonResponse({ success: false, error: 'Usuário não encontrado.' });
}

// ==========================================
// ADMIN FUNCTIONS
// ==========================================
const ADMIN_USER = 'vetorial';
const ADMIN_PASS = 'vetorial2026';

function verifyAdmin(user, pass) {
  return user === ADMIN_USER && pass === ADMIN_PASS;
}

function handleAdminUsers(data) {
  if (!verifyAdmin(data.adminUser, data.adminPass)) return jsonResponse({success: false, error: 'Acesso Negado'});
  const sheet = getSheet('Users');
  const rows = sheet.getDataRange().getValues();
  let users = [];
  for (let i = 1; i < rows.length; i++) {
    const email = (rows[i][0] || '').toString();
    if (email !== '') {
        const pass = (rows[i][1] || '').toString();
        users.push({ email: email, hasPassword: pass !== '' });
    }
  }
  return jsonResponse({ success: true, users: users });
}

function adminAddUser(data) {
  if (!verifyAdmin(data.adminUser, data.adminPass)) return jsonResponse({success: false, error: 'Acesso Negado'});
  const sheet = getSheet('Users');
  const email = data.newEmail.trim().toLowerCase();

  // Check if exists
  const rows = sheet.getDataRange().getValues();
  for(let i=1; i<rows.length; i++) {
    const rowEmail = (rows[i][0] || '').toString().toLowerCase();
    if(rowEmail === email) return jsonResponse({success:false, error:'E-mail já cadastrado.'});
  }

  sheet.appendRow([email, '']);
  return jsonResponse({success:true});
}

function adminResetUser(data) {
  if (!verifyAdmin(data.adminUser, data.adminPass)) return jsonResponse({success: false, error: 'Acesso Negado'});
  const sheet = getSheet('Users');
  const rows = sheet.getDataRange().getValues();
  for(let i=1; i<rows.length; i++) {
    const rowEmail = (rows[i][0] || '').toString().toLowerCase();
    if(rowEmail === data.emailToReset.toLowerCase()) {
      sheet.getRange(i+1, 2).setValue('');
      return jsonResponse({success:true});
    }
  }
  return jsonResponse({success:false});
}

function adminDeleteUser(data) {
  if (!verifyAdmin(data.adminUser, data.adminPass)) return jsonResponse({success: false, error: 'Acesso Negado'});
  const sheet = getSheet('Users');
  const rows = sheet.getDataRange().getValues();
  for(let i=1; i<rows.length; i++) {
    const rowEmail = (rows[i][0] || '').toString().toLowerCase();
    if(rowEmail === data.emailToDelete.toLowerCase()) {
      sheet.deleteRow(i+1);
      return jsonResponse({success:true});
    }
  }
  return jsonResponse({success:false});
}

// ==========================================
// FORM FUNCTIONS
// ==========================================

function createForm(data) {
  const sheet = getSheet('Forms');
  const timestamp = new Date().toISOString();
  // Columns: ID(Token), BrokerEmail, Status, OwnerName, Phone, DataJSON, CreatedAt, SignedAt, SignatureURL, SelfieURL, Lat, Lon, UserAgent
  sheet.appendRow([
    data.token,
    data.brokerEmail,
    'Pendente',
    data.ownerName,
    data.phone,
    data.dataJson,
    timestamp,
    '', '', '', '', '', ''
  ]);
  return jsonResponse({ success: true });
}

function getDashboardData(data) {
  const sheet = getSheet('Forms');
  const rows = sheet.getDataRange().getValues();
  let forms = [];

  // If admin, they see all forms. If broker, they see only theirs.
  const isAdmin = verifyAdmin(data.adminUser, data.adminPass);

  for (let i = rows.length - 1; i > 0; i--) { // Reverse order (newest first)
    const formToken = (rows[i][0] || '').toString();
    const formEmail = (rows[i][1] || '').toString().toLowerCase();
    if (formToken !== '' && (isAdmin || formEmail === data.brokerEmail.toLowerCase())) {
      forms.push({
        token: formToken,
        status: (rows[i][2] || '').toString(),
        ownerName: (rows[i][3] || '').toString(),
        phone: (rows[i][4] || '').toString(),
        createdAt: (rows[i][6] || '').toString()
      });
    }
  }
  return jsonResponse({ success: true, forms: forms });
}

function getFormByToken(data) {
  const sheet = getSheet('Forms');
  const rows = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    const formToken = (rows[i][0] || '').toString();
    if (formToken === data.token) {
      return jsonResponse({
        found: true,
        brokerEmail: (rows[i][1] || '').toString(),
        status: (rows[i][2] || '').toString(),
        dataJson: (rows[i][5] || '').toString(),
        signedAt: (rows[i][7] || '').toString(),
        signatureUrl: (rows[i][8] || '').toString(),
        selfieUrl: (rows[i][9] || '').toString(),
        lat: (rows[i][10] || '').toString(),
        lon: (rows[i][11] || '').toString(),
        userAgent: (rows[i][12] || '').toString()
      });
    }
  }
  return jsonResponse({ found: false });
}

function signForm(data) {
  const sheet = getSheet('Forms');
  const rows = sheet.getDataRange().getValues();

  for (let i = 1; i < rows.length; i++) {
    const formToken = (rows[i][0] || '').toString();
    if (formToken === data.token) {
      const status = (rows[i][2] || '').toString();
      if (status === 'Assinada') {
        return jsonResponse({ success: false, error: 'Esta ficha já foi assinada.' });
      }

      // Save images to drive
      const folder = DriveApp.getFolderById(FOLDER_ID);

      let signatureUrl = '';
      if (data.signatureBase64) {
        const sigBlob = convertBase64ToBlob(data.signatureBase64, `assinatura_${data.token}.png`);
        const sigFile = folder.createFile(sigBlob);
        sigFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        // Em vez do link padrão, gera um link de download direto
        signatureUrl = "https://drive.google.com/uc?export=view&id=" + sigFile.getId();
      }

      let selfieUrl = '';
      if (data.selfieBase64) {
        const selBlob = convertBase64ToBlob(data.selfieBase64, `selfie_${data.token}.png`);
        const selFile = folder.createFile(selBlob);
        selFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        selfieUrl = "https://drive.google.com/uc?export=view&id=" + selFile.getId();
      }

      const timestamp = new Date().toISOString();

      // Update row
      sheet.getRange(i + 1, 3).setValue('Assinada'); // Status
      sheet.getRange(i + 1, 8).setValue(timestamp); // SignedAt
      sheet.getRange(i + 1, 9).setValue(signatureUrl);
      sheet.getRange(i + 1, 10).setValue(selfieUrl);
      sheet.getRange(i + 1, 11).setValue(data.lat || '');
      sheet.getRange(i + 1, 12).setValue(data.lon || '');
      sheet.getRange(i + 1, 13).setValue(data.userAgent || '');

      return jsonResponse({ success: true });
    }
  }

  return jsonResponse({ success: false, error: 'Ficha não encontrada.' });
}

// ==========================================
// HELPERS
// ==========================================

function getSheet(name) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }

  // Initialize headers if completely empty
  if (sheet.getLastRow() === 0) {
    if (name === 'Users') sheet.appendRow(['Email', 'Password']);
    if (name === 'Forms') sheet.appendRow(['Token', 'BrokerEmail', 'Status', 'OwnerName', 'Phone', 'DataJSON', 'CreatedAt', 'SignedAt', 'SignatureURL', 'SelfieURL', 'Lat', 'Lon', 'UserAgent']);
  }
  return sheet;
}

function jsonResponse(data, code = 200) {
  // CORS wrapper is handled primarily by setting execution as "Me" in Apps Script
  // But setting the mime type properly is needed
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function convertBase64ToBlob(b64, filename) {
  const parts = b64.split(';base64,');
  const contentType = parts[0].split(':')[1];
  const decoded = Utilities.base64Decode(parts[1]);
  return Utilities.newBlob(decoded, contentType, filename);
}
