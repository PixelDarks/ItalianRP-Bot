const Discord = require("discord.js")

const client = new Discord.Client(
    {intents:["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"]}
)

const { icon } = require("./token.json")

const { token } = require("./token.json")

client.login(token);

client.on("ready", () => {
    console.log("Il bot è stato correttamente avviato.")
})

client.on("messageCreate", (message) => {
    if(message.content == "!assistenza") {
        let embed = new Discord.MessageEmbed()
            .setTitle("**Assistenza**")
            .setDescription("Clicca il pulsante sottostante se hai bisogno di assistenza via ticket. \n Aprire un ticket e non fornire nessuna risposta in esso \n per un tempo maggiore di 24h comporterà la chiusura automatico dello stesso")
            .setThumbnail(icon)
            .setColor("GREEN")
            .setFooter({
                text: "Assistenza - IRP",
                iconURL: icon
            })
            
            let buttoncreate = new Discord.MessageButton()
                .setLabel("Apri un ticket")
                .setStyle("SUCCESS")
                .setCustomId("buttoncreate")

            let buttonvip = new Discord.MessageButton()
                .setLabel("Assistenza prioritaria")
                .setStyle("DANGER")
                .setCustomId("buttonvip")
            
            let row = new Discord.MessageActionRow()
                .addComponents(buttoncreate)
                .addComponents(buttonvip)
            
            message.channel.send({ embeds: [embed], components: [row]})

    }
        
})


client.on("interactionCreate", interaction => {
    if(!interaction.isButton()) return
    
    if(interaction.customId == "buttoncreate") {
        var embedmenu = new Discord.MessageEmbed()
            .setTitle("Tipologie di ticket")
            .setFooter({
            text: "Assistenza - IRP",
            iconURL: icon
            })

        var selectmenu = new Discord.MessageSelectMenu()
            .setCustomId("menuselectTicket")
            .setPlaceholder("Seleziona una tipologia")
            .setMinValues(1)
            .setMaxValues(1)
            .addOptions([
                {
                    label: "Generale",
                    value: "generale"
                },
                {
                    label: "Un-ban",
                    description: "Richiesta di un-ban",
                    value: "unban"
                },
                {
                    label: "Problemi di accesso",
                    description: "Problemi di accesso alla mappa RP",
                    value: "access-difficulty"
                },
                {
                    label: "Discord Fazioni",
                    description: "Richiedi il server per il proprio lavoro",
                    value: "discord-work"
                },
                {
                    label: "Donazioni",
                    description: "Donazioni al server",
                    value: "donations"
                },
                {
                    label: "Amministrazione",
                    description: "Parla in privato con l'Owner o il Co-Owner",
                    value: "admin"
                }
            ])

        let rowmenu = new Discord.MessageActionRow()
            .addComponents(selectmenu)

        interaction.reply({embeds: [embedmenu], components: [rowmenu], ephemeral: true})

        
    }

    if(interaction.customId == "buttonvip") {
        if(interaction.member.roles.cache.has("1297128036197470251")) {
            var embedmenuvip = new Discord.MessageEmbed()
            .setTitle("Tipologie di ticket")
            .setFooter({
                text: "Assistenza - IRP",
                iconURL: icon
            })

            var selectmenuvip = new Discord.MessageSelectMenu()
                .setCustomId("menuselectTicketVip")
                .setPlaceholder("Seleziona una tipologia")
                .setMinValues(1)
                .setMaxValues(1)
                .addOptions([
                    {
                        label: "Generale",
                        value: "generale"
                    },
                    {
                        label: "Un-ban",
                        description: "Richiesta di un-ban",
                        value: "unban"
                    },
                    {
                        label: "Problemi di accesso",
                        description: "Problemi di accesso alla mappa RP",
                        value: "access-difficulty"
                    },
                    {
                        label: "Discord Fazioni",
                        description: "Richiedi il server per il proprio lavoro",
                        value: "discord-work"
                    },
                    {
                        label: "Donazioni",
                        description: "Donazioni al server",
                        value: "donations"
                    },
                    {
                        label: "Amministrazione",
                        description: "Parla in privato con l'Owner o il Co-Owner",
                        value: "admin"
                    }
                ])

            let rowmenuvip = new Discord.MessageActionRow()
                .addComponents(selectmenuvip)
                interaction.reply({embeds: [embedmenuvip], components: [rowmenuvip], ephemeral: true})
        } else {
            interaction.reply({content: "Non sei un vip!", ephemeral: true})
        }
        

    
    }
})


