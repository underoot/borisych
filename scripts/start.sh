#!/bin/bash
#
# This script bind TCP-listener to port equal environment
# variable for success start Heroku dyno. Also this script
# make periodic requests to host for prevent dyno from moving
# to idle state.
#
# Author: Alex Shoronov <alexshoronov@gmail.com>

BORISYCH_SERVER_TEXT="У нас все можно"
HEROKU_HOST='borisych.herokuapp.com'
REQUEST_INTERVAL=1200000

if [ -n $PORT ]; then
	node -e "\
		var http = require('http');\
		setInterval(() => {\
			http.request({ host: '${HEROKU_HOST}' });\
		}, ${REQUEST_INTERVAL});\
		http.createServer((req, res) => {\
			res.end('${BORISYCH_SERVER_TEXT}');\
		})\
		.listen(process.env.PORT);\
	" &
	node index;
else
	node index
fi
