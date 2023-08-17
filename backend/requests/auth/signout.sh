token=`cat requests/_temp/access_token`
curl -X  POST -s http://localhost:8080/auth/signout \
  -H "Authorization: Bearer $token" \
  -c requests/_temp/cookies -b requests/_temp/cookies | jq
echo "" > "requests/_temp/access_token"
