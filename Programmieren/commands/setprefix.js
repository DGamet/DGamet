const { Discord, MessageEmbed} = require("discord.js")
const db = require("quick.db")
let x = "❌"
let y = "✅"

module.exports = {
  name: "setprefix",
  alias: ["config"],

  execute(client, message, args ){
        let oldprefix = db.get(`prefix_${message.guild.id}`)

    if(!message.member.permissions.has("MODERATE_MEMBERS")) return message.channel.send({embeds: [new MessageEmbed().setDescription(`${x} Du hast keine Rechte, das Prefix zu setzen.`)]})

    let newprefix = args[0]
    if(!newprefix) return message.channel.send({embeds: [new MessageEmbed().setDescription(`${x} Du musst ein Neues Prefix angeben.`)]})

    if(newprefix.length >= 5) return message.channel.send({embeds: [new MessageEmbed().setDescription(`${x} Das neue Prefix ist zu lang.`)]})

    db.set(`prefix_${message.guild.id}`, newprefix)

    let setttetprefix = db.get(`prefix_${message.guild.id}`)

    message.channel.send({embeds: [new MessageEmbed().setDescription(`${y} Das Prefix von **${message.guild.name}** wurde von **${oldprefix}** zu **${setttetprefix}** gesetzt.`)]})
  }
}