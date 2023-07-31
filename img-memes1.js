import fetch from 'node-fetch'
let handler = async (m, { conn, text }) => {
m.react('😆')
let tio = await fetch('https://raw.githubusercontent.com/RayhanZuck/RayhanZuck/main/memes.json')
let json = await tio.json();
let url = json[Math.floor(Math.random() * json.length)]
await conn.sendFile(m.chat, url.image, 'file.jpg', 'Random Meme by Rayhan😁', m)
}
handler.command = /^(meme2)$/i
handler.tags = ['game']
handler.help = ['meme2']
handler.limit = true
export default handler