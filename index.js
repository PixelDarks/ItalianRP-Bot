const Discord = require("discord.js")
const fs = require('fs')
const path = './temproles.json'
const pathToFFmpeg = "D:/Percorso/Della/Cartella/FFmpeg/bin/ffmpeg.exe";
const { REST, Routes } = require("discord.js")

process.env.FFMPEG_PATH = pathToFFmpeg

const client = new Discord.Client(
    {intents:[
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMembers,
        Discord.GatewayIntentBits.GuildModeration,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,   
        Discord.GatewayIntentBits.GuildEmojisAndStickers,
        Discord.GatewayIntentBits.GuildIntegrations,
        Discord.GatewayIntentBits.GuildWebhooks,
        Discord.GatewayIntentBits.GuildInvites,
        Discord.GatewayIntentBits.GuildVoiceStates,
        Discord.GatewayIntentBits.GuildPresences,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.DirectMessages]}
)

client.commands = new Discord.Collection()

const { AuditLogEvent } = require('discord.js');


//await rest.put(
    // Discord.Routes.applicationCommands(client.user.id),
    // { body: commands}
    //)
    
async function getUserbyId(userId) {
        const user = client.users.fetch(userId)
        return user;
}
    
require('dotenv').config();
    
    
const { icon } = require("./fileresources.json")
    
client.login(process.env.TOKEN);
    
const serverid = new Map()
    
const ifbotcommand = new Map();
    
client.on("ready", () => {
    console.log("Il bot è stato correttamente avviato.")
    
    client.guilds.cache.forEach(guild => {
        guild.commands.create({
            name: "temprole-add",
            description: "Aggiunge un ruolo specifico ad un utente per un tempo limitato",
            options: [
                {
                    name: "membro",
                    description: "Seleziona l'utente",
                    type: Discord.ApplicationCommandOptionType.User,
                    required: true
                },
                {
                    name: "ruolo",
                    description: "Seleziona il ruolo",
                    type: Discord.ApplicationCommandOptionType.Role,
                    required: true
                },
                {
                    name: "durata",
                    description: "Scrivi la durata (sarà in giorni)",
                    type: Discord.ApplicationCommandOptionType.Number,
                    required: true
                },
                {
                    name: "motivo",
                    description: "Scrivi il motivo",
                    type: Discord.ApplicationCommandOptionType.String,
                    required: false
                }
            ]
        })
        
        guild.commands.create({
            name: "temprole-remove",
            description: "Rimuove un ruolo specifico ad un utente",
            options: [
                {
                    name: "membro",
                    description: "Seleziona l'utente",
                    type: Discord.ApplicationCommandOptionType.User,
                    required: true
                },
                {
                    name: "ruolo",
                    description: "Seleziona il ruolo",
                    type: Discord.ApplicationCommandOptionType.Role,
                    required: true
                }
            ]
        })
        
        guild.commands.create({
            name: "convoca",
            description: "Convoca un utente in assistenza",
            options: [
                {
                    name: "membro",
                    description: "Seleziona l'utente",
                    type: Discord.ApplicationCommandOptionType.User,
                    required: true
                },
                {
                    name: "quantità",
                    description: "Scrivi la quantità di convocazioni",
                    type: Discord.ApplicationCommandOptionType.Integer,
                    required: false
                }
            ]
        })
        
        guild.commands.create({
            name: "add",
            description: "Aggiunge un utente al ticket",
            options: [
                {
                    name: "membro",
                    description: "Seleziona l'utente",
                    type: Discord.ApplicationCommandOptionType.User,
                    required: true
                }
            ]
        })
        
        guild.commands.create({
            name: "remove",
            description: "Rimuove un utente dal ticket",
            options: [
                {
                    name: "membro",
                    description: "Seleziona l'utente",
                    type: Discord.ApplicationCommandOptionType.User,
                    required: true
                }
            ]
        })
        
        guild.commands.create({
            name: "clear",
            description: "Elimina un numero di messaggi da un canale",
            options: [
                {
                    name: "quantità",
                    description: "Scrivi la quantità",
                    type: Discord.ApplicationCommandOptionType.Integer,
                    required: true
                }
            ]
        })
        
        guild.commands.create({
            name: "kick",
            description: "Espelle un membro dal server",
            options: [
                {
                    name: "membro",
                    description: "Definisci il membro",
                    type: Discord.ApplicationCommandOptionType.User,
                    required: true
                },
                {
                    name: "motivo",
                    description: "Scrivi il motivo",
                    type: Discord.ApplicationCommandOptionType.String,
                    required: false
                }
            ]
        })
        
        guild.commands.create({
            name: "ban",
            description: "Banna un membro dal server",
            options: [
                {
                    name: "membro",
                    description: "Definisci il membro",
                    type: Discord.ApplicationCommandOptionType.User,
                    required: true
                },
                {
                    name: "motivo",
                    description: "Scrivi il motivo",
                    type: Discord.ApplicationCommandOptionType.String,
                    required: false
                }
            ]
        })
        
        guild.commands.create({
            name: "serverlink",
            description: "Mostra il link del server Roblox"
        })
        
        guild.commands.create({
            name: "serverinfo",
            description: "Mostra le informazioni del server"
        })

        guild.commands.create({
            name: "fineassistenza",
            description: "Usa il comando quando avrai terminato un'assistenza (vocale)"
        })

        guild.commands.create({
            name: "creazione",
            description: "Usa il comando quando avrai creato qualcosa di nuovo"
        })
        
        
        serverid.set("serverid", "1276898638509113476")
    
        //ELIMINA COMANDI
        
        //const rest = new REST().setToken(process.env.TOKEN)
        
        //rest.delete(Routes.applicationCommand(client.user.id, "commandid"))
            //.then(() => console.log("Comando eliminato"))
            //.catch(console.error)
    })
        
        
})
    


