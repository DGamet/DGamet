const { MessageEmbed } = require("discord.js")
const db = require("quick.db")
const Discord = require("discord.js")
const client = new Discord.Client({intents: 32767})

let xpmap = new Set();

const { DisTube } = require("distube")
const { YtDlpPlugin } = require("@distube/yt-dlp")

client.distube = new DisTube(client, {
  leaveOnEmpty: true,
  leaveOnStop: true,
  emitNewSongOnly: true,
  emitAddListWhenCreatingQueue: false,
  emitAddSongWhenCreatingQueue: false,
  plugins: [new YtDlpPlugin()],
  youtubeDL: false
})




client.distube.on("playSong", (queue, song) => {
  return queue.textChannel.send(`🎵 | Spielt nun: **${song.name}** von **${song.uploader.name}** - **${queue.formattedDuration}**`)
})

client.distube.on("addSong", (queue, song) => queue.textChannel.send(
    `🎵 | Ich habe **${song.name}** - **${song.formattedDuration}** durch ${song.user} in die Warteschleife hinzugefügt.`))

client.distube.on("finish", queue => {
  queue.textChannel.send("🎵 | Es gibt keine Songs mehr in der Warteschleife.")
})

client.distube.on("searchInvalidAnswer", (message) => message.channel.send(`Diese Number gibt es nicht!`));

client.distube.on("searchNoResult", (message, query) => message.channel.send(`Ich habe keine Lieder für ${query} gefunden!`));

