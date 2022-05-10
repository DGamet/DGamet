const { Discord, MessageEmbed } = require("discord.js")
let x = "❌"
let y = "✅"

module.exports = {
  name: "kick",
  alias: ["moderation"],

  execute(client, message, args){
        if(!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send({embeds: [new MessageEmbed().setDescription(`${x} Du hast keine Rechte, Nutzer zu kicken.`)]})

    let member = message.mentions.members.first()
    if(!member)  return message.channel.send({embeds: [new MessageEmbed().setDescription(`${x} Du musst einen Nutzer angeben.`)]})

    if(member.roles.highest.position >= message.member.roles.highest.position)  return message.channel.send({embeds: [new MessageEmbed().setDescription(`${x} Der Nutzer und du haben die gleiche Rolle oder der Nutzer hat eine höhere Rolle als du.`)]})

    if(message.member.id === member.id)  return message.channel.send({embeds: [new MessageEmbed().setDescription(`${x} Du kannst dich nicht selber kicken.`)]})

    if(member.permissions.has("ADMINISTRATOR"))  return message.channel.send({embeds: [new MessageEmbed().setDescription(`${x} Du kannst keinen Nutzer kicken, der Administratoren Rechte hat.`)]})

    if(!message.guild.me.permissions.has("KICK_MEMBERS"))  return message.channel.send({embeds: [new MessageEmbed().setDescription(`${x} Ich habe keine Rechte, Nutzer zu kicken.`)]})

    let reason = message.content.split(" ").slice(2).join(" ")
    if(!reason) reason = "Kein Grund angegeben."
    if(reason.length >= 100) reason = "Kein Grund angegeben (Grund zu lang)."

    let errr = 0;
    
    member.kick({reason: `${reason} - ${message.author.tag}`}).catch(err => {
      errr = 1;
      return message.channel.send({embeds: [new MessageEmbed().setDescription(`${x} Es gab einen Error, ich konnte den Nutzer nicht kicken.`)]})
    }).then(() => {
      if(errr === 0) message.channel.send({embeds: [new MessageEmbed().setDescription(`${y} Ich habe ${member} mit dem Grund **${reason}** gekickt.`)]})
    })
  }
}