setInterval(function () {
    const current = new Date().toLocaleTimeString(['it-IT'], {hour: '2-digit', minute: '2-digit'})

    const scheduledTime = ["12:00", "15:30", "19:00"]

    
    if (typeof lastSentTime === 'undefined') {
        lastSentTime = null;
    }

    if (scheduledTime.includes(current) && current !== lastSentTime) {
        const channel = client.channels.cache.get("1276937473200623626")

        

        let embed = new Discord.EmbedBuilder()
            .setDescription("<:IRP:1294760298951081995>Ricordo che il server è on<:IRP:1294760298951081995>\nEntrate sulla mappa Roblox e godetevi l'RP.\n")
            .setColor("Green")
            .setThumbnail(client.user.displayAvatarURL({ extension: 'png' }))

        channel.send({ embeds: [embed], content: "@everyone", files: [], components: []})

        lastSentTime = current
    }

}, 10000)


setInterval(function () {
    let memberchannel = client.channels.cache.get("1297245091110457444");

    let membercount = client.guilds.cache.get(serverid.get("serverid")).memberCount

    memberchannel.setName(`🙋| Membri: ${membercount}`);

    let staffchannel = client.channels.cache.get("1276904045960892530");

    let staffcount = client.guilds.cache.get(serverid.get("serverid")).roles.cache.get("1276959088047034490").members.size

    staffchannel.setName(`🕵| Staff: ${staffcount}`)
    
}, 10000)

const { createCanvas, loadImage, registerFont } = require("canvas");
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require("@discordjs/voice");

registerFont("./font/roboto.ttf", {family: "roboto"})
registerFont("./font/robotoBold.ttf", {family: "robotoBold"})


client.on("guildMemberAdd", async member => {

    let roleid = "1276923411498795100"

    let canvas = await createCanvas(1700, 600)
    let ctx = await canvas.getContext("2d")

    console.log("Caricando immagine di sfondo...");
    var img = await loadImage("./resources/background.png");
    console.log("Immagine di sfondo caricata");
    
    ctx.drawImage(img, canvas.width / 2 - img.width / 2, canvas.height / 2 - img.height / 2)

    ctx.fillStyle = "rgba(0,0,0,0.30)"
    ctx.fillRect(70, 70, canvas.width - 70 - 70, canvas.height - 70 - 70)

    ctx.save()

    ctx.beginPath()
    ctx.arc(150 + 300 / 2, canvas.height / 2, 150, 0, 2 * Math.PI, false)
    ctx.clip()

    
    console.log("Caricando immagine dell'avatar...");
    var img2 = await loadImage(member.user.displayAvatarURL({ extension: "png"}));
    console.log("Immagine dell'avatar caricata");
    
    
    ctx.drawImage(img2, 150, canvas.height / 2 - 300 / 2, 300, 300)
    ctx.restore()

    ctx.fillStyle = "#fff"
    ctx.textBaseline = "middle"

    ctx.font = "80px Roboto"
    ctx.fillText("Benvenuto/a", 500, 200)

    ctx.font = "100px RobotoBold"
    ctx.fillText(member.user.username.slice(0, 25), 500, canvas.height / 2)

    ctx.font = "50px Roboto"
    ctx.fillText(`${member.guild.memberCount}° membro`, 500, 400)

    let channel = client.channels.cache.get("1278025672673071204")

    let attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), "canvas.png")

    let embed = new Discord.EmbedBuilder()
        .setTitle("**Benvenuto**")
        .setDescription(`Benvenuto/a <@${member.user.id}> nel server di Italian RP.\n Inizia il tuo percorso leggendo il <#1292932800873369600>,\n successivamente vai su Roblox ed entra su Italian RP.`)
        .setColor("Purple")
        .setImage("attachment://canvas.png")

    channel.send({ embeds: [embed], files: [attachment]})

    member.roles.add(roleid)
    console.log("Ruolo Cittadino di Italian RP aggiunto a " + member.user.username)
})


/*client.on("messageCreate", message => {
    if (message.content == "!ticketsassistenzanuovo1") {
        let embedhelp = new Discord.EmbedBuilder()
            .setTitle("Assistenza")
            .setDescription("Clicca il pulsante sottostante se hai bisogno di assistenza via ticket.\nAprire un ticket e non fornire nessuna risposta in esso\nper un tempo maggiore di 24h comporterà la chiusura automatica\ndello stesso")
            .setThumbnail(icon)
            .setColor("Green")
            .setFooter({
                text: "Assistenza - IRP",
                iconURL: icon
            })
        let buttonshelp = new Discord.ButtonBuilder()
            .setCustomId("buttoncreate")
            .setLabel("Apri un ticket")
            .setStyle("Success")
            .setEmoji('📩')

        //let buttonshelpvip = new Discord.MessageButton()
            //.setCustomId("buttonvip")
            //.setLabel("Assistenza Prioritaria")
           // .setStyle("PRIMARY")
            //.setEmoji('💎')

        let rowhelp = new Discord.ActionRowBuilder()
            .addComponents(buttonshelp)

        message.channel.send({ embeds: [embedhelp], components: [rowhelp]})
    }
})*/

setInterval(() => {
    const temprolesData = JSON.parse(fs.readFileSync(path, 'utf8') || '{"userRoles": []}');
    const now = Date.now();

    // Filtra i ruoli scaduti
    const updatedRoles = temprolesData.userRoles.filter(async entry => {
        if (entry.expiresAt <= now) {
            try {
                const guild = client.guilds.cache.get(entry.guildId);
                const member = guild.members.cache.get(entry.userId);
                const role = guild.roles.cache.get(entry.roleId);

                if (member && role) {
                    await member.roles.remove(role);
                }
            } catch (error) {
                console.error(`Errore nella rimozione del ruolo: ${error.message}`);
            }
            return false; // Rimuovi dal file
        }
        return true; // Mantieni
    });

    fs.writeFileSync(path, JSON.stringify({ userRoles: updatedRoles }, null, 2), 'utf8');
}, 60000);

