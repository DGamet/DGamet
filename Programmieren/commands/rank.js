const { Discord, MessageAttachment } = require("discord.js")
const canvacord = require("canvacord")
const db = require("quick.db")

module.exports = {
  name: "rank",
  alias: ["level"],

  execute(client, message, args){
    
    let member = message.mentions.members.first()
    if(!member) member = message.member
    let rank = db.get(`rank_${member.id}_${message.guild.id}`) || 1
    let xp = db.get(`xp_${member.id}_${message.guild.id}`) || 0
    let reqxp = db.get(`reqxp_${member.id}_${message.guild.id}`) || 100

    let nutzer = message.guild.members.cache.get(member.id)

const rankcard = new canvacord.Rank()
    .setAvatar(member.displayAvatarURL({ format: 'png' }))
    .setCurrentXP(xp)
    .setRequiredXP(reqxp)
    .setStatus(nutzer.presence.status)
    .setProgressBar("#a200ff", "COLOR")
    .setLevel(rank)
    .setUsername(member.user.username)
    .setDiscriminator(member.user.discriminator)

rankcard.build()
    .then(data => {
      let attachment = new MessageAttachment(data, "rank.png")
      message.channel.send({
        files: [attachment]
      })
    })
  }
  }