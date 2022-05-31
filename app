#!/bin/bash

USERNAME=${USER}
GROUP_ID=$(id -g $USER)
USER_ID=$(id -u $USER)
WORKING_DIR=/app
IMAGE_TAG=${USERNAME}-place-ui

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
  docker build -f ${PWD}/.docker/node/dev.Dockerfile -t ${IMAGE_TAG} ${PWD}
}

# Allows user to execute npm scripts inside the PlacesUI docker image
npm() {
  # If the image does not already exist, build it
  if [[ "$(docker images -q ${IMAGE_TAG} 2>/dev/null)" == "" ]]; then
    docker_build
  fi

  # Capture the arguments passed by the user
  args="${@}"

  docker run -it --rm -v "${PWD}:${WORKING_DIR}" -w ${WORKING_DIR} ${IMAGE_TAG} \
    sh -c "${COMMON_SCRIPT} \
    -c 'npm ${args}'"
}

start() {
  # If the image does not already exist, build it
  if [[ "$(docker images -q ${IMAGE_TAG} 2>/dev/null)" == "" ]]; then
    docker_build
  fi

  docker run -it --rm -p 3000:3000 -v "${PWD}:${WORKING_DIR}" -w ${WORKING_DIR} ${IMAGE_TAG} \
    sh -c "${COMMON_SCRIPT} \
    -c 'npm start'"
}

shell() {
    # If the image does not already exist, build it
  if [[ "$(docker images -q ${IMAGE_TAG} 2>/dev/null)" == "" ]]; then
    docker_build
  fi

  # Capture the arguments passed by the user
  args="${@}"

  docker run -it --rm -v "${PWD}:${WORKING_DIR}" -w ${WORKING_DIR} ${IMAGE_TAG} \
    sh -c "${COMMON_SCRIPT}"
}

# main function

case $1 in
  "docker")
    case $2 in
      "build")
        docker_build
        ;;
      *)
        exit 1
        ;;
      esac
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
  *)
    shell
    ;;
  esac
