token=`cat requests/_temp/access_token`
curl -X GET -s http://localhost:8080/user \
  -H "Authorization: Bearer $token" \
  -c requests/_temp/cookies -b requests/_temp/cookies | jq
