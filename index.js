const express = require('express'),
      builder = require('botbuilder'),
      fs = require('fs'),
      request = require('request').defaults({headers: {"User-Agent": "https://metagon.austinhuang.me / im@austinhuang.me"}}),
      bodyParser = require('body-parser'),
      cloudinary = require('cloudinary'),
      decode = require('decode-html'),
      connector = new builder.ChatConnector({
      	  appId: process.env.appid,
	  appPassword: process.env.appkey
      }),
      botbuilderMongodb = require("botbuilder-mongodb"),
      bot = new builder.UniversalBot(connector).set("storage",
            botbuilderMongodb.GetMongoDBLayer({
                  ip: "discoin-shard-00-00-i5e6f.mongodb.net:27017,discoin-shard-00-01-i5e6f.mongodb.net:27017,discoin-shard-00-02-i5e6f.mongodb.net",
                  port: "27017",
                  database: "heroku_fs0bkx2s",
                  collection: "metagon",
                  username: "austinhuang",
                  password: process.env.MONGO_PASS,
                  queryString: "heroku_fs0bkx2s?ssl=true&replicaSet=discoin-shard-0&authSource=admin&retryWrites=true&w=majority"
            })
      ),
      gagbrds = ["cute", "anime-manga", "ask9gag", "awesome", "car", "comic", "darkhumor", "country", "food", "funny", "got", "gaming", "gif", "girl", "girly", "horror", "imadedis", "movie-tv", "music", "nsfw", "overwatch", "pcmr", "politics", "relationship", "satisfying", "savage", "science", "superhero", "sport", "school", "timely", "video", "wallpaper", "wtf", "starwars", "classicalartmemes", "travel", "surrealmemes"],
      gagsubs = ["hot", "fresh"],
      yoda_said = [
  '"Fear is the path to the dark side. Fear leads to anger, anger leads to hate, hate leads to suffering." -- Yoda \n',
  '"Confer on you, the level of Jedi Knight, the Council does. But, agree with your taking this boy as your Padawan Learner, I do not." -- Yoda to Obi-Wan Kenobi\n',
  '"Qui-Gon\'s defiance I sense in you. Need that you do not. Agree with you, the Council does. Your apprentice young Skywalker will be." -- Yoda to Obi-Wan Kenobi\n',
  '"Lost a planet, Master Obi-Wan has. How embarrassing, how embarrassing." -- Yoda\n',
  '"Go to the center of the gravity\'s pull, and find your planet you will." -- Yoda to Obi-Wan\n',
  '"Meditate on this, I will." -- Yoda\n',
  '"Clear, your mind must be if you are to discover the real villains behind the plot." -- Yoda to Obi-Wan\n',
  '"Pain. Suffering. Death, I feel. Something terrible has happened. Young Skywalker is in pain. Terrible pain." -- Yoda\n',
  '"Around the survivors, a perimeter create!" -- Yoda\n',
  '"Powerful you have become, Dooku. The dark side I sense in you." -- Yoda to Dooku\n',
  '"Master Obi-Wan, not victory. The shroud of the dark side has fallen. Begun, the Clone War has!" -- Yoda\n',
  '"Much to learn, you still have." -- Yoda to Dooku\n',
  '"Like fire across the galaxy, the Clone Wars spread. In league with the wicked Count Dooku more and more planets slip. Upon the Jedi Knights falls the duty to lead the newly formed Army of the Republic." -- Yoda\n',
  '"Death is a natural part of life. Rejoice for those who transform into the Force. Mourn them do not. Miss them do not. Attachment leads to jealousy. The shadow of greed, that is." -- Yoda\n',
  '"Careful you must be when sensing the future, Anakin. The fear of loss is a path to the dark side." -- Yoda to Anakin Skywalker\n',
  '"Train yourself to let go of everything you fear to lose." -- Yoda to Anakin Skywalker\n',
  '"Go, I will. Good relations with the Wookiees, I have." -- Yoda\n',
  '"Too much under the sway of the Chancellor, he is. Much anger there is in him. Too much pride in his powers." -- Yoda\n',
  '"If a special session of Congress there is, easier for us to enter the Jedi Temple it will be." -- Yoda\n',
  '"If into the security recordings you go, only pain will you find." -- Yoda to Obi-Wan Kenobi\n',
  '"Destroy the Sith, we must." -- Yoda\n',
  '"To fight this Lord Sidious, strong enough, you are not." -- Yoda to Obi-Wan Kenobi\n',
  '"Twisted by the dark side, young Skywalker has become." -- Yoda to Obi-Wan Kenobi\n',
  '"The boy you trained, gone he is, consumed by Darth Vader." -- Yoda to Obi-Wan Kenobi\n',
  '"I hear a new apprentice you have, Emperor. Or should I call you Darth Sidious?" -- Yoda to Palpatine\n',
  '"At an end your rule is, and not short enough it was." -- Yoda to Palpatine\n',
  '"Not if anything to say about it, I have!" -- Yoda\n',
  '"Into exile I must go. Failed, I have." -- Yoda to Bail Organa\n',
  '"If so powerful you are, why leave?" -- Yoda\n',
  '"Faith in your new apprentice, misplaced may be. As is your faith in the dark side of the Force." -- Yoda\n',
  'Luke: "I feel like". Yoda: "Feel like what?" -- Luke Skywalker and Yoda\n',
  '"Looking? Found someone you have I would say, mm?" -- Yoda\n',
  '"Help you I can! Yes! Mm!" -- Yoda to Luke\n',
  '"Awww, cannot get your ship out, heh-heheheh!" -- Yoda to Luke\n',
  '"How you get so big, eating food of this kind?" -- Yoda to Luke\n',
  '"Mine! Or I will help you not!" -- Yoda to Luke\n',
  '"Mudhole? Slimy? My home this is!" -- Yoda to Luke\n',
  '"Mine! Mine! Mine! MINE!!!" -- Yoda to R2-D2\n',
  '"No, no no, stay and help you I will! Hehe! Find your friend, mm?" -- Yoda to Luke\n',
  '"Ohhh, Jedi Master! Yoda. You seek Yoda!" -- Yoda to Luke\n',
  '"No! Try not. Do, or do not. There is no try." -- Yoda to Luke\n',
  'Luke: "I\'m looking for a great warrior." Yoda: "Wars not make one great." -- Luke Skywalker and Yoda\n',
  '"Ready are you? What know you of ready? For eight hundred years have I trained Jedi. My own counsel will I keep on who is to be trained! A Jedi must have the deepest commitment, the most serious mind. This one a long time have I watched. All his life has he looked away, to the future, to the horizon. Never his mind on where he was. Hmm? What he was doing. Hmph. Adventure. Heh. Excitement. Heh. A Jedi craves not these things. You are reckless!" -- Yoda\n',
  'Yoda: "I cannot teach him. The boy has no patience." Obi-Wan: "He will learn patience." Yoda: "Hmm. Much anger in him, like his father." Obi-Wan: "Was I any different, when you taught me?" -- Yoda and Obi-Wan Kenobi\n',
  'Luke: "I won\'t fail you. I\'m not afraid." Yoda: "You will be. You will be." -- Luke Skywalker and Yoda\n',
  '"Yes. A Jedi\'s strength flows from the Force. But beware the dark side. Anger, fear, aggression. The dark side of the Force are they. Easily they flow, quick to join you in a fight. If once you start down the dark path, forever will it dominate your destiny. Consume you it will, as it did Obi-Wan\'s apprentice." -- Yoda to Luke\n',
  'Luke: "Vader, Is the dark side stronger?"; Yoda: "No, no, no. Quicker, easier, more seductive.";Luke: "But how am I to know the good side from the bad?";Yoda: "You will know, when you are calm, at peace, passive. A Jedi uses the Force for knowledge and defense, never for attack." -- Yoda to Luke\n',
  '"So certain are you. Always with you it cannot be done. Hear you nothing that I say?" -- Yoda to Luke\n',
  '"No! No different! Only different in your mind. You must unlearn what you have learned." -- Yoda to Luke\n',
  'Luke: "I don\'t believe it"; Yoda: "That is why you fail." -- Yoda to Luke\n',
  '"No! Try not. Do. Or do not. There is no try." -- Yoda to Luke , \n',
  '"Size matters not. Look at me. Judge me by my size do you?" -- Yoda to Luke\n',
  '"And well you should not! For my ally is the Force. And a powerful ally it is. Life creates it, makes it grow. Its energy surrounds us, and binds us. Luminous beings are we, not this, [nudging Luke\'s arm] crude matter! You must feel the Force around you. Here, between you, me, the tree, the rock, everywhere! Even between the land and the ship." -- Yoda to Luke\n',
  '"Through the Force, things you will see. Other places. The future, the past, old friends long gone." -- Yoda to Luke\n',
  '"Hmm. Control, control. You must learn control." -- Yoda to Luke\n',
  '"Difficult to see. Always in motion is the future." -- Yoda to Luke\n',
  '"Decide you must how to serve them best. If you leave now, help them you could. But you would destroy all for which they have fought and suffered." -- Yoda to Luke\n',
  '"Strong is Vader. Mind what you have learned. Save you it can!" -- Yoda to Luke\n',
  '"No. There is another." -- Yoda to Obi-Wan\n',
  '"When nine hundred years old you reach, look as good, you will not, hm?" -- Yoda to Luke Skywalker\n',
  '"Strong am I with the Force, but not that strong. Twilight is upon me, and soon night must fall. That is the way of things, the way of the Force." -- Yoda to Luke Skywalker\n',
  '"No more training do you require. Already know you that which you need." -- Yoda to Luke Skywalker\n',
  '"No. Unfortunate that you rushed to face him, that incomplete was your training. Not ready for the burden were you." -- Yoda to Luke Skywalker\n',
  '"Remember, a Jedi\'s strength flows from the Force. But beware. Anger, fear, aggression. The dark side are they. Once you start down the dark path, forever will it dominate your destiny." -- Yoda to Luke Skywalker\n',
  '"Your father he is." -- Yoda to Luke Skywalker\n',
  '"Luke, Luke, Do not, Do not underestimate the powers of the Emperor, or suffer your father\'s fate, you will." -- Yoda to Luke Skywalker\n',
  '"Luke, when gone am I, the last of the Jedi will you be." -- Yoda to Luke Skywalker\n',
  '"Luke, there is another, Skywalker." -- Yoda to Luke Skywalker\n',
  '"Pity your new disciple I do; so lately an apprentice, so soon without a Master." -- Yoda\n',
  '"War does not make one great." -- Yoda\n',
  '"Proud I am, to stand by Wookiees in their hour of need." -- Yoda\n',
  '"Yoda I am, fight I will." -- Yoda\n',
  '"Tired I am, rest I must." -- Yoda\n',
  '"When all choices seem wrong, choose restraint." -- recalled by Mace Windu\n',
  '"If no mistake have you made, yet losing you are, a different game you should play." -- recalled by Mace Windu\n',
  '"A trial of being old is this: remembering which thing one has said into which young ears." -- Yoda\n',
  'Yoda: "Think you I have never felt the touch of the dark? Know you what a soul so great as Yoda can make, in eight hundred years?"; Dooku: "Master?"; Yoda: "Many mistakes!" -- Yoda and Dooku\n',
  '"Think you the relationship between Master and Padawan is only to help them? Oh, this is what we let them believe, yes! But when the day comes that even old Yoda does not learn something from his students-then truly, he shall be a teacher no more." -- Yoda\n',
  '"On many long journeys have I gone. And waited, too, for others to return from journeys of their own. Some return; some are broken; some come back so different only their names remain." -- Yoda\n',
  '"When you fall, apprentice, catch you I will." -- Yoda to Dooku\n',
  '"Secret, shall I tell you? Grand Master of Jedi Order am I. Won this job in a raffle I did, think you? "How did you know, how did you know, Master Yoda?" Master Yoda knows these things. His job it is." -- Master Yoda to Scout\n',
  '"Honor life by living, Padawan. Killing honors only death: only the dark side." -- Yoda\n',
  '"To be Jedi is to face the truth, and choose. Give off light, or darkness, Padawan. Be a candle, or the night, Padawan: but choose!" -- Yoda to Whie Malreaux\n',
  '"When you look at the dark side, careful you must be , for the dark side looks back." -- Yoda\n',
  '"You think Yoda stops teaching, just because his student does not want to hear? Yoda a teacher is. Yoda teaches like drunkards drink. Like killers kill." -- Yoda\n',
  '"Humility endless is." -- Yoda\n',
  '"A labyrinth of evil, this war has become." -- Yoda\n',
  '"Sworn by oath to uphold you, we are." -- Yoda to Palpatine\n',
  '"From the dark path, no returning there is. Forever, the direction of your life it dominates." -- Yoda\n',
  '"To the Force, look for guidance. Accept what fate has placed before us." -- Yoda\n',
  '"Yoda, you seek?" -- Yoda\n', '"My ally is the Force" -- Yoda\n'
],
      parseString = require('xml2js').parseString;