client.on("interactionCreate", async interaction => {
    if(!interaction.isButton()) return
    
    if(interaction.customId == "buttoncreate") {
        let modal = new Discord.ModalBuilder()
            .setCustomId("modalTicket")
            .setTitle("Apri un ticket")

        let problemInput = new Discord.TextInputBuilder()
            .setCustomId("problem_input")
            .setLabel("Descrivi il tuo problema")
            .setStyle(Discord.TextInputStyle.Paragraph)
            .setMinLength(1)
            .setMaxLength(150)
            .setPlaceholder("Scrivi qui il tuo problema...")
            .setRequired(true)
        

        let rowmodal = new Discord.ActionRowBuilder()
            .addComponents(problemInput)
        
        modal.addComponents(rowmodal)

        await interaction.showModal(modal)
        
    }

})

client.on("guildMemberUpdate", async (oldMember, newMember) => {
    const fs = require('fs');
    const path = './temproles.json';

    // Carica i dati attuali
    const temprolesData = JSON.parse(fs.readFileSync(path, 'utf8') || '{"userRoles": []}');

    // Trova i ruoli rimossi
    const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));

    if (removedRoles.size > 0) {
        let updatedRoles = temprolesData.userRoles;

        // Rimuovi i ruoli trovati dalla lista temporanea
        removedRoles.forEach(removedRole => {
            updatedRoles = updatedRoles.filter(entry => {
                if (entry.roleId === removedRole.id && entry.userId === newMember.id) {
                    console.log(`Ruolo manualmente rimosso: ${removedRole.name} (${removedRole.id}) dall'utente ${newMember.user.tag}`);
                    return false; // Rimuovi l'entry
                }
                return true;
            });
        });
        
        // Salva i dati aggiornati
        fs.writeFileSync(path, JSON.stringify({ userRoles: updatedRoles }, null, 2), 'utf8');
    }
});

function getRealModerator(executor) {
    if (executor.id == client.user.id) {
        const moderatorid = ifbotcommand.get("moderatorid")
        ifbotcommand.delete("moderatorid")
        return moderatorid;
    }

    return executor.id
}

client.on("guildMemberUpdate", async (oldMember, newMember) => {


    const canale = client.channels.cache.get("1287008759561846826")

    const oldRoles = oldMember.roles.cache;

    const newRoles = newMember.roles.cache

    const addedRoles = newRoles.filter(role => !oldRoles.has(role.id))
    const removedRoles = oldRoles.filter(role => !newRoles.has(role.id))

    const logs = await newMember.guild.fetchAuditLogs({
        limit: 1,
        type: AuditLogEvent.MemberRoleUpdate
    })

    const roleslogs = logs.entries.first()

    if (!roleslogs) {
        console.log("Nessun log di ruoli trovato.");
        return;
    }

    const { executor } = roleslogs

    if (addedRoles.size > 0) {
        addedRoles.forEach(role => {
            const realexecutor = getRealModerator(executor)
            let embed = new Discord.EmbedBuilder()
                .setAuthor({
                    name: newMember.user.username,
                    iconURL: newMember.user.displayAvatarURL({ extension: "png"})
                })
                .setThumbnail(newMember.user.displayAvatarURL())
                .setDescription(`<@${newMember.user.id}> è stato aggiornato`)
                .setFields({
                    name: "Ruoli: ",
                    value: `✅ <@&${role.id}>`
                },{
                    name: "Moderatore:",
                    value: `<@${realexecutor}>`
                })
                .setColor("Green")
                .setFooter({
                    text: "Italian RP",
                    iconURL: client.user.displayAvatarURL()
                })

            canale.send({embeds: [embed]})

        })
    }

    if (removedRoles.size > 0) {
        removedRoles.forEach(role => {
            const realexecutor = getRealModerator(executor)
            let embed = new Discord.EmbedBuilder()
                .setAuthor({
                    name: newMember.user.username,
                    iconURL: newMember.user.displayAvatarURL({ extension: "png"})
                })
                .setThumbnail(newMember.user.displayAvatarURL())
                .setDescription(`<@${newMember.user.id}> è stato aggiornato`)
                .setFields({
                    name: "Ruoli: ",
                    value: `❌ <@&${role.id}>`
                },{
                    name: "Moderatore:",
                    value: `<@${realexecutor}>`
                })
                .setColor("Red")
                .setFooter({
                    text: "Italian RP",
                    iconURL: client.user.displayAvatarURL()
                })

            canale.send({embeds: [embed]})

        })
    }
    


    

})


client.on("guildMemberRemove", async member => {
    try {
        const fetchedLogs = await member.guild.fetchAuditLogs({
            limit: 1,
            type: AuditLogEvent.MemberKick,
        });
        const kickLog = fetchedLogs.entries.first();

        // Controllo che il log sia valido e recente
        if (!kickLog) return console.log(`${member.user.tag} ha lasciato il server (non espulso)`);

        const { executor, target, reason } = kickLog;

        if (target.id === member.id) {
           
            const logChannel = member.guild.channels.cache.find(
                (channel) => channel.id === '1312882762675650641'
            ); 
            if (logChannel && logChannel.isTextBased()) {

                const realexecutor = getRealModerator(executor)

                let embed = new Discord.EmbedBuilder() 
                    .setAuthor({
                        name: member.user.username,
                        iconURL: member.user.displayAvatarURL({ extension: "png"})
                    })
                    .setColor("Red")
                    .setDescription(`<@${member.user.id}> è stato espulso`)
                    .addFields({
                        name: "Moderatore",
                        value: `<@${realexecutor}>`,
                        inline: true
                    },
                    {
                        name: "Motivo",
                        value: reason || "Nessun motivo fornito",
                        inline: true
                    })
                    .setThumbnail(member.user.displayAvatarURL())
                logChannel.send({embeds: [embed]});
            } else {
                console.log(`Canale log non trovato per ${member.user.tag}`);
            }
        } else {
            console.log(`${member.user.tag} ha lasciato il server (non espulso)`);
        }
    } catch (error) {
        console.error(`Errore nel gestire la rimozione di ${member.user.tag}:`, error);
    }
})

