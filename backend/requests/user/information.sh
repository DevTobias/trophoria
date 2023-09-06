BASE_URL=`jq -r .base_url requests/config.json`
TOKEN=`cat requests/_temp/access_token`

curl -X GET -s "${BASE_URL}/user" \
  -H "Authorization: Bearer $TOKEN" \
  -c requests/_temp/cookies -b requests/_temp/cookies | jq