cloudinary.config({ 
  cloud_name: 'metagon', 
  api_key: process.env.cloudinary1, 
  api_secret: process.env.cloudinary2 
});
var nsfw = JSON.parse(fs.readFileSync("./nsfw.json", "utf8"));

//bot.connector("cisco", cisco);

bot.use({
     botbuilder: function (session, next) {
          session.error = function (err) {
              session.endDialog("An error occured. Please report this, along with the chat history, to \"im@austinhuang.me\".\n\n"+err);
	      console.error(err.stack);
          };
          next(); 
     }
});

function f2c(f) {
	var c = (parseInt(f) - 32) / 1.8;
	return c.toFixed();
}
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

bot.on('conversationUpdate', function (message) {
    if (message.address.conversation.isGroup) {
        if (message.membersAdded) {
            message.membersAdded.forEach(function (identity) {
                if (identity.id === message.address.bot.id) {
                    var reply = new builder.Message()
                            .address(message.address)
                            .text("Hello everyone! This is Metagon. You can reply \"start\" to start using me! For more info, visit http://metagon.austinhuang.me.");
                    bot.send(reply);
                }
            });
        }
        if (message.membersRemoved) {
            message.membersRemoved.forEach(function (identity) {
                if (identity.id === message.address.bot.id) {
                    var reply = new builder.Message()
                        .address(message.address)
                        .text("Sorry to see you go! If you experienced issue, or you'd like to see a better Metagon, please tell us at http://metagon.austinhuang.me/#contact-us.");
                    bot.send(reply);
                }
            });
        }
    }
});
bot.on('contactRelationUpdate', function (message) {
    if (message.action === 'add') {
        var name = message.user ? message.user.name : null;
        var reply = new builder.Message()
                .address(message.address)
                .text("Hello there! This is Metagon. You can reply \"start\" to start using me! For more info, visit http://metagon.austinhuang.me.");
        bot.send(reply);
    }
});

// Menus
bot.dialog('/menu', [
	function (session) {
		if (session.message.source === "groupme" || session.message.source === "skypeforbusiness" || session.message.source === "ciscospark") {
			session.send("Keyboard Mode is not available on GroupMe / Skype for Business. Please use only commands.\nFor more information, type \"help\".");
		}
		else if (session.message.source !== "line" && session.message.source !== "facebook") {
			builder.Prompts.choice(session, "What would you like to do right now?", "Images|Utility|Fun|About|Feedback|Quit", { listStyle: 3 });
		}
		else {
			var msg = new builder.Message(session);
			msg.attachmentLayout(builder.AttachmentLayout.carousel);
			msg.attachments([
				new builder.HeroCard(session)
					.text("What would you like to do right now?")
					.buttons([
						builder.CardAction.imBack(session, "Images", "Images"),
						builder.CardAction.imBack(session, "Utility", "Utility"),
						builder.CardAction.imBack(session, "Fun", "Fun")
					]),
				new builder.HeroCard(session)
					.text("What would you like to do right now?")
					.buttons([
						builder.CardAction.imBack(session, "About", "About"),
						builder.CardAction.imBack(session, "Feedback", "Feedback"),
						builder.CardAction.imBack(session, "Quit", "Quit")
					])
			]);
			builder.Prompts.choice(session, msg, "Images|Utility|Fun|About|Feedback|Quit");
		}
	}, function (session, results) {
		switch (results.response.entity) {
			case "Images":
				session.replaceDialog("/image");
			break;
			case "Utility":
				session.replaceDialog("/utility");
			break;
			case "Fun":
				session.replaceDialog("/fun");
			break;
			case "About":
				session.replaceDialog("/about");
			break;
			case "Feedback":
				session.replaceDialog("/feedback");
			break;
			case "Quit":
				session.endDialog("You have quit the keyboard mode. You can start again by typing \"start\".");
			break;
		}
	}
]).triggerAction({ matches: /^(\/|Metagon |)start/gi});
bot.dialog('/image', [
	function (session) {
		switch (session.message.source) {
			case "kik":
				builder.Prompts.choice(session, "What would you like to do right now?", "Cat|Dog|Snake|Bunny|Anime actions|Back to Start Menu|Quit", { listStyle: 3 });
			break;
			case "line":
			case "facebook":
				var msg = new builder.Message(session);
				msg.attachmentLayout(builder.AttachmentLayout.carousel);
				msg.attachments([
					new builder.HeroCard(session)
						.text("What would you like to do right now?")
						.buttons([
							builder.CardAction.imBack(session, "Imgur", "Imgur"),
							builder.CardAction.imBack(session, "Flickr", "Flickr"),
						]),
					new builder.HeroCard(session)
						.text("What would you like to do right now?")
						.buttons([
							builder.CardAction.imBack(session, "DeviantArt", "DeviantArt"),
							builder.CardAction.imBack(session, "Anime actions", "Anime actions"),
							builder.CardAction.imBack(session, "Cat", "Cat")
						]),
					new builder.HeroCard(session)
						.text("What would you like to do right now?")
						.buttons([
							builder.CardAction.imBack(session, "Dog", "Dog"),
							builder.CardAction.imBack(session, "Snake", "Snake"),
							builder.CardAction.imBack(session, "Bunny", "Bunny")
						]),
					new builder.HeroCard(session)
						.text("What would you like to do right now?")
						.buttons([
							builder.CardAction.imBack(session, "Duck", "Duck"),
							builder.CardAction.imBack(session, "Birb", "Birb"),
							builder.CardAction.imBack(session, "Back to Start Menu", "Back to Start Menu"),
						])
				]);
				builder.Prompts.choice(session, msg, "Imgur|Flickr|DeviantArt|Anime actions|Cat|Dog|Snake|Bunny|Duck|Birb|Back to Start Menu|Quit");
			break;
			default:
				builder.Prompts.choice(session, "What would you like to do right now?", "Imgur|Flickr|DeviantArt|Anime actions|Cat|Dog|Snake|Bunny|Duck|Birb|Back to Start Menu|Quit", { listStyle: 3 });
			break;
		}
	},
	function (session, results) {
		switch (results.response.entity) {
			case "Imgur":
				session.replaceDialog("/imgur1");
			break;
			case "Flickr":
				session.replaceDialog("/flickr1");
			break;
			case "DeviantArt":
				session.replaceDialog("/deviantart1");
			break;
			case "Anime actions":
				session.replaceDialog("/anime");
			break;
			
			case "Back to Start Menu":
				session.beginDialog("/menu");
			break;
			case "Quit":
				session.endDialog("You have quit the keyboard mode. You can start again by typing \"start\".");
			break;
			default:
				session.replaceDialog("/"+results.response.entity.toLowerCase());
			break;
		}
	}
]);
bot.dialog('/utility', [
	function (session) {
		switch (session.message.source) {
			case "line":
			case "facebook":
				var msg = new builder.Message(session);
				msg.attachmentLayout(builder.AttachmentLayout.carousel);
				msg.attachments([
					new builder.HeroCard(session)
						.text("What would you like to do right now?")
						.buttons([
							builder.CardAction.imBack(session, "Weather", "Weather"),
							builder.CardAction.imBack(session, "Dictionary", "Dictionary"),
							builder.CardAction.imBack(session, "Shorten URLs", "Shorten URLs")
						]),
					new builder.HeroCard(session)
						.text("What would you like to do right now?")
						.buttons([
							builder.CardAction.imBack(session, "Expand Bitly URLs", "Expand Bitly URLs"),
							builder.CardAction.imBack(session, "Minecraft User Lookup", "Minecraft User"),
							builder.CardAction.imBack(session, "Minecraft Server Ping", "Minecraft Server")
						]),
					new builder.HeroCard(session)
						.text("What would you like to do right now?")
						.buttons([
							builder.CardAction.imBack(session, "Pastebin", "Pastebin"),
							builder.CardAction.imBack(session, "Back to Start Menu", "Back to Start Menu"),
							builder.CardAction.imBack(session, "Quit", "Quit")
						])
				]);
				builder.Prompts.choice(session, msg, "Weather|Shorten URLs|Expand Bitly URLs|Minecraft User Lookup|Minecraft Server Status|Pastebin|Back to Start Menu|Quit", { listStyle: 0 });
			break;
			default:
				builder.Prompts.choice(session, "What would you like to do right now?", "Weather|Dictionary|Shorten URLs|Expand Bitly URLs|Minecraft User Lookup|Minecraft Server Status|Pastebin|Back to Start Menu|Quit", { listStyle: 3 });
			break;
		}
	}, 
	function (session, results) {
		switch (results.response.entity) {
			case "Shorten URLs":
				session.replaceDialog("/shorten1");
			break;
			case "Expand Bitly URLs":
				session.replaceDialog("/expand1");
			break;
			case "Minecraft User Lookup":
				session.replaceDialog("/mcuser1");
			break;
			case "Minecraft Server Status":
				session.replaceDialog("/mcserver1");
			break;
			case "Back to Start Menu":
				session.beginDialog("/menu");
			break;
			case "Quit":
				session.endDialog("You have quit the keyboard mode. You can start again by typing \"start\".");
			break;
			default:
				session.replaceDialog("/"+results.response.entity.toLowerCase()+"1");
			break;
		}
	}
]);
bot.dialog('/fun', [
	function (session) {
		switch (session.message.source) {
			case "line":
			case "facebook":
				var msg = new builder.Message(session);
				msg.attachmentLayout(builder.AttachmentLayout.carousel);
				msg.attachments([
					new builder.HeroCard(session)
						.text("What would you like to do right now?")
						.buttons([
							builder.CardAction.imBack(session, "9gag", "9gag"),
							builder.CardAction.imBack(session, "Urban Dictionary", "Urban Dictionary"),
							builder.CardAction.imBack(session, "Cat Facts", "Cat Facts")
						]),
					new builder.HeroCard(session)
						.text("What would you like to do right now?")
						.buttons([
							builder.CardAction.imBack(session, "Trivia", "Trivia"),
							builder.CardAction.imBack(session, "Chuck Norris", "Chuck Norris"),
							builder.CardAction.imBack(session, "Yoda Quote", "Yoda Quote")
						]),
					new builder.HeroCard(session)
						.text("What would you like to do right now?")
						.buttons([
							builder.CardAction.imBack(session, "Quote on Design", "Quote on Design"),
							builder.CardAction.imBack(session, "Back to Start Menu", "Back to Start Menu"),
							builder.CardAction.imBack(session, "Quit", "Quit")
						])
				]);
				builder.Prompts.choice(session, msg, "9gag|Urban Dictionary|Cat Facts|Trivia|Chuck Norris|Yoda Quote|Quote on Design|Back to Start Menu|Quit");
			break;
			default:		
				builder.Prompts.choice(session, "What would you like to do right now?", "9gag|Urban Dictionary|Cat Facts|Trivia|Chuck Norris|Yoda Quote|Quote on Design|Back to Start Menu|Quit", { listStyle: 3 });
			break;
		}
	},
	function (session, results) {
		switch (results.response.entity) {
			case "9gag":
				session.replaceDialog("/9gag1");
			break;
			case "Urban Dictionary":
				session.replaceDialog("/ud1");
			break;
			case "Chuck Norris":
				session.replaceDialog("/joke");
			break;
			case "Cat Facts":
				session.replaceDialog("/catfact");
			break;
			case "Trivia":
				session.replaceDialog("/trivia1");
			break;
			case "Yoda Quote":
				session.replaceDialog("/yoda");
			break;
			case "Quote on Design":
				session.replaceDialog("/design");
			break;
			case "Back to Start Menu":
				session.beginDialog("/menu");
			break
			case "Quit":
				session.endDialog("You have quit the keyboard mode. You can start again by typing \"start\".");
			break;
		}
	}
]);

