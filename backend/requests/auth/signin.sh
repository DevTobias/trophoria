BASE_URL=`jq -r .base_url requests/config.json`

json=$( curl -X POST -s "${BASE_URL}/auth/signin" \
  -H "Content-type: application/json" \
  -d "{ \"identifier\": \"$1@trophoria.de\", \"password\": \"$1\" }" \
  -c requests/_temp/cookies -b requests/_temp/cookies )

echo `echo $json | jq -r ".accessToken"` > "requests/_temp/access_token" && echo $json | jq

