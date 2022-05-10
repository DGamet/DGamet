const { Discord, MessageEmbed } = require("discord.js")
const db = require("quick.db")

let x = "❌"
let y = "✅"

module.exports = {
  name: "joinrole",
  alias: ["config"],

  execute(client, message, args){
    if(!message.member.permissions.has("MODERATE_MEMBERS")) return message.channel.send({embeds: [new MessageEmbed().setDescription(`${x} Du hast keine Rechte, die Joinrole zu setzen.`)]})

    let oldchannel = db.get(`joinrole_${message.guild.id}`)

    let newchannel = message.mentions.roles.first()
     if(!newchannel) return message.channel.send({embeds: [new MessageEmbed().setDescription(`${x} Du hast keine Rolle angegeben.`)]})

     db.set(`joinrole_${message.guild.id}`, newchannel.id)

    let setetchannel = db.get(`joinrole_${message.channel.id}`)

     message.channel.send({embeds: [new MessageEmbed().setDescription(`${y} Der Botchannel wurde von <@&${oldchannel}> zu ${newchannel} gesetzt.`)]})
  }
}