bot.dialog('/about', function (session) {
	if (session.message.source === "kik") {
		session.send("Thank you for using Metagon. I am a multi-platform multi-function bot to suit your needs!\n\n* Documentation: http://metagon.austinhuang.me\n* Suggestions: https://feedback.austinhuang.me\n* If you have any questions, feel free to contact my master at @austinhuang0131 .\n* Do I help you a lot? Consider a small donation (Detail in documentation)!\n* The simplest way to use this bot is by typing \"start\".");
	}
	else if (session.message.source === "telegram") {
		session.send("Thank you for using Metagon. I am a multi-platform multi-function bot to suit your needs!\n\n* Documentation: http://metagon.austinhuang.me\n* Suggestions: https://feedback.austinhuang.me\n* If you have any questions, feel free to contact my master at @austinhuang .\n* Do I help you a lot? Consider a small donation (Detail in documentation)!\n* The simplest way to use this bot is by typing \"start\".");
	}
	else if (session.message.source === "line") {
		session.send("Thank you for using Metagon. I am a multi-platform multi-function bot to suit your needs!\n\n* Documentation: http://metagon.austinhuang.me\n* Suggestions: https://feedback.austinhuang.me\n* If you have any questions, feel free to contact my master by adding me (line://ti/p/eCQ4745xqO).\n* Do I help you a lot? Consider a small donation (Detail in documentation)!\n* The simplest way to use this bot is by typing \"start\".");
	}
	else if (session.message.source === "skype") {
		session.send("Thank you for using Metagon. I am a multi-platform multi-function bot to suit your needs!\n\n* Documentation: http://metagon.austinhuang.me\n* Suggestions: https://feedback.austinhuang.me\n* If you have any questions, feel free to contact my master at \"live:austin.0131\".\n* Do I help you a lot? Consider a small donation (Detail in documentation)!\n* The simplest way to use this bot is by typing \"start\".");
	}
	else if (session.message.source === "slack" && session.message.address.conversation.isGroup) {
		session.send();
	}
	else {
		session.send("Thank you for using Metagon. I am a multi-platform multi-function bot to suit your needs!\n\n* Documentation: https://metagon.austinhuang.me\n* Contact us: https://austinhuang.me/contact\n* Suggestions: https://feedback.austinhuang.me\n\nDo I help you a lot? Consider a small donation (Detail in documentation)! The simplest way to use this bot is by typing \"start\".");
	}
	if (session.message.source !== "groupme" && session.message.source !== "skypeforbusiness" && session.message.source !== "ciscospark" && session.message.text !== ("/help")) {
		session.replaceDialog("/menu");
	}
	else {
		session.endDialog();
	}
}).triggerAction({ matches: /^(\/|)help/i});
bot.dialog('/feedback', function (session) {
	session.send("https://feedback.austinhuang.me");
	session.replaceDialog("/menu");
});

// Image
bot.dialog('/cat', function (session) {
	if (session.message.source !== "line") {session.sendTyping();}
	request('http://aws.random.cat/meow', {json: true}, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			var type = body.file.endsWith(".gif") ? "gif" : "jpeg";
			session.send({
				attachments: [
					{
						contentType: "image/"+type,
						contentUrl: body.file,
						name: "cat."+type.replace("jpeg", "jpg")
					}
				]
			});
			if (!session.message.text.includes("/cat")) session.beginDialog("/image");
		}
		else {
			session.endDialog("ERROR! I could not connect to http://aws.random.cat/meow. Please retry. If the problem persists, please contact im@austinhuang.me");
		}
	});
}).triggerAction({ matches: /^( ||Metagon )\/cat/g});
bot.dialog('/snake', function (session) {
	if (session.message.source !== "line") {session.sendTyping();}
	request('http://fur.im/snek', {json: true}, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			session.send({
  				attachments: [
  					{
						contentType: "image/*",
						contentUrl: body.file.replace("http://", "https://")
 					}
  				]
  			});
			if (!session.message.text.includes("/snake")) {
				session.replaceDialog("/image");
			}
			else {
				session.endDialog();
			}
  		}
		else {
			session.endDialog("ERROR! I could not connect to http://fur.im/snek/snek.php. Please retry. If the problem persists, please contact im@austinhuang.me");
		}
	});
}).triggerAction({ matches: /^( ||Metagon )\/snake/g});
bot.dialog('/dog', function (session) {
	if (session.message.source !== "line") {session.sendTyping();}
	request('https://random.dog/woof.json', function(error, response, body) {
		if (!error && response.statusCode === 200) {
			body = JSON.parse(body);
			if (body.url.endsWith("mp4") || body.url.endsWith("webm")) { session.send({
  				attachments: [
  					{
						contentType: "video/*",
						contentUrl: body.url
 					}
  				]
  			});
			}
			else { session.send({
  				attachments: [
  					{
						contentType: "image/*",
						contentUrl: body.url
 					}
  				]
  			});
			}
			if (!session.message.text.includes("/dog")) {
				session.replaceDialog("/image");
			}
			else {
				session.endDialog();
			}
  		}
		else {
			session.endDialog("ERROR! I could not connect to https://random.dog/woof.json. Please retry. If the problem persists, please contact im@austinhuang.me");
		}
	});
}).triggerAction({ matches: /^( ||Metagon )\/dog/g});
bot.dialog('/bunny', function (session) {
	if (session.message.source !== "line") {session.sendTyping();}
	request('https://api.bunnies.io/v2/loop/random/?media=gif,mp4', function(error, response, body) {
		if (!error && response.statusCode === 200 && session.message.source.includes("skype") && session.message.source.includes("kik")) {
			body = JSON.parse(body);
			session.send({
  				attachments: [
  					{
  						contentType: "video/*",
 						contentUrl: body.media.mp4
 					}
  				]
  			});
			if (!session.message.text.includes("/bunny")) {
				session.replaceDialog("/image");
			}
			else {
				session.endDialog();
			}
  		}
		else if (!error && response.statusCode === 200) {
			body = JSON.parse(body);
			session.send({
				attachments: [
					{
						contentType: "image/gif",
						contentUrl: body.media.gif
					}
				]
			});
			if (!session.message.text.includes("/bunny")) {
				session.replaceDialog("/image");
			}
			else {
				session.endDialog();
			}
  		}
		else {
			session.send("ERROR! I could not connect to https://api.bunnies.io/v2/loop/random/?media=gif,mp4 . Please retry. If the problem persists, please contact im@austinhuang.me");
		}
	});
}).triggerAction({ matches: /^( ||Metagon )\/bunny/g});
bot.dialog('/birb', function (session) {
	if (session.message.source !== "line") {session.sendTyping();}
	request('https://random.birb.pw/tweet', function(error, response, body) {
		if (!error && response.statusCode === 200) {
			var type = body.endsWith(".gif") ? "gif" : "*";
			session.endDialog({
				attachments: [
					{
						contentType: "image/" + type,
						contentUrl: "https://random.birb.pw/img/"+body
					}
				]
			});
			if (!session.message.text.includes("/bir")) session.beginDialog("/image");
		}
		else {
			session.endDialog("ERROR! I could not connect to https://random.birb.pw/tweet. Please retry. If the problem persists, please contact im@austinhuang.me");
		}
	});
}).triggerAction({ matches: /^( ||Metagon )\/bir(b|d)/g});
bot.dialog('/duck', function (session) {
	if (session.message.source !== "line") {session.sendTyping();}
	request('https://random-d.uk/api/v1/random', function(error, response, body) {
		if (!error && response.statusCode === 200) {
			body = JSON.parse(body);
			var type = body.url.endsWith(".gif") ? "gif" : "jpeg";
			session.endDialog({
				attachments: [
					{
						contentType: "image/" + type,
						contentUrl: body.url
					}
				]
			});
			if (!session.message.text.includes("/duck")) session.beginDialog("/image");
		}
		else {
			session.endDialog("ERROR! I could not connect to https://random-d.uk/api/v1/random. Please retry. If the problem persists, please contact im@austinhuang.me");
		}
	});
}).triggerAction({ matches: /^( ||Metagon )\/duck/g});

