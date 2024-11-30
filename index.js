const Discord = require("discord.js")
const fs = require('fs')
const path = './temproles.json'

const client = new Discord.Client(
    {intents:[
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMembers,
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


require('dotenv').config();

const { icon } = require("./fileresources.json")

client.login(process.env.TOKEN);

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
        
        
        
    })
    
    
    
    
    

        
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

client.on("interactionCreate", interaction => {
    if (!interaction.isCommand()) return;

    if(interaction.commandName == "temprole-add") {
        let member = interaction.options.getMember("membro");
        let role = interaction.options.getRole("ruolo");
        let duration = interaction.options.getNumber("durata");
        let reason = interaction.options.getString("motivo") || "Non presente";


        if (!interaction.member.roles.cache.has("1276959088047034490")) { return interaction.reply({ content: "Non hai i permessi per eseguire questo comando", ephemeral: true}) }
    
        if(member.roles.cache.has(role.id)) { return interaction.reply({ content: "Il membro ha già il ruolo", ephemeral: true})}
        
            member.roles.add(role)


            const temprolesData = JSON.parse(fs.readFileSync(path, 'utf8') || '{"userRoles": []}');
            temprolesData.userRoles.push({
                userId: member.id,
                roleId: role.id,
                guildId: interaction.guild.id,
                expiresAt: Date.now() + duration * 86400000
            });
            fs.writeFileSync(path, JSON.stringify(temprolesData, null, 2), 'utf8')




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

        let embed = new Discord.EmbedBuilder()
            .setDescription(`✅ Rimosso ${role} a ${member.user.username}`)
            .setColor("Red")

        interaction.reply({ embeds: [embed]})
        
    }
    
})


client.on("interactionCreate", interaction => {
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
                            {name: `Con Vip: `, value: `<@&1289639280473280624>`, inline: false}
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
                            {name: `Descrizione Problema: `, value: userInput, inline: false}
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
    }

    
        
    }
)

client.on("interactionCreate", async interaction => {
    var user = interaction.user;
    var server = interaction.guild;

    if (!interaction.isButton()) return;

    if (interaction.customId === "deletebutton") {
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
    
        let guild = interaction.guild;

        let utente = guild.members.cache.find(m => m.user.username === interaction.channel.name)

        let embed = new Discord.EmbedBuilder()
            .setAuthor({
                name: interaction.channel.name,
                iconURL: utente.user.avatarURL()
            })
            .addFields(
                {name: `Mittente: `, value: `<@${utente.user.id}>`, inline: true},
                {name: `Nome del ticket: `, value: interaction.channel.name, inline: false}
            )
            .setColor("Green")


        client.channels.cache.get("1276956932825157747").send({ embeds: [embed], files: [attachment] })

    }
})

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