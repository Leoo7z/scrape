case 'bulanan': {
try {
let waktuu = await clockString(new Date() - db.data.erpg[m.sender].monthlyclaim)
if (new Date() - db.data.erpg[m.sender].monthlyclaim < 5184000000) return m.reply(`Kamu Baru Saja Claim ${command} ${waktuu} Yang Lalu, Silahkan Tunggu Setelah Terakhir Kali Claim`)
let saldo = await randomNomor(5000, 50000)
let limit = await randomNomor(30, 200)
db.data.erpg[m.sender].monthlyclaim = new Date * 1
db.data.users[m.sender].saldo += saldo
db.data.users[m.sender].limit += limit
m.reply(`Selamat Kamu Mendapatkan:\n\n*🎁 HADIAH*\n- + Rp ${saldo} \n- + ${limit} Limit\n\n`)
} catch (err) {
    console.error(err);
    m.reply('Terjadi kesalahan: ' + err);
}
}
break


`${vircion} • ${_p}adventure
  ${vircion} • ${_p}beli
  ${vircion} • ${_p}bank
  ${vircion} • ${_p}shop
  ${vircion} • ${_p}berburu
  ${vircion} • ${_p}crafting
  ${vircion} • ${_p}heal
  ${vircion} • ${_p}nyampah
  ${vircion} • ${_p}inventory
  ${vircion} • ${_p}daily
  ${vircion} • ${_p}weekly
  ${vircion} • ${_p}monthly
  ${vircion} • ${_p}yearly
  ${vircion} • ${_p}ngojek
  ${vircion} • ${_p}polisi
  ${vircion} • ${_p}roket
  ${vircion} • ${_p}wikwik
  ${vircion} • ${_p}ewe-paksa
  ${vircion} • ${_p}selectskill
  ${vircion} • ${_p}cekskill
  ${vircion} • ${_p}makan
  ${vircion} • ${_p}tidur
  ${vircion} • ${_p}transfer
  ${vircion} • ${_p}joinrpg
  ${vircion} • ${_p}exitrpg
  ${vircion} • ${_p}jual
  ${vircion} • ${_p}kerja
  ${vircion} • ${_p}memancing
  ${vircion} • ${_p}merampok
  ${vircion} • ${_p}mining
  ${vircion} • ${_p}nebang
  ${vircion} • ${_p}repair
  ${vircion} • ${_p}atmall
  ${vircion} • ${_p}dompet`
