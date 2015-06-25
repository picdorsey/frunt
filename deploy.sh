#!/usr/bin/env bash
# Codeship Deployment Script
# Piccirilli Dorsey

# CODESHIP DEPLOY SCRIPT
# ### Codeship Environment Variables ###
# ### DEPLOY_PATH       (path on server)
# ### USERNAME          (username to login)
# ### HOST              (ip or hostname)
# ### PORT              (ssh port number)
#
# ### Copy and paste the script into Codeship ###
# ###############################################
# rm -rf node_modules
# date=`date +%Y-%m-%d:%H:%M:%S`
# release="$DEPLOY_PATH/releases/$date"
# echo "$release"
# ssh $USERNAME@$HOST -p $PORT mkdir -p "$release"
# rsync -avz -e "ssh -p $PORT" ~/clone/ $USERNAME@$HOST:"$release"
# ssh $USERNAME@$HOST -p $PORT "cd '$release' && chmod +x deploy.sh && ./deploy.sh '$DEPLOY_PATH' '$release'"
# ###############################################

path=$1
release=$2

# Update the System link
ln -nfs "$release" "$path/current"

# Clean up old versions
cd "$path/releases"
ls -1d 20* | head -n -5 | xargs -d '\n' rm -Rf