bot.dialog('/anime', [
	function (session) {
		if (session.message.source !== "line") builder.Prompts.choice(session, "What would you like to do right now?", "Kiss|Pat|Hug|Feed|Poke|Slap|Cuddle|Tickle|Back to Image Menu|Quit", { listStyle: 3 });
		else {
			var msg = new builder.Message(session);
			msg.attachmentLayout(builder.AttachmentLayout.carousel);
			msg.attachments([
				new builder.HeroCard(session)
					.text("What would you like to do right now?")
					.buttons([
						builder.CardAction.imBack(session, "Kiss", "Kiss"),
						builder.CardAction.imBack(session, "Pat", "Pat"),
						builder.CardAction.imBack(session, "Hug", "Hug")
					]),
				new builder.HeroCard(session)
					.text("What would you like to do right now?")
					.buttons([
						builder.CardAction.imBack(session, "Poke", "Pole"),
						builder.CardAction.imBack(session, "Slap", "Slap"),
						builder.CardAction.imBack(session, "Cuddle", "Cuddle")
					]),
				new builder.HeroCard(session)
					.text("Due to Line API restrictions, all GIFs will NOT be displayed properly.")
					.buttons([
						builder.CardAction.imBack(session, "Feed", "Feed"),
						builder.CardAction.imBack(session, "Tickle", "Tickle"),
						builder.CardAction.imBack(session, "Back to Image Menu", "Back to Image Menu"),
					])
			]);
			builder.Prompts.choice(session, msg, "Kiss|Pat|Hug|Feed|Poke|Slap|Cuddle|Tickle|Back to Image Menu|Quit");
		}

	},
	function (session, results) {
		switch (results.response.entity) {
			case "Back to Image Menu":
				session.beginDialog("/image");
			break;
			case "Quit":
				session.endDialog("You have quit the keyboard mode. You can start again by typing \"start\".");
			break;
			default:
				session.beginDialog("/kph");
			break;
		}
	}
]);
bot.dialog('/kph', function (session) {
	var endpoint = "hug";
	if (session.message.text.search(/kiss/gi) > -1) {endpoint = "kiss";}
	else if (session.message.text.search(/pat/gi) > -1) {endpoint = "pat"}
	else if (session.message.text.search(/poke/gi) > -1) {endpoint = "poke"}
	else if (session.message.text.search(/slap/gi) > -1) {endpoint = "slap"}
	else if (session.message.text.search(/cuddle/gi) > -1) {endpoint = "cuddle"}
	else if (session.message.text.search(/feed/gi) > -1) {endpoint = "feed"}
	request('https://nekos.life/api/v2/img/'+endpoint, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			body = JSON.parse(body);
			session.send({
				attachments: [
					{
						contentType: "image/gif",
						contentUrl: body.url
					}
				]
			});
			if (!session.message.text.includes("/")) {
				session.replaceDialog("/anime");
			}
		}
		else {
			session.endDialog("ERROR! I could not connect to https://nekos.life/api. Please retry. If the problem persists, please contact im@austinhuang.me");
		}
	});
}).triggerAction({ matches: /^( ||Metagon )\/(kiss|pat|hug|poke|slap|cuddle|feed|tickle)/g});

bot.dialog('/imgur1',[
	function (session) {
		var msg = new builder.Message(session);
		msg.attachmentLayout(builder.AttachmentLayout.list);
		msg.attachments([
			new builder.HeroCard(session)
			.title("Input a search query.")
			.subtitle("ProTip: Supports boolean operators (AND, OR, NOT) and indices (tag: user: title: ext: subreddit: album: meme:).")
			.buttons([
				builder.CardAction.imBack(session, "Back to Image Menu", "Back to Image Menu")
			])
		]);
		builder.Prompts.text(session, msg);
	},
	function (session, results) {
		if (results.response.replace(/^Metagon /g, "") !== "Back to Image Menu") {
			request({url:"https://api.imgur.com/3/gallery/search?q="+results.response.replace(/^Metagon /g, ""), headers:{'Authorization': 'Client-ID '+process.env.imgur}}, function(error, response, body) {
				if (!error && response.statusCode === 200) {
					body = JSON.parse(body);
					if (body.data.length === 0) {
						session.send("No results. Change your query?");
						session.replaceDialog("/image");
					}
					else {
						session.send(body.data[Math.floor(Math.random() * body.data.length)].link);
						session.replaceDialog("/image");
					}
				}
				else {
					session.send("Failed to connect to http://imgur.com");
					session.replaceDialog("/image");
				}
			});
		}
		else {
			session.replaceDialog("/image");
		}
    }]);
bot.dialog('/imgur2', function (session) {
	if (session.message.source === "kik") {
		session.endDialog('It seems like you\'re confused. Maybe try typing \"help\". Alternatively, type \"start\" to start the bot up.');
		return;
	}
	if (session.message.text.replace("/imgur", "").replace(" ", "") !== "") {
		request({url:"https://api.imgur.com/3/gallery/search?q="+session.message.text.substring(7), headers:{'Authorization': 'Client-ID '+process.env.imgur}}, function(error, response, body) {
			if (!error && response.statusCode === 200) {
				body = JSON.parse(body);
				if (body.data.length === 0) {session.endDialog("No results. Change your query?");}
				else {session.endDialog(body.data[Math.floor(Math.random() * body.data.length)].link);}
			}
			else {session.endDialog("Failed to connect to http://imgur.com");}
		});
	}
	else {
		session.endDialog("Missing search query! Correct usage: \"/imgur (Query)\"");
	}
}).triggerAction({ matches: /^( ||Metagon )\/imgur/g});

bot.dialog('/flickr1',[
	function (session) {
		var msg = new builder.Message(session);
		msg.attachmentLayout(builder.AttachmentLayout.list);
		msg.attachments([
			new builder.HeroCard(session)
			.title("Input a search query.")
			.buttons([
				builder.CardAction.imBack(session, "Back to Image Menu", "Back to Image Menu")
			])
		]);
		builder.Prompts.text(session, msg);
	},
	function (session, results, next) {
		if (results.response.replace(/^Metagon /g, "") !== "Back to Image Menu") {
			if (session.message.source !== "line") {session.sendTyping();}
			request("https://api.flickr.com/services/rest?api_key="+process.env.flickr+"&method=flickr.photos.search&text="+results.response.replace(/^Metagon /g, "")+"&format=json&per_page=500&nojsoncallback=1&media=photos", function(error, response, body) {
				if (!error && response.statusCode === 200) {
					body = JSON.parse(body);
					var photo = body.photos.photo[Math.floor(Math.random() * body.photos.photo.length)];
					if (photo === undefined) {
						session.send("No results.");
						session.replaceDialog("/image");	
						return;
					}
					request("https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key="+process.env.flickr+"&photo_id="+photo.id+"&format=json&nojsoncallback=1", function(error, response, body) {
						if (!error && response.statusCode === 200) {
							body = JSON.parse(body);
							if (!body.sizes) {
								session.send("A persisting error occured. Please report this with your whole dialog to https://github.com/austinhuang0131/metagon/issues or email \"im@austinhuang.me\".");
							}
							else {
								session.send({
									text: photo.title,
									attachments: [
										{
											contentType: "image/*",
											contentUrl: body.sizes.size[body.sizes.size.length - 1].source
										}
									]
								});
							}
							session.replaceDialog("/image");
					}
						else {
							session.send("Failed to connect to http://flickr.com");
							session.replaceDialog("/image");
						}
					});
				}
				else {
					session.send("Failed to connect to http://flickr.com");
					session.replaceDialog("/image");
				}
			});
		}
		else {
			session.replaceDialog("/image");
		}
    }]);
bot.dialog('/flickr2', function (session) {
	if (session.message.source === "kik") {
		session.endDialog('It seems like you\'re confused. Maybe try typing \"help\". Alternatively, type \"start\" to start the bot up.');
		return;
	}
	if (session.message.source !== "line") {session.endDialogTyping();}
	if (session.message.text.replace(/( |)\/flickr/, "") !== "") {
		request("https://api.flickr.com/services/rest?api_key="+process.env.flickr+"&method=flickr.photos.search&text="+session.message.text.replace(/( |)\/flickr/, "")+"&format=json&per_page=500&nojsoncallback=1", function(error, response, body) {
			if (!error && response.statusCode === 200) {
				body = JSON.parse(body);
				var photo = body.photos.photo[Math.floor(Math.random() * body.photos.photo.length)];
				if (photo === undefined) {
					session.endDialog("No results.");
					return;
				}
				request("https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key="+process.env.flickr+"&photo_id="+photo.id+"&format=json&nojsoncallback=1", function(error, response, body) {
					if (!error && response.statusCode === 200) {
						body = JSON.parse(body);
						if (!body.sizes) {
							session.endDialog("A persisting error occured. Please report this with your whole dialog to https://github.com/austinhuang0131/metagon/issues or email \"im@austinhuang.me\".");
						}
						else {
							session.endDialog({
								text: photo.title,
								attachments: [
									{
										contentType: "image/*",
										contentUrl: body.sizes.size[body.sizes.size.length - 1].source
									}
								]
							});
						}
					}
					else {session.endDialog("Failed to connect to http://flickr.com");}
				});
			}
			else {session.endDialog("Failed to connect to http://flickr.com");}
		});
	}
	else {
		session.endDialog("Missing search query! Correct usage: \"/flickr (Query)\"");
	}
}).triggerAction({ matches: /^( ||Metagon )\/flickr/g});

bot.dialog('/deviantart1',[
	function (session) {
		var msg = new builder.Message(session);
		msg.attachmentLayout(builder.AttachmentLayout.list);
		msg.attachments([
			new builder.HeroCard(session)
			.title("Input a search query.")
			.buttons([
				builder.CardAction.imBack(session, "Back to Image Menu", "Back to Image Menu")
			])
		]);
		builder.Prompts.text(session, msg);
	},
	function (session, results) {
		if (results.response.replace(/^Metagon /g, "") !== "Back to Image Menu") {
			if (session.message.source !== "line") {session.sendTyping();}
			request("https://backend.deviantart.com/rss.xml?type=deviation&q="+results.response.replace(/^Metagon /g, ""), function(error, response, body) {
				if (!error && response.statusCode === 200) {
					parseString(body, function (err, result) {
						if (!result.rss.channel[0].item) {
							session.send("No results!");
							session.replaceDialog("/image");
							return;
						}
						var things = result.rss.channel[0].item.filter(r => {return r["media:content"][0]["$"].medium === "image";});
						var thing = things[Math.floor(Math.random() * things.length)];
						session.send({
							text: thing.title[0],
							attachments: [
								{
									contentType: "image/*",
									contentUrl: thing["media:content"][0]["$"].url
								}
							]
						});
						session.replaceDialog("/image");
    				});
				}
				else {
					session.send("Failed to connect to https://backend.deviantart.com/rss.xml");
					session.replaceDialog("/image");
				}
			});
		}
		else {
			session.replaceDialog("/image");
		}
    }]);
