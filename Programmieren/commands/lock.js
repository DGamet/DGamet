const { Discord, MessageEmbed } = require("discord.js")
let x = "❌"
let y = "✅"
module.exports = {
  name: "lock",
  alias: ["moderation"],

  execute(client, message, args){
    if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.channel.send({embeds: [new MessageEmbed().setDescription(`${x} Du hast keine Rechte.`)]})

    let channel = message.mentions.channels.first() 
    if(!channel) channel = message.channel

    let grund = message.content.split(" ").slice(2).join(" ")
    if(!grund) grund = "Kein Grund angegeben."

    let errr = 0;

    let role = message.mentions.roles.first()
    if(!role) return message.channel.send({embeds: [new MessageEmbed().setDescription(`${x} Du musst eine Rolle angeben.`)]})

    channel.permissionOverwrites.edit(`${role.id}`, {
      "SEND_MESSAGES": false
    }).catch(err => {
      errr = 1;
      return message.channel.send({embeds: [new MessageEmbed().setDescription(`${x} Es gab einen Error: ${err}`)]})
    }).then(() => {
      if(errr === 0) channel.send({embeds: [new MessageEmbed().setDescription(`${y} ${message.author} hat diesen Kanal für die Rolle <@&${role.id}> mit der Begründung **${grund}** gesperrt.`)]})
    })
  }
}