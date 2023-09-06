BASE_URL=`jq -r .base_url requests/config.json`
TOKEN=`cat requests/_temp/access_token`

curl -X  POST -s "${BASE_URL}/auth/signout" \
  -H "Authorization: Bearer $TOKEN" \
  -c requests/_temp/cookies -b requests/_temp/cookies | jq

echo "" > "requests/_temp/access_token"
