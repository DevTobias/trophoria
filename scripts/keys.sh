openssl genpkey -algorithm RSA -out private.pem -pkeyopt rsa_keygen_bits:2048
openssl rsa -pubout -in private.pem -out public_key.pem
openssl pkcs8 -topk8 -in private.pem -nocrypt -out private_key.pem
rm private.pem