bot.dialog('/deviantart2', function (session) {
	if (session.message.source === "kik") {
		session.send('It seems like you\'re confused. Maybe try typing \"help\". Alternatively, type \"start\" to start the bot up.');
		return;
	}
	if (session.message.source !== "line") {session.sendTyping();}
	if (session.message.text.replace(/( |)\/deviantart/, "") !== "") {
		request("https://backend.deviantart.com/rss.xml?type=deviation&q="+session.message.text.replace(/( |)\/deviantart/, ""), function(error, response, body) {
			if (!error && response.statusCode === 200) {
				parseString(body, function (err, result) {
					if (!result.rss.channel[0].item) {
						session.send("No results!");
						session.replaceDialog("/image");
						return;
					}
					var thing = result.rss.channel[0].item[Math.floor(Math.random() * result.rss.channel[0].item.length)];
					session.endDialog({
						text: thing.title[0],
						attachments: [
							{
								contentType: "image/*",
								contentUrl: thing["media:content"][0]["$"].url
							}
						]
					});
				});
			}
			else {
				console.log(body);
				session.endDialog("Failed to connect to https://backend.deviantart.com/rss.xml");
			}
		});
	}
	else {
		session.endDialog("Missing search query! Correct usage: \"/deviantart (Query)\"");
	}
}).triggerAction({ matches: /^( ||Metagon )\/deviantart/g});

// Utility
bot.dialog('/shorten1',[
	function (session) {
		var msg = new builder.Message(session);
		msg.attachmentLayout(builder.AttachmentLayout.list);
		msg.attachments([
			new builder.HeroCard(session)
			.title("Input the URL you'd like to shorten.")
			.subtitle("ProTip: Does not need http://")
			.buttons([
				builder.CardAction.imBack(session, "Back to Utility Menu", "Back to Utility Menu")
			])
		]);
		builder.Prompts.text(session, msg);
	},
	function (session, results) {
		if (results.response.replace(/^Metagon /g, "").endsWith("Back to Utility Menu")) {
			
			session.replaceDialog("/utility");
			return;
		}
		if (results.response.replace(/^Metagon /g, "").startsWith("<") && results.response.replace(/^Metagon /g, "").includes("|")) {
			var site = results.response.replace(/^Metagon /g, "").split("|")[0].replace("<", "");
		}
		else if (results.response.replace(/^Metagon /g, "").startsWith("<")) {
			var site = results.response.replace(/^Metagon /g, "").replace("<", "").replace(">", "").replace(";", "");
		}
		else {
			var site = results.response.replace(/^Metagon /g, "");
		}
		if (!site.startsWith("http")) {
			site = "http://"+results.response.replace(/^Metagon /g, "");
		}
		request("https://api-ssl.bitly.com/v4/shorten", 
			{
				headers: {Authorization: "Bearer "+process.env.bitly_token},
				json: {long_url: site}
			},
			function(error, response, body) {
			if (!error && response.statusCode === 200) {
				session.endDialog("Done! "+body.link);
				session.replaceDialog("/utility");
			}
			else {
				session.endDialog("An error occured. Invalid address, or retry?");
				session.replaceDialog("/utility");
			}
		});
    }
]);
bot.dialog('/shorten2', function (session) {
	if (session.message.text.replace("/shorten", "").replace(" ", "") === "") {
		session.send("Missing query! /shorten (URL)")
	}
	if (session.message.text.replace("/shorten", "").replace(" ", "").startsWith("<") && session.message.text.replace("/shorten", "").replace(" ", "").includes("|")) {
		var site = session.message.text.replace("/shorten", "").replace(" ", "").split("|")[0].replace("<", "");
	}
	else if (session.message.text.replace("/shorten", "").replace(" ", "").startsWith("<")) {
		var site = session.message.text.replace("/shorten", "").replace(" ", "").replace("<", "").replace(">", "").replace(";", "");
	}
	else {
		var site = session.message.text.replace("/shorten", "").replace(" ", "");
	}
	if (!site.startsWith("http")) {
		site = "http://"+session.message.text.replace("/shorten", "").replace(" ", "");
	}
	request("https://api-ssl.bitly.com/v4/shorten", 
		{
			headers: {Authorization: "Bearer "+process.env.bitly_token},
			json: {long_url: site}
		},
		function(error, response, body) {
		if (!error && response.statusCode === 200) {
			session.endDialog("Done! "+body.link);
		}
		else {
			session.endDialog("An error occured. Invalid address, or retry?\n\n/shorten (URL)");
		}
	});
}).triggerAction({ matches: /^( ||Metagon )\/shorten/g});

bot.dialog('/expand1',[
	function (session) {
		var msg = new builder.Message(session);
		msg.attachmentLayout(builder.AttachmentLayout.list);
		msg.attachments([
			new builder.HeroCard(session)
			.title("Input the URL you'd like to expand.")
			.subtitle("ProTip: Does not need http://")
			.buttons([
				builder.CardAction.imBack(session, "Back to Utility Menu", "Back to Utility Menu")
			])
		]);
		builder.Prompts.text(session, msg);
	},
	function (session, results) {
		if (results.response.replace(/^Metagon /g, "").endsWith("Back to Utility Menu")) {
			
			session.replaceDialog("/utility");
			return;
		}
		if (results.response.replace(/^Metagon /g, "").startsWith("<") && results.response.replace(/^Metagon /g, "").includes("|")) {
			var site = results.response.replace(/^Metagon /g, "").split("|")[0].replace("<", "");
		}
		else if (results.response.replace(/^Metagon /g, "").startsWith("<")) {
			var site = results.response.replace(/^Metagon /g, "").replace("<", "").replace(">", "").replace(";", "");
		}
		else {
			var site = results.response.replace(/^Metagon /g, "");
		}
		site = site.replace(/^http(|s):\/\//, "");
		request("https://api-ssl.bitly.com/v4/expand", 
			{
				headers: {Authorization: "Bearer "+process.env.bitly_token},
				json: {bitlink_id: site}
			},
			function(error, response, body) {
			if (!error && response.statusCode === 200) {
				session.endDialog("Done! "+body.long_url);
				session.replaceDialog("/utility");
			}
			else {
				session.endDialog("An error occured. Invalid address, or retry?");
				session.replaceDialog("/utility");
			}
		});
    }
]);
bot.dialog('/expand2', function (session){
	if (session.message.text.replace("/expand", "").replace(" ", "") === "") {
		session.send("Missing query! /expand (Bitly URL)")
	}
	if (session.message.text.replace("/expand", "").replace(" ", "").startsWith("<") && session.message.text.replace("/expand", "").replace(" ", "").includes("|")) {
		var site = session.message.text.replace("/expand", "").replace(" ", "").split("|")[0].replace("<", "");
	}
	else if (session.message.text.replace("/expand", "").replace(" ", "").startsWith("<")) {
		var site = session.message.text.replace("/expand", "").replace(" ", "").replace("<", "").replace(">", "").replace(";", "");
	}
	else {
		var site = session.message.text.replace("/expand", "").replace(" ", "");
	}
	site = site.replace(/^http(|s):\/\//, "");
	request("https://api-ssl.bitly.com/v4/expand", 
		{
			headers: {Authorization: "Bearer "+process.env.bitly_token},
			json: {bitlink_id: site}
		},
		function(error, response, body) {
		if (!error && response.statusCode === 200) {
			session.endDialog("Done! "+body.long_url);
		}
		else {
			session.endDialog("An error occured. Invalid address, or retry?\n\n/expand (URL)");
		}
	});

}).triggerAction({ matches: /^( ||Metagon )\/expand/g});

bot.dialog('/mcuser1',[
	function (session) {
		var msg = new builder.Message(session);
		msg.attachmentLayout(builder.AttachmentLayout.list);
		msg.attachments([
			new builder.HeroCard(session)
			.title("Input the username or UUID you'd like to look up.")
			.buttons([
				builder.CardAction.imBack(session, "Back to Utility Menu", "Back to Utility Menu")
			])
		]);
		builder.Prompts.text(session, msg);
	},
	function (session, results) {
		if (results.response.replace(/^Metagon /g, "").endsWith("Back to Utility Menu")) {
			session.replaceDialog("/utility");
			return;
		}
		let username = results.response.replace(/^Metagon /g, "").replace(/-/g, "");
		request('https://api.mojang.com/users/profiles/minecraft/' + username, {json: true}, function(error, response, body) {
			if (response.statusCode === 204 && username.length !== 32) {
				session.send("This is not a valid Minecraft username.");
			}
			else if (!error) {
				username = username.length !== 32 ? body.id : username;
				request("https://api.mojang.com/user/profiles/"+username+"/names", {json: true}, (e1, r1, b1) => {
					let names = !e1 ? body.map(r => r.name).join(", ") : "*Not available*";
					session.send("* UUID: " + username + "\n* Name history: " + names + "\n\n== Appearance ==\n* Body: https://crafatar.com/renders/body/"+username+"\n* Skin: https://crafatar.com/skins/"+username+"\n* Cape: https://crafatar.com/cape/"+username);
				});
			}
			else {
				session.send("An error occurred.");
			}
			session.replaceDialog("/utility");
		});
    }
]);
bot.dialog('/mcuser2', function (session) {
	if (session.message.text.replace("/mcuser ", "").replace(/^Metagon /g, "").replace(/-/g, "") === "") {
		session.send("Missing search query! /mcuser (Username or UUID)");
		return;
	}
	let username = session.message.text.replace("/mcuser ", "").replace(/^Metagon /g, "").replace(/-/g, "");
	request('https://api.mojang.com/users/profiles/minecraft/' + username, {json: true}, function(error, response, body) {
		if (response.statusCode === 204 && username.length !== 32) {
			session.send("This is not a valid Minecraft username.");
		}
		else if (!error) {
			username = username.length !== 32 ? body.id : username;
			request("https://api.mojang.com/user/profiles/"+username+"/names", {json: true}, (e1, r1, b1) => {
				let names = !e1 ? body.map(r => r.name).join(", ") : "*Not available*";
				session.send("* UUID: " + username + "\n* Name history: " + names + "\n\n== Appearance ==\n* Body: https://crafatar.com/renders/body/"+username+"\n* Skin: https://crafatar.com/skins/"+username+"\n* Cape: https://crafatar.com/cape/"+username);
			});
		}
		else {
			session.send("An error occurred.");
		}
	});
}).triggerAction({ matches: /^( ||Metagon )\/mcuser/g});

bot.dialog('/mcserver1',[
	function (session) {
		var msg = new builder.Message(session);
		msg.attachmentLayout(builder.AttachmentLayout.list);
		msg.attachments([
			new builder.HeroCard(session)
			.title("Input the server IP/address you'd like to look up.")
			.buttons([
				builder.CardAction.imBack(session, "Back to Utility Menu", "Back to Utility Menu")
			])
		]);
		builder.Prompts.text(session, msg);
	},
	function (session, results) {
		if (results.response.replace(/^Metagon /g, "").endsWith("Back to Utility Menu")) {
			session.replaceDialog("/utility");
			return;
		}
		if (session.message.source !== "line") {session.sendTyping();}
		request.get('https://api.mcsrvstat.us/1/'+results.response.replace(/^Metagon /g, ""), {json: true}, function(error, response, body) {
			if (!error) {
				if (body.offline) {
					session.send("This server seems to be offline. \n\nIP: " + (!body.ip ? "Cannot detect" : body.ip) + ", Port: " + (!body.port ? "Cannot detect" : body.port) + ", Hostname: " + (!body.hostname ? "Cannot detect" : body.hostname));
				 }
				else {
					session.send({
						text: body.ip+":"+body.port+" ("+body.hostname+")\n* Players: "+body.players.online+"/"+body.players.max+"\n* Software: "+body.software+", Version: "+body.version+"\n* MOTD: "+body.motd.clean.join("\n\n"),
						attachments: [
							{
								contentType: "image/*",
								contentUrl: "https://api.minetools.eu/favicon/"+results.response.replace(/^Metagon /g, "").replace(":", "/")
							}
						]
					});
				}
				session.replaceDialog("/utility");
			}
			else {
				session.send("An error occurred.");
				session.replaceDialog("/utility");
			}
		});
    }
]);
bot.dialog('/mcserver2', function (session) {
	if (session.message.text.replace("/mcserver", "").replace(" ", "") === "") {
		session.send("Missing search query! /mcserver (Hostname or IP)");
		return;
	}
	if (session.message.source !== "line") {session.sendTyping();}
	request.get('https://api.mcsrvstat.us/1/'+session.message.text.replace(/^Metagon /g, "").replace("/mcserver ", ""), {json: true}, function(error, response, body) {
		if (!error) {
			if (body.offline) {
				session.send("This server seems to be offline. \n\nIP: " + (!body.ip ? "Cannot detect" : body.ip) + ", Port: " + (!body.port ? "Cannot detect" : body.port) + ", Hostname: " + (!body.hostname ? "Cannot detect" : body.hostname));
			 }
			else {
				session.send({
					text: body.ip+":"+body.port+" ("+body.hostname+")\n* Players: "+body.players.online+"/"+body.players.max+"\n* Software: "+body.software+", Version: "+body.version+"\n* MOTD: "+body.motd.clean.join("\n\n"),
					attachments: [
						{
							contentType: "image/*",
							contentUrl: "https://api.minetools.eu/favicon/"+session.message.text.replace(/^Metagon /g, "").replace("/mcserver ", "").replace(":", "/")
						}
					]
				});
			}
		}
		else {
			session.endDialog("An error occurred.");
		}
	});
}).triggerAction({ matches: /^( ||Metagon )\/mcserver/g});

bot.dialog('/pastebin1',[
	function (session) {
		var msg = new builder.Message(session);
		msg.attachmentLayout(builder.AttachmentLayout.list);
		msg.attachments([
			new builder.HeroCard(session)
			.title("Input the content you'd like to paste.")
			.buttons([
				builder.CardAction.imBack(session, "Back to Utility Menu", "Back to Utility Menu")
			])
		]);
		builder.Prompts.text(session, msg);
	},
	function (session, results) {
		if (results.response.replace(/^Metagon /g, "").endsWith("Back to Utility Menu")) {
			session.replaceDialog("/utility");
			return;
		}
		request.post('https://pastebin.com/api/api_post.php', {form: {api_dev_key: process.env.pastebin, api_option: "paste", api_paste_code: results.response.replace(/^Metagon /g, "")}}, function(error, response, body) {
			if (!error && response.statusCode === 200) {
				session.send("Done! "+body);
				session.replaceDialog("/utility");
			}
			else {
				session.send("An error occurred.");
				session.replaceDialog("/utility");
			}
		});
    }
]);
bot.dialog('/pastebin2', function (session) {
	if (session.message.text.replace("/mcserver", "").replace(" ", "") === "") {
		session.send("Nothing to paste! /paste (Stuff)");
		return;
	}
	request.post('https://pastebin.com/api/api_post.php', {form: {api_dev_key: process.env.pastebin, api_option: "paste", api_paste_code: session.message.text.substring(7).replace(" ", "")}}, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			session.endDialog("Done! "+body);
		}
		else {
			session.endDialog("An error occurred.");
		}
	});
}).triggerAction({ matches: /^( ||Metagon )\/paste/g});