client.on("guildBanAdd", async (ban) => {
    try {
        const logChannel = ban.guild.channels.cache.find(
            (channel) => channel.id === "1287010063990521866"
        )

        const logs = await ban.guild.fetchAuditLogs({
            limit: 1,
            type: AuditLogEvent.MemberBanAdd
        })

        const banlogs = logs.entries.first()

        if (!banlogs) {
            console.log("Nessun log di ban trovato.");
            return;
        }

        const { executor, reason } = banlogs

        let embed = new Discord.EmbedBuilder()
            .setAuthor({ name: ban.user.username, iconURL: ban.user.displayAvatarURL({ extension: "png"})})
            .setDescription(`${ban.user.username} è stato bannato`)
            .addFields({
                name: "Moderatore",
                value: `<@${executor.id}>`,
                inline: true
            },
            {
                name: "Motivo",
                value: reason || "Nessun motivo fornito",
                inline: true
            })
            .setColor("DarkRed")
            .setThumbnail(ban.user.displayAvatarURL({ extension: "png"}))

        if (logChannel && logChannel.isTextBased()) {

            logChannel.send({ embeds: [embed]})
        } else {
            return console.log("LogChannel non è un canale testuale")
        }


    } catch (error) {
        console.error("Errore nel log del ban: ", error)
    }
})

