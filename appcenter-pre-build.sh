#!/usr/bin/env bash
#

#This script allows the version code to be changed in an android build.gradle(app directory) file
#Please specify a VERSION_CODE variable and value in the app center build environment variables in
#the app center build settings pane online

VERSION_CODE=$((APPCENTER_BUILD_ID))

#Identifies the build.gradle file in the app directory
ANDROID_BUILD_GRADLE=$APPCENTER_SOURCE_DIRECTORY/app/build.gradle

if [ -e "$ANDROID_BUILD_GRADLE" ]; then
  echo "version code:" $VERSION_CODE
  cat $ANDROID_BUILD_GRADLE
  echo "Updating version code to $VERSION_CODE in build.gradle file"

  #Finds the versionCode in build.gradle and replaces it with the $VERSION_CODE variable
  #defined in app center environment variables
  echo "Changing VERSION_CODE in build.gradle: $VERSION_CODE"
  sed -i '' 's/versionCode [0-9a-zA-Z -_]*/versionCode '$(($VERSION_CODE))'/' $ANDROID_BUILD_GRADLE

  #Displays the newly updated gradle file with updated versionCode
  echo "File content:"
  cat $ANDROID_BUILD_GRADLE
fi
