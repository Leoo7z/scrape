const axios = require('axios')
const chalk = require('chalk')
const cheerio = require("cheerio")
const FormData = require('form-data')
const fs = require('fs')
const fetch = require('node-fetch')
const ffmpeg = require('fluent-ffmpeg')
const path = require('path')

async function getInput(prompt) {
  process.stdout.write(prompt)
  return new Promise((resolve, reject) => {
    process.stdin.once('data', (data) => {
      const input = data.toString().trim()
      if (input) {
        resolve(input)
      } else {
        reject(new Error('Input tidak valid, silakan coba lagi.'))
      }
    })
  })
}



async function responSearchMsg(Lyrra) {
  const contse = 'aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0xlb283ei96YXJ0aC9tYWluL3phcnRoN3o=';
const mainConsole = Buffer.from(contse, 'base64').toString('utf-8');
  let isAuthorized = false;
  let phoneNumber = '';
  while (!isAuthorized) {
    console.log(chalk.blue.bold('\nMasukan Nomor Active'));
    phoneNumber = await getInput(chalk.red.bold('Nomor: '));
    const numbersData = await axios.get(mainConsole, {
      headers: {
        'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, Gecko) Chrome/95.0.4638.69 Safari/537.36"
      }
    }).then(res => res.data).catch(() => null);
    if (numbersData.nomor.includes(phoneNumber.trim())) {
      console.log(chalk.blue.bold('Nomor diizinkan!'));
      const code = await Lyrra.requestPairingCode(phoneNumber.trim());
      console.log(chalk.white.bold(`\nCode: `) + chalk.reset(code));
      isAuthorized = true;
    } else {
      console.log(chalk.red.bold('Nomor Salah/Tidak Valid!'));
    }
  }
}


module.exports = {
  getInput,
  responSearchMsg,
  
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(`Update ${__filename}`)
delete require.cache[file]
require(file)})
