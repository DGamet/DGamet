const { Discord, MessageEmbed } = require("discord.js")
const moment = require("moment")

let x = "❌"
let y = "✅"

module.exports = {
  name: "roleinfo",
  alias: ["info"],

  execute(client, message, args){
    let r = args[0]
    if(!r) return message.channel.send({embeds: [new MessageEmbed().setDescription(`${x} Bitte gebe eine Rollen-ID an.`)], content: `${message.author}`})
      let role = message.guild.roles.cache.get(`${r}`)
      let embed = new MessageEmbed()
      .setDescription(`**💾 | Name:** ${role.name}\n**💾 | ID:** ${role.id}\n**💾 | Erwähnbar:** ${role.mentionable}\n**💾 | Erstellt:** ${moment(role.createdAt).format('DD MMMM YYYY, h:mm:ss')}\n**💾 | Nutzeranzahl:** ${message.guild.members.cache.filter(m => m.roles.cache.has(r)).size}\n\n\n[Support Server](https://discord.gg/BQumAujuvk)`)
      .setTimestamp()
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setColor("RANDOM")
      .setThumbnail(client.user.displayAvatarURL())
      message.channel.send({embeds: [embed], content: `${message.author}`})
  }
}