bot.dialog('/dictionary1', [
	function (session) {
		var msg = new builder.Message(session);
		msg.attachmentLayout(builder.AttachmentLayout.list);
		msg.attachments([
			new builder.HeroCard(session)
			.title("Input the word you'd like to look up.")
			.buttons([
				builder.CardAction.imBack(session, "Back to Utility Menu", "Back to Utility Menu")
			])
		]);
		builder.Prompts.text(session, msg);
	}, function (session, results) {
		session.replaceDialog("/dictionary2");
	}
]);
bot.dialog('/dictionary2', function (session) {
	if (session.message.text.replace("/dictionary ", "").trim() === "") {
		session.send("Nothing to look up! /dictionary (Stuff)");
		return;
	}
	else if (session.message.text.includes("Back to Utility Menu")) {
		session.replaceDialog("/utility");
		return;
	}
	let headword = session.message.text.replace(/^((Metagon | |)\/dictionary |Metagon )/g, "").toLowerCase();
	request("http://api.pearson.com/v2/dictionaries/ldoce5/entries?headword="+headword, {json: true}, function(error, response, body) {
		if (!error && body.results.length === 0) {
			session.send("No results! Is this a word?")
		}
		else if (!error) {
			let defs = body.results.filter(e => {return e.headword === headword && e.senses[0].definition !== undefined;});
			session.send(defs.length !== 0
				     ? defs.map(r => "* " + r.headword + ": " + r.senses[0].definition).join("\n\n")
				     : "No results for this exact word. Did you mean any of the following?\n" + body.results.filter(r => {return !r.homnum || r.homnum === 1}).map(r => r.headword).slice(0, 3).join(", ")
			);
		}
		else {
			session.send("An error occurred.");
		}
		if (!session.message.text.match(/^(Metagon | |)\/dictionary/g)) session.replaceDialog("/utility");
		else session.endDialog();
	});
}).triggerAction({ matches: /^( ||Metagon )\/dictionary/g});

bot.dialog('/weather1',[
	function (session) {
		var msg = new builder.Message(session);
		msg.attachmentLayout(builder.AttachmentLayout.list);
		msg.attachments([
			new builder.HeroCard(session)
			.title("Enter the name of the city to check.")
			.buttons([
				builder.CardAction.imBack(session, "Back to Utility Menu", "Back to Utility Menu")
			])
		]);
		builder.Prompts.text(session, msg);
	},
	function (session, results) {
		if (results.response.replace(/^Metagon /g, "").endsWith("Back to Utility Menu")) {
			session.replaceDialog("/utility");
			return;
		}
		request('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22'+results.response.replace(/^Metagon /g, "")+'%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', {json: true}, function(error, response, body) {
			if (!error && response.statusCode === 200) {
				var weather = body.query.results.channel.item;
				session.send(weather.title+"\n\n== Condition ==\n\n"+weather.condition.text+", "+weather.condition.temp+"ºF ("+f2c(weather.condition.temp)+"ºC)\n\n== Forecast ==\n\n* Today: "+weather.forecast[0].text+", "+weather.forecast[0].low+"ºF ("+f2c(weather.forecast[0].low)+"ºC) ~ "+weather.forecast[0].high+"ºF ("+f2c(weather.forecast[0].high)+"ºC)\n* Tomorrow: "+weather.forecast[1].text+", "+weather.forecast[1].low+"ºF ("+f2c(weather.forecast[1].low)+"ºC) ~ "+weather.forecast[1].high+"ºF ("+f2c(weather.forecast[1].high)+"ºC)\n* "+weather.forecast[2].day+": "+weather.forecast[2].text+", "+weather.forecast[2].low+"ºF ("+f2c(weather.forecast[2].low)+"ºC) ~ "+weather.forecast[2].high+"ºF ("+f2c(weather.forecast[2].high)+"ºC)\n== Misc ==\n\n* Sunrise: "+body.query.results.channel.astronomy.sunrise+", Sunset: "+body.query.results.channel.astronomy.sunset);
				session.replaceDialog("/utility");
			}
			else {
				session.send("An error occurred.");
				session.replaceDialog("/utility");
			}
		});
    }
]);
bot.dialog('/weather2', function (session) {
	request('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22'+session.message.text.replace("/weather", "").replace(" ", "")+'%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', {json: true}, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			var weather = body.query.results.channel.item;
			session.endDialog(weather.title+"\n\n== Condition ==\n\n"+weather.condition.text+", "+weather.condition.temp+"ºF ("+f2c(weather.condition.temp)+"ºC)\n\n== Forecast ==\n\n* Today: "+weather.forecast[0].text+", "+weather.forecast[0].low+"ºF ("+f2c(weather.forecast[0].low)+"ºC) ~ "+weather.forecast[0].high+"ºF ("+f2c(weather.forecast[0].high)+"ºC)\n* Tomorrow: "+weather.forecast[1].text+", "+weather.forecast[1].low+"ºF ("+f2c(weather.forecast[1].low)+"ºC) ~ "+weather.forecast[1].high+"ºF ("+f2c(weather.forecast[1].high)+"ºC)\n* "+weather.forecast[2].day+": "+weather.forecast[2].text+", "+weather.forecast[2].low+"ºF ("+f2c(weather.forecast[2].low)+"ºC) ~ "+weather.forecast[2].high+"ºF ("+f2c(weather.forecast[2].high)+"ºC)\n== Misc ==\n\n* Sunrise: "+body.query.results.channel.astronomy.sunrise+", Sunset: "+body.query.results.channel.astronomy.sunset);
		}
		else {
			session.endDialog("An error occurred.");
		}
	});
}).triggerAction({ matches: /^( ||Metagon )\/weather/g});

