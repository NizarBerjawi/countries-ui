#!/bin/bash

APP_NAME=places-ui
DEFAULT_APP_PORT=3000
DEFAULT_HOST_PORT=3000
USERNAME=${USER}
GROUP_ID=$(id -g $USER)
USER_ID=$(id -u $USER)
GIT_USER=$(git config --local user.name)
GIT_EMAIL=$(git config --local user.email)
IMAGE_TAG=${USERNAME}-${APP_NAME}
WORKING_DIR=/${APP_NAME}

# Builds a docker image for the PlacesUI application
docker_build() {
  docker build \
    --file ${PWD}/.docker/node/dev.Dockerfile \
    --build-arg USER=${USERNAME} \
    --build-arg GID=${GROUP_ID} \
    --build-arg UID=${USER_ID} \
    --tag ${IMAGE_TAG} \
    ${PWD}
}

# Checks if a the docker image exists
docker_check_image() {
  if [[ "$(docker images -q ${IMAGE_TAG} 2>/dev/null)" == "" ]]; then
    docker_build
  fi
}

check_env_file() {
  if [ ! -f "${PWD}/.env" ]; then
    echo "Generating .env file..."

    cp ./.env.example ./.env

    while true; do

    IFS= read -r -p "Would you like to set environment variable now? (yes/no) " yn

    case $yn in 
      y|Y|Yes|yes)
        vi ./.env
        source ./.env

        break;;     
      n|N|No|no)
        break;;
      *)
    esac
    
    done
  fi
}

check_node_modules() {
  # If we can't find a node_modules folder, we install
  # our npm packages from scratch
  if [ ! -d "${PWD}/node_modules" ]; then
    echo "\"node_modules\" not found, installing..."
    ./app npm install
  fi
}

check_port() {
  IFS= read -r -p "Please specify a PORT to run the application on: (3000) " port
}

# Run npm commands inside the development container
npm() {
  docker_check_image

  docker run \
    --interactive \
    --tty \
    --rm \
    --volume "${PWD}:${WORKING_DIR}" \
    --workdir ${WORKING_DIR} \
    ${IMAGE_TAG} \
    npm "${@}"
}

# Run git commands inside the development container
git() {
  docker_check_image
  
  if [[ -z "$GIT_USER" ]]; then
    IFS= read -r -p "Please enter a git username: " username
  fi

  if [[ -z "$GIT_EMAIL" ]]; then
    IFS= read -r -p "Please enter a git user email: " email
  fi

  GIT_SCRIPT="git config --local user.name '${username:-$GIT_USER}' \
      && git config --local user.email '${email:-$GIT_EMAIL}'"

  args="${@}"

  docker run \
    --interactive \
    --tty \
    --rm \
    --volume "${PWD}:${WORKING_DIR}" \
    --workdir ${WORKING_DIR} \
    ${IMAGE_TAG} \
    sh -c "${GIT_SCRIPT} && git ${args}"
}

# Start the app
start() {
  docker_check_image

  check_env_file

  check_node_modules

  check_port

  docker run \
    --interactive \
    --tty \
    --rm \
    --publish ${port:-$DEFAULT_HOST_PORT}:${DEFAULT_APP_PORT} \
    --volume "${PWD}:${WORKING_DIR}" \
    --workdir ${WORKING_DIR} \
    ${IMAGE_TAG} \
    npm start
}

shell() {
  docker_check_image

  docker run \
    --interactive \
    --tty \
    --rm \
    --volume "${PWD}:${WORKING_DIR}" \
    --workdir ${WORKING_DIR} \
    ${IMAGE_TAG} \
    sh
}

lint() {
  docker_check_image

  docker run \
    --rm \
    --volume "${PWD}:${WORKING_DIR}" \
    --workdir ${WORKING_DIR} \
    ${IMAGE_TAG} \
    npm run lint
}

prettify() {
  docker_check_image

  docker run \
    --rm \
    --volume "${PWD}:${WORKING_DIR}" \
    --workdir ${WORKING_DIR} \
    ${IMAGE_TAG} \
    npm run prettify
}

case $1 in
  "start")
    start
    ;;
  "npm")
    case $2 in
      "start")
        start
        ;;
      *)
        # We remove the first 'npm' argument from the list
        shift

        npm $@
        ;;
      esac
      ;;
  "git")
    case $2 in
    *)
      shift
      git $@
      ;;
    esac
    ;;
  "lint")
    lint
    ;;
  "prettify")
    prettify
    ;;
  *)
    shell $@
    ;;
  esac
