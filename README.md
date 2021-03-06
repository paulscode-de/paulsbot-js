## Setup
Copy .env.sample into .env
```javascript
cp .env.sample .env
```

Adjust BOT_TOKEN to your discord bot token
```javascript
BOT_TOKEN=YOUR_TOKEN_HERE
```

If you prefere another port for the website change BOT_PORT
```javascript
BOT_PORT=1337
```

### Run local
```
docker-compose -f docker-compose.dev.yml up -d --build
```

### Run with traefik in Docker Swarm Mode
```
docker stack deploy -c docker-compose.traefik.yml paulsbot
```

## Configuration

In the `config.js` file, you can edit your bot's command prefix as per your choice.

## Commands

The bot has 5 commands.

**help** - Shows the list of commands or details of a specific command.
**say**  - Repeats whatever the users tells it to.
**ping** - Checks connectivity with discord servers.

You can edit these commands and add more in `index.js` file.
The help command also depends on the `help.js` file. This file contains the data that the help command displays.

After creating a new command in `index.js`, go to `help.js` and add a new key-value pair to the JSON Object in the format shown below.
```
{
  ...,
  'command-name': {
    aliases: ['these', 'are', 'optional'],
    description: 'This command does xyz...',
    format: 'command-name <my-args>'
}
```

Here, `command-name` is the name of your command. `aliases` is an array of command's aliases. Note that these aliases don't take effect in the bot, they are only here to be displayed in the help command, to make these take effect, use multiple `case` statements as shown for the `say` command in `index.js`. Also the `aliases` field is optional here.
Nextly, `description` and `format` field are necessary or it will break the help command.
`description` is a short description of what the command does.
`format` shows how is the user supposed to use the command. The first word is always the command name (`command-name`) followed by the arguments separated by a space (` `). The optional command arguments are enclosed within square brackets (`[]`) and the required arguments are enclosed within angular brackets (`<>`). The prefix is automatically added while displayng in the help command so be sure to not use it here.

---