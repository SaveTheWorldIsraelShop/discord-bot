const Discord = require('discord.js');
const bot = new Discord.Client();
const token = 'NzA4NzE1NjIxNTQ1NjcyNzU1.XrbY_g.DuLHtOUzJFV8KPLeJRkIqScmlis';
const PREFIX = "!";

const fs = require('fs');
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    bot.commands.set(command.name, command);
}

bot.on('ready', () => {
    console.log("The bot is active and ready to go!");
});

bot.on('message', message => {
    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {

        case "ping":
            bot.commands.get('ping').execute(message, args);
            break;

        case "shoppy":
            bot.commands.get('shoppy').execute(message, args);
            break;

        case 'kick':

            const user = message.mentions.users.first();

            if (user) {
                const member = message.guild.member(user);

                if (member) {
                    member.kick('קיבלת קיק מהשרת').then(() => {
                        message.reply(`הוקק מהשרת ${user.tag}`);
                    }).catch(err => {
                        message.reply('אי אפשר להקיק את הבן אדם');
                        console.log(err);
                    });
                } else {
                    message.reply("המשתמש הזה לא נמצא בשרת")
                }
            } else {
                message.reply('אתה צריך לבחור מישהו')
            }

            break;
    }

});

bot.login(procces.env.BOT_TOKEN);
