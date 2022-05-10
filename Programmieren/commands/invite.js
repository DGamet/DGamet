const { Discord, MessageEmbed } = require("discord.js")

module.exports = {
  name: "invite",
  alias: ["andere"],

  execute(client, message, args){
    message.channel.send({embeds: [new MessageEmbed().setDescription(`**[Den Bot einladen](https://dsc.gg/datbot)\n[Support Server](https://discord.gg/BQumAujuvk)**`)]})
  }
}