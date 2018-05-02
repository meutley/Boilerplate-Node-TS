PSIDPATTERN='^([0-9a-z]*)(?=        boilerplate-node-ts)'
PSIDCMD=`docker ps | grep -oP "$PSIDPATTERN"`
echo $PSIDCMD