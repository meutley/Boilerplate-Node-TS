# Variables
PSID=$(./docker/get-container-id.sh)

if [ "$1" = "" ]; then
    # Dump logs normally (no file redirect)
    docker logs $PSID
else
    # Dump logs to file
    docker logs $PSID > $1
    echo "Docker container logs (id $PSID) dumped to: $1"
fi