client.on("interactionCreate", interaction => {
    if (!interaction.isSelectMenu()) return;

    if (interaction.customId === "menuselectTicket") {
        // Risposta immediata per ogni opzione
        switch (interaction.values[0]) {
            //GENERALE
            case "generale":
                interaction.deleteReply()

                
                var user = interaction.user;
                var server = interaction.guild;

                if(server.channels.cache.find(canale => canale.topic == `User ID: ${user.id}`)) {
                    interaction.update({ content: "Hai già un ticket aperto!", ephemeral: true, components: [], embeds:[] })
                    return
                }

                interaction.deferUpdate()

                server.channels.create(user.username, {
                    type: "text",
                    permissionOverwrites: [
                        {
                            id:server.id,
                            deny: ["VIEW_CHANNEL"]
                        },
                        {
                            id:user.id,
                            allow: ["VIEW_CHANNEL"]
                        },
                        {
                            id:"1289639280473280624",
                            allow: ["VIEW_CHANNEL"]
                        }
                    ]
                }).then(canale => {
                    canale.setTopic(`User ID: ${user.id}`)
                    let embed = new Discord.MessageEmbed()
                        .setTitle("**Assistenza**")
                        .setDescription("Nuovo ticket creato!")
                        .setColor("GREEN")
                        .setThumbnail(user.avatarURL())
                        .setFooter({
                            text: "Assistenza - IRP",
                            iconURL: icon
                        })
                        .addFields(
                            {name: `Utente: `, value: `<@${user.id}>`, inline: true},
                            {name: `Tipo di ticket: `, value: "**Generale**", inline: false}
                        )
                        let deletebutton = new Discord.MessageButton()
                            .setLabel("Elimina")
                            .setStyle("DANGER")
                            .setCustomId("deletebutton")

                        let transcriptbutton = new Discord.MessageButton()
                            .setLabel("Transcript")
                            .setStyle("SECONDARY")
                            .setCustomId("transbutton")
            
                        let rowsettings = new Discord.MessageActionRow()
                            .addComponents(deletebutton)
                            .addComponents(transcriptbutton)
                    
                    canale.send({embeds: [embed], components: [rowsettings]})

                })
                break;
            //UNBAN
            case "unban":
                interaction.deleteReply()

                
                var user = interaction.user;
                var server = interaction.guild;

                if(server.channels.cache.find(canale => canale.topic == `User ID: ${user.id}`)) {
                    interaction.update({ content: "Hai già un ticket aperto!", ephemeral: true, components: [], embeds:[] })
                    return
                }

                interaction.deferUpdate()

                server.channels.create(user.username, {
                    type: "text",
                    permissionOverwrites: [
                        {
                            id:server.id,
                            deny: ["VIEW_CHANNEL"]
                        },
                        {
                            id:user.id,
                            allow: ["VIEW_CHANNEL"]
                        },
                        {
                            id:"1289639280473280624",
                            allow: ["VIEW_CHANNEL"]
                        }
                    ]
                }).then(canale => {
                    canale.setTopic(`User ID: ${user.id}`)
                    let embed = new Discord.MessageEmbed()
                        .setTitle("**Assistenza**")
                        .setDescription("Nuovo ticket creato!")
                        .setColor("GREEN")
                        .setThumbnail(user.avatarURL())
                        .setFooter({
                            text: "Assistenza - IRP",
                            iconURL: icon
                        })
                        .addFields(
                            {name: `Utente: `, value: `<@${user.id}>`, inline: true},
                            {name: `Tipo di ticket: `, value: "**Un-ban**", inline: false}
                        )
                    let deletebutton = new Discord.MessageButton()
                        .setLabel("Elimina")
                        .setStyle("DANGER")
                        .setCustomId("deletebutton")

                    let transcriptbutton = new Discord.MessageButton()
                        .setLabel("Transcript")
                        .setStyle("SECONDARY")
                        .setCustomId("transbutton")
        
                    let rowsettings = new Discord.MessageActionRow()
                        .addComponents(deletebutton)
                        .addComponents(transcriptbutton)
                
                canale.send({embeds: [embed], components: [rowsettings]})

                })
                break;
            //DIFFICOLTà di accesso
            case "access-difficulty":
                interaction.deleteReply()

                
                var user = interaction.user;
                var server = interaction.guild;

                if(server.channels.cache.find(canale => canale.topic == `User ID: ${user.id}`)) {
                    interaction.update({ content: "Hai già un ticket aperto!", ephemeral: true, components: [], embeds:[] })
                    return
                }

                interaction.deferUpdate()

                server.channels.create(user.username, {
                    type: "text",
                    permissionOverwrites: [
                        {
                            id:server.id,
                            deny: ["VIEW_CHANNEL"]
                        },
                        {
                            id:user.id,
                            allow: ["VIEW_CHANNEL"]
                        },
                        {
                            id:"1289639280473280624",
                            allow: ["VIEW_CHANNEL"]
                        }
                    ]
                }).then(canale => {
                    canale.setTopic(`User ID: ${user.id}`)
                    let embed = new Discord.MessageEmbed()
                        .setTitle("**Assistenza**")
                        .setDescription("Nuovo ticket creato!")
                        .setColor("GREEN")
                        .setThumbnail(user.avatarURL())
                        .setFooter({
                            text: "Assistenza - IRP",
                            iconURL: icon
                        })
                        .addFields(
                            {name: `Utente: `, value: `<@${user.id}>`, inline: true},
                            {name: `Tipo di ticket: `, value: "**Problemi di accesso**", inline: false}
                        )
                        let deletebutton = new Discord.MessageButton()
                            .setLabel("Elimina")
                            .setStyle("DANGER")
                            .setCustomId("deletebutton")

                        let transcriptbutton = new Discord.MessageButton()
                            .setLabel("Transcript")
                            .setStyle("SECONDARY")
                            .setCustomId("transbutton")
            
                        let rowsettings = new Discord.MessageActionRow()
                            .addComponents(deletebutton)
                            .addComponents(transcriptbutton)
                    
                    canale.send({embeds: [embed], components: [rowsettings]})

                })
                break;
            case "discord-work":
                interaction.deleteReply()

                
                var user = interaction.user;
                var server = interaction.guild;

                if(server.channels.cache.find(canale => canale.topic == `User ID: ${user.id}`)) {
                    interaction.update({ content: "Hai già un ticket aperto!", ephemeral: true, components: [], embeds:[] })
                    return
                }

                interaction.deferUpdate()

                server.channels.create(user.username, {
                    type: "text",
                    permissionOverwrites: [
                        {
                            id:server.id,
                            deny: ["VIEW_CHANNEL"]
                        },
                        {
                            id:user.id,
                            allow: ["VIEW_CHANNEL"]
                        },
                        {
                            id:"1289639280473280624",
                            allow: ["VIEW_CHANNEL"]
                        }
                    ]
                }).then(canale => {
                    canale.setTopic(`User ID: ${user.id}`)
                    let embed = new Discord.MessageEmbed()
                        .setTitle("**Assistenza**")
                        .setDescription("Nuovo ticket creato!")
                        .setColor("GREEN")
                        .setThumbnail(user.avatarURL())
                        .setFooter({
                            text: "Assistenza - IRP",
                            iconURL: icon
                        })
                        .addFields(
                            {name: `Utente: `, value: `<@${user.id}>`, inline: true},
                            {name: `Tipo di ticket: `, value: "**Discord Fazioni**", inline: false}
                        )
                    let deletebutton = new Discord.MessageButton()
                        .setLabel("Elimina")
                        .setStyle("DANGER")
                        .setCustomId("deletebutton")

                    let transcriptbutton = new Discord.MessageButton()
                        .setLabel("Transcript")
                        .setStyle("SECONDARY")
                        .setCustomId("transbutton")
        
                    let rowsettings = new Discord.MessageActionRow()
                        .addComponents(deletebutton)
                        .addComponents(transcriptbutton)
                
                canale.send({embeds: [embed], components: [rowsettings]})

                })
                break;
            case "donations":
                interaction.deleteReply()

                
                var user = interaction.user;
                var server = interaction.guild;

                if(server.channels.cache.find(canale => canale.topic == `User ID: ${user.id}`)) {
                    interaction.update({ content: "Hai già un ticket aperto!", ephemeral: true, components: [], embeds:[] })
                    return
                }

                interaction.deferUpdate()

                server.channels.create(user.username, {
                    type: "text",
                    permissionOverwrites: [
                        {
                            id:server.id,
                            deny: ["VIEW_CHANNEL"]
                        },
                        {
                            id:user.id,
                            allow: ["VIEW_CHANNEL"]
                        },
                        {
                            id:"1289639280473280624",
                            allow: ["VIEW_CHANNEL"]
                        }
                    ]
                }).then(canale => {
                    canale.setTopic(`User ID: ${user.id}`)
                    let embed = new Discord.MessageEmbed()
                        .setTitle("**Assistenza**")
                        .setDescription("Nuovo ticket creato!")
                        .setColor("GREEN")
                        .setThumbnail(user.avatarURL())
                        .setFooter({
                            text: "Assistenza - IRP",
                            iconURL: icon
                        })
                        .addFields(
                            {name: `Utente: `, value: `<@${user.id}>`, inline: true},
                            {name: `Tipo di ticket: `, value: "**Donazioni**", inline: false}
                        )
                    let deletebutton = new Discord.MessageButton()
                        .setLabel("Elimina")
                        .setStyle("DANGER")
                        .setCustomId("deletebutton")

                    let transcriptbutton = new Discord.MessageButton()
                        .setLabel("Transcript")
                        .setStyle("SECONDARY")
                        .setCustomId("transbutton")
        
                    let rowsettings = new Discord.MessageActionRow()
                        .addComponents(deletebutton)
                        .addComponents(transcriptbutton)
                
                canale.send({embeds: [embed], components: [rowsettings]})

                })
                break;
            case "admin":
                interaction.deleteReply()

                
                var user = interaction.user;
                var server = interaction.guild;

                if(server.channels.cache.find(canale => canale.topic == `User ID: ${user.id}`)) {
                    interaction.update({ content: "Hai già un ticket aperto!", ephemeral: true, components: [], embeds:[] })
                    return
                }

                interaction.deferUpdate()

                server.channels.create(user.username, {
                    type: "text",
                    permissionOverwrites: [
                        {
                            id:server.id,
                            deny: ["VIEW_CHANNEL"]
                        },
                        {
                            id:user.id,
                            allow: ["VIEW_CHANNEL"]
                        },
                        {
                            id:"1289639280473280624",
                            allow: ["VIEW_CHANNEL"]
                        }
                    ]
                }).then(canale => {
                    canale.setTopic(`User ID: ${user.id}`)
                    let embed = new Discord.MessageEmbed()
                        .setTitle("**Assistenza**")
                        .setDescription("Nuovo ticket creato!")
                        .setColor("GREEN")
                        .setThumbnail(user.avatarURL())
                        .setFooter({
                            text: "Assistenza - IRP",
                            iconURL: icon
                        })
                        .addFields(
                            {name: `Utente: `, value: `<@${user.id}>`, inline: true},
                            {name: `Tipo di ticket: `, value: "**Amministrazione**", inline: false}
                        )
                    let deletebutton = new Discord.MessageButton()
                        .setLabel("Elimina")
                        .setStyle("DANGER")
                        .setCustomId("deletebutton")

                    let transcriptbutton = new Discord.MessageButton()
                        .setLabel("Transcript")
                        .setStyle("SECONDARY")
                        .setCustomId("transbutton")
        
                    let rowsettings = new Discord.MessageActionRow()
                        .addComponents(deletebutton)
                        .addComponents(transcriptbutton)
                
                canale.send({embeds: [embed], components: [rowsettings]})
                })
                break;
        }
    }

    if (interaction.customId === "menuselectTicketVip") {
        // Stessa logica applicata al menu VIP
        switch (interaction.values[0]) {
            case "generale":
                interaction.deleteReply()

                
                var user = interaction.user;
                var server = interaction.guild;

                if(server.channels.cache.find(canale => canale.topic == `User ID: ${user.id}`)) {
                    interaction.update({ content: "Hai già un ticket aperto!", ephemeral: true, components: [], embeds:[] })
                    return
                }

                interaction.deferUpdate()

                server.channels.create(user.username, {
                    type: "text",
                    permissionOverwrites: [
                        {
                            id:server.id,
                            deny: ["VIEW_CHANNEL"]
                        },
                        {
                            id:user.id,
                            allow: ["VIEW_CHANNEL"]
                        },
                        {
                            id:"1289639280473280624",
                            allow: ["VIEW_CHANNEL"]
                        }
                    ]
                }).then(canale => {
                    canale.setTopic(`User ID: ${user.id}`)
                    let embed = new Discord.MessageEmbed()
                        .setTitle("**Assistenza**")
                        .setDescription("Nuovo ticket creato!")
                        .setColor("GREEN")
                        .setThumbnail(user.avatarURL())
                        .setFooter({
                            text: "Assistenza - IRP",
                            iconURL: icon
                        })
                        .addFields(
                            {name: `Utente: `, value: `<@${user.id}>`, inline: true},
                            {name: `Tipo di ticket: `, value: "**Generale**", inline: false},
                            {name: `Con VIP: `, value: `<@&1289639280473280624>`, inline: false}
                        )
                    let deletebutton = new Discord.MessageButton()
                        .setLabel("Elimina")
                        .setStyle("DANGER")
                        .setCustomId("deletebutton")

                    let transcriptbutton = new Discord.MessageButton()
                        .setLabel("Transcript")
                        .setStyle("SECONDARY")
                        .setCustomId("transbutton")
        
                    let rowsettings = new Discord.MessageActionRow()
                        .addComponents(deletebutton)
                        .addComponents(transcriptbutton)
                
                canale.send({embeds: [embed], components: [rowsettings]})

                })
                break;
            case "unban":
                interaction.deleteReply()

                
                var user = interaction.user;
                var server = interaction.guild;

                if(server.channels.cache.find(canale => canale.topic == `User ID: ${user.id}`)) {
                    interaction.update({ content: "Hai già un ticket aperto!", ephemeral: true, components: [], embeds:[] })
                    return
                }

                interaction.deferUpdate()

                server.channels.create(user.username, {
                    type: "text",
                    permissionOverwrites: [
                        {
                            id:server.id,
                            deny: ["VIEW_CHANNEL"]
                        },
                        {
                            id:user.id,
                            allow: ["VIEW_CHANNEL"]
                        },
                        {
                            id:"1289639280473280624",
                            allow: ["VIEW_CHANNEL"]
                        }
                    ]
                }).then(canale => {
                    canale.setTopic(`User ID: ${user.id}`)
                    let embed = new Discord.MessageEmbed()
                        .setTitle("**Assistenza**")
                        .setDescription("Nuovo ticket creato!")
                        .setColor("GREEN")
                        .setThumbnail(user.avatarURL())
                        .setFooter({
                            text: "Assistenza - IRP",
                            iconURL: icon
                        })
                        .addFields(
                            {name: `Utente: `, value: `<@${user.id}>`, inline: true},
                            {name: `Tipo di ticket: `, value: "**Un-ban**", inline: false},
                            {name: `Con VIP: `, value: `<@&1289639280473280624>`, inline: false}
                        )
                    let deletebutton = new Discord.MessageButton()
                        .setLabel("Elimina")
                        .setStyle("DANGER")
                        .setCustomId("deletebutton")

                    let transcriptbutton = new Discord.MessageButton()
                        .setLabel("Transcript")
                        .setStyle("SECONDARY")
                        .setCustomId("transbutton")
        
                    let rowsettings = new Discord.MessageActionRow()
                        .addComponents(deletebutton)
                        .addComponents(transcriptbutton)
                
                canale.send({embeds: [embed], components: [rowsettings]})

                })
                break;
            case "access-difficulty":
                interaction.deleteReply()

                
                var user = interaction.user;
                var server = interaction.guild;

                if(server.channels.cache.find(canale => canale.topic == `User ID: ${user.id}`)) {
                    interaction.update({ content: "Hai già un ticket aperto!", ephemeral: true, components: [], embeds:[] })
                    return
                }

                interaction.deferUpdate()

                server.channels.create(user.username, {
                    type: "text",
                    permissionOverwrites: [
                        {
                            id:server.id,
                            deny: ["VIEW_CHANNEL"]
                        },
                        {
                            id:user.id,
                            allow: ["VIEW_CHANNEL"]
                        },
                        {
                            id:"1289639280473280624",
                            allow: ["VIEW_CHANNEL"]
                        }
                    ]
                }).then(canale => {
                    canale.setTopic(`User ID: ${user.id}`)
                    let embed = new Discord.MessageEmbed()
                        .setTitle("**Assistenza**")
                        .setDescription("Nuovo ticket creato!")
                        .setColor("GREEN")
                        .setThumbnail(user.avatarURL())
                        .setFooter({
                            text: "Assistenza - IRP",
                            iconURL: icon
                        })
                        .addFields(
                            {name: `Utente: `, value: `<@${user.id}>`, inline: true},
                            {name: `Tipo di ticket: `, value: "**Problemi di accesso**", inline: false},
                            {name: `Con VIP: `, value: `<@&1289639280473280624>`, inline: false}
                        )
                    let deletebutton = new Discord.MessageButton()
                        .setLabel("Elimina")
                        .setStyle("DANGER")
                        .setCustomId("deletebutton")

                    let transcriptbutton = new Discord.MessageButton()
                        .setLabel("Transcript")
                        .setStyle("SECONDARY")
                        .setCustomId("transbutton")
        
                    let rowsettings = new Discord.MessageActionRow()
                        .addComponents(deletebutton)
                        .addComponents(transcriptbutton)
                
                canale.send({embeds: [embed], components: [rowsettings]})

                })
                break;
            case "discord-work":
                interaction.deleteReply()

                
                var user = interaction.user;
                var server = interaction.guild;

                if(server.channels.cache.find(canale => canale.topic == `User ID: ${user.id}`)) {
                    interaction.update({ content: "Hai già un ticket aperto!", ephemeral: true, components: [], embeds:[] })
                    return
                }

                interaction.deferUpdate()

                server.channels.create(user.username, {
                    type: "text",
                    permissionOverwrites: [
                        {
                            id:server.id,
                            deny: ["VIEW_CHANNEL"]
                        },
                        {
                            id:user.id,
                            allow: ["VIEW_CHANNEL"]
                        },
                        {
                            id:"1289639280473280624",
                            allow: ["VIEW_CHANNEL"]
                        }
                    ]
                }).then(canale => {
                    canale.setTopic(`User ID: ${user.id}`)
                    let embed = new Discord.MessageEmbed()
                        .setTitle("**Assistenza**")
                        .setDescription("Nuovo ticket creato!")
                        .setColor("GREEN")
                        .setThumbnail(user.avatarURL())
                        .setFooter({
                            text: "Assistenza - IRP",
                            iconURL: icon
                        })
                        .addFields(
                            {name: `Utente: `, value: `<@${user.id}>`, inline: true},
                            {name: `Tipo di ticket: `, value: "**Discord Fazioni**", inline: false},
                            {name: `Con VIP: `, value: `<@&1289639280473280624>`, inline: false}
                        )
                    let deletebutton = new Discord.MessageButton()
                        .setLabel("Elimina")
                        .setStyle("DANGER")
                        .setCustomId("deletebutton")

                    let transcriptbutton = new Discord.MessageButton()
                        .setLabel("Transcript")
                        .setStyle("SECONDARY")
                        .setCustomId("transbutton")
        
                    let rowsettings = new Discord.MessageActionRow()
                        .addComponents(deletebutton)
                        .addComponents(transcriptbutton)
                
                canale.send({embeds: [embed], components: [rowsettings]})

                })
                break;
            case "donations":
                interaction.deleteReply()

                
                var user = interaction.user;
                var server = interaction.guild;

                if(server.channels.cache.find(canale => canale.topic == `User ID: ${user.id}`)) {
                    interaction.update({ content: "Hai già un ticket aperto!", ephemeral: true, components: [], embeds:[] })
                    return
                }

                interaction.deferUpdate()

                server.channels.create(user.username, {
                    type: "text",
                    permissionOverwrites: [
                        {
                            id:server.id,
                            deny: ["VIEW_CHANNEL"]
                        },
                        {
                            id:user.id,
                            allow: ["VIEW_CHANNEL"]
                        },
                        {
                            id:"1289639280473280624",
                            allow: ["VIEW_CHANNEL"]
                        }
                    ]
                }).then(canale => {
                    canale.setTopic(`User ID: ${user.id}`)
                    let embed = new Discord.MessageEmbed()
                        .setTitle("**Assistenza**")
                        .setDescription("Nuovo ticket creato!")
                        .setColor("GREEN")
                        .setThumbnail(user.avatarURL())
                        .setFooter({
                            text: "Assistenza - IRP",
                            iconURL: icon
                        })
                        .addFields(
                            {name: `Utente: `, value: `<@${user.id}>`, inline: true},
                            {name: `Tipo di ticket: `, value: "**Donazioni**", inline: false},
                            {name: `Con VIP: `, value: `<@&1289639280473280624>`, inline: false}
                        )
                    let deletebutton = new Discord.MessageButton()
                        .setLabel("Elimina")
                        .setStyle("DANGER")
                        .setCustomId("deletebutton")

                    let transcriptbutton = new Discord.MessageButton()
                        .setLabel("Transcript")
                        .setStyle("SECONDARY")
                        .setCustomId("transbutton")
        
                    let rowsettings = new Discord.MessageActionRow()
                        .addComponents(deletebutton)
                        .addComponents(transcriptbutton)
                
                canale.send({embeds: [embed], components: [rowsettings]})

                })
                break;
            case "admin":
                interaction.deleteReply()

                
                var user = interaction.user;
                var server = interaction.guild;

                if(server.channels.cache.find(canale => canale.topic == `User ID: ${user.id}`)) {
                    interaction.update({ content: "Hai già un ticket aperto!", ephemeral: true, components: [], embeds:[] })
                    return
                }

                interaction.deferUpdate()

                server.channels.create(user.username, {
                    type: "text",
                    permissionOverwrites: [
                        {
                            id:server.id,
                            deny: ["VIEW_CHANNEL"]
                        },
                        {
                            id:user.id,
                            allow: ["VIEW_CHANNEL"]
                        },
                        {
                            id:"1289639280473280624",
                            allow: ["VIEW_CHANNEL"]
                        }
                    ]
                }).then(canale => {
                    canale.setTopic(`User ID: ${user.id}`)
                    let embed = new Discord.MessageEmbed()
                        .setTitle("**Assistenza**")
                        .setDescription("Nuovo ticket creato!")
                        .setColor("GREEN")
                        .setThumbnail(user.avatarURL())
                        .setFooter({
                            text: "Assistenza - IRP",
                            iconURL: icon
                        })
                        .addFields(
                            {name: `Utente: `, value: `<@${user.id}>`, inline: true},
                            {name: `Tipo di ticket: `, value: "**Amministrazione**", inline: false},
                            {name: `Con VIP: `, value: `<@&1289639280473280624>`, inline: false}
                        )
                    let deletebutton = new Discord.MessageButton()
                        .setLabel("Elimina")
                        .setStyle("DANGER")
                        .setCustomId("deletebutton")

                    let transcriptbutton = new Discord.MessageButton()
                        .setLabel("Transcript")
                        .setStyle("SECONDARY")
                        .setCustomId("transbutton")
        
                    let rowsettings = new Discord.MessageActionRow()
                        .addComponents(deletebutton)
                        .addComponents(transcriptbutton)
                
                canale.send({embeds: [embed], components: [rowsettings]})

                })
                break;
        }
    }
})

client.on("interactionCreate", interaction => {
    var user = interaction.user;
    var server = interaction.guild;

    if (!interaction.isButton()) return;

    if (interaction.customId === "deletebutton") {
        
    }

    if (interaction.customId === "transbutton") {
        
        if (!interaction.member.roles.cache.has("1289639280473280624")) {
            interaction.reply({ content: "Il bottone è riservato agli staff", ephemeral: true, components: [], embeds: []})
            return
        }

        interaction.deferUpdate()

        console.log("Staff rilevato")
    }
})






