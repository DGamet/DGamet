const { Discord, MessageEmbed } = require("discord.js")
const { Collection } = require("discord.js")
const collection = new Collection();
const db = require("quick.db")

module.exports = {
  name: "lb",
  alias: ["level"],

  async execute(client, message, args){

    await Promise.all(
      message.guild.members.cache.map(async (member) => {
      let id = member.id;
      let bal = db.get(`rank_${member.id}_${message.guild.id}`) || 1 
      console.log(`${member.user.tag} -> ${bal}`)
        return bal !== 0
        ? collection.set(id, {
          id,
          bal,
        })
        : null;
    })
  );
    const data = collection.sort((a, b) => b.bal - a.bal).first(10)

    message.channel.send({
      embeds: [
        new MessageEmbed()
        .setDescription(`${data.map((v, i) => {
          return `${i+1}. **${client.users.cache.get(v.id).tag}** - **Level ${v.bal}**\n`
        }).join("\n")}`)
        .setColor("GREEN")
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        
      ]
    })
  }
}