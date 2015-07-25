#!/usr/bin/env bash
# Codeship Deployment Script
# Piccirilli Dorsey

# CODESHIP DEPLOY SCRIPT
# ### Codeship Environment Variables ###
# ### DEPLOY_PATH       (path on server)
# ### USERNAME          (username to login)
# ### HOST              (ip or hostname)
# ### PORT              (ssh port number)

# Vars
date=`date +%Y-%m-%d:%H:%M:%S`
release="$DEPLOY_PATH/releases/$date"
echo "$release"

# Create directory
echo "Create Directory"
ssh $USERNAME@$HOST -p $PORT mkdir -p "$release"

# Rsync changes
echo "Rsync Changes"
rsync -vzcrSLh -e "ssh -p $PORT" --exclude="deploy.sh" --exclude="node_modules" --exclude="src" --exclude=".git*" \
    ./ $USERNAME@$HOST:"$release"

# Symlink
echo "Symlink"
ssh $USERNAME@$HOST -p $PORT /bin/bash << EOF
    cd $release
    ln -nfs "$release" "$DEPLOY_PATH/current"

    # Clean up old versions
    cd "$DEPLOY_PATH/releases"
    ls -1d 20* | head -n -5 | xargs -d '\n' rm -Rf
EOF
