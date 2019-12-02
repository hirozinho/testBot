module.exports = {
	name: 'item',
	description: 'tbot item ...',
	execute(message, args) {
        if(args[0] === 'add'){
            message.channel.send('Enter item name: ');

            const filter = m => m.content;
            const collector = message.channel.createMessageCollector(filter, { time: 15000 });
            
            collector.on('collect', m => {
                if(m.author === message.author){
                    m.channel.send(`The item name is ${m.content}`);
                    const name = m.content;
                    console.log(`Item name: ${name}`);
                    collector.stop();

                    m.channel.send("Select time period\n1 - one day,\n2 - two days,\n3 - three days.").then(mess => {
                        mess.react('1️⃣').then(() => mess.react('2️⃣').then(() => mess.react('3️⃣')));

                        const reactFilter = (reaction, user) => {
                            return ['1️⃣','2️⃣','3️⃣'].includes(reaction.emoji.name) && user.id === message.author.id;
                        }
                        const reactCollector = mess.createReactionCollector(reactFilter, {time: 30000, mas: 1});
    
                        reactCollector.on('collect', (reaction, reactionCollector) => {
                            switch(reaction.emoji.name){
                                case '1️⃣':
                                    message.channel.send("Time is one day.")
                                    reactCollector.stop();
                                    break;
                                case '2️⃣':
                                    message.channel.send("Time is two days.")
                                    reactCollector.stop();
                                    break;
                                case '3️⃣':
                                    message.channel.send("Time is three days.")
                                    reactCollector.stop();
                                    break;
    
                            }
                        });

                    })

                    
                    
                        
                    

                }
            });
            
            collector.on('end', collected => {
                console.log(`Collected ${collected.size} items`);
            });
        }
        else{
            message.channel.send('This is a invalid command.');
        }
		
	},
};