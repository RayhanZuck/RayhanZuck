import fetch from 'node-fetch'

let timeout = 120000
let poin = 3000
let handler = async (m, { conn, usedPrefix }) => {
    conn.tebakgambar = conn.tebakgambar ? conn.tebakgambar : {}
    let id = m.chat
    if (id in conn.tebakgambar) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakgambar[id][0])
        throw false
    }
let src = await (await fetch('../src/tebakgambar.json')).json()
    let json = src[Math.floor(Math.random() * src.length)]
    let caption = `
≡ _GAME TEBAK GAMBAR_

┌─⊷ *SOAL*
▢ ${json.soal}
▢ Waktu *${(timeout / 1000).toFixed(2)} detik*
▢ Balas pesan ini dengan jawabanmu
▢ Ketik *${usedPrefix}hgam* untuk bantuan
▢ Bonus: ${poin} XP
└──────────────
`.trim()
    await conn.sendFile(m.chat, json.img, 'file.jpg', m)
    conn.tebakgambar[id] = [
  //      await conn.reply(m.chat, caption, m),
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
           if (conn.tebakgambar[id]) conn.reply(m.chat, `Waktu Habis!\nJawabannya Adalah: *${json.jawaban}*`, conn.tebakgambar[id][0])
            delete conn.tebakgambar[id]
        }, timeout)
    ]
}
handler.help = ['tebakgambar']
handler.tags = ['games']
handler.command = /^tebakgambar/i
handler.limit = true
handler.group = false

export default handler