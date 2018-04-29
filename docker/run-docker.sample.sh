docker run -e "DB_NAME=db01" \
    -e "ENVIRONMENT_NAME=Debug" \
    -e "DB_PASSWORD=some_password" \
    -e "DB_PORT=1234" \
    -e "DB_URL=mongodb.baseurl" \
    -e "DB_USERNAME=user01" \
    --net=bridge \
    -p 3000:3000 \
    -d boilerplate-node-ts