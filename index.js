const Discord = require("discord.js")

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

const { icon } = require("./token.json")

const { token } = require("./token.json")

client.login(token);

client.on("ready", () => {
    console.log("Il bot è stato correttamente avviato.")
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

client.on("messageCreate", message => {
    if(message.content.startsWith("!add")) {
        var topic = message.channel.topic;
        if (!topic) {
            message.reply({ content: "Non puoi utilizzare questo comando qui", ephemeral: true});
            return
        }

        if (topic.startsWith("User ID:")) {
            if (message.member.roles.cache.has("1289639280473280624")) {
                var utente = message.mentions.members.first();
                if (!utente) {
                    message.reply({ content: "Inserire un utente valido", ephemeral: true})
                    return
                }

                const haspermissionobtained = message.channel.permissionsFor(utente.user)?.has("ViewChannel");

                if (haspermissionobtained) {
                    message.reply("Questo utente ha già accesso al ticket")
                    return
                }

                let server = message.guild

                let ownerticket = server.members.cache.find(m => m.user.username === message.channel.name)

                message.channel.permissionOverwrites.set([
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

                message.channel.send(`${utente.toString()} è stato aggiunto al ticket`)
            } else {
                message.reply({ content: "Questo comando è riservato agli staff", ephemeral: true});
                return
            }
        }
    }
})

client.on("messageCreate", message => {
    if(message.content.startsWith("!remove")) {
        var topic = message.channel.topic;
        if (!topic) {
            message.reply({ content: "Non puoi utilizzare questo comando qui", ephemeral: true});
            return
        }

        if (topic.startsWith("User ID:")) {
            if (message.member.roles.cache.has("1289639280473280624")) {
                var utente = message.mentions.members.first();
                if (!utente) {
                    message.reply({ content: "Inserire un utente valido", ephemeral: true})
                    return
                }

                const haspermissionobtained = message.channel.permissionsFor(utente.user)?.has("ViewChannel");

                if (!haspermissionobtained) {
                    message.reply("Questo utente non ha ancora l'accesso al ticket")
                    return
                }

                let server = message.guild

                let ownerticket = server.members.cache.find(m => m.user.username === message.channel.name)

                message.channel.permissionOverwrites.set([
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

                message.channel.send(`${utente.toString()} è stato rimosso dal ticket`)
            } else {
                message.reply({ content: "Questo comando è riservato agli staff", ephemeral: true});
                return
            }
        }
    }
})






