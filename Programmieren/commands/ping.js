const { Discord, MessageEmbed } = require("discord.js")

module.exports = {
  name: "ping",
  alias: ["andere"],

  execute(client, message, args){
    let embed = new MessageEmbed()
    .setDescription(`**🏓 | Ping**\n\n   **Latency:** ${Date.now() - message.createdTimestamp} ms\n   **API Latency:** ${Math.round(client.ws.ping)} ms`)
    message.channel.send({embeds: [embed]})
  }
}