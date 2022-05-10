const { Discord, MessageEmbed } = require("discord.js")
const joke = require("discord-jokes")
module.exports = {
  name: "joke",
  alias: ["fun"],

  execute(client, message, args){
    joke.getRandomDadJoke((joke) => {
      let embed = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`${joke}`)
      message.channel.send({embeds: [embed]})
    })
  }
}