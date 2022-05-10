const { Discord, MessageEmbed } = require("discord.js")
let x = "❌"
let y = "✅"
module.exports = {
  name: "resetnickname",
  alias: ["moderation"],

  execute(client, message, args){
        if(!message.member.permissions.has("MODERATE_MEMBERS")) return message.channel.send({embeds: [new MessageEmbed().setDescription(`${x} Du hast keine Rechte.`)]})

    let errr = 0;
    
    let member = message.mentions.members.first()
    if(!member) return message.channel.send({embeds: [new MessageEmbed().setDescription(`${x} Du musst einen Nutzer angeben.`)]})

    member.setNickname(`${member.user.username}`).catch(err => {
      errr = 1;
      return message.reply(`Es gab einen Error: ${err}`)
    }).then(() => {
      if(errr === 0) message.channel.send({embeds: [new MessageEmbed().setDescription(`${y} Ich habe den Nickname von <@!${member.id}> zurückgesetzt.`)]})
  })
 }
}