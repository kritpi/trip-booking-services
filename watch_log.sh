#!/bin/bash

# Counter to track how many times the server has been restarted
RESTART_COUNT=0

# Function to start the server and log output
start_server() {
  RESTART_COUNT=$((RESTART_COUNT+1))

  # Create a new log file for each restart with a unique name
  LOG_FILE="server_restart.log"

  echo "Starting server, writing logs to $LOG_FILE"

  # Clear the log file if it already exists
  > $LOG_FILE

  # Start the server and save the full output to the log file
  pnpm dev 2>&1 | tee $LOG_FILE | grep '^prisma:query' >> $LOG_FILE
}

# Trap and handle server termination (e.g., via Ctrl+C)
trap "echo 'Server stopped. Restarting...'; start_server" SIGINT

# Start the server initially
start_server

# Watch for changes to restart the server (optional: modify this if you want auto-restarts)
while true; do
  inotifywait -e modify,create,delete -r ./  # Optional: Replace ./ with your project directory
  echo "Changes detected, restarting server..."
  pkill -SIGINT node  # Kill the running node process to trigger restart
done
