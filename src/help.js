module.exports = {
  'help': {
    description: 'Shows the list of commands or help on specified command.',
    format: 'help [command-name]'
  },
  'say': {
    aliases: ['repeat'],
    description: 'Repeats whatever is said.',
    format: 'say <message>'
  },
  'fact': {
    description: 'Shows a random fact from the internet.',
    format: 'fact [command-name]'
  },
  'quoute': {
    description: 'Shows a random fact from the internet.',
    format: 'qoute [command-name]'
  }, 
  'rank': {
    description: 'Shows the REAL ranks in this server',
    format: 'rank [command-name]'
  },
  'paulknulst': {
    aliases: ['medium', 'author', 'articles'],
    description: 'Shows a list of Paul Knulst\'s Medium articles',
    format: 'paulknulst [command-name]'
  }
}