const { Discord, MessageEmbed } = require("discord.js")
let x = "❌"
let y = "✅"

module.exports = {
  name: "mute",
  alias: ["moderation"],

  execute(client, message, args){
    if(!message.member.permissions.has("BAN_MEMBERS")) return message.reply({embeds: [new MessageEmbed().setDescription(`${x} Du hast keine Rechte, Nutzer zu timeouten.`)]})
        let target = message.mentions.members.first()
        if(!target) return message.reply({embeds: [new MessageEmbed().setDescription(`${x} Bitte gebe einen Nutzer an.`)]})
        let member = message.guild.members.cache.get(target.id)
          let time = Number(message.content.split(" ").slice(2).join(" "))|| 60;
    let reason = message.content.split(" ").slice(3).join(" ")
    if(!reason) reason = "Kein Grund angegeben."
          let errr = 0;
        target.timeout(time*1000, reason).catch(err => {
          errr = 1;
          return message.channel.send("Ooops! Something went wrong:"+err)
        }).then(() => {
          const target = message.mentions.members.first()
          let embed = new MessageEmbed()
         .setDescription(`<@!${target.id}> wurde getimeoutet.\n\n 
  **Nutzer:** ${member.user.tag}\n   **Zeit:** ${time}\n   **Grund:** ${reason}`)
          if(errr === 0) message.channel.send({embeds: [embed]})
        })
  }
}