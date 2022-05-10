const { Discord, MessageEmbed } = require("discord.js")

module.exports = {
  name: "userinfo",
  alias: ["info"],

  execute(client, message, args){
    let member = message.mentions.members.first() || message.member
    let nutzer = message.guild.members.cache.get(member.id)
    let embed = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setDescription(`Name und Tag: ${member.user.tag}\nID: ${nutzer.id}\nNickname: ${nutzer.nickname || "Keiner"}\nServermitglied seit: ${nutzer.joinedAt}\nDiscord Nutzer seit: ${member.user.createdAt}\nRollen: ${nutzer.roles.cache.map(r => r).join(" | ").replace("@everyone", "") || "Keine"}`)
    message.channel.send({embeds: [embed]})
  }
}