// Fun
bot.dialog('/ud1',[
	function (session) {
		var msg = new builder.Message(session);
		msg.attachmentLayout(builder.AttachmentLayout.list);
		msg.attachments([
			new builder.HeroCard(session)
			.title("Type the word you'd like to search for.")
			.buttons([
				builder.CardAction.imBack(session, "Back to Fun Menu", "Back to Fun Menu")
			])
		]);
		builder.Prompts.text(session, msg);
	},
	function (session, results) {
		if (results.response.replace(/^Metagon /g, "").endsWith("Back to Fun Menu")) {
			session.replaceDialog("/fun");
			return;
		}
		request('http://api.urbandictionary.com/v0/define?term='+results.response.replace(/^Metagon /g, ""), {json: true}, function(error, response, body) {
			if (!error && response.statusCode === 200 && body.list.length !== 0) {
				session.send("Top UD result for "+results.response.replace(/^Metagon /g, "")+"\n\n== Definition ==\n\n"+body.list[0].definition+"\n\n == Example ==\n\n"+body.list[0].example+"\n\n* "+body.list[0].thumbs_up+"\uD83D\uDC4D / "+body.list[0].thumbs_down+"\uD83D\uDC4E");
				session.replaceDialog("/fun");
			}
			else if (!error && response.statusCode === 200) {
				session.send("No results!");
				session.replaceDialog("/fun");
			}
			else {
				session.send("An error occurred.");
				session.replaceDialog("/fun");
			}
		});
    }
]);
bot.dialog('/ud2', function (session) {
	request('http://api.urbandictionary.com/v0/define?term='+session.message.text.replace("/ud", "").replace(" ", ""), {json: true}, function(error, response, body) {
		if (!error && response.statusCode === 200 && body.list.length !== 0) {
			session.endDialog("Top UD result for "+session.message.text.replace("/ud", "").replace(" ", "")+"\n\n== Definition ==\n\n"+body.list[0].definition+"\n\n == Example ==\n\n"+body.list[0].example+"\n\n* "+body.list[0].thumbs_up+"\uD83D\uDC4D / "+body.list[0].thumbs_down+"\uD83D\uDC4E");
		}
		else if (!error && response.statusCode === 200) {
			session.endDialog("No results!");
		}
		else {
			session.endDialog("An error occurred.");
		}
	});
}).triggerAction({ matches: /^( ||Metagon )\/ud/g});

bot.dialog('/joke', function (session) {
	if (session.message.source === "kik") {
		request('http://api.icndb.com/jokes/random?escape=javascript?exclude=[explicit]', function(error, response, body) {
			if (!error && response.statusCode === 200) {
				body = JSON.parse(body);
				session.send(body.value.joke);
				if (!session.message.text.includes("/")) session.replaceDialog("/fun");
			}
			else {
				session.send("ERROR! I could not connect to http://api.icndb.com/jokes/random. Please retry. If the problem persists, please contact im@austinhuang.me");
			}
		});
	}
	else {
		request('http://api.icndb.com/jokes/random?escape=javascript', function(error, response, body) {
			if (!error && response.statusCode === 200) {
				body = JSON.parse(body);
				session.send(body.value.joke);
				if (!session.message.text.includes("/")) session.replaceDialog("/fun");
			}
			else {
				session.endDialog("ERROR! I could not connect to http://api.icndb.com/jokes/random. Please retry. If the problem persists, please contact im@austinhuang.me");
			}
		});
	}
}).triggerAction({ matches: /^( ||Metagon )\/joke/g});
bot.dialog('/yoda', function (session) {
	session.send(yoda_said[Math.floor(Math.random() * yoda_said.length)]);
	if (!session.message.text.includes("/")) session.replaceDialog("/fun");
}).triggerAction({ matches: /^( ||Metagon )\/yoda/g});
bot.dialog('/design', function (session) {
	request('https://quotesondesign.com/wp-json/wp/v2/posts?orderby=rand&posts_per_page=1', function(error, response, body) {
		if (!error && response.statusCode === 200) {
			body = JSON.parse(body);
			session.send(body[0].content.rendered.replace("<p>", "").replace("</p>", "")+"\n--- "+body[0].title.rendered);
			if (!session.message.text.includes("/")) session.replaceDialog("/fun");
		}
		else {
			session.endDialog("ERROR! I could not connect to https://quotesondesign.com/wp-json/wp/v2/posts. Please retry. If the problem persists, please contact im@austinhuang.me");
		}
	});
}).triggerAction({ matches: /^( ||Metagon )\/design/g});
bot.dialog('/catfact', function (session) {
	request('https://catfact.ninja/fact', function(error, response, body) {
		if (!error && response.statusCode === 200) {
			body = JSON.parse(body);
			session.send(body.fact);
			if (!session.message.text.includes("/")) session.replaceDialog("/fun");
		}
		else {
			session.endDialog("ERROR! I could not connect to http://catfact.ninja/fact. Please retry. If the problem persists, please contact im@austinhuang.me");
		}
	});
}).triggerAction({ matches: /^( ||Metagon )\/catfact/g});

bot.dialog('/trivia1', [
	function(session) {
			request("https://opentdb.com/api.php?amount=1", (error, response, body) => {
			if (!error && response.statusCode === 200) {
				body = JSON.parse(body);
				nsfw.push({user: session.message.address.user.id, answer: decode(body.results[0].correct_answer.replace("&‌#039;", "'").replace("&pi;", "π"))});
				if (body.results[0].type === "multiple") {
					var choices = body.results[0].incorrect_answers;
					choices.push(body.results[0].correct_answer);
					builder.Prompts.choice(session, "Category: "+body.results[0].category+"\n\n"+decode(body.results[0].question.replace("&‌#039;", "'").replace("&pi;", "π")), decode(shuffle(choices).map(c => c.replace("&‌#039;", "'").replace("&pi;", "π")).join("|")), {listStyle: 3});
				}
				else if (body.results[0].type === "boolean") builder.Prompts.confirm(session, "Category: "+body.results[0].category+"\n\n"+decode(body.results[0].question), {listStyle: 3});
			}
			else {
				session.endDialog("ERROR! I could not connect to https://opentdb.com/api.php. Please retry. If the problem persists, please contact im@austinhuang.me");
			}
		});
	},
	function(session, results) {
		var game = results.response.entity === nsfw.find(r => r.user === session.message.address.user.id).answer ? "You're right!" : "Oops... The answer is "+nsfw.find(r => r.user === session.message.address.user.id).answer+".";
		if (typeof results.response === "boolean") game = results.response.toString() === nsfw.find(r => r.user === session.message.address.user.id).answer.toLowerCase() ? "You're right!" : "Oops... The answer is "+nsfw.find(r => r.user === session.message.address.user.id).answer+".";
		var msg = new builder.Message(session);
			msg.attachmentLayout(builder.AttachmentLayout.carousel);
			msg.attachments([
				new builder.HeroCard(session)
					.text(game+" Wanna play again?")
					.buttons([
						builder.CardAction.imBack(session, "Yes", "Yes"),
						builder.CardAction.imBack(session, "No", "No")
					])
			]);

		builder.Prompts.confirm(session, session.message.source === "line" ? msg : (game+" Wanna play again?"), {listStyle: 3});
		setTimeout(() => nsfw.splice(nsfw.indexOf(nsfw.find(r => r.user === session.message.address.user.id)), 1), 100);
	},
	function(session, results) {
		if (results.response === true) session.reset("/trivia1");
		else session.replaceDialog("/fun");
	}
]);
bot.dialog('/trivia2', function (session) {
	request("https://opentdb.com/api.php?amount=1", (error, response, body) => {
		if (!error && response.statusCode === 200) {
			body = JSON.parse(body);
			session.endDialog("Category: "+body.results[0].category+"\n\n"+body.results[0].question.replace("&‌#039;", "'").replace("&pi;", "π")+"\n\nAnswer: "+body.results[0].correct_answer.replace("&‌#039;", "'").replace("&pi;", "π"));
		}
		else {
			session.endDialog("ERROR! I could not connect to https://opentdb.com/api.php. Please retry. If the problem persists, please contact im@austinhuang.me");
		}
	});
}).triggerAction({ matches: /^( ||Metagon )\/trivia/g});

