const { Discord, MessageEmbed } = require("discord.js")
let x = "❌"
let y = "✅"
module.exports = {
  name: "nick",
  alias: ["moderation"],

  execute(client, message, args){
    if(!message.member.permissions.has("MODERATE_MEMBERS")) return message.channel.send({embeds: [new MessageEmbed().setDescription(`${x} Du hast keine Rechte.`)]})

    let member = message.mentions.members.first()
    if(!member) return message.channel.send({embeds: [new MessageEmbed().setDescription(`${x} Du musst einen Nutzer angeben.`)]})

    let oldnick = member.nickname
    if(!oldnick) oldnick = member.user.username

    let newnick = message.content.split(" ").slice(2).join(" ")
    if(!newnick) return message.channel.send({embeds: [new MessageEmbed().setDescription(`${x} Du musst ein neues Nick angeben.`)]})

    let errr = 0;

    member.setNickname(`${newnick}`).catch(err => {
      errr = 1;
      return message.reply("Es gab einen Error: "+err)
    }).then(() => {
      if(errr === 0) message.channel.send({embeds: [new MessageEmbed().setDescription(`${y} Ich habe den Nickname von <@!${member.id}> von **${oldnick}** zu **${newnick}** geändert.`)]})
    })
  }
}