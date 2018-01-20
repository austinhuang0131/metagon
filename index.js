var express = require('express');
var builder = require('botbuilder');
var fs = require('fs');
var connector = new builder.ChatConnector({
    appId: process.env.appid,
    appPassword: process.env.appkey
});
var request = require('request');
var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'metagon', 
  api_key: process.env.cloudinary1, 
  api_secret: process.env.cloudinary2 
});
var bot = new builder.UniversalBot(connector);
var nsfw = JSON.parse(fs.readFileSync("./nsfw.json", "utf8"));
const Pixiv = require('pixiv-app-api');
const pixiv = new Pixiv(process.env.pixiv_username, process.env.pixiv_password);
const pixivImg = require('pixiv-img');
var gagbrds = ["cute", "anime-manga", "ask9gag", "awesome", "car", "comic", "darkhumor", "country", "food", "funny", "got", "gaming", "gif", "girl", "girly", "horror", "imadedis", "movie-tv", "music", "nsfw", "overwatch", "pcmr", "pol3itics", "relationship", "satisfying", "savage", "science", "superhero", "sport", "school", "timely", "video", "wallpaper", "wtf"];
var gagsubs = ["hot", "fresh"];
var yoda_said = [
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
];
var parseString = require('xml2js').parseString;
var DataDog = require('datadog');
var dd = new DataDog(process.env.datadog1, process.env.datadog2);
var incomes = {skype: 0, telegram: 0, slack: 0, kik: 0, total: 0};
/*var Dictionary = require('mw-dictionary'),
	dict = new Dictionary({
		key: process.env.dictionary
	});*/

var LineConnector = require("botbuilder-linebot-connector");
var lineConnector = new LineConnector.LineConnector({
    hasPushApi: false,
    channelId: process.env.line1,
    channelSecret: process.env.line2,
    channelAccessToken: process.env.line3
});
bot.connector("line", lineConnector);

/*var viber = require('botbuilder-viber');
var viberChannel = new viber.ViberEnabledConnector({
	Token: process.env.VIBER_TOKEN,
	Name: 'Metagon',  
	AvatarUrl: 'https://cdn.discordapp.com/avatars/376786742579298306/813b2b57849c91610fb6b4e74fa758b1.png',
	Webhook: "https://discoin.herokuapp.com/viber"
});
bot.connector("viber", viberChannel);*/

function f2c(f) {
	var c = (parseInt(f) - 32) / 1.8;
	return c.toFixed();
}

setInterval(function(){
	dd.postSeries({
		"series": [{
			"metric": "memory.rss",
			"points": [
				[Date.now()/1000, process.memoryUsage().rss]
			],
			"type": "gauge",
			"tags": ["memory"]
		}]
	});
	dd.postSeries({
		"series": [{
			"metric": "memory.heapTotal",
			"points": [
				[Date.now()/1000, process.memoryUsage().heapTotal]
			],
			"type": "gauge",
			"tags": ["memory"]
		}]
	});
	dd.postSeries({
		"series": [{
			"metric": "memory.heapUsed",
			"points": [
				[Date.now()/1000, process.memoryUsage().heapUsed]
			],
			"type": "gauge",
			"tags": ["memory"]
		}]
	});
}, 5000);
setInterval(function(){
	for(var attributename in incomes){
		dd.postSeries({
			"series": [{
				"metric": "messages.incoming",
				"points": [
					[Date.now()/1000, incomes[attributename]]
				],
				"type": "gauge",
				"tags": [attributename]
			}]
		});
		incomes[attributename] = 0;
	}
}, 300000);

bot.on('incoming', message => {
	dd.postEvent({
	   title: message.source + ' message received',
	   text: 'User '+message.address.user.name+': '+message.text
	});
	if (incomes[message.source] !== undefined) {incomes[message.source] += 1;}
	incomes.total += 1;
});
bot.on('error', err => {
	dd.postEvent({
	   title: 'ERROR!!!',
	   text: err
	});
});

