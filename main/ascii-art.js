function clearBugsDb(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

if (!isOwner && !isPrem) {
db.data.users[m.sender].limit = clearBugsDb(db.data.users[m.sender].limit * 1, 0, 1000)
db.data.users[m.sender].saldo = clearBugsDb(db.data.users[m.sender].saldo * 1, 0, 10000000)
db.data.erpg[m.sender].bank = clearBugsDb(db.data.erpg[m.sender].bank * 1, 0, 100000000)
db.data.erpg[m.sender].stamina = clearBugsDb(db.data.erpg[m.sender].stamina * 1, 0, 100)
db.data.erpg[m.sender].darahuser = clearBugsDb(db.data.erpg[m.sender].darahuser * 1, 0, 100)
}