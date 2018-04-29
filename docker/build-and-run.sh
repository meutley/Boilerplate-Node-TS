# Variables
PSIDPATTERN='^([0-9a-z]*)(?=        boilerplate-node-ts)'
PSIDCMD=`docker ps | grep -oP "$PSIDPATTERN"`
PSID=`echo $PSIDCMD`

# Stop the container if it is running
if [ "$PSID" != "" ]; then
    echo Stopping Docker Container: $PSID...
    docker stop $PSID
fi

# (Re)Build the container
echo
echo Building Docker Container...
echo
./docker/build-container.sh

# Start the container
echo
echo Starting Docker Container...
echo
./docker/run-docker.sh