client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;

    
    if(interaction.commandName == "temprole-add") {
            let member = interaction.options.getMember("membro");
            let role = interaction.options.getRole("ruolo");
            let duration = interaction.options.getNumber("durata");
            let reason = interaction.options.getString("motivo") || "Non presente";
    
    
            if (!interaction.member.roles.cache.has("1276959088047034490")) { return interaction.reply({ content: "Non hai i permessi per eseguire questo comando", ephemeral: true}) }
        
            if(member.roles.cache.has(role.id)) { return interaction.reply({ content: "Il membro ha già il ruolo", ephemeral: true})}
                
                const highestrole = interaction.guild.members.me.roles.highest

                

                if (role.position >= highestrole.position) {
                    console.error('Il ruolo che stai cercando di assegnare è troppo alto!');
                    interaction.reply({ content: "Non dispongo dei permessi necessari per assegnarti questo ruolo", ephemeral: true})
                    return;
                }

                member.roles.add(role)
    
    
                const temprolesData = JSON.parse(fs.readFileSync(path, 'utf8') || '{"userRoles": []}');
                temprolesData.userRoles.push({
                    userId: member.id,
                    roleId: role.id,
                    guildId: interaction.guild.id,
                    expiresAt: Date.now() + duration * 86400000
                });
                fs.writeFileSync(path, JSON.stringify(temprolesData, null, 2), 'utf8')
    
    
    
                ifbotcommand.set("moderatorid", interaction.user.id)
    
                let embed = new Discord.EmbedBuilder()
                    .setDescription(`✅ Aggiunto ${role} a ${member.user.username}`)
                    .setFields({
                        name: "Durata:",
                        value: `${duration} giorni`
                    }, {
                        name: "Motivo:",
                        value: reason
                    })
                    .setColor("Green")

    
                return interaction.reply({ embeds: [embed]})
    
    
            
    
            
    
    }
    
    if(interaction.commandName == "temprole-remove") {
            let member = interaction.options.getMember("membro");
            let role = interaction.options.getRole("ruolo");
    
            if (!interaction.member.roles.cache.has("1276959088047034490")) { return interaction.reply({ content: "Non hai i permessi per eseguire questo comando", ephemeral: true}) }
    
            if(!member.roles.cache.has(role.id)) { return interaction.reply({ content: "Il membro deve ancora avere il ruolo", ephemeral: true})}
    
            
            member.roles.remove(role)
            ifbotcommand.set("moderatorid", interaction.user.id)
    
            let embed = new Discord.EmbedBuilder()
                .setDescription(`✅ Rimosso ${role} a ${member.user.username}`)
                .setColor("Red")
    
            interaction.reply({ embeds: [embed]})
            
    } 

    if(interaction.commandName == "convoca") {
        let member = interaction.options.getMember("membro")
        let amount = interaction.options.getInteger("quantità") || 1
        
        if (!interaction.member.roles.cache.has("1276959088047034490")) { return interaction.reply({ content: "**Non sei uno staff**", ephemeral: true})}
        
        if (interaction.channel.id !== "1276965741035388948") {
            return interaction.reply({ content: "**Puoi convocare utenti solo in <#1276965741035388948>**", ephemeral: true})
        }

        let channel = interaction.member.voice.channel

        if (!channel) {
            return interaction.reply({ content: "Non sei in un canale vocale", ephemeral: true})
        }

        if (channel) {
            let assistenza = [
                "1276969421901926505", "1276972289522663538", "1276972399836790868",
                "1276972500328251422", "1276972546193100924", "1276972586835644546",
                "1276972627378044958", "1276972666850508955", "1276972706033569863",
                "1276972751663534154", "1297131516010299432"
            ]

            if (!assistenza.includes(channel.id)) {
                return interaction.reply({ content: "**Sei in un canale vocale, ma non in un canale vocale per assistenza**", ephemeral: true})
            }

            const guild = interaction.guild;

            let targetvoiceChannel = guild.members.cache.get(member.user.id).voice.channel

            if (interaction.member.user.id == member.user.id) {
                return interaction.reply({ content: `**Non puoi convocare te stesso.**`, ephemeral: true})
            }

            
            if (targetvoiceChannel && targetvoiceChannel.id === channel.id) {
                return interaction.reply({ content: `<@${member.user.id}> **è già in assistenza con te.**`, ephemeral: true})
            }
            
            if (amount < 0 || amount > 10) {
                return interaction.reply({ content: `La quantità ha un minimo di 1 e un massimo di 10`, ephemeral: true });
            }
            
            if (amount > 1) {
                for (let i = 0; i < amount; i++) {
                    interaction.channel.send({ content: `<@${member.user.id}> **CONVOCATO IN** <#${channel.id}>`, allowedMentions: {users: [`${member.user.id}`]}})
                    
                    if (i == amount - 1) {
                        await interaction.reply({ content: `Inviate ${amount} convocazioni`, ephemeral: true });
                        break
                    }
                }
            } else {
                interaction.reply({ content: `<@${member.user.id}> **CONVOCATO IN** <#${channel.id}>`, allowedMentions: {users: [`${member.user.id}`]}})
            }
                
            
            
            
            if (member.user.id == client.user.id) {
                const connection = joinVoiceChannel({
                    channelId: channel.id,
                    guildId: channel.guild.id,
                    adapterCreator: channel.guild.voiceAdapterCreator
                })

                const player = createAudioPlayer();
                const resource = createAudioResource("./resources/easteregg.mp3")
                player.play(resource);
                connection.subscribe(player)
            }
        }
    }
    
    if(interaction.commandName == "clear") {
        let amount = interaction.options.getInteger("quantità")

        if (amount < 1 || amount > 100) {
            return interaction.reply({ content: "Per favore fornisci un numero valido tra 1 e 100.", ephemeral: true });
        }
    
        // Verifica se il bot ha il permesso di eliminare i messaggi
        if (!interaction.member.roles.cache.has("1276959088047034490")) {
            return interaction.reply({ content: "Non hai il permesso di eliminare messaggi.", ephemeral: true });
        }

        try {
            await interaction.deferReply()
            await interaction.followUp({ content: `${amount} messaggi sono stati eliminati.`, ephemeral: true });
            await interaction.channel.bulkDelete(amount + 1, true)
        } catch (err) {
            console.error(err)
            return interaction.followUp({ content: "Si è verificato un errore durante l'eliminazione dei messaggi.", ephemeral: true });
        }
    
    }

    if(interaction.commandName == "kick") {
        let member = interaction.options.getMember("membro")
        let reason = interaction.options.getString("motivo") || "Nessun motivo"

        if (!interaction.member.roles.cache.has("1276959088047034490")) {return interaction.reply({content: "Non sei uno staff", ephemeral: true})}

        if (!member.kickable) {return interaction.reply({content: "Non puoi espellere membri importanti", ephemeral: true})}

        if (member.roles.cache.has("1277980184695406633") || member.roles.cache.has("1277978978371502090")) {return interaction.reply({content: "Non puoi espellere membri importanti dello staff", ephemeral: true})}

        try {
            member.kick(reason)
            ifbotcommand.set("moderatorid", interaction.user.id)
            interaction.reply({ content: `Hai espulso ${member.user.username} dal server`, ephemeral: true})
        } catch(error) {
            console.error(`Errore durante l'espulsione: ${error}`)
        }






        


    }

    if(interaction.commandName == "ban") {
        let member = interaction.options.getMember("membro")
        let reasonban = interaction.options.getString("motivo") || "Nessun motivo"

        if (!interaction.member.roles.cache.has("1276959088047034490")) {return interaction.reply({content: "Non sei uno staff", ephemeral: true})}

        if (!member.bannable) {return interaction.reply({content: "Non puoi bannare membri importanti", ephemeral: true})}

        if (member.roles.cache.has("1277980184695406633") || member.roles.cache.has("1277978978371502090")) {return interaction.reply({content: "Non puoi bannare membri importanti dello staff", ephemeral: true})}

        try {
            await member.ban({ reason: reasonban})
            member.ban()
            ifbotcommand.set("moderatorid", interaction.user.id)
            interaction.reply({ content: `Hai bannato ${member.user.username} dal server`, ephemeral: true})
        } catch (error) {
            console.error(`Errore durante il ban: ${error}`)
            interaction.reply({ content: "Si è verificato un errore durante il ban del membro.", ephemeral: true });
        }






        


    }

    if(interaction.commandName == "serverlink") {
        let embed = new Discord.EmbedBuilder()
            .setTitle("Link del Server Roblox")
            .setDescription("Ecco qui il link del server Roblox")
            .addFields({
                name: "Link:",
                value: "dadada",
                inline: true
            })
            .setColor("Green")
            .setFooter({
                text: "Italian RP",
                iconURL: client.user.displayAvatarURL({ extension: 'png'})
            })
            .setThumbnail(client.user.displayAvatarURL({ extension: 'png'}))
        interaction.reply({ embeds: [embed], ephemeral: true})
    }

    if(interaction.commandName == "serverinfo") {
        let server = interaction.guild;
        let members = await server.members.fetch()
        let bots = members.filter(member => member.user.bot).size

        let embed = new Discord.EmbedBuilder()
            .setTitle("Italian RP")
            .setDescription("Tutte le info su questo server")
            .addFields({
                name: "Owner:",
                value: `<@989918527257452564>`,
                inline: true
            },{
                name: "Membri:",
                value: `${server.memberCount}`,
                inline: true
            },{
                name: "Staff:",
                value: `${server.roles.cache.get("1276959088047034490").members.size}`,
                inline: true
            },{
                name: "Descrizione Server:",
                value: "Server per un RP Italiana su Roblox",
                inline: true
            },{
                name: "Bots:",
                value: `${bots}`,
                inline: false
            })
            .setColor("Green")
            .setFooter({
                text: "Italian RP",
                iconURL: client.user.displayAvatarURL({ extension: 'png'})
            })
            .setThumbnail(icon)
        interaction.reply({ embeds: [embed], ephemeral: true})
    }

    if(interaction.commandName == "fineassistenza") {
        if (!interaction.member.roles.cache.has("1276959088047034490")) {return interaction.reply({ content: "Non sei uno staff", ephemeral: true})}

        if (interaction.channel.id !== "1278333489695162379") {return interaction.reply({content: "Non puoi usare questo comando qui", ephemeral: true})}
        
        let modal = new Discord.ModalBuilder()
            .setCustomId("modalassistenza")
            .setTitle("Resoconto Assistenza")

        let input1 = new Discord.TextInputBuilder()
            .setCustomId("problem")
            .setLabel("Problema/Informazione")
            .setMinLength(1)
            .setMaxLength(100)
            .setPlaceholder("Scrivi qui...")
            .setStyle(Discord.TextInputStyle.Short)
            .setRequired(true)

        let input2 = new Discord.TextInputBuilder()
            .setCustomId("solved")
            .setLabel("Sei riuscito ad aiutarlo? (Si | No)")
            .setMinLength(1)
            .setMaxLength(100)
            .setPlaceholder("Scrivi qui...")
            .setStyle(Discord.TextInputStyle.Short)
            .setRequired(true)

        let input3 = new Discord.TextInputBuilder()
            .setCustomId("how")
            .setLabel("Come l'hai aiutato?")
            .setMinLength(0)
            .setMaxLength(100)
            .setPlaceholder("Scrivi qui...")
            .setStyle(Discord.TextInputStyle.Paragraph)
            .setRequired(false)

        let input4 = new Discord.TextInputBuilder()
            .setCustomId("nickname")
            .setLabel("Tag Discord (Username dell'aiutato)")
            .setMinLength(1)
            .setMaxLength(100)
            .setPlaceholder("Scrivi qui...")
            .setStyle(Discord.TextInputStyle.Paragraph)
            .setRequired(true)

        let row = new Discord.ActionRowBuilder()
            .addComponents(input1)

        let row2 = new Discord.ActionRowBuilder()
            .addComponents(input2)

        let row3 = new Discord.ActionRowBuilder()
            .addComponents(input3)

        let row4 = new Discord.ActionRowBuilder()
            .addComponents(input4)

        modal.addComponents(row)
        modal.addComponents(row2)
        modal.addComponents(row3)
        modal.addComponents(row4)

        await interaction.showModal(modal)


    }


    if(interaction.commandName == "creazione") {
        let allowedChannels = ["1284805046395207723", "1307289960197652572"]

        

        if (!interaction.member.roles.cache.has("1289649734818074746")) {return interaction.reply({ content: "Non sei un developer", ephemeral: true})}

        if (!allowedChannels.includes(interaction.channel.id)) {return interaction.reply({content: "Non puoi usare questo comando qui", ephemeral: true})}
        
        let modal = new Discord.ModalBuilder()
            .setCustomId("modalcreazioni")
            .setTitle("Creazioni Developer")

        let input1 = new Discord.TextInputBuilder()
            .setCustomId("creation")
            .setLabel("Creazione")
            .setMinLength(1)
            .setMaxLength(200)
            .setPlaceholder("Scrivi qui...")
            .setStyle(Discord.TextInputStyle.Paragraph)
            .setRequired(true)

        let row = new Discord.ActionRowBuilder()
            .addComponents(input1)

        

        modal.addComponents(row)
    

        await interaction.showModal(modal)


    }

})


