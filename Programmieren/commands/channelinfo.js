const { Discord, MessageEmbed } = require("discord.js")
const moment = require("moment")

module.exports = {
  name: "channelinfo",
  alias: ["info"],

  execute(client, message, args){
    let c = args[0]
    if(!c) return message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(`${x} Bitte gebe eine Kanal-ID an.`)], content: `${message.author}`})
      let channel = message.guild.channels.cache.get(c)
      let embed = new MessageEmbed()
    .setColor("RANDOM")
    .setTimestamp()
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(`**💾 | Name:** ${channel.name}\n**💾 | ID:** ${channel.id}\n**💾 | Beschreibung:** ${channel.description || "Keine"}\n**💾 | Erstellt Am:** ${moment(channel.createdAt).format("DD MMMM YY, h:mm:ss")}\n**💾 | Typ:** ${channel.type}\n\n\n[Support Server](https://discord.gg/BQumAujuvk)`)
    message.channel.send({embeds: [embed], content: `${message.author}`})
  }
}