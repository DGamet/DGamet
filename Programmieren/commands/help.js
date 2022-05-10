const { Discord, MessageEmbed} = require("discord.js")
const db = require("quick.db")
module.exports = {
  name: "help",
  alias: ["andere"],

  execute(client, message, args){
    let prefix = db.get(`prefix_${message.guild.id}`)
    let embed = new MessageEmbed()
    .setDescription(`**<:bot:969570554824753172> | Help**\n<a:happyblob:969570858504949770> | Das Prefix für diesen Server ist **${prefix}**\n\n\n**<a:discordblob:969571906003021824> | Config**\n   **joinrole** - Immer wenn ein Nutzer joint, wird diese Rolle vergeben\n   **botchannel** - Nur in diesem Kanal können Bot-Commands genutzt werden\n   **setprefix** - Ändert das Prefix\n\n**<:staff:969571609348309052> | Moderation**\n   **ban** - Bannt einen Nutzer \n**kick** - Kickt einen Nutzer\n   **clear** - Löscht eine bestimmte Anzahl an Nachrichten\n   **lock** - Sperrt einen Kanal\n   **unlock** - Entsperrt einen Kanal\n   **nick** - Ändert den Nickname\n   **resetnickname** - Setzt den Nickname zurück\n   **mute** - Mutet einen Nutzer\n   **unmute** - Beendet den Mute eines Nutzers\n\n**<a:happy:969572496984662056> | Fun**\n   **say** - Sagt etwas in dem Kanal\n   **meme** - Zeigt dir ein meme an\n   **joke** - Zeigt dir einen zufälligen Witz\n\n**<a:think:969574695009648700> | Info**\n   **roleinfo** - Zeigt dir eine Info über eine Rolle an\n   **userinfo** - Zeigt dir eine Info über einen Nutzer an\n   **serverinfo** - Zeigt dir eine Info über den Server an\n   **channelinfo** - Zeigt dir eine Info über einen Kanal an\n\n**<:verifiedbot:969572182017576980> | Andere**\n   **help** - Zeigt dir ein Hilfe-Menu an\n**ping** - Zeigt den Ping des Bots an\n   **invite** - Bekomme eine Einladung\n   **botinfo** - Zeige eine Botinfo an\n\n**<a:game:969570181208748072> | Spiele**\n   **ttt** - Spiele mit der KI oder einem Gegner, den du gepingt hast\n   **akinator** - Spiele Akinator\n\n**<a:music:969571309761757214> | Musik**\n   **play** - Spielt einen Song\n   **pause** - Pausiert den zurzeit gespielten Song\n   **resume** - Spielt den pausierten Song weiter\n   **stop** - Stoppt die Musikwiedergabe\n   **volume** - Ändert die Lautstärke\n   **loop** - Spielt durchgehend ein Song oder eine Warteschlange\n   **filter** - Legt auf den Song einen Filter\n   **skip** - Skippt den jetzigen Song \n   **jump** - Überspringt eine angegeben Anzahl an Songs\n\n**<:level:969574282508247100> | Level**\n   **rank** -Zeigt den Rank\n   **lb** - Zeigt das Leaderboard an\n\n\n**[Support Server](https://discord.gg/BQumAujuvk)  | [Den Bot einladen](https://discord.com/oauth2/authorize?client_id=965903240384376872&scope=bot&permissions=8)**`)
    message.channel.send({embeds: [embed], content: `${message.author}`})
    
  }
  
}