bot.dialog('/9gag1',[
	function (session) {
		if (session.message.source === "line" || session.message.source === "facebook") {
			var msg = new builder.Message(session);
			msg.attachmentLayout(builder.AttachmentLayout.carousel);
			msg.attachments([
				new builder.HeroCard(session)
					.text("Select a section to visit, or \"Search\" to search for posts.")
					.buttons([
						builder.CardAction.imBack(session, "Search", "Search"),
						builder.CardAction.imBack(session, "cute", "Animals"),
						builder.CardAction.imBack(session, "anime-manga", "Anime & Manga")
					]),
				new builder.HeroCard(session)
					.text("Due to Line's API limitations, not all sections are shown.")
					.buttons([
						builder.CardAction.imBack(session, "ask9gag", "Ask 9GAG"),
						builder.CardAction.imBack(session, "awesome", "Awesome"),
						builder.CardAction.imBack(session, "car", "Car")
					]),
				new builder.HeroCard(session)
					.text("However, the correct code of hidden sections will still work.")
					.buttons([
						builder.CardAction.imBack(session, "comic", "Comic"),
						builder.CardAction.imBack(session, "country", "Country"),
						builder.CardAction.imBack(session, "food", "Food")
					]),
				new builder.HeroCard(session)
					.text("Here are the hidden sections: Type \"crafts\" for Crafts,")
					.buttons([
						builder.CardAction.imBack(session, "funny", "Funny"),
						builder.CardAction.imBack(session, "gaming", "Gaming"),
						builder.CardAction.imBack(session, "gif", "GIF")
					]),
				new builder.HeroCard(session)
					.text("\"horror\" for Horror, \"overwatch\" for Overwatch,")
					.buttons([
						builder.CardAction.imBack(session, "girl", "Girl"),
						builder.CardAction.imBack(session, "girly", "Girly Things"),
						builder.CardAction.imBack(session, "got", "Game of Thrones")
					]),
				new builder.HeroCard(session)
					.text("\"nsfw\" for NFK-Not for Kids, \"pcmr\" for PC Master Race,")
					.buttons([
						builder.CardAction.imBack(session, "history", "Historical Images"),
						builder.CardAction.imBack(session, "imadedis", "I Made Dis"),
						builder.CardAction.imBack(session, "movie-tv", "Movie & TV")
					]),
				new builder.HeroCard(session)
					.text("\"darkhumor\" for Dark Humor, \"wallpaper\" for Wallpaper,")
					.buttons([
						builder.CardAction.imBack(session, "music", "Music"),
						builder.CardAction.imBack(session, "politics", "Politics"),
						builder.CardAction.imBack(session, "relationship", "Relationship")
					]),
				new builder.HeroCard(session)
					.text("\"starwars\" for Star Wars, \"travel\" for Travel,")
					.buttons([
						builder.CardAction.imBack(session, "satisfying", "Satisfying"),
						builder.CardAction.imBack(session, "savage", "Savage"),
						builder.CardAction.imBack(session, "school", "School")
					]),
				new builder.HeroCard(session)
					.text("\"surrealmemes\" for Surreal Memes,")
					.buttons([
						builder.CardAction.imBack(session, "science", "Sci-Tech"),
						builder.CardAction.imBack(session, "sport", "Sport"),
						builder.CardAction.imBack(session, "timely", "Timely")
					]),
				new builder.HeroCard(session)
					.text("And \"classicalartmemes\" for Classical Art Memes.")
					.buttons([
						builder.CardAction.imBack(session, "video", "Video"),
						builder.CardAction.imBack(session, "wtf", "WTF"),
						builder.CardAction.imBack(session, "Back to Fun Menu", "Back to Fun Menu")
					])
			]);
			builder.Prompts.choice(session, msg, "Search|"+gagbrds.join("|")+"|Back to Fun Menu", { listStyle: 0 });
		}
		else builder.Prompts.choice(session, "Select a section to visit, or \"Search\" to search for posts.\n\n* \"got\" = Game of Thrones\n* \"imadedis\" = I made dis\n* \"pcmr\" = PC Master Race", "Search|"+gagbrds.join("|")+"|Back to Fun Menu", { listStyle: 3 });
	},
	function (session, results) {
		if (results.response.entity.endsWith("Back to Fun Menu")) {
			session.replaceDialog("/fun");
		}
		else if (results.response.entity.endsWith("nsfw") && session.message.source === "kik") {
			session.send("Function unavailable due to Kik regulations. Visit https://metagon.austinhuang.me/kik-disabled for details.");
			session.replaceDialog("/fun");
			return;
		}
		else if (results.response.entity.endsWith("Search")) {
			nsfw.push({user: session.message.address.user.id, gag: "search"});
			var msg = new builder.Message(session);
			msg.attachmentLayout(builder.AttachmentLayout.list);
			msg.attachments([
				new builder.HeroCard(session)
				.title("Input a search query.")
				.buttons([
					builder.CardAction.imBack(session, "Back to Fun Menu", "Back to Fun Menu")
				])
			]);
			builder.Prompts.text(session, msg);
		}
		else if (gagbrds.indexOf(results.response.entity) > -1) {
			nsfw.push({user: session.message.address.user.id, gag: results.response.entity});
			builder.Prompts.choice(session, "Select a subsection to visit.", "Hot|Fresh", { listStyle: 3 });
		}
    },
	function (session, results) {
		if (nsfw.find(i => {return i.user === session.message.address.user.id;}).gag === "search") {
			request("https://9gag.com/search?query="+results.response.replace(/^Metagon /g, ""), function(err, response, body) {
				var res = JSON.parse(body.split("<script type=\"text/javascript\">window._config = JSON.parse(\"")[1].split("\");</script>\n<script type=\"text/javascript\" src=\"")[0].replace(/\\/gi, "")).data;
				if (err || !res) {
					session.send("An error occured. Retry?");
					session.replaceDialog("/fun");
					nsfw.splice(nsfw.indexOf(nsfw.find(i => {return i.user === session.message.address.user.id;})), 1);
					return;
				}
				if (res.posts[Math.floor(Math.random() * res.posts.length)] === undefined) {
					session.send("No results. Retry?");
					session.replaceDialog("/fun");
					nsfw.splice(nsfw.indexOf(nsfw.find(i => {return i.user === session.message.address.user.id;})), 1);
				}
				else {
					session.send(res.posts[Math.floor(Math.random() * res.posts.length)].url);
					session.replaceDialog("/fun");
					nsfw.splice(nsfw.indexOf(nsfw.find(i => {return i.user === session.message.address.user.id;})), 1);
				}
			});
		}
		else if (results.response.entity.endsWith("Hot")) {
			request("https://9gag.com/"+nsfw.find(i => {return i.user === session.message.address.user.id;}).gag+"/hot", function(err, response, body) {
				var res = JSON.parse(body.split("JSON.parse(\"")[1].split("\");")[0].replace(/\\/g, "")).data;
				if (err || !res) {
					session.send("An error occured. Retry?");
					session.replaceDialog("/fun");
					nsfw.splice(nsfw.indexOf(nsfw.find(i => {return i.user === session.message.address.user.id;})), 1);
					return;
				}
				if (res.posts.length === 0) {
					session.send("No results. Retry?");
					session.replaceDialog("/fun");
					nsfw.splice(nsfw.indexOf(nsfw.find(i => {return i.user === session.message.address.user.id;})), 1);
				}
				else {
					session.send(res.posts[Math.floor(Math.random() * res.posts.length)].url);
					session.replaceDialog("/fun");
					nsfw.splice(nsfw.indexOf(nsfw.find(i => {return i.user === session.message.address.user.id;})), 1);
				}
			});
		}
		else if (results.response.entity.endsWith("Fresh")) {
			request("https://9gag.com/"+nsfw.find(i => {return i.user === session.message.address.user.id;}).gag+"/fresh", function(err, response, body) {
				var res = JSON.parse(body.split("<script type=\"text/javascript\">window._config = JSON.parse(\"")[1].split("\");</script>\n<script type=\"text/javascript\" src=\"")[0].replace(/\\/gi, "")).data;
				if (err || !res) {
					session.send("An error occured. Retry?");
					session.replaceDialog("/fun");
					nsfw.splice(nsfw.indexOf(nsfw.find(i => {return i.user === session.message.address.user.id;})), 1);
					return;
				}
				if (res.posts.length === 0) {
					session.send("No results. Retry?");
					session.replaceDialog("/fun");
					nsfw.splice(nsfw.indexOf(nsfw.find(i => {return i.user === session.message.address.user.id;})), 1);
				}
				else {
					session.send(res.posts[Math.floor(Math.random() * res.posts.length)].url);
					session.replaceDialog("/fun");
					nsfw.splice(nsfw.indexOf(nsfw.find(i => {return i.user === session.message.address.user.id;})), 1);
				}
			});
		}
		else if (results.response.replace(/^Metagon /g, "").endsWith("Back to Fun Menu")) {
			session.replaceDialog("/fun");
			nsfw.splice(nsfw.indexOf(nsfw.find(i => {return i.user === session.message.address.user.id;})), 1);
		}
	}
]);
bot.dialog('/9gag2', function (session) {
	var args = [session.message.text.split(" ")[1], session.message.text.split(" ")[2]];
	if (session.message.text.startsWith(" ")) {
		args = [session.message.text.split(" ")[2], session.message.text.split(" ")[3]];
	}
	if (gagbrds.indexOf(args[0]) > -1 && gagsubs.indexOf(args[1]) > -1) {
		if (args[0] === "nsfw" && session.message.source === "kik") {
			session.endDialog("Function unavailable due to Kik regulations. Visit https://metagon.austinhuang.me/kik-disabled for details.");
			return;
		}
		request("https://9gag.com/"+args[0]+"/"+args[1], function(err, response, body) {
				var res = JSON.parse(body.split("<script type=\"text/javascript\">window._config = JSON.parse(\"")[1].split("\");</script>\n<script type=\"text/javascript\" src=\"")[0].replace(/\\/gi, "")).data;
			if (err || !res) {
				session.endDialog("An error occured. Retry?");
				nsfw.splice(nsfw.indexOf(nsfw.find(i => {return i.user === session.message.address.user.id;})), 1);
				return;
			}
			if (res.posts.length === 0) {
				session.endDialog("No results. Retry?");
				nsfw.splice(nsfw.indexOf(nsfw.find(i => {return i.user === session.message.address.user.id;})), 1);
			}
			else {
				session.endDialog(res.posts[Math.floor(Math.random() * res.posts.length)].url);
				nsfw.splice(nsfw.indexOf(nsfw.find(i => {return i.user === session.message.address.user.id;})), 1);
			}
		});
	}
	else if (args[0] === "search" && args[1] !== undefined) {
		request("https://9gag.com/search?query="+args[1], function(err, response, body) {
				var res = JSON.parse(body.split("<script type=\"text/javascript\">window._config = JSON.parse(\"")[1].split("\");</script>\n<script type=\"text/javascript\" src=\"")[0].replace(/\\/gi, "")).data;
			if (err || !res) {
				session.endDialog("An error occured. Retry?");
				nsfw.splice(nsfw.indexOf(nsfw.find(i => {return i.user === session.message.address.user.id;})), 1);
				return;
			}
			if (res.posts.length === 0) {
				session.endDialog("No results. Retry?");
				nsfw.splice(nsfw.indexOf(nsfw.find(i => {return i.user === session.message.address.user.id;})), 1);
			}
			else {
				session.endDialog(res.posts[Math.floor(Math.random() * res.posts.length)].url);
				nsfw.splice(nsfw.indexOf(nsfw.find(i => {return i.user === session.message.address.user.id;})), 1);
			}
		});
	}
	else {
		session.endDialog("Invalid arguments!\n* /9gag (section) (hot/fresh)\n* /9gag search (Query)");
	}
}).triggerAction({ matches: /^( ||Metagon )\/9gag/g});

// General Guidance
bot.dialog('/unstuck', function (session) {
	session.endConversation("Your session data should be cleared. You can now safely re`start` the bot. That means:\n* If you typed something wrong in the last step and I started to hate you, your sin has been forgiven.\n* If you found a bug but can't get out after I was fixed, sorry for the inconvenience.");
	session.clearDialogStack();
}).triggerAction({ matches: /^unstuck!!!/g});
bot.dialog('/', function (session) {
	if ((session.message.source !== "groupme" && session.message.source !== "skypeforbusiness" && session.message.source !== "ciscospark") && (session.message.source !== "slack" && session.message.source !== "telegram" && session.message.source !== "line") || ((session.message.source === "slack" || session.message.source === "line" || session.message.source === "telegram") && !session.message.address.conversation.isGroup)) {
		session.endDialog(/^( ||Metagon )(hi|hello|what's up|bored|what do you do)/i.test(session.message.text) ? "Hello there! To use me, type \"start\"." : "It seems like you\'re confused. Maybe try typing \"help\". Alternatively, type \"start\" to start the bot up.");
	}
	else if (session.message.source === "groupme" || session.message.source === "skypeforbusiness" || session.message.source === "ciscospark") {
		session.endDialog(/^( ||Metagon )(hi|hello|what's up|bored|what do you do)/.test(session.message.text) ? "Hello there! To use me, read the documentation at https://metagon.austinhuang.me." : "It seems like you\'re confused. Please refer to our documentation at https://metagon.austinhuang.me.");
	}
	else {
		session.endDialog();
	}
});

// Setup Express Server
var server = express();
server.use(bodyParser.json({type: "*/*"}));
server.post('/api/messages', connector.listen());
//server.post('/cisco', cisco.listen);
server.listen(process.env.PORT || 5000, function () {
    console.log('%s listening to %s', server.name, server.url); 
});

// Errors
process.on('unhandledRejection', (reason, p) => {
  	console.log('Unhandled Rejection at:', p, 'reason:', reason);
});
process.on('uncaughtException', (reason) => {
  	console.log('Uncaught Exception:', reason);
});
