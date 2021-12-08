const {Client, MessageEmbed} = require('discord.js');
const config = require('./config');
const commands = require('./help');
const got = require('got');
const Parser = require('rss-parser');
const parser = new Parser();


let bot = new Client({
    presence: {
        status: 'online',
        activity: {
            name: `${config.prefix}help`,
            type: 'LISTENING'
        }
    }
});

bot.on('ready', () => console.log(`Logged in as ${bot.user.tag}.`));

bot.on('message', async message => {
    // Check for command
    if (message.content.startsWith(config.prefix)) {
        let args = message.content.slice(config.prefix.length).split(' ');
        let command = args.shift().toLowerCase();

        switch (command) {
            case 'say':
            case 'repeat':
                if (args.length > 0)
                    await message.channel.send(args.join(' '));
                else
                    message.reply('You did not send a message to repeat, cancelling command.')
                break
            case 'paulknulst':
            case 'medium':
            case 'author':
            case 'articles':
                const feed = await parser.parseURL("https://medium.com/feed/@paulknulst")

                const story_embed = new MessageEmbed()
                    .setTitle(feed.title)
                    .setURL("https://medium.com/@paulknulst")
                    .setColor('RED')
                    .setDescription("You can checkout my latest stories here")
                    .setFooter(`Requested by ${message.member ? message.member.displayName : message.author.username}`, message.author.displayAvatarURL())
                    .setThumbnail(bot.user.displayAvatarURL())

                let max_stories = 3

                feed.items.forEach(item => {
                    if (max_stories === 3) {
                        story_embed.addField('\u200B', '\u200B', false)
                    }
                    if (max_stories === 0) {
                        return
                    }

                    const correct_link = item.link.substring(0, item.link.indexOf('?'))
                    story_embed.addField(item.title, correct_link, false)
                    max_stories -= 1
                })
                await message.channel.send(story_embed)
                break
            case 'fact':
                const fact = await got("https://uselessfacts.jsph.pl/random.json").json()
                await message.channel.send(fact.text)
                break
            case 'qoute':
                const quote = await got("https://zenquotes.io/api/random").json()
                await message.channel.send(quote[0].q + " - " + quote[0].a)
                break
            case 'rank':
                const points_luap = parseInt(Date.now() / 1000) - 1638610000
                const points_kintaro = parseInt(points_luap - 300 - (Math.random() * 20))
                let rank_embed = new MessageEmbed()
                    .setTitle('REAL ranks on this server!')
                    .setColor('RED')
                    .setFooter(`Requested by ${message.member ? message.member.displayName : message.author.username}`, message.author.displayAvatarURL())
                    .setThumbnail(bot.user.displayAvatarURL())
                    .addFields(
                        {name: 'Name', value: '1. luap.exe\n2. Kintaro.Oe', inline: true},
                        {name: 'Punkte', value: points_luap + '\n' + points_kintaro, inline: true},
                    )
                await message.channel.send(rank_embed);
                break
            case 'help':
                let embed = new MessageEmbed()
                    .setTitle('Need Help?')
                    .setURL("https://bot.paulsgaming.com")
                    .setColor('GREEN')
                    .setFooter(`Requested by ${message.member ? message.member.displayName : message.author.username}`, message.author.displayAvatarURL())
                    .setThumbnail(bot.user.displayAvatarURL());
                if (!args[0]) {
                    await embed
                        .setDescription(Object.keys(commands).map(command => `\`${command.padEnd(Object.keys(commands).reduce((a, b) => b.length > a.length ? b : a, '').length)}\` :: ${commands[command].description}`).join('\n'));
                } else {
                    if (Object.keys(commands).includes(args[0].toLowerCase()) || Object.keys(commands).map(c => commands[c].aliases || []).flat().includes(args[0].toLowerCase())) {
                        let command = Object.keys(commands).includes(args[0].toLowerCase()) ? args[0].toLowerCase() : Object.keys(commands).find(c => commands[c].aliases && commands[c].aliases.includes(args[0].toLowerCase()));
                        await embed
                            .setTitle(`COMMAND - ${command}`)

                        if (commands[command].aliases)
                            await embed.addField('Command aliases', `\`${commands[command].aliases.join('`, `')}\``);
                        await embed
                            .addField('DESCRIPTION', commands[command].description)
                            .addField('FORMAT', `\`\`\`${config.prefix}${commands[command].format}\`\`\``);
                    } else {
                        await embed
                            .setColor('RED')
                            .setDescription('This command does not exist. Please use the help command without specifying any commands to list them all.');
                    }
                }
                await message.channel.send(embed);
                break
        }
    }
});

require('./server')();
bot.login(config.token);