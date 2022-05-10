const { Discord, MessageEmbed } = require("discord.js")
let x = "❌"
let y = "✅"
module.exports = {
  name: "clear",
  alias: ["moderation"],

  execute(client, message, args){
    if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send({embeds: [new MessageEmbed().setDescription(`${x} Du hast keine Rechte, in diesem Kanal Nachrichten zu löschen.`)]})

    let amount = message.content.split(" ").slice(1).join(" ")
    if(!amount) return message.channel.send({embeds: [new MessageEmbed().setDescription(`${x} Du musst eine Anzahl angeben.`)]})
    if(isNaN(amount)) return message.channel.send({embeds: [new MessageEmbed().setDescription(`${x} Du musst eine **gültige** Anzahl angeben.`)]})
    if(amount >= 100) return message.channel.send({embeds: [new MessageEmbed().setDescription(`${x} Ich kann nicht mehr als 100 Nachrichten löschen.`)]})

    let errr = 0;

    message.channel.bulkDelete(amount).catch(err => {
      errr = 1;
      return message.channel.send({embeds: [new MessageEmbed().setDescription(`${x} Es gab einen Error, ich konnte keine Nachrichten löschen.`)]})
    }).then(() => {
      if(errr === 0) message.channel.send({embeds: [new MessageEmbed().setDescription(`${y} Ich habe **${amount}** oder weniger Nachrichten in <#${message.channel.id}> gelöscht.`)]})
    })
  }
}