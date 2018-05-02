# Variables
PSID=$(./docker/get-container-id.sh)

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
