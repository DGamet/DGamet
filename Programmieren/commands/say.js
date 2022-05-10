const { Discord } = require("discord.js")

module.exports = {
  name: "say",
  alias: ["fun"],

  execute(client, message, args){
    let content = args[0]
    if(!content) return message.channel.send("Gebe content an")

    message.channel.send(`${content}\n\n\nBy: ${message.author.tag}`)

    message.delete()
  }
}