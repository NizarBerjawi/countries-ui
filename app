#!/bin/bash

APP_NAME=places-ui
APP_PORT=3000
HOST_PORT=3000
USERNAME=${USER}
GROUP_ID=$(id -g $USER)
USER_ID=$(id -u $USER)
GIT_USER=$(git config --local user.name)
GIT_EMAIL=$(git config --local user.email)
IMAGE_TAG=${USERNAME}-${APP_NAME}
WORKING_DIR=/${APP_NAME}


COMMON_SCRIPT="deluser --remove-home node \
    && addgroup \
      --gid ${GROUP_ID} ${USERNAME} \
    && adduser \
      --uid ${USER_ID} \
      --ingroup ${USERNAME} \
      --gecos ${USERNAME} \
      --shell /bin/sh \
      --disabled-password ${USERNAME} \
    && su ${USERNAME}"

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
    IFS= read -r -p "Please enter a git username:" username
  else
    username=$GIT_USER
  fi

  if [[ -z "$GIT_EMAIL" ]]; then
    IFS= read -r -p "Please enter a git user email:" email
  else
    email=$GIT_EMAIL
  fi

  args="${@}"

  docker run \
    --interactive \
    --tty \
    --rm \
    --volume "${PWD}:${WORKING_DIR}" \
    --workdir ${WORKING_DIR} \
    ${IMAGE_TAG} \
    sh -c "git config --local user.name '$username' \
      && git config --local user.email '$email' \
      && git ${args}"
}

# Start the app
start() {
  docker_check_image

  if [ ! -f "${PWD}/.env" ]; then
    echo "Environment variables file not found."
    exit 1;
  fi

  if [ ! -d "${PWD}/node_modules" ]; then
    ./app npm install
  fi

  docker run \
    --interactive \
    --tty \
    --rm \
    --publish ${HOST_PORT}:${APP_PORT} \
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

case $1 in
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
  *)
    shell $@
    ;;
  esac