client.distube.on("searchResult", (message, results) => {
    message.channel.send(`**Bitte wähle eine Option**\n${
        results.map((song, i) => `**${i + 1}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")
    }\n*Schreibe eine Zahl, du hast 60 Sekunden!*`);
});

client.distube.on("error", (channel, error) => channel.send(
    "Es gab einen Error: " + error
));

client.distube.on("empty", queue => queue.textChannel.send("Der Kanal ist leer, ich verlasse den Kanal."))

client.distube.on("addList", (queue, playlist) => queue.textChannel.send(`Ich habe${playlist.name} - ${playlist.songs.length} in die Warteschleife hinzugefügt!`))

const cooldownmap = new Set();

client.on("ready", () => {
  console.log(`Ich bin drin als ${client.user.tag} mit ${client.users.cache.size} Nutzern auf ${client.guilds.cache.size} Server(n).`)

  const activities = [
  ".help",
  `über ${client.guilds.cache.size} Servern`,
    `über ${client.users.cache.size} Nutzern`,
    ".help"
];
  
  setInterval(() => {
    const randomIndex = Math.floor(Math.random() * (activities.length -1) + 1);
    const newActivity = activities[randomIndex];
    
    client.user.setActivity(`${newActivity}`, {
      type: "LISTENING"
    });
  }, 5000);
})

let x = "❌"
let y = "✅"

let badwords = ["huso", "hurensohn", "nigga", "neger", "niga", "hs", "bitch", "bitch", "hure", "schwarzer", "arsch", "arschloch", "arschficken", "nutte", "muschi", "nazi", "nazionalsozialist", "Arschkriecher","Arschgeige","schlampe", "Hurenkind", "Nigger", "Schwanzlutscher", "ficken", "ficke", "fick", "sex", "anal", "milf"]

client.on("messageCreate", message => {
  if(message.author.bot) return;
  if(message.guild.id === "802836401476993054") return;

  let foundintext = false;
  
  for(let i in badwords){
    if(message.content.toLowerCase().includes(badwords[i])) foundintext = true
  }

  if(foundintext === true){
    try {
      message.delete()
      message.channel.send(`**${message.author} WARNUNG!** Du hast ein sehr böses Wort genutzt, achte auf deine Wortwahl und verhalte dich gemäß den Terms of Service von Discord. Mein Developer wurde über das böse Wort informiert.`)
    } catch(e) {
      console.log(`${message.author.tag} hat in ${message.guild.name} ein böses Wort genutzt.`)
    }
    foundintext = false;
  }
  
})


client.on("messageCreate", async message => {


  if(message.author.bot) return;
  
  let db = require("quick.db")
  
    let prefix = db.get(`prefix_${message.guild.id}`) || "."

  if(!message.guild.me.permissions.has("SEND_MESSAGES")) return;
  if(message.content.startsWith("<@965903240384376872>")|| message.content.startsWith("<@!965903240384376872>")){
    let embed = new Discord.MessageEmbed()
    .setDescription(`**Ich bin da!**\n\n   **Prefix** - Das Prefix für diesen Server ist ${prefix} und kann mit ${prefix}setprefix geändert werden\n   **Alle Commands bekommen:** ${prefix}help\n**[Support Server](https://discord.gg/BQumAujuvk)** - Falls du fragen hast oder Hilfe brauchst.`)
    .setColor("GREEN")
    .setTimestamp()
    message.channel.send({embeds: [embed]})
  }
if(message.content.startsWith(prefix+"play")){
  if (cooldownmap.has(message.author.id)) {
            return message.channel.send("Du musst warten, 10 Sekunden Cooldown.")
    } else {

           // the user can type the command ... your command code goes here :)

        // Adds the user to the set so that they can't talk for a minute
        cooldownmap.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          cooldownmap.delete(message.author.id);
        }, 3000);
    }
    let voice_channel = message.member.voice.channel
    if(!voice_channel) return message.reply("Du musst in einem Sprachkanal sein.")

    const song = message.content.split(" ").slice(1).join(" ")
    if(!song) return message.reply("Gebe ein song an")

    client.distube.play(voice_channel, song, {
      textChannel: message.channel,
      member: message.member
    })
  }
  if(message.content === prefix+"pause"){
    if (cooldownmap.has(message.author.id)) {
            return message.channel.send("Du musst warten, 10 Sekunden Cooldown.")
    } else {

           // the user can type the command ... your command code goes here :)

        // Adds the user to the set so that they can't talk for a minute
        cooldownmap.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          cooldownmap.delete(message.author.id);
        }, 3000);
    }
    let voice_channel = message.member.voice.channel
    if(!voice_channel) return message.reply("Du musst in einem Sprachkanal sein.")

    if(message.guild.me.voice.channel.id && voice_channel.id !== message.guild.me.voice.channel.id ) return message.reply("Wir sind nicht im gleichen Kanal.")

    const queue = client.distube.getQueue(message)
    if(!queue) return message.reply("Es wird zurzeit nichts gespielt.")

    queue.pause()

    message.channel.send("⏸️ | Die Musik ist pausiert!")
  }
  if(message.content === prefix+"resume"){
    if (cooldownmap.has(message.author.id)) {
            return message.channel.send("Du musst warten, 10 Sekunden Cooldown.")
    } else {

           // the user can type the command ... your command code goes here :)

        // Adds the user to the set so that they can't talk for a minute
        cooldownmap.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          cooldownmap.delete(message.author.id);
        }, 3000);
    }
    let voice_channel = message.member.voice.channel
    if(!voice_channel) return message.reply("Du musst in einem Sprachkanal sein.")

    if(message.guild.me.voice.channel.id && voice_channel.id !== message.guild.me.voice.channel.id ) return message.reply("Wir sind nicht im gleichen Kanal.")

    const queue = client.distube.getQueue(message)
    if(!queue) return message.reply("Es wird zurzeit nichts gespielt.")
    try{
      queue.resume()
    } catch(e) {
      return message.reply(`Es gab einen Error: ${e}`)
    }
    

    message.channel.send("⏩ | Die Musik wird fortgesetzt!")
  }
  if(message.content === prefix+"stop"){
    if (cooldownmap.has(message.author.id)) {
            return message.channel.send("Du musst warten, 10 Sekunden Cooldown.")
    } else {

           // the user can type the command ... your command code goes here :)

        // Adds the user to the set so that they can't talk for a minute
        cooldownmap.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          cooldownmap.delete(message.author.id);
        }, 3000);
    }
    let voice_channel = message.member.voice.channel
    if(!voice_channel) return message.reply("Du musst in einem Sprachkanal sein.")

    if(message.guild.me.voice.channel.id && voice_channel.id !== message.guild.me.voice.channel.id ) return message.reply("Wir sind nicht im gleichen Kanal.")

    const queue = client.distube.getQueue(message)
    if(!queue) return message.reply("Es wird zurzeit nichts gespielt.")
    
    client.distube.voices.leave(message)

    message.channel.send("⏹️ | Die Musik wurde beendet!")
  }
  if(message.content === prefix+"queue"){
    if (cooldownmap.has(message.author.id)) {
            return message.channel.send("Du musst warten, 10 Sekunden Cooldown.")
    } else {

           // the user can type the command ... your command code goes here :)

        // Adds the user to the set so that they can't talk for a minute
        cooldownmap.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          cooldownmap.delete(message.author.id);
        }, 3000);
    }
    const queue = client.distube.getQueue(message)
    if(!queue) return message.reply("Es wird zurzeit nichts gespielt.")

    const q = queue.songs
      .map((song, i) => `${i === 0 ? "Spielt nun" : `${i + 1}.`} ${song.name} - **${song.formattedDuration}**`).join("\n")

    const queueemnbed = new Discord.MessageEmbed()
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .setColor("GREEN")
    .setTimestamp()
    .setDescription(`**🎶 | Server Queue:**\n${q}`)

    message.channel.send({embeds: [queueemnbed]})
  }
  if(message.content.startsWith(prefix+"volume")){
    if (cooldownmap.has(message.author.id)) {
            return message.channel.send("Du musst warten, 10 Sekunden Cooldown.")
    } else {

           // the user can type the command ... your command code goes here :)

        // Adds the user to the set so that they can't talk for a minute
        cooldownmap.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          cooldownmap.delete(message.author.id);
        }, 3000);
    }
    let voice_channel = message.member.voice.channel
    if(!voice_channel) return message.reply("Du musst in einem Sprachkanal sein.")

    if(message.guild.me.voice.channel.id && voice_channel.id !== message.guild.me.voice.channel.id ) return message.reply("Wir sind nicht im gleichen Kanal.")

    const queue = client.distube.getQueue(message)
    if(!queue) return message.reply("Es wird zurzeit nichts gespielt.")

    let newvolume = message.content.split(" ").slice(1).join(" ")
    if(!newvolume) return message.reply(`Die aktuelle Laustärke: ${queue.volume}`)
    if(isNaN(newvolume)) return message.reply("Die neue Lautstärke ist ungültig.")
    const volume = parseInt(newvolume)
    if(newvolume <= 100) {
      queue.setVolume(volume)
      return message.channel.send(`Die neue Laustärke ist nun **${newvolume}**.`)
    } else {
      return message.channel.send("Gebe eine Nummer zwischen 1 und 100 an.")
    }    
  }
  if(message.content.startsWith(prefix+"loop")){
    let voice_channel = message.member.voice.channel
    if(!voice_channel) return message.reply("Du musst in einem Sprachkanal sein.")

    if(message.guild.me.voice.channel.id && voice_channel.id !== message.guild.me.voice.channel.id ) return message.reply("Wir sind nicht im gleichen Kanal.")

    const queue = client.distube.getQueue(message)
    if(!queue) return message.reply("Es wird zurzeit nichts gespielt.")
    let loopmode = message.content.split(" ").slice(1).join(" ")
    if(!loopmode) return message.reply("Bitte gebe eins der folgenden Dinge an: off/song/queue")
    let mode = null;
    switch(loopmode){
        case "off":
          mode = 0
          break
        case "song":
          mode = 1
          break
        case "queue":
        mode = 2
        break
    };
    mode = queue.setRepeatMode(mode)
    mode = mode ? (mode === 2 ? "Queue" : "Repeat Song") : "Off";
    return message.channel.send(`Der Repeat-Mode ist nun: **${mode}**!`)
  }
  if(message.content.startsWith(prefix+"filter")){
    let voice_channel = message.member.voice.channel
    if(!voice_channel) return message.reply("Du musst in einem Sprachkanal sein.")

    if(message.guild.me.voice.channel.id && voice_channel.id !== message.guild.me.voice.channel.id ) return message.reply("Wir sind nicht im gleichen Kanal.")

    const queue = client.distube.getQueue(message)
    if(!queue) return message.reply("Es wird zurzeit nichts gespielt.")

    const filter = message.content.split(" ").slice(1).join(" ")
    if(filter === "off" && queue.filters?.length) queue.setFilter(false)
    else if(Object.keys(client.distube.filters).includes(filter)) queue.setFilter(filter)
    else if(filter) return message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(`Dieser Filter ist ungültig. Um alle Filter sehen zu können, klicke [hier](https://distube.js.org/#/docs/DisTube/stable/typedef/defaultFilters).`)]})
    message.channel.send(`Der jetzige Filter: **${queue.filters.join(" " ) || "Keine"}**`);
  }
  if(message.content.startsWith(prefix+"jump")){
    let voice_channel = message.member.voice.channel
    if(!voice_channel) return message.reply("Du musst in einem Sprachkanal sein.")
    if(message.guild.me.voice.channel.id && voice_channel.id !== message.guild.me.voice.channel.id ) return message.reply("Wir sind nicht im gleichen Kanal.")
    const queue = client.distube.getQueue(message)
    if(!queue) return message.reply("Es wird zurzeit nichts gespielt.")
    let number = message.content.split(" ").slice(1).join(" ")
    if(!number) number = 1
    if(isNaN(number)) return message.reply("Du musst eine gültige Numme angeben.")
    let n = parseInt(number)
    queue.jump(n)

    message.channel.send(`➡️ | Es werden **${number}** Songs übersprungen gesprungen.`)
  }
  if(message.content === prefix+"skip"){
    let voice_channel = message.member.voice.channel
    if(!voice_channel) return message.reply("Du musst in einem Sprachkanal sein.")
    if(message.guild.me.voice.channel.id && voice_channel.id !== message.guild.me.voice.channel.id ) return message.reply("Wir sind nicht im gleichen Kanal.")
    const queue = client.distube.getQueue(message)
    if(!queue) return message.reply("Es wird zurzeit nichts gespielt.")
    queue.skip()
    message.channel.send(`➡️ | Der Song wurde übersprungen.`)
  }
})

