out = setTimeout(() => callback(), 1000)
}})()
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
const initialData = JSON.parse(fs.readFileSync(storeFilePath, 'utf-8'))
store.chats = initialData.chats || []
store.contacts = initialData.contacts || {}
store.messages = initialData.messages || {}
store.presences = initialData.presences || {}
setInterval(() => {
debounceWrite(() => {
const formattedData = JSON.stringify({
chats: store.chats || [],
contacts: store.contacts || {},
messages: store.messages || {},
presences: store.presences || {}
}, null, 4)
fs.writeFileSync(storeFilePath, formattedData)
})}, 10_000)

const rainbowColors = [
  '#FF0000', // Red
  '#FF7F00', // Orange
  '#FFFF00', // Yellow
  '#00FF00', // Green
  '#0000FF', // Blue
  '#4B0082', // Indigo
  '#9400D3'  // Violet
];

const rainbowText = [
  '(=#####{>==================- '
];

function printRainbowText(text, colors) {
  let colorIndex = 0;
  return text.split('').map(char => {
    const color = colors[colorIndex % colors.length];
    colorIndex++;
    return chalk.hex(color)(char);
  }).join('');
}

rainbowText.forEach(line => {
  console.log(printRainbowText(line, rainbowColors));
});

//===============================================//

global.db = JSON.parse(fs.readFileSync('./data/database.json'))
if (global.db) global.db.data = {
users: {},
chats: {},
erpg: {},
others: {},
settings: {},
...(global.db.data || {})
}

async function saveDocumentSearch() {
const { state, saveCreds } = await useMultiFileAuthState(pathz)
const { version, isLatest } = await fetchLatestBaileysVersion()
const Lyrra = makeWASocket({
logger: pino({ level: "silent" }),
printQRInTerminal: usePairingCode,
auth: state,
version: version,
browser: Browsers.ubuntu("Firefox"),
generateHighQualityLinkPreview: false,
syncFullHistory: false,
markOnlineOnConnect: false,
emitOwnEvents: false
})
Lyrra.ev.on('creds.update', saveCreds)
if (usePairingCode && !Lyrra.authState.creds.registered) {
await responSearchMsg(Lyrra)
}
store.bind(Lyrra.ev)

const processedMessages = new Set()
Lyrra.ev.on('messages.upsert', async (chatUpdate) => {
try {
const mek = chatUpdate.messages[0]
if (!mek.message) return
if (processedMessages.has(mek.key.id)) return
processedMessages.add(mek.key.id)
mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
if (mek.key && mek.key.remoteJid === 'status@broadcast') return
const remoteJid = mek.key.remoteJid
const userId = mek.key.fromMe ? botNumber : mek.key.participant
const currentTimestamp = Date.now()
if (!store.presences) store.presences = {}
store.presences[userId] = { lastOnline: currentTimestamp }
if (!store.messages[remoteJid]) store.messages[remoteJid] = []
const simplifiedMessage = {
key: mek.key,
messageTimestamp: mek.messageTimestamp,
pushName: mek.pushName || null,
message: mek.message
}
store.messages[remoteJid].push(simplifiedMessage)
if (store.messages[remoteJid].length > 50) {
store.messages[remoteJid] = store.messages[remoteJid].slice(-50)
}
if (!store.chats.some(chat => chat.id === 