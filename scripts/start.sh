#!/bin/bash
#
# This script bind TCP-listener to port equal environment
# variable for success start Heroku dyno.
#
# Author: Alex Shoronov <alexshoronov@gmail.com>

BORISYCH_SERVER_TEXT="У нас все можно"

if [ -n $PORT ]; then
	node -e "\
		require('http')\
		.createServer((req, res) => {\
			res.end('${BORISYCH_SERVER_TEXT}');\
		})\
		.listen(process.env.PORT);\
	" &
	node index;
else
	node index
fi
