#!/bin/sh

start() {
    echo -n "Starting program"
    export NODE_ENV=production;
    export NEW_RELIC_HOME="newrelic/$NODE_ENV";
    node server.js name=S1
    echo $! > veritone-connect.pid
    return 0
}

startBackground() {
    echo -n "Starting background program"
    mkdir -p logs
    export NODE_ENV=production;
    export NEW_RELIC_HOME="newrelic/$NODE_ENV";
    node --max-old-space-size=2000 server.js name=S1 > /dev/null 2>&1 &
    echo $! > react-client.pid
    return 0
}


stop() {
    echo -n " Stopping program"
    # killproc -p "react-client.pid"
    kill -9 $(<"react-client.pid")
    return 0
}

nodemon() {
	echo -n "Starting program"
	NODE_ENV=production /usr/production/bin/nodemon server.js
    echo $! > react-client.pid
    return 0
}
# See how we were called.
case "$1" in
    start)
        start
        ;;
    start-background)
        startBackground
        ;;
    stop)
        stop
        ;;
    restart)
        stop
        start
        ;;
    nodemon)
        nodemon
        ;;
  *)
        echo $"Usage: $PROG {start|stop|start-background|restart|condrestart|status|nodemon}"
        exit 1
esac
exit 0
