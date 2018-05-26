#!/bin/sh

git filter-branch --env-filter '
CORRECT_NAME="LeekAnarchism"
CORRECT_EMAIL="mike.john.kearns@gmail.com"
export GIT_COMMITTER_NAME="LeekAnarchism"
export GIT_COMMITTER_EMAIL="mike.john.kearns@gmail.com"
export GIT_AUTHOR_NAME="LeekAnarchism"
export GIT_AUTHOR_EMAIL="mike.john.kearns@gmail.com"
' --tag-name-filter cat -- --branches --tags