bot.on('conversationUpdate', function (message) {
    if (message.address.conversation.isGroup) {
        if (message.membersAdded) {
            message.membersAdded.forEach(function (identity) {
                if (identity.id === message.address.bot.id) {
                    var reply = new builder.Message()
                            .address(message.address)
                            .text("Hello everyone! This is Metagon. You can reply \"start\" to start using me! For more info, visit http://metagon.cf.");
                    bot.send(reply);
                }
            });
        }
        if (message.membersRemoved) {
            message.membersRemoved.forEach(function (identity) {
                if (identity.id === message.address.bot.id) {
                    var reply = new builder.Message()
                        .address(message.address)
                        .text("Sorry to see you go! If you experienced issue, or you'd like to see a better Metagon, please tell us at http://metagon.cf/#contact-us.");
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
                .text("Hello there! This is Metagon. You can reply \"start\" to start using me! For more info, visit http://metagon.cf.");
        bot.send(reply);
    }
});

// Menus
bot.beginDialogAction("menu", "/menu", { matches: /(\/|Metagon |)start/gi});
bot.dialog('/menu', [
	function (session) {
		if (session.message.text === "/start" && session.message.source === "directline") {
			session.send("Keyboard Mode is not available on GroupMe / Skype for Business / Discord. Please use only commands.\nFor more information, type \"help\".");
		}
		else {
			if (session.message.source === "groupme" || session.message.source === "skypeforbusiness") {
				session.send("Keyboard Mode is not available on GroupMe / Skype for Business / Discord. Please use only commands.\nFor more information, type \"help\".");
			}
			else {
				builder.Prompts.choice(session, "What would you like to do right now?\n\nDiscovered a bug? Press the \"Feedback\" button to contact the owner. You can also check out our update log at <https://github.com/austinhuang0131/metagon/releases>.", "Images|Utility|Fun|About|Feedback|Quit", { listStyle: 3 });
			}
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
				session.endDialog("You have quitted the keyboard mode. You can start again by typing \"start\".");
			break;
		}
	}
]);
bot.dialog('/image', [
	function (session) {
		switch (session.message.source === "kik") {
			case true:
				builder.Prompts.choice(session, "What would you like to do right now?", "Cat|Dog|Snake|Bunny|Anime actions|Back to Start Menu|Quit", { listStyle: 3 });
			break;
			case false:
				builder.Prompts.choice(session, "What would you like to do right now?", "Imgur|Flickr|Pixiv (Anime)|DeviantArt|Anime actions|Cat|Dog|Snake|Bunny|Back to Start Menu|Quit", { listStyle: 3 });
				// IbSearch (Anime) should be added to the list whenever the function comes back
			break;
		}
	},
	function (session, results) {
		switch (results.response.entity) {
			case "Cat":
				session.replaceDialog("/cat");
			break;
			case "Snake":
				session.replaceDialog("/snake");
			break;
			case "Dog":
				session.replaceDialog("/dog");
			break;
			case "Bunny":
				session.replaceDialog("/bunny");
			break;
			case "Imgur":
				session.replaceDialog("/imgur1");
			break;
			case "Flickr":
				session.replaceDialog("/flickr1");
			break;
			/*case "IbSearch (Anime)":
				session.replaceDialog("/ibsearch1");
			break;*/
			case "Pixiv (Anime)":
				session.replaceDialog("/pixiv1");
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
				session.endDialog("You have quitted the keyboard mode. You can start again by typing \"start\".");
			break;
		}
	}
]);
bot.dialog('/utility', [
	function (session) {
		builder.Prompts.choice(session, "What would you like to do right now?", "Weather|Shorten URLs|Expand Bitly URLs|Minecraft User Lookup|Minecraft Server Status|Pastebin|Back to Start Menu|Quit", { listStyle: 3 });
	}, 
	function (session, results) {
		switch (results.response.entity) {
			case "Weather":
				session.replaceDialog("/weather1");
			break;
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
			case "Pastebin":
				session.replaceDialog("/paste1");
			break;
			case "Back to Start Menu":
				session.beginDialog("/menu");
			break;
			case "Quit":
				session.endDialog("You have quitted the keyboard mode. You can start again by typing \"start\".");
			break;
		}
	}
]);
bot.dialog('/fun', [
	function (session) {
		builder.Prompts.choice(session, "What would you like to do right now?", "9gag|Urban Dictionary|Chuck Norris|Yoda Quote|Quote on Design|Back to Start Menu|Quit", { listStyle: 3 });
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
			case "Yoda Quote":
				session.replaceDialog("/yoda");
			break;
			case "Quote on Design":
				session.replaceDialog("/design");
			break;
			case "Back to Start Menu":
				session.beginDialog("/menu");
			break;
			case "Quit":
				session.endDialog("You have quitted the keyboard mode. You can start again by typing \"start\".");
			break;
		}
	}
]);

bot.beginDialogAction("help", "/about", { matches: /help/i});
bot.dialog('/about', function (session) {
	if (session.message.source === "kik") {
		session.send("Thank you for using Metagon. I am a multi-platform multi-function bot to suit your needs!\n\nDocumentation: http://metagon.cf\n* If you have any questions, feel free to contact my master at @austinhuang0131.\n* Do I help you a lot? Consider a small donation (Detail in documentation)!\n* The simplest way to use this bot is by typing \"start\".");
	}
	else if (session.message.source === "telegram") {
		session.send("Thank you for using Metagon. I am a multi-platform multi-function bot to suit your needs!\n\nDocumentation: http://metagon.cf\n* If you have any questions, feel free to contact my master at @austinhuang.\n* Do I help you a lot? Consider a small donation (Detail in documentation)!\n* The simplest way to use this bot is by typing \"start\".");
	}
	else if (session.message.source === "skype") {
		session.send("Thank you for using Metagon. I am a multi-platform multi-function bot to suit your needs!\n\nDocumentation: http://metagon.cf\n* If you have any questions, feel free to contact my master at \"live:austin.0131\".\n* Do I help you a lot? Consider a small donation (Detail in documentation)!\n* The simplest way to use this bot is by typing \"start\".");
	}
	else if (session.message.source === "directline" && session.message.text === "/help") {
		session.send("Thank you for using Metagon. I am a multi-platform multi-function bot to suit your needs!\n\nDocumentation: http://metagon.cf\n* If you have any questions, feel free to contact my master at Discord invite `8uFr3J3`.\n**Commands:** `/9gag`, `/bunny`, `/cat`, `/flickr`, `/ibsearch`, `/imgur`, `/mcuser`, `/mcserver`, `/pastebin`, `/pixiv`, `/snake`, etc.\n\n* Do I help you a lot? Consider a small donation (Detail in documentation)!");
	}
	else if (session.message.source !== "directline") {
		session.send("Thank you for using Metagon. I am a multi-platform multi-function bot to suit your needs!\n\nDocumentation/Contact Us: http://metagon.cf\n\nDo I help you a lot? Consider a small donation (Detail in documentation)! The simplest way to use this bot is by typing \"start\".");
	}
	else {
		session.send();
	}
	if (session.message.source !== "groupme" && session.message.source !== "directline" && session.message.text.endsWith("support")) {
		session.replaceDialog("/menu");
	}
});

bot.dialog('/feedback', [
	function (session) {
		var msg = new builder.Message(session);
		msg.attachmentLayout(builder.AttachmentLayout.list);
		msg.attachments([
			new builder.HeroCard(session)
			.title("Have an idea? Found a bug? Write to us here!")
			.subtitle("Don't spam. Slack/SfB/MSTeams users: Leave me your email if you need support.")
			.buttons([
				builder.CardAction.imBack(session, "Back to Start Menu", "Back to Start Menu")
			])
		]);
		builder.Prompts.text(session, msg);
	},
	function (session, results) {
		if (results.response !== "Back to Start Menu") {
			request.post("https://maker.ifttt.com/trigger/feedback/with/key/kDnVlmQo6Z_Py2bwvlCGyLNh2y05mL_rL0CF7cAflOE", {json: {value1: session.message.address.user.name + " (" + session.message.address.user.id + ")", value2: session.message.source, value3: results.response}}, function(error, response, body) {
				// This URL is public. If you guys spam it, I'll remove it. This webhook connects to my Telegram.
				if (!error && response.statusCode === 200 && body === "Congratulations! You've fired the feedback event") {
					session.send("Your message is sent successfully.\n* If you are a Telegram/Kik/Skype user, or you provided your email: I'll get you in touch within 48 hours.");
					session.replaceDialog("/menu");
				}
				else {
				}
			});
		}
		else {
			session.send();
			session.replaceDialog("/menu");
		}
    }
]);

// Image
bot.beginDialogAction("cat", "/cat", { matches: /^( \/|\/|Metagon \/)cat/g});
bot.dialog('/cat', function (session) {
	if (session.message.source !== "directline") {session.sendTyping();}
	request('http://random.cat/meow', function(error, response, body) {
		if (!error && response.statusCode === 200) {
			body = JSON.parse(body);
			session.send({
				attachments: [
					{
						contentType: "image/*",
						contentUrl: body.file
					}
				]
			});
			if (!session.message.text.includes("/cat")) {
				session.replaceDialog("/image");
			}
			else {
				session.endDialog();
			}
		}
		else {
			session.endDialog("ERROR! I could not connect to http://random.cat/meow. Please retry. If the problem persists, leave an issue at http://metagon.cf");
		}
	});
});

bot.beginDialogAction("snake", "/snake", { matches: /^( \/|\/|Metagon \/)snake/g});
bot.dialog('/snake', function (session) {
	if (session.message.source !== "directline") {session.sendTyping();}
	request('http://fur.im/snek', function(error, response, body) {
		if (!error && response.statusCode === 200) {
			body = JSON.parse(body);
			session.send({
  				attachments: [
  					{
						contentType: "image/*",
						contentUrl: body.file
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
			session.endDialog("ERROR! I could not connect to http://fur.im/snek/snek.php. Please retry. If the problem persists, leave an issue at http://metagon.cf");
		}
	});
});

bot.beginDialogAction("dog", "/dog", { matches: /^( \/|\/|Metagon \/)dog/g});
bot.dialog('/dog', function (session) {
	if (session.message.source !== "directline") {session.sendTyping();}
	request('https://random.dog/woof.json', function(error, response, body) {
		if (!error && response.statusCode === 200) {
			body = JSON.parse(body);
			session.send({
  				attachments: [
  					{
						contentType: "image/*",
						contentUrl: body.url
 					}
  				]
  			});
			if (!session.message.text.includes("/dog")) {
				session.replaceDialog("/image");
			}
			else {
				session.endDialog();
			}
  		}
		else {
			session.endDialog("ERROR! I could not connect to https://random.dog/woof.json. Please retry. If the problem persists, leave an issue at http://metagon.cf");
		}
	});
});

bot.beginDialogAction("bunny", "/bunny", { matches: /^( \/|\/|Metagon \/)bunny/g});
bot.dialog('/bunny', function (session) {
	if (session.message.source !== "directline") {session.sendTyping();}
	request('https://api.bunnies.io/v2/loop/random/?media=gif,mp4', function(error, response, body) {
		if (!error && response.statusCode === 200 && session.message.source.includes("skype")) {
			body = JSON.parse(body);
			session.send({
  				attachments: [
  					{
  						contentType: "video/mp4",
 						contentUrl: body.media.mp4
 					}
  				]
  			});
			if (!session.message.text.includes("/cat")) {
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
			session.send("ERROR! I could not connect to https://api.bunnies.io/v2/loop/random/?media=gif,mp4 . Please retry. If the problem persists, leave an issue at http://metagon.cf");
		}
	});
});

bot.beginDialogAction("kph", "/kph", { matches: /^( \/|\/|Metagon \/)(kiss|pat|hug)/g});
bot.beginDialogAction("smug", "/smug", { matches: /^( \/|\/|Metagon \/)smug/g});
bot.dialog('/anime', [
	function (session) {
		builder.Prompts.choice(session, "What would you like to do right now?", "Kiss|Pat|Hug|Smug|Back to Image Menu|Quit", { listStyle: 3 });
	},
	function (session, results) {
		switch (results.response.entity) {
			case "Back to Image Menu":
				session.beginDialog("/image");
			break;
			case "Smug":
				session.beginDialog("/smug");
			break;
			case "Quit":
				session.endDialog("You have quitted the keyboard mode. You can start again by typing \"start\".");
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
	request('https://nekos.life/api/'+endpoint, {headers: {'Key': 'dnZ4fFJbjtch56pNbfrZeSRfgWqdPDgf'}}, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			body = JSON.parse(body);
			session.send({
				attachments: [
					{
						contentType: "image/*",
						contentUrl: body.url
					}
				]
			});
			if (!session.message.text.includes("/")) {
				session.replaceDialog("/image");
			}
		}
		else {
			session.endDialog("ERROR! I could not connect to https://nekos.life/api. Please retry. If the problem persists, leave an issue at http://metagon.cf");
		}
	});
});
bot.dialog('/smug', function (session) {
	request("https://smug.z0ne.moe/", function(error, response, body) {
		if (!error && response.statusCode === 200) {
			session.send({
				attachments: [
					{
						contentType: "image/*",
						contentUrl: "https://smug.z0ne.moe"+body.replace("<img src=\"", "").replace("\">", "")
					}
				]
			});
			if (!session.message.text.includes("/")) {
				session.replaceDialog("/image");
			}
		}
		else {
			session.endDialog("ERROR! I could not connect to https://smug.z0ne.moe/. Please retry. If the problem persists, leave an issue at http://metagon.cf");
		}
	});
});

bot.beginDialogAction("imgur", "/imgur2", { matches: /^( \/|\/|Metagon \/)imgur/g});
bot.dialog('/imgur1',[
	function (session) {
		if (session.message.source === "telegram" && session.message.address.conversation.isGroup) {
			session.send("This Keyboard function is not available on Telegram groups. Please use commands after typing \"Quit\" after typing \"Quit\".\n`/imgur (Query)`");
			session.replaceDialog("/image");
			return;
		}
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
		if (results.response !== "Back to Image Menu") {
			request({url:"https://api.imgur.com/3/gallery/search?q="+results.response, headers:{'Authorization': 'Client-ID '+process.env.imgur}}, function(error, response, body) {
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
		session.send('It seems like you\'re confused. Maybe try typing \"help\". Alternatively, type \"start\" to start the bot up.');
		return;
	}
	if (session.message.text.replace("/imgur", "").replace(" ", "") !== "") {
		request({url:"https://api.imgur.com/3/gallery/search?q="+session.message.text.substring(7), headers:{'Authorization': 'Client-ID '+process.env.imgur}}, function(error, response, body) {
			if (!error && response.statusCode === 200) {
				body = JSON.parse(body);
				if (body.data.length === 0) {session.send("No results. Change your query?");}
				else {session.send(body.data[Math.floor(Math.random() * body.data.length)].link);}
			}
			else {session.send("Failed to connect to http://imgur.com");}
		});
	}
	else {
		session.send("Missing search query! Correct usage: \"/imgur (Query)\"");
	}
});

bot.beginDialogAction("flickr", "/flickr2", { matches: /^( \/|\/|Metagon \/)flickr/g});
bot.dialog('/flickr1',[
	function (session) {
		if (session.message.source === "telegram" && session.message.address.conversation.isGroup) {
			session.send("This Keyboard function is not available on Telegram groups. Please use commands after typing \"Quit\".\n`/flickr (Query)`");
			session.replaceDialog("/image");
			return;
		}
		if (session.message.source === "kik") {
			session.send("Function unavailable due to Kik regulations. Visit https://metagon.cf/kik-disabled for details.");
			session.replaceDialog("/image");
			return;
		}
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
		if (results.response !== "Back to Image Menu") {
			if (session.message.source !== "directline") {session.sendTyping();}
			request("https://api.flickr.com/services/rest?api_key="+process.env.flickr+"&method=flickr.photos.search&text="+results.response+"&format=json&per_page=500&nojsoncallback=1", function(error, response, body) {
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
		session.send('It seems like you\'re confused. Maybe try typing \"help\". Alternatively, type \"start\" to start the bot up.');
		return;
	}
	if (session.message.source !== "directline") {session.sendTyping();}
	if (session.message.text.replace(/( |)\/flickr/, "") !== "") {
		request("https://api.flickr.com/services/rest?api_key="+process.env.flickr+"&method=flickr.photos.search&text="+session.message.text.replace(/( |)\/flickr/, "")+"&format=json&per_page=500&nojsoncallback=1", function(error, response, body) {
			if (!error && response.statusCode === 200) {
				body = JSON.parse(body);
				var photo = body.photos.photo[Math.floor(Math.random() * body.photos.photo.length)];
				if (photo === undefined) {
					session.send("No results.");
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
					}
					else {session.send("Failed to connect to http://flickr.com");}
				});
			}
			else {session.send("Failed to connect to http://flickr.com");}
		});
	}
	else {
		session.send("Missing search query! Correct usage: \"/flickr (Query)\"");
	}
});

bot.beginDialogAction("deviantart", "/deviantart2", { matches: /^( \/|\/|Metagon \/)deviantart/g});
bot.dialog('/deviantart1',[
	function (session) {
		if (session.message.source === "telegram" && session.message.address.conversation.isGroup) {
			session.send("This Keyboard function is not available on Telegram groups. Please use commands after typing \"Quit\".\n`/flickr (Query)`");
			session.replaceDialog("/image");
			return;
		}
		if (session.message.source === "kik") {
			session.send("Function unavailable due to Kik regulations. Visit https://metagon.cf/kik-disabled for details.");
			session.replaceDialog("/image");
			return;
		}
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
		if (results.response !== "Back to Image Menu") {
			if (session.message.source !== "directline") {session.sendTyping();}
			request("https://backend.deviantart.com/rss.xml?type=deviation&q="+results.response, {headers: {"User-Agent": "https://metagon.cf / im@austinhuang.me / Montreal, Canada"}}, function(error, response, body) {
				if (!error && response.statusCode === 200) {
					parseString(body, function (err, result) {
						if (!result.rss.channel[0].item) {
							session.send("No results!");
							session.replaceDialog("/image");
							return;
						}
						var thing = result.rss.channel[0].item[Math.floor(Math.random() * result.rss.channel[0].item.length)];
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
	if (session.message.source !== "directline") {session.sendTyping();}
	if (session.message.text.replace(/( |)\/deviantart/, "") !== "") {
		request("https://backend.deviantart.com/rss.xml?type=deviation&q="+session.message.text.replace(/( |)\/deviantart/, ""), {headers: {"User-Agent": "https://metagon.cf / im@austinhuang.me / Montreal, Canada"}}, function(error, response, body) {
			if (!error && response.statusCode === 200) {
				parseString(body, function (err, result) {
					if (!result.rss.channel[0].item) {
						session.send("No results!");
						session.replaceDialog("/image");
						return;
					}
					var thing = result.rss.channel[0].item[Math.floor(Math.random() * result.rss.channel[0].item.length)];
					session.send({
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
				session.send("Failed to connect to https://backend.deviantart.com/rss.xml");
			}
		});
	}
	else {
		session.send("Missing search query! Correct usage: \"/deviantart (Query)\"");
	}
});

bot.beginDialogAction("ibsearch", "/ibsearch2", { matches: /^( \/|\/|Metagon \/)ibsearch/g});
/*bot.dialog('/ibsearch1',[
	function (session) {
		if (session.message.source === "telegram" && session.message.address.conversation.isGroup) {
			session.send("This Keyboard function is not available on Telegram groups. Please use commands after typing \"Quit\".\n`/ibsearch (Query)`");
			session.replaceDialog("/image");
			return;
		}
		if (session.message.source === "kik") {
			session.send("Function unavailable due to Kik regulations. Visit https://metagon.cf/kik-disabled for details.");
			session.replaceDialog("/image");
			return;
		}
		var msg = new builder.Message(session);
		msg.attachmentLayout(builder.AttachmentLayout.list);
		msg.attachments([
			new builder.HeroCard(session)
			.title("Show NSFW content?")
			.subtitle("Make sure you're legal to do this, because we're not liable for anything you've done!")
			.buttons([
				builder.CardAction.imBack(session, "Yes", "Yes"),
				builder.CardAction.imBack(session, "No", "No")
			])
		]);
		builder.Prompts.confirm(session, msg);
	},
	function (session, results) {
		if (results.response === false) {
			nsfw.push({user: session.message.address.user.id, nsfw: "+rating:s"});
			fs.writeFile("./nsfw.json", JSON.stringify(nsfw), "utf8");
		}
		else if (results.response === true) {
			nsfw.push({user: session.message.address.user.id, nsfw: ""});
			fs.writeFile("./nsfw.json", JSON.stringify(nsfw), "utf8");
		}
		var msg = new builder.Message(session);
		msg.attachmentLayout(builder.AttachmentLayout.list);
		msg.attachments([
			new builder.HeroCard(session)
			.title("You chose "+results.response+" for NSFW visibility. Input a search query.")
			.subtitle("After your input, wait patiently as it takes time to send the image!")
			.buttons([
				builder.CardAction.imBack(session, "Back to Image Menu", "Back to Image Menu")
			])
		]);
		builder.Prompts.text(session, msg);
	},
	function (session, results) {
		if (results.response.endsWith("Back to Image Menu")) {
			
			session.replaceDialog("/image");
			return;
		}
		if (session.message.source !== "directline") {session.sendTyping();}
		request("https://ibsearch.xxx/api/v1/images.json?key="+process.env.ibsearch+"&limit=1&q=random:+"+results.response+nsfw.find(i => {return i.user === session.message.address.user.id;}).nsfw, function(error, response, body) {
			if (!error && response.statusCode === 200) {
				if (body !== "[]") {
					body = JSON.parse(body);
					session.send({
						attachments: [
							{
								contentType: "image/*",
								contentUrl: "https://"+body[0].server+".ibsearch.xxx/"+body[0].path
							}
						]
					});
					session.replaceDialog("/image");
				}
				else {
					session.send("No result. Change your query?");
					session.replaceDialog("/image");
				}
			}
			else {
				session.send("Failed to connect to http://ibsearch.xxx");
				session.replaceDialog("/image");
			}
		});
		nsfw.splice(nsfw.indexOf(nsfw.find(i => {return i.user === session.message.address.user.id;})), 1);
    }
]);*/
bot.dialog('/ibsearch2',[
	function (session) {
		session.send("Due to IbSearch's temporary closure, this command is not available.");
		/*if (session.message.source === "kik") {
			session.send('It seems like you\'re confused. Maybe try typing \"help\". Alternatively, type \"start\" to start the bot up.');
			return;
		}
		if (session.message.source !== "directline") {session.sendTyping();}
		nsfw.push({user: session.message.address.user.id, query: session.message.text.substring(11)});
		fs.writeFile("./nsfw.json", JSON.stringify(nsfw), "utf8");
		if (session.message.source !== "groupme" && session.message.source !== "directline") {
			var msg = new builder.Message(session);
			msg.attachmentLayout(builder.AttachmentLayout.list);
			msg.attachments([
				new builder.HeroCard(session)
				.title("Show NSFW content?")
				.subtitle("Make sure you're legal to do this, because we're not liable for anything you've done!")
				.buttons([
					builder.CardAction.imBack(session, "Yes", "Yes"),
					builder.CardAction.imBack(session, "No", "No")
				])
			]);
			builder.Prompts.confirm(session, msg);
		}
		else {
			builder.Prompts.confirm(session, "Do you want me to show NSFW content? Make sure you're legal to do this, because we're not liable for anything you've done! Type \"yes\" or \"no\".");
		}
	},
	function (session, results) {
		var rating = "";
		if (results.response === false) {rating = "rating:s";}
		request("https://ibsearch.xxx/api/v1/images.json?key="+process.env.ibsearch+"&limit=1&q=random:+"+nsfw.find(i => {return i.user === session.message.address.user.id;}).query+"+"+rating, function(error, response, body) {
			if (!error && response.statusCode === 200) {
				if (body !== "[]") {
					body = JSON.parse(body);
					session.send({
						attachments: [
							{
								contentType: "image/*",
								contentUrl: "https://"+body[0].server+".ibsearch.xxx/"+body[0].path
							}
						]
					});
				}
				else {
					session.send("No result. Change your query? Was "+nsfw.find(i => {return i.user === session.message.address.user.id;}).query);
				}
			}
			else {
				session.send("Failed to connect to http://ibsearch.xxx");
			}
		});
		nsfw.splice(nsfw.indexOf(nsfw.find(i => {return i.user === session.message.address.user.id;})), 1);*/
    }
]);

bot.beginDialogAction("pixiv", "/pixiv2", { matches: /^( \/|\/|Metagon \/)pixiv/g});
bot.dialog('/pixiv1',[
	function (session) {
		if (session.message.source === "telegram" && session.message.address.conversation.isGroup) {
			session.send("This Keyboard function is not available on Telegram groups. Please use commands after typing \"Quit\".\n`/pixiv (Query)`");
			session.replaceDialog("/image");
			return;
		}
		if (session.message.source === "kik") {
			session.send("Function unavailable due to Kik regulations. Visit https://metagon.cf/kik-disabled for details.");
			session.replaceDialog("/image");
			return;
		}
		var msg = new builder.Message(session);
		msg.attachmentLayout(builder.AttachmentLayout.list);
		msg.attachments([
			new builder.HeroCard(session)
			.title("Show NSFW content?")
			.subtitle("Make sure you're legal to do this, because we're not liable for anything you've done!")
			.buttons([
				builder.CardAction.imBack(session, "Yes", "Yes"),
				builder.CardAction.imBack(session, "No", "No")
			])
		]);
		builder.Prompts.confirm(session, msg);
	},
	function (session, results) {
		if (results.response === false) {
			nsfw.push({user: session.message.address.user.id, nsfw: " -R-18 -R-18G"});
			fs.writeFile("./nsfw.json", JSON.stringify(nsfw), "utf8");
		}
		else if (results.response === true) {
			nsfw.push({user: session.message.address.user.id, nsfw: ""});
			fs.writeFile("./nsfw.json", JSON.stringify(nsfw), "utf8");
		}
		var msg = new builder.Message(session);
		msg.attachmentLayout(builder.AttachmentLayout.list);
		msg.attachments([
			new builder.HeroCard(session)
			.title("You chose "+results.response+" for NSFW visibility. Input a search query.")
			.buttons([
				builder.CardAction.imBack(session, "Back to Image Menu", "Back to Image Menu")
			])
		]);
		builder.Prompts.text(session, msg);
	},
	function (session, results) {
		if (results.response.endsWith("Back to Image Menu")) {
			session.replaceDialog("/image");
			return;
		}
		if (session.message.source !== "directline") {session.sendTyping();}
		pixiv.searchIllust(results.response+nsfw.find(i => {return i.user === session.message.address.user.id;}).nsfw, {per_page: 100, mode: "tag"}).then(json => {
			var illust = json.illusts[Math.floor(Math.random() * json.illusts.length)];
			if (illust === undefined) {
				session.send("No results.");
				session.replaceDialog("/image");
			}
			else {
				var url = illust.imageUrls.large;
				if (illust.metaSinglePage) {url = illust.metaSinglePage.originalImageUrl;}
				pixivImg(url).then(output => {
					cloudinary.uploader.upload(output, urls => {
						session.send({
							attachments: [
								{
									contentType: "image/*",
									contentUrl: urls.secure_url
								}
							]
						});
						nsfw.splice(nsfw.indexOf(nsfw.find(i => {return i.user === session.message.address.user.id;})), 1);
						if (illust.is_manga === true) {
							builder.Prompts.choice(session, "\nThis illustration contains "+illust.page_count+" pages. You can choose to...\n\nWARNING: \"View all pages\" will spam your conversation with "+illust.page_count+" images. Use with caution!", "View all pages|Restart a Search|Back to Image Menu", { listStyle: 3 });
							nsfw.push({user: session.message.address.user.id, illust: illust.id});
						}
						else {
							session.replaceDialog("/image");
						}
						fs.writeFile("./nsfw.json", JSON.stringify(nsfw), "utf8");
						fs.unlink(output);
					});
				});
			}
		});
    },
	function (session, results) {
		if (results.response.entity === "Restart a Search") {
			nsfw.splice(nsfw.indexOf(nsfw.find(i => {return i.user === session.message.address.user.id;})), 1);
			session.reset("/pixiv1");
		}
		else if (results.response.entity === "Back to Image Menu") {
			nsfw.splice(nsfw.indexOf(nsfw.find(i => {return i.user === session.message.address.user.id;})), 1);
			session.replaceDialog("/image");
		}
		else if (results.response.entity === "View all pages") {
			session.sendTyping();
			pixiv.illustDetail(nsfw.find(i => {return i.user === session.message.address.user.id;}).illust).then(json => {
				nsfw.splice(nsfw.indexOf(nsfw.find(i => {return i.user === session.message.address.user.id;})), 1);
				fs.writeFile("./nsfw.json", JSON.stringify(nsfw), "utf8");
				var idx = 0;
				function doNext() {
					var p = json.illust.metaPages[idx];
					pixivImg(p.imageUrls.original).then(output => {
						cloudinary.uploader.upload(output, urls => {
							const order = json.illust.metaPages.indexOf(p) + 1;
							session.send({
								text: "Page "+order,
								attachments: [
									{
										contentType: "image/*",
										contentUrl: urls.secure_url
									}
								]
							});
							fs.unlink(output);
						});
					});
					idx++;
					if (idx < json.illust.metaPages.length) {
						setTimeout(doNext, 1000);
					}
					else {
						return;
					}
				}
				doNext()
				setTimeout(function() {session.replaceDialog("/image")}, json.response[0].metadata.pages.length * 1000 + 1000);;
			});
		}
	}
]);
bot.dialog('/pixiv2',[
	function (session) {
		if (session.message.source === "kik") {
			session.send('It seems like you\'re confused. Maybe try typing \"help\". Alternatively, type \"start\" to start the bot up.');
			return;
		}
		else if (session.message.text.replace("/pixiv", "").replace(" ", "") === "") {
			session.send("Missing search query! Correct usage: \"/pixiv (Query)\"")
		}
		else {
			nsfw.push({user: session.message.address.user.id, query: session.message.text.substring(8)});
			fs.writeFile("./nsfw.json", JSON.stringify(nsfw), "utf8");
			if (session.message.source !== "groupme" && session.message.source !== "directline") {
				var msg = new builder.Message(session);
				msg.attachmentLayout(builder.AttachmentLayout.list);
				msg.attachments([
					new builder.HeroCard(session)
					.title("Show NSFW content?")
					.subtitle("Make sure you're legal to do this, because we're not liable for anything you've done!")
					.buttons([
						builder.CardAction.imBack(session, "Yes", "Yes"),
						builder.CardAction.imBack(session, "No", "No")
					])
				]);
				builder.Prompts.confirm(session, msg);
			}
			else {
				builder.Prompts.confirm(session, "Do you want me to show NSFW content? Make sure you're legal to do this, because we're not liable for anything you've done! Type \"yes\" or \"no\".");
			}
		}
	},
	function (session, results) {
		if (session.message.source !== "directline") {session.sendTyping();}
		var rating = "";
		if (results.response === false) {rating = " -R-18 -R-18G";}
		pixiv.searchIllust(nsfw.find(i => {return i.user === session.message.address.user.id;}).query+rating, {per_page: 100, mode: "tag"}).then(json => {
			var illust = json.illusts[Math.floor(Math.random() * json.illusts.length)];
			if (illust === undefined) {
				session.send("No results.");
			}
			else {
				var msg = "";
				if (illust.is_manga === true) {msg += "\nThis is a multiple-page illustration, so only the first page is shown. View the full content at http://www.pixiv.net/member_illust.php?mode=medium&illust_id="+illust.id;}
				var url = illust.imageUrls.large;
				if (illust.metaSinglePage) {url = illust.metaSinglePage.originalImageUrl;}
				pixivImg(url).then(output => {
					cloudinary.uploader.upload(output, urls => {
						session.send({
							text: msg,
							attachments: [
								{
									contentType: "image/*",
									contentUrl: urls.secure_url
								}
							]
						});
						fs.unlink(output);
					});
				});
			}
		});
		nsfw.splice(nsfw.indexOf(nsfw.find(i => {return i.user === session.message.address.user.id;})), 1);
    }
]);

// Utility
bot.beginDialogAction("shorten", "/shorten2", { matches: /^( \/|\/|Metagon \/)shorten/g});
bot.dialog('/shorten1',[
	function (session) {
		if (session.message.source === "telegram" && session.message.address.conversation.isGroup) {
			session.send("This Keyboard function is not available on Telegram groups. Please use commands after typing \"Quit\".\n`/shorten (Url)`");
			session.replaceDialog("/utility");
			return;
		}
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
		if (results.response.endsWith("Back to Utility Menu")) {
			
			session.replaceDialog("/utility");
			return;
		}
		if (results.response.startsWith("<") && results.response.includes("|")) {
			var site = results.response.split("|")[0].replace("<", "");
		}
		else if (results.response.startsWith("<")) {
			var site = results.response.replace("<", "").replace(">", "").replace(";", "");
		}
		else {
			var site = results.response;
		}
		if (!site.startsWith("http")) {
			site = "http://"+results.response;
		}
		request("https://api-ssl.bitly.com/v3/shorten?access_token="+process.env.bitly_token+"&longUrl="+site+"&format=txt", function(error, response, body) {
			if (!error && response.statusCode === 200) {
				session.send("Done! "+body);
				session.replaceDialog("/utility");
			}
			else {
				session.send("An error occured. Invalid address, or retry?");
				session.replaceDialog("/utility");
			}
		});
    }
]);
bot.dialog('/shorten2', function (session) {
	if (session.message.text.replace("/shorten", "").replace(" ", "") === "") {
		session.send("Missing query! /shorten (URL)")
	}
	if (session.message.text.replace("/shorten", "").replace(" ", "").startsWith("<") && session.message.text.replace("/pixiv", "").replace(" ", "").includes("|")) {
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
	request("https://api-ssl.bitly.com/v3/shorten?access_token="+process.env.bitly_token+"&longUrl="+site+"&format=txt", function(error, response, body) {
		if (!error && response.statusCode === 200) {
			session.send("Done! "+body);
		}
		else {
			session.send("An error occured. Invalid address, or retry?\n\n/shorten (URL)");
		}
	});
});

bot.beginDialogAction("expand", "/expand2", { matches: /^( \/|\/|Metagon \/)expand/g});
bot.dialog('/expand1',[
	function (session) {
		if (session.message.source === "telegram" && session.message.address.conversation.isGroup) {
			session.send("This Keyboard function is not available on Telegram groups. Please use commands after typing \"Quit\".\n`/expand (Url)`");
			session.replaceDialog("/utility");
			return;
		}
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
		if (results.response.endsWith("Back to Utility Menu")) {
			
			session.replaceDialog("/utility");
			return;
		}
		if (results.response.startsWith("<") && results.response.includes("|")) {
			var site = results.response.split("|")[0].replace("<", "");
		}
		else if (results.response.startsWith("<")) {
			var site = results.response.replace("<", "").replace(">", "").replace(";", "");
		}
		else {
			var site = results.response;
		}
		if (!site.startsWith("http")) {
			site = "http://"+results.response;
		}
		request("https://api-ssl.bitly.com/v3/expand?access_token="+process.env.bitly_token+"&shortUrl="+site+"&format=txt", function(error, response, body) {
			if (!error && response.statusCode === 200) {
				session.send("Done! "+body);
				session.replaceDialog("/utility");
			}
			else {
				session.send("An error occured. Invalid address, or retry?");
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
	if (!site.startsWith("http")) {
		site = "http://"+session.message.text.replace("/expand", "").replace(" ", "");
	}
	request("https://api-ssl.bitly.com/v3/expand?access_token="+process.env.bitly_token+"&shortUrl="+site+"&format=txt", function(error, response, body) {
		if (!error && response.statusCode === 200) {
			session.send("Done! "+body);
		}
		else {
			session.send("An error occured. Invalid address, or retry?\n\n/expand (Bitly URL)");
		}
	});
});

bot.beginDialogAction("mcuser", "/mcuser2", { matches: /^( \/|\/|Metagon \/)mcuser/g});
bot.dialog('/mcuser1',[
	function (session) {
		if (session.message.source === "telegram" && session.message.address.conversation.isGroup) {
			session.send("This Keyboard function is not available on Telegram groups. Please use commands after typing \"Quit\".\n`/mcuser (Username/UUID)`");
			session.replaceDialog("/utility");
			return;
		}
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
		if (results.response.endsWith("Back to Utility Menu")) {
			session.replaceDialog("/utility");
			return;
		}
		request('http://mcapi.de/api/user/' + results.response, function(error, response, body) {
			if (!error) {
				var mcapi = JSON.parse(body);
				if (mcapi.result.status === "Ok") {
					session.send(mcapi.username+" (UUID: "+mcapi.uuid+")\n* Name history: "+mcapi.history.map(h => h.name).splice(mcapi.history.length - 1, 1).join(", ")+"\n\n== Appearance ==\n* Body: https://crafatar.com/renders/body/"+mcapi.uuid+"\n* Skin: https://crafatar.com/skins/"+mcapi.uuid+"\n* Cape: https://crafatar.com/cape/"+mcapi.uuid);
					request('http://mcapi.de/api/user/'+mcapi.uuid+'/reputation', function(error, response, body) {
						var mcrep = JSON.parse(body);
						if (!body.includes('"services":[]')) {
							session.send("Reputation: "+mcrep.reputation+"/10\n\nRecorded bans:\n\nMCBans: "+mcrep.services.mcbans[0].amount+" / Glizer: "+mcrep.services.glizer[0].amount+" / MCBouncer: "+mcrep.services.mcbouncer[0].amount);
							session.replaceDialog("/utility");
						}
						else {
							
							session.replaceDialog("/utility");
						}
					});
				}
				else if (mcapi.result.status === "The service is currently cooling down and cannot perform any requests. Please try it later again.") {
					session.send("The user should be cracked (Not registered with Mojang). Or the Mojang server broke. Who knows.");
					session.replaceDialog("/utility");
				}
				else {
					session.send("An error occurred.");
					session.replaceDialog("/utility");
				}
			}
			else {
				session.send("An error occurred.");
				session.replaceDialog("/utility");
			}
		});
    }
]);
bot.dialog('/mcuser2', function (session) {
	if (session.message.text.replace("/mcuser", "").replace(" ", "") === "") {
		session.send("Missing search query! /mcuser (Username or UUID)");
		return;
	}
	request('http://mcapi.de/api/user/' + session.message.text.replace("/mcuser", "").replace(" ", ""), function(error, response, body) {
		if (!error) {
			var mcapi = JSON.parse(body);
			if (mcapi.result.status === "Ok") {
				request('http://mcapi.de/api/user/'+mcapi.uuid+'/reputation', function(error, response, body) {
					var mcrep = JSON.parse(body);
					session.send(mcapi.username+" (UUID: "+mcapi.uuid+")\n* Name history: "+mcapi.history.map(h => h.name).splice(mcapi.history.length - 1, 1).join(", ")+"\n\n== Appearance ==\n* Body: https://crafatar.com/renders/body/"+mcapi.uuid+"\n* Skin: https://crafatar.com/skins/"+mcapi.uuid+"\n* Cape: https://crafatar.com/cape/"+mcapi.uuid);
					request('http://mcapi.de/api/user/'+mcapi.uuid+'/reputation', function(error, response, body) {
						var mcrep = JSON.parse(body);
						if (!body.includes('"services":[]')) {
							session.send("Reputation: "+mcrep.reputation+"/10\n\nRecorded bans:\n\nMCBans: "+mcrep.services.mcbans[0].amount+" / Glizer: "+mcrep.services.glizer[0].amount+" / MCBouncer: "+mcrep.services.mcbouncer[0].amount);
						}
					});
				});
			}
			else if (mcapi.result.status === "The service is currently cooling down and cannot perform any requests. Please try it later again.") {
				session.send("The user should be cracked (Not registered with Mojang). Or the Mojang server broke. Who knows.");
			}
			else {
				session.send("An error occurred.");
			}
		}
		else {
			session.send("An error occurred.");
		}
	});
});

bot.beginDialogAction("mcserver", "/mcserver2", { matches: /^( \/|\/|Metagon \/)mcserver/g});
bot.dialog('/mcserver1',[
	function (session) {
		if (session.message.source === "telegram" && session.message.address.conversation.isGroup) {
			session.send("This Keyboard function is not available on Telegram groups. Please use commands after typing \"Quit\".\n`/mcserver (Address)`");
			session.replaceDialog("/utility");
			return;
		}
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
		if (results.response.endsWith("Back to Utility Menu")) {
			session.replaceDialog("/utility");
			return;
		}
		var ip = {};
		if (results.response.split(":")[1] === undefined) {
			ip = {ip: results.response};
		}
		else {
			ip = {ip: results.response.split(":")[0], port: results.response.split(":")[1]};
		}
		request.post('https://mcapi.de/api/server/', {json: ip}, function(error, response, body) {
			if (!error) {
				if (body.result.status === "success") {
					session.send({
						text: results.response+" ("+body.hostname+")\n* Players: "+body.players.online+"/"+body.players.max+"\n* Blocked by Mojang: "+body.blocked.status+"\n* Software: "+body.software.name+", MC Version "+body.software.version+"\n* Ping: "+body.list.ping+"ms",
						attachments: [
							{
								contentType: "image/*",
								contentUrl: "https://api.minetools.eu/favicon/"+results.response.replace(":", "/")
							}
						]
					});
					session.replaceDialog("/utility");
				}
				else {
					session.send('Your input is invalid, or the server you requested is offline, or maybe you just need a retry.\nYour input is '+results.response);
					session.replaceDialog("/utility");
				}
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
	var ip = {};
	if (session.message.text.replace("/mcserver", "").replace(" ", "").split(":")[1] === undefined) {
		ip.ip = session.message.text.replace("/mcserver", "").replace(" ", "");
	}
	else {
		ip.ip = session.message.text.replace("/mcserver", "").replace(" ", "").split(":")[0];
		ip.port = session.message.text.replace("/mcserver", "").replace(" ", "").split(":")[1];
	}
	request.post('https://mcapi.de/api/server/', {json: ip}, function(error, response, body) {
		if (!error) {
			if (body.result.status === "success") {
				session.send({
					text: session.message.text.substring(10)+" ("+body.hostname+")\n* Players: "+body.players.online+"/"+body.players.max+"\n* Blocked by Mojang: "+body.blocked.status+"\n* Software: "+body.software.name+", MC Version "+body.software.version+"\n* Ping: "+body.list.ping+"ms",
					attachments: [
						{
							contentType: "image/*",
							contentUrl: "https://api.minetools.eu/favicon/"+session.message.text.substring(10).replace(" ", "").replace(":", "/")
						}
					]
				});
			}
			else {
				session.send('Your input is invalid, or the server you requested is offline, or maybe you just need a retry.\nYour input is '+session.message.text.substring(10));
			}
		}
		else {
			session.send("An error occurred.");
		}
	});
});

bot.beginDialogAction("paste", "/paste2", { matches: /^( \/|\/|Metagon \/)paste/g});
bot.dialog('/paste1',[
	function (session) {
		if (session.message.source === "telegram" && session.message.address.conversation.isGroup) {
			session.send("This Keyboard function is not available on Telegram groups. Please use commands after typing \"Quit\".\n`/paste (content)`");
			session.replaceDialog("/utility");
			return;
		}
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
		if (results.response.endsWith("Back to Utility Menu")) {
			session.replaceDialog("/utility");
			return;
		}
		request.post('https://pastebin.com/api/api_post.php', {form: {api_dev_key: process.env.pastebin, api_option: "paste", api_paste_code: results.response}}, function(error, response, body) {
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
bot.dialog('/paste2', function (session) {
	if (session.message.text.replace("/mcserver", "").replace(" ", "") === "") {
		session.send("Nothing to paste! /paste (Stuff)");
		return;
	}
	request.post('https://pastebin.com/api/api_post.php', {form: {api_dev_key: process.env.pastebin, api_option: "paste", api_paste_code: session.message.text.substring(7).replace(" ", "")}}, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			session.send("Done! "+body);
		}
		else {
			session.send("An error occurred.");
		}
	});
});

bot.beginDialogAction("weather", "/weather2", { matches: /^( \/|\/|Metagon \/)weather/g});
bot.dialog('/weather1',[
	function (session) {
		if (session.message.source === "telegram" && session.message.address.conversation.isGroup) {
			session.send("This Keyboard function is not available on Telegram groups. Please use commands after typing \"Quit\".\n`/paste (content)`");
			session.replaceDialog("/utility");
			return;
		}
		var msg = new builder.Message(session);
		msg.attachmentLayout(builder.AttachmentLayout.list);
		msg.attachments([
			new builder.HeroCard(session)
			.title("Type the name of the city you'd like to check the weather for.")
			.buttons([
				builder.CardAction.imBack(session, "Back to Utility Menu", "Back to Utility Menu")
			])
		]);
		builder.Prompts.text(session, msg);
	},
	function (session, results) {
		if (results.response.endsWith("Back to Utility Menu")) {
			session.replaceDialog("/utility");
			return;
		}
		request('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22'+results.response+'%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', {json: true}, function(error, response, body) {
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
});

// Fun
bot.beginDialogAction("ud", "/ud2", { matches: /^( \/|\/|Metagon \/)ud/g});
bot.dialog('/ud1',[
	function (session) {
		if (session.message.source === "telegram" && session.message.address.conversation.isGroup) {
			session.send("This Keyboard function is not available on Telegram groups. Please use commands after typing \"Quit\".\n`/paste (content)`");
			session.replaceDialog("/utility");
			return;
		}
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
		if (results.response.endsWith("Back to Fun Menu")) {
			
			session.replaceDialog("/fun");
			return;
		}
		request('http://api.urbandictionary.com/v0/define?term='+results.response, {json: true}, function(error, response, body) {
			if (!error && response.statusCode === 200 && body.list.length !== 0) {
				session.send("Top UD result for "+results.response+"\n\n== Definition ==\n\n"+body.list[0].definition+"\n\n == Example ==\n\n"+body.list[0].example+"\n\n* "+body.list[0].thumbs_up+"\uD83D\uDC4D / "+body.list[0].thumbs_down+"\uD83D\uDC4E");
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
			session.send("No results!");
		}
		else {
			session.endDialog("An error occurred.");
		}
	});
});

bot.beginDialogAction("joke", "/joke", { matches: /^( \/|\/|Metagon \/)joke/g});
bot.dialog('/joke', function (session) {
	if (session.message.source === "kik") {
		request('http://api.icndb.com/jokes/random?escape=javascript?exclude=[explicit]', function(error, response, body) {
			if (!error && response.statusCode === 200 && session.message.text === "/joke") {
				body = JSON.parse(body);
				session.send(body.value.joke);
			}
			else if (!error && response.statusCode === 200) {
				body = JSON.parse(body);
				session.send(body.value.joke);
				session.replaceDialog("/fun");
			}
			else {
				session.send("ERROR! I could not connect to http://api.icndb.com/jokes/random. Please retry. If the problem persists, leave an issue at http://metagon.cf");
			}
		});
	}
	else {
		request('http://api.icndb.com/jokes/random?escape=javascript', function(error, response, body) {
			if (!error && response.statusCode === 200 && session.message.text === "/joke") {
				body = JSON.parse(body);
				session.send(body.value.joke);
			}
			else if (!error && response.statusCode === 200) {
				body = JSON.parse(body);
				session.send(body.value.joke);
				session.replaceDialog("/fun");
			}
			else {
				session.send("ERROR! I could not connect to http://api.icndb.com/jokes/random. Please retry. If the problem persists, leave an issue at http://metagon.cf");
			}
		});
	}
});

bot.beginDialogAction("yoda", "/yoda", { matches: /^( \/|\/|Metagon \/)yoda/g});
bot.dialog('/yoda', function (session) {
		if (session.message.text === "/yoda") {
			session.send(yoda_said[Math.floor(Math.random() * yoda_said.length)]);
		}
		else {
			session.send(yoda_said[Math.floor(Math.random() * yoda_said.length)]);
			session.replaceDialog("/fun");
		}
});

bot.beginDialogAction("design", "/design", { matches: /^( \/|\/|Metagon \/)design/g});
bot.dialog('/design', function (session) {
	request('http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1', function(error, response, body) {
		if (!error && response.statusCode === 200 && session.message.text === "/design") {
			body = JSON.parse(body);
			session.send(body[0].content.replace("<p>", "").replace("</p>", "")+"\n\n--- "+body[0].title);
		}
		else if (!error && response.statusCode === 200) {
			body = JSON.parse(body);
			session.send(body[0].content.replace("<p>", "").replace("</p>", "")+"\n\n--- "+body[0].title);
			session.replaceDialog("/fun");
		}
		else {
			session.endDialog("ERROR! I could not connect to http://quotesondesign.com/wp-json/posts. Please retry. If the problem persists, leave an issue at http://metagon.cf");
		}
	});
});

bot.beginDialogAction("9gag", "/9gag2", { matches: /^( \/|\/|Metagon \/)9gag/g});
bot.dialog('/9gag1',[
	function (session) {
		if (session.message.source === "telegram" && session.message.address.conversation.isGroup) {
			session.send("This Keyboard function is not available on Telegram groups. Please use commands after typing \"Quit\".\n`/9gag (Section) (Hot/Fresh)` or `/9gag search (Query)`");
			session.replaceDialog("/utility");
			return;
		}
		builder.Prompts.choice(session, "Select a section to visit, or \"Search\" to search for posts.\n\n* \"got\" = Game of Thrones\n* \"imadedis\" = I made dis\n* \"pcmr\" = PC Master Race", "Search|"+gagbrds.join("|")+"|Back to Fun Menu", { listStyle: 3 });
	},
	function (session, results) {
		if (results.response.entity.endsWith("Back to Fun Menu")) {
			session.replaceDialog("/fun");
		}
		else if (results.response.entity.endsWith("nsfw") && session.message.source === "kik") {
			session.send("Function unavailable due to Kik regulations. Visit https://metagon.cf/kik-disabled for details.");
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
			request("https://9gag.com/search?query="+results.response, function(err, response, body) {
				var res = JSON.parse(body.split("GAG.App.loadConfigs(")[1].split(").loadAsynScripts(['facebook', 'twitter', 'gplus', 'recaptcha']);")[0]).data;
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
				var res = JSON.parse(body.split("GAG.App.loadConfigs(")[1].split(").loadAsynScripts(['facebook', 'twitter', 'gplus', 'recaptcha']);")[0]).data;
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
				var res = JSON.parse(body.split("GAG.App.loadConfigs(")[1].split(").loadAsynScripts(['facebook', 'twitter', 'gplus', 'recaptcha']);")[0]).data;
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
		else if (results.response.endsWith("Back to Fun Menu")) {
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
			session.send("Function unavailable due to Kik regulations. Visit https://metagon.cf/kik-disabled for details.");
			return;
		}
		request("https://9gag.com/"+args[0]+"/"+args[1], function(err, response, body) {
			var res = JSON.parse(body.split("GAG.App.loadConfigs(")[1].split(").loadAsynScripts(['facebook', 'twitter', 'gplus', 'recaptcha']);")[0]).data;
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
	else if (args[0] === "search" && args[1] !== undefined) {
		request("https://9gag.com/search?query="+args[1], function(err, response, body) {
			var res = JSON.parse(body.split("GAG.App.loadConfigs(")[1].split(").loadAsynScripts(['facebook', 'twitter', 'gplus', 'recaptcha']);")[0]).data;
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
	else {
		session.send("Invalid arguments!\n* /9gag (section) (hot/fresh)\n* /9gag search (Query)");
	}
});

// General Guidance
bot.beginDialogAction("unstuck", "/unstuck", { matches: /^unstuck!!!/g});
bot.dialog('/unstuck', function (session) {
	session.endConversation("Your session data should be cleared. You can now safely re`start` the bot. That means:\n* If you typed something wrong in the last step and I started to hate you, your sin has been forgiven.\n* If you found a bug but can't get out after I was fixed, sorry for the inconvenience.");
	session.clearDialogStack();
});
bot.dialog('/', function (session) {
	if (session.message.source !== "directline" && session.message.source !== "slack") {
		session.endDialog('It seems like you\'re confused. Maybe try typing \"help\". Alternatively, type \"start\" to start the bot up.');
	}
	else if (session.message.source === "slack" && !message.address.conversation.isGroup) {
		session.endDialog('It seems like you\'re confused. Maybe try typing \"help\". Alternatively, type \"start\" to start the bot up.');		
	}
	else {
		session.endDialog();
	}
});

// Setup Restify Server
var server = express();
server.post('/api/messages', connector.listen());
/*server.post('/viber', viberChannel.listen());*/
server.post('/linebot', lineConnector.listen());
server.listen(process.env.PORT || 5000, function () {
    console.log('%s listening to %s', server.name, server.url); 
});
