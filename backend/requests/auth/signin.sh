json=$( curl -X POST -s http://localhost:8080/auth/signin \
  -H "Content-type: application/json" \
  -d "{ \"identifier\": \"$1@trophoria.de\", \"password\": \"$1\" }" \
  -c requests/_temp/cookies -b requests/_temp/cookies )

token=$( echo $json | jq -r ".accessToken" )
echo $token > "requests/_temp/access_token"
echo $json | jq
