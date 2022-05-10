const { Discord, MessageEmbed } = require("discord.js")
let x = "❌"
let y = "✅"

module.exports = {
  name: "unmute",
  alias: ["moderation"],

  execute(client, message, args){
    if(!message.member.permissions.has("BAN_MEMBERS")) return message.reply({embeds: [new MessageEmbed().setDescription(`${x} Du hast keine Rechte, Nutzer zu timeouten.`)]})
        let target = message.mentions.members.first()
        if(!target) return message.reply({embeds: [new MessageEmbed().setDescription(`${x} Bitte gebe einen Nutzer an.`)]})
        let member = message.guild.members.cache.get(target.id)
let errr = 0;
    member.timeout(1).catch(err => {
      errr = 1;
      return message.reply(`Es gab einen Error: ${err}`)
    }).then(() => {
      if(errr === 0) message.channel.send({embeds: [new MessageEmbed().setDescription(`${y} Ich habe den Timeout von <@!${member.id}> beendet.`)]})
    })
  }
}