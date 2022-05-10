const { Discord, MessageEmbed } = require("discord.js")

module.exports = {
  name: "meme",
  alias: ["fun"],

  execute(client, message, args){
              const url = 'https://www.reddit.com/r/meme/hot/.json?limit=100'
      const https = require('https');
              https.get(url, (result) => {
            var body = ''
            result.on('data', (chunk) => {
                body += chunk
            })

            result.on('end', () => {
                var response = JSON.parse(body)
                var index = response.data.children[Math.floor(Math.random() * 99) + 1].data

                if (index.post_hint !== 'image') {

                    var text = index.selftext
                    const textembed = new MessageEmbed()
                        .setTitle(subRedditName)
                        .setColor(9384170)
                        .setDescription(`[${title}](${link})\n\n${text}`)
                        .setURL(`https://reddit.com/${subRedditName}`)

                    message.channel.send(textembed)
                }

                var image = index.preview.images[0].source.url.replace('&amp;', '&')
                var title = index.title
                var link = 'https://reddit.com' + index.permalink
                var subRedditName = index.subreddit_name_prefixed

                if (index.post_hint !== 'image') {
                    const textembed = new RichEmbed()
                        .setTitle(subRedditName)
                        .setColor(9384170)
                        .setDescription(`[${title}](${link})\n\n${text}`)
                        .setURL(`https://reddit.com/${subRedditName}`)

                    message.channel.send(textembed)
                }
                console.log(image);
                const imageembed = new MessageEmbed()
                     .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .setTitle("Hier ein Meme:")
                    .setImage(image)
                    .setColor(9384170)
                message.channel.send({embeds: [imageembed]})
            }).on('error', function (e) {
                console.log('Got an error: ', e)
            })
        })
  }
}