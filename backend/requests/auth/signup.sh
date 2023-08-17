RAND_ID=`openssl rand -hex 5`
curl -X POST -s http://localhost:8080/auth/signup \
  -H "Content-type: application/json" \
  -d "{ \"email\": \"$RAND_ID@trophoria.de\", \"username\": \"$RAND_ID\", \"password\": \"$RAND_ID\" }"  | jq
