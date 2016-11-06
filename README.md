# Metagon on Telegram
[![Add me!](https://img.shields.io/badge/telegram-%40metagon__bot-0088cc.svg)](http://telegram.me/metagon_bot) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/d481eda7342f4258a99cf30122acbc90)](https://www.codacy.com/app/austinhuang0131/metagon-telegram?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=austinhuang0131/metagon-telegram&amp;utm_campaign=Badge_Grade) [![Build Status](https://travis-ci.org/austinhuang0131/metagon-telegram.svg?branch=master)](https://travis-ci.org/austinhuang0131/metagon-telegram) [![Gitter](https://img.shields.io/gitter/room/Metagon/Telegram.svg)](https://gitter.im/metagon-bot/Telegram?utm_source=share-link&utm_medium=link&utm_campaign=share-link)

An official fork of [Metagon, the Discord bot](http://metagon.tk).

## License
```diff
  The 0131 License
+ Basic usage and hosting the code is allowed.
+ Any necessary changes are allowed.
- Publishing the application based on the original or modified code (In this case, making your Metagon-based bot public) is not allowed without direct permission from the original author.
+ Give me credit.
```

## Documentation
[Here](https://github.com/austinhuang0131/metagon-telegram/wiki).

## How to run it?
1. Node.js v7.0.0 or higher
2. Clone it, then terminal: `npm install`
3. Go to setup.json and input necessary values.
  * [Get a Telegram bot token](https://core.telegram.org/bots#3-how-do-i-create-a-bot) (By the way, you can actually see a token in the setup.json here because I need an example token to make my Travis CI work. That token is linked to my testbot that no one uses.)
  * [Get a bitly token](https://bitly.com/a/oauth_apps)
  * Put your user ID on Myid in the json file. Find out your ID by asking [@userinfobot](https://telegram.me/userinfobot) `/start`.
5. Terminal: `npm start`
