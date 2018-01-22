echo "DEPLOY FROM LOCAL"
aws s3 sync ./dist s3://airhorn.wickeyappstore.com --delete
echo "THAT'S ALL SON"