client.on("interactionCreate", async interaction => {
    if (interaction.isModalSubmit()) {
        if(interaction.customId === "modalTicket") {

            
            
            const userInput = interaction.fields.getTextInputValue("problem_input")
            
            var user = interaction.user;
            var server = interaction.guild;

            if(server.channels.cache.find(canale => canale.topic == `User ID: ${user.id}`)) {
                interaction.deferUpdate()
                return
            }

            interaction.deferUpdate()

            server.channels.create({
                name: user.username,
                type: Discord.ChannelType.GuildText,
                permissionOverwrites: [
                    {
                        id:server.id,
                        deny: ["ViewChannel"]
                    },
                    {
                        id:user.id,
                        allow: ["ViewChannel"]
                    },
                    {
                        id: "1289639280473280624",
                        allow: ["ViewChannel"]
                    }
                ]
            }).then(canale => {
                canale.setTopic(`User ID: ${user.id}`)
                if (interaction.member.roles.cache.has("1297128036197470251")) {
                    let embed = new Discord.EmbedBuilder()
                        .setTitle("**Assistenza**")
                        .setDescription("Nuovo ticket creato!")
                        .setColor("Green")
                        .setThumbnail(user.avatarURL())
                        .setFooter({
                            text: "Assistenza - IRP",
                            iconURL: icon
                        })
                        .addFields(
                            {name: `Utente: `, value: `<@${user.id}>`, inline: true},
                            {name: `Descrizione Problema: `, value: userInput, inline: false},
                            {name: `Con Vip: `, value: `Sì`, inline: false}
                        )
                        let deletebutton = new Discord.ButtonBuilder()
                            .setLabel("Elimina")
                            .setStyle("Danger")
                            .setCustomId("deletebutton")
                            .setEmoji('🔒')
    
                        let transcriptbutton = new Discord.ButtonBuilder()
                            .setLabel("Transcript")
                            .setStyle("Secondary")
                            .setCustomId("transbutton")
                            .setEmoji('📜')
    
                        
            
                        let rowsettings = new Discord.ActionRowBuilder()
                            .addComponents(deletebutton)
                            .addComponents(transcriptbutton)
                            
                    
                    canale.send({embeds: [embed], components: [rowsettings]})

                    canale.send({content: "<@&1289639280473280624>", allowedMentions: {roles: ["1289639280473280624"]}
                    }).then(message => {
                        setTimeout(() => {
                            message.delete()
                            .catch(err => console.error('Errore durante l\'eliminazione del messaggio:', err));
                        }, 1000)
                    })
                    

                } else {

                    let embed = new Discord.EmbedBuilder()
                        .setTitle("**Assistenza**")
                        .setDescription("Nuovo ticket creato!")
                        .setColor("Green")
                        .setThumbnail(user.avatarURL())
                        .setFooter({
                            text: "Assistenza - IRP",
                            iconURL: icon
                        })
                        .addFields(
                            {name: `Utente: `, value: `<@${user.id}>`, inline: true},
                            {name: `Descrizione Problema: `, value: userInput, inline: false},
                            {name: `Con Vip: `, value: `No`, inline: false}
                        )
                        let deletebutton = new Discord.ButtonBuilder()
                            .setLabel("Elimina")
                            .setStyle("Danger")
                            .setCustomId("deletebutton")
                            .setEmoji('🔒')
    
                        let transcriptbutton = new Discord.ButtonBuilder()
                            .setLabel("Transcript")
                            .setStyle("Secondary")
                            .setCustomId("transbutton")
                            .setEmoji('📜')
    
                        
            
                        let rowsettings = new Discord.ActionRowBuilder()
                            .addComponents(deletebutton)
                            .addComponents(transcriptbutton)
                            
                    
                    canale.send({embeds: [embed], components: [rowsettings]})
                }
            })
        }
        if(interaction.customId === "modalassistenza") {
            let problem = interaction.fields.getTextInputValue("problem")
            let solved = interaction.fields.getTextInputValue("solved")
            let how = interaction.fields.getTextInputValue("how") || "//"
            let nickname = interaction.fields.getTextInputValue("nickname")

            let embed = new Discord.EmbedBuilder()
                .setTitle("**MODULO RESOCONTO ASSISTENZA**")
                .setAuthor({
                    name: interaction.user.username,
                    iconURL: interaction.user.displayAvatarURL({ extension: 'png' })
                })
                .addFields(
                    {name: "Problema/Informazione", value: problem, inline: true},
                    {name: "Sei riuscito ad aiutarlo?", value: solved, inline: true},
                    {name: "Come l'hai aiutato?", value: how, inline: false},
                    {name: "Tag Discord", value: nickname, inline: false}
                )
                .setColor("Gold")
            
            interaction.reply({ embeds: [embed]})
        }
        if(interaction.customId === "modalcreazioni") {
            let creation = interaction.fields.getTextInputValue("creation")

            await interaction.reply({
                content: "Perfetto! Ora allega un'immagine che vuoi includere nel tuo messaggio.",
                ephemeral: true
            });
        
            
            const filter = (m) => m.author.id === interaction.user.id && m.attachments.size > 0;
            const collector = interaction.channel.createMessageCollector({ filter, time: 60000, max: 1 });
        
            collector.on('collect', async (message) => {
                const attachment = message.attachments.first();
                if (attachment && attachment.contentType.startsWith('image/')) {
                    if (interaction.channel.id == "1307289960197652572") {
                        const embed = new Discord.EmbedBuilder()
                            .setTitle("**CREAZIONE DS.DEVELOPER**")
                            .setAuthor({
                                name: interaction.user.username,
                                iconURL: interaction.user.displayAvatarURL({ extension: 'png' })
                            })
                            .setDescription(creation)
                            .setImage(attachment.url)
                            .setColor("Blue");
        
                    
                        await interaction.followUp({ embeds: [embed] });
                        message.delete()
                    }
                    if (interaction.channel.id == "1284805046395207723") {
                        const embed = new Discord.EmbedBuilder()
                            .setTitle("**CREAZIONE DEVELOPER**")
                            .setAuthor({
                                name: interaction.user.username,
                                iconURL: interaction.user.displayAvatarURL({ extension: 'png' })
                            })
                            .setDescription(creation)
                            .setImage(attachment.url)
                            .setColor("Blue");
        
                    
                        await interaction.followUp({ embeds: [embed] });
                        message.delete()
                    }
                } else {
                    await interaction.followUp({
                        content: "Il file inviato non è un'immagine valida. Riprova.",
                        ephemeral: true
                    });
                }
            });
        
            collector.on('end', (collected, reason) => {
                if (reason === 'time') {
                    interaction.followUp({
                        content: "Non hai allegato un'immagine in tempo. Operazione annullata.",
                        ephemeral: true
                    });
                }
            });

        }
    }


    
        
    }
)

