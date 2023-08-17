json=$( curl -X POST -s http://localhost:8080/auth/refresh \
  -c requests/_temp/cookies -b requests/_temp/cookies )

token=$( echo $json | jq -r ".accessToken" )
echo $token > "requests/_temp/access_token"
echo $json | jq