let xpmaplol = new Set()

client.on("messageCreate", message => {

  if(message.author.bot) return;

  let member = message.author

  if (xpmaplol.has(message.author.id)) {
            return;
    } else {
        xpmaplol.add(message.author.id);
        setTimeout(() => {
          xpmaplol.delete(message.author.id);
        }, 60000);
    }
  
    let rank = db.get(`rank_${member.id}_${message.guild.id}`) || 1
    let xp = db.get(`xp_${member.id}_${message.guild.id}`) || 0
    let reqxp = db.get(`reqxp_${member.id}_${message.guild.id}`) || 100

  let randomxp = Math.floor( Math.random() * 25)

  db.add(`xp_${member.id}_${message.guild.id}`, randomxp)

  if(xp >= reqxp){
    db.subtract(`xp_${member.id}_${message.guild.id}`, xp)
    db.add(`rank_${member.id}_${message.guild.id}`, rank = 1)
    db.set(`reqxp_${member.id}_${message.guild.id}`, reqxp * 1,25)

    let nrank = db.get(`rank_${member.id}_${message.guild.id}`)

    message.channel.send(`**GG ${message.author}**, du bist nun Level **${nrank}**!`)
  }
})

client.on("guildCreate", guild => {
  let channel = client.channels.cache.get("966978868898570252")
  let embed = new Discord.MessageEmbed()
  .setDescription(`**Neuer Server**\n\n**Name:** ${guild.name}\n**ID: **${guild.id}\n**Nutzer:** ${guild.memberCount}`)
  channel.send({embeds: [embed]})

   guild.channels.cache.forEach((channel) => {
    let channeltosend;
    if(
      channel.type === "GUILD_TEXT" &&
      !channeltosend && channel.permissionsFor(guild.me).has("SEND_MESSAGES")
    ) channeltosend = channel;

    if(!channeltosend) return console.log("Keiner da :C")
    
    channeltosend.send({embeds: [new Discord.MessageEmbed().setDescription(`Hi! Ich bin Dat Bot! Um alle Befehle zu sehen, schreibe **.help**. Wenn es Fragen oder Fehler gibt, meldet euch im **[Support](https://dsc.gg/datbotsupport)**`)]})
  })
})

client.on("guildMemberAdd", member => {
  let joinroleid = db.get(`joinrole_${member.guild.id}`)
  if(!joinroleid) return;

  try{
    let role = member.guild.roles.cache.get(joinroleid)
    member.roles.add(role)
  } catch(e) {
    return console.log(e)
  }
  
})

const fs = require("fs")
const { readdirSync } = require("fs")

client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"))

for(const file of commandFiles){
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command)
}

client.on("messageCreate", message => {
  let prefix = db.get(`prefix_${message.guild.id}`) || "."

  if(message.author.bot) return;

  if(!message.content.startsWith(prefix)) return;

  let user = message.mentions.members.first() || message.member
  let args = message.content.slice(prefix.length).trim().split(/ +/g)

  const command = args.shift().toLowerCase()

  let cmd = client.commands.find((c) => c.name === command || c.alias && c.alias.includes(command))

  if(cmd){
    cmd.execute(client, message, args)
  }
  
})

client.login(process.env.token)