client.on("interactionCreate", async interaction => {

    if (!interaction.isButton()) return;

    if (interaction.customId === "deletebutton") {

        if (!interaction.member.roles.cache.has("1289639280473280624")) {
            interaction.reply({ content: "Il bottone è riservato agli staff", ephemeral: true, components: [], embeds: []})
            return
        }

        interaction.deferUpdate()

        interaction.channel.delete()
    }

    

    if (interaction.customId === "transbutton") {
        
        if (!interaction.member.roles.cache.has("1289639280473280624")) {
            interaction.reply({ content: "Il bottone è riservato agli staff", ephemeral: true, components: [], embeds: []})
            return
        }

        interaction.deferUpdate()

        let chatLog = `-- CHAT LOG #${interaction.channel.name} --\n\n`

        let messages = await getAllMessages(interaction.channel)

        messages.reverse().forEach(msg => {
            chatLog += `@${msg.author.tag} ID: ${msg.author.id} - ${msg.createdAt.toLocaleString()}\n`

            if(msg.content) chatLog += `${msg.content}\n`

            if(msg.embeds[0]) {
                chatLog += `Embed:\n`

                if(msg.embeds[0].title) chatLog += `Title: ${msg.embeds[0].title}\n`
                if(msg.embeds[0].description) chatLog += `Description: ${msg.embeds[0].description}\n`
                if(msg.embeds[0].fields[0]) chatLog += `Fields: ${msg.embeds[0].fields.map(x => `${x.value}`).join(", ")}\n`
            }

            if (msg.attachments.size > 0)
                chatLog += `Files: ${msg.attachments.map(x => `${x.name} (${x.url})`).join(", ")}\n`

            if (msg.stickers.size > 0)
                chatLog += `Stickers: ${msg.stickers.map(x => `${x.name} (${x.url})`).join(", ")}\n`

            chatLog += "\n"
        })

        let attachment = new Discord.AttachmentBuilder(Buffer.from(chatLog, "utf-8"), { name:`chatLog-channel-${interaction.channel.id}.txt`, contentType: "text/plain"})

        let topicChannel = interaction.channel.topic.slice(9)
        let utente = await getUserbyId(topicChannel)

        let embed = new Discord.EmbedBuilder()
            .setAuthor({
                name: utente.username,
                iconURL: utente.avatarURL()
            })
            .addFields(
                {name: `Mittente: `, value: `<@${utente.id}>`, inline: true},
                {name: `Nome del ticket: `, value: interaction.channel.name, inline: false}
            )
            .setColor("Green")


        client.channels.cache.get("1276956932825157747").send({ embeds: [embed], files: [attachment] })

    }
})

