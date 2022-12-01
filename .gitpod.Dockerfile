FROM gitpod/workspace-full:latest

# Using NODE v18
RUN bash -c 'VERSION="18.12.0" \
    && source $HOME/.nvm/nvm.sh && nvm install $VERSION \
    && nvm use $VERSION && nvm alias default $VERSION'

RUN echo "nvm use default &>/dev/null" >> ~/.bashrc.d/51-nvm-fix