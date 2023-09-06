BASE_URL=`jq -r .base_url requests/config.json`
RAND_ID=`openssl rand -hex 5`

json=$( curl -X POST -s "${BASE_URL}/auth/signup" \
  -H "Content-type: application/json" \
  -d "{ \"email\": \"$RAND_ID@trophoria.de\", \"username\": \"$RAND_ID\", \"password\": \"$RAND_ID\" }" \
  -c requests/_temp/cookies -b requests/_temp/cookies )

echo `echo $json | jq -r ".accessToken"` > "requests/_temp/access_token" && echo $json | jq