//TICKETS ADD E REMOVE

const getAllMessages = async (channel) => {
    let allMessages = []
    let lastMessage

    while(true) {
        const options = {limit: 100}
        if(lastMessage) options.before = lastMessage

        let messages = await channel.messages.fetch(options)

        allMessages = allMessages.concat(Array.from(messages.values()))

        lastMessage = messages.last().id

        if(messages.size != 100) {
            break
        }
    }

    return allMessages
}

client.on("interactionCreate", interaction => {
    if (!interaction.isCommand()) return

    if(interaction.commandName == "add") {
        var topic = interaction.channel.topic;
        if (!topic) {
            interaction.reply({ content: "Non puoi utilizzare questo comando qui", ephemeral: true});
            return
        }

        if (topic.startsWith("User ID:")) {
            if (interaction.member.roles.cache.has("1289639280473280624")) {
                var utente = interaction.options.getMember("membro")
                if (!utente) {
                    interaction.reply({ content: "Inserire un utente valido", ephemeral: true})
                    return
                }

                const haspermissionobtained = interaction.channel.permissionsFor(utente.user)?.has("ViewChannel");

                if (haspermissionobtained) {
                    interaction.reply({content: "Questo utente ha già accesso al ticket", ephemeral: true})
                    return
                }

                let server = interaction.guild

                let ownerticket = server.members.cache.find(m => m.user.username === interaction.channel.name)

                interaction.channel.permissionOverwrites.set([
                    {
                        id: utente.user.id,
                        allow: ["ViewChannel"]
                    },
                    {
                        id: ownerticket.user.id,
                        allow: ["ViewChannel"]
                    },
                    {
                        id: server.id,
                        deny: ["ViewChannel"]
                    },
                    {
                        id: "1289639280473280624",
                        allow: ["ViewChannel"]
                    }
                ])

                interaction.reply({ content:`${utente.toString()} è stato aggiunto al ticket`})
            } else {
                interaction.reply({ content: "Questo comando è riservato agli staff", ephemeral: true});
                return
            }
        }
    }
})

client.on("interactionCreate", interaction => {
    if (!interaction.isCommand()) return

    if(interaction.commandName == "remove") {
        var topic = interaction.channel.topic;
        if (!topic) {
            interaction.reply({ content: "Non puoi utilizzare questo comando qui", ephemeral: true});
            return
        }

        if (topic.startsWith("User ID:")) {
            if (interaction.member.roles.cache.has("1289639280473280624")) {
                var utente = interaction.options.getMember("membro")
                if (!utente) {
                    interaction.reply({ content: "Inserire un utente valido", ephemeral: true})
                    return
                }

                const haspermissionobtained = interaction.channel.permissionsFor(utente.user)?.has("ViewChannel");

                if (!haspermissionobtained) {
                    interaction.reply("Questo utente non ha ancora l'accesso al ticket")
                    return
                }

                let server = interaction.guild

                let ownerticket = server.members.cache.find(m => m.user.username === interaction.channel.name)

                interaction.channel.permissionOverwrites.set([
                    {
                        id: utente.user.id,
                        deny: ["ViewChannel"]
                    },
                    {
                        id: ownerticket.user.id,
                        allow: ["ViewChannel"]
                    },
                    {
                        id: server.id,
                        deny: ["ViewChannel"]
                    },
                    {
                        id: "1289639280473280624",
                        allow: ["ViewChannel"]
                    }
                ])

                interaction.reply({ content:`${utente.toString()} è stato rimosso dal ticket`})
            } else {
                interaction.reply({ content: "Questo comando è riservato agli staff", ephemeral: true});
                return
            }
        }
    }
})

