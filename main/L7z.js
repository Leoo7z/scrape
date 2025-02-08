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