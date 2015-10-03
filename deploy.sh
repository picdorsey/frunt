#!/usr/bin/env bash
# Codeship Deployment Script
# Piccirilli Dorsey

# CODESHIP DEPLOY SCRIPT
# ### Codeship Environment Variables ###
# ### PROD_DEPLOY_PATH  (production path on server)
# ### DEV_DEPLOY_PATH   (development path on server)
# ### USERNAME          (username to login)
# ### HOST              (ip or hostname)
# ### PORT              (ssh port number)

DEPLOY_PATH=$DEV_DEPLOY_PATH

if [ "$CI_BRANCH" == "master" ]
then
    DEPLOY_PATH=$PROD_DEPLOY_PATH
fi

# Vars
date=`date +%Y-%m-%d:%H:%M:%S`
release="$DEPLOY_PATH/releases/$date"
echo "$release"

# Create directory
echo "Creating Directory"
ssh $USERNAME@$HOST -p $PORT mkdir -p "$release"

# Rsync changes
echo "Rsync Changes"
rsync -vzcrSLh -e "ssh -p $PORT" --exclude="deploy.sh" --exclude="node_modules" --exclude="/src" --exclude=".git*" \
    ./ $USERNAME@$HOST:"$release"

# Symlink
echo "No Downtime deployment"
ssh $USERNAME@$HOST -p $PORT /bin/bash << EOF
    cd $release
    ln -nfs "$release" "$DEPLOY_PATH/current"

    ## Laravel Stuff ##
    # Environment File
    # ln -nfs ../../.env .env;

    # Storage
    #rm -r $release/storage;
    #ln -nfs ../../storage storage;

    ## End Laravel Stuff ##

    # Clean up old versions
    cd "$DEPLOY_PATH/releases"
    ls -1d 20* | head -n -5 | xargs -d '\n' rm -Rf
EOF
