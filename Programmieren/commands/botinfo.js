const { Discord, MessageEmbed } = require("discord.js")
const moment = require('moment')
const { mem, cpu, os } = require('node-os-utils')
const { stripIndent } = require('common-tags')
const db = require("quick.db")

module.exports = {
  name: "botinfo",
  alias: ["info"],

  async execute(client, message, args){

    let prefix = db.get(`prefix_${message.guild.id}`)

    const d = moment.duration(message.client.uptime);
        const days = (d.days() == 1) ? `${d.days()} day` : `${d.days()} days`;
        const hours = (d.hours() == 1) ? `${d.hours()} hour` : `${d.hours()} hours`;
        const clientStats = stripIndent`
          Servers   :: ${message.client.guilds.cache.size}
          Users     :: ${message.client.users.cache.size}
          Channels  :: ${message.client.channels.cache.size}
          WS Ping   :: ${Math.round(message.client.ws.ping)}ms
          Uptime    :: ${days} and ${hours}
          Prefix    :: ${prefix}
       `;
        const { totalMemMb, usedMemMb } = await mem.info();
        const serverStats = stripIndent`
          OS        :: ${await os.oos()}
          Cores     :: ${cpu.count()}
          CPU Usage :: ${await cpu.usage()} %
          RAM       :: ${totalMemMb} MB
          RAM Usage :: ${usedMemMb} MB
        `;
    
        const embed = new MessageEmbed()
        .setTitle('Bot\'s Statistics')
        .addField('Client', `\`\`\`asciidoc\n${clientStats}\`\`\``)
        .addField('Server', `\`\`\`asciidoc\n${serverStats}\`\`\``)
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor);
        message.channel.send({ embeds: [embed] });
  }
}