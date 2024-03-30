#!/bin/bash

clear

url="http://localhost:8080"

name_array=("alfredo" "quan" "ad" "sam" "brian" "megan")

for item in "${name_array[@]}"; do
  email="${item}@gmail.com"
  pass="${item}Pass1"

  json_data="{\"username\": \"$item\", \"userEmail\": \"$email\", \"password\": \"$pass\"}"

  post_user=$(curl -X POST "$url/users/auth/register" -H "Content-Type: application/json" -d "$json_data")
  
  echo "$post_user"
done

echo "getting request"

name="brian"
pass="brianPass1"

login_response=$(curl -i -X POST -H "Content-Type: application/json" -d "{ \"username\": \"$name\", \"password\": \"$pass\" }" "$url/users/auth/login")

# Check if the response is empty
if [ -z "$login_response" ]; then
    echo "Error: Empty response received"
    exit 1
fi 

# Check if the request was successful
if [ $? -eq 0 ]; then
    echo -e "GET request successful!\n"
    echo "Response:"
    echo "$login_response" | grep '{'
else
    echo "Error: GET request failed"
fi

jwt=$(echo "$login_response" | grep 'Set-Cookie: jwt=' | awk -F ' ' '{print $2}' | awk -F '=' '{print $2}')

echo -e "\nTOKEN: \"$jwt\""

group_post_response=$(curl -i -X POST -b "jwt=$jwt" -H "Content-Type: application/json" -d '{"groupLeaderId": "5", "groupName": "Big Brains", "groupUserEmails": ["ad@gmail.com", "quan@gmail.com"]}' "$url/groups")

echo -e "\n\n$group_post_response"

##### Second Login Request

name="quan"
pass="quanPass1"

login_response=$(curl -i -X POST -H "Content-Type: application/json" -d "{ \"username\": \"$name\", \"password\": \"$pass\" }" "$url/users/auth/login")

# Check if the response is empty
if [ -z "$login_response" ]; then
    echo "Error: Empty response received"
    exit 1
fi 

# Check if the request was successful
if [ $? -eq 0 ]; then
    echo -e "GET request successful!\n"
    echo "Response:"
    echo "$login_response" | grep '{'
else
    echo "Error: GET request failed"
fi

jwt=$(echo "$login_response" | grep 'Set-Cookie: jwt=' | awk -F ' ' '{print $2}' | awk -F '=' '{print $2}')

echo -e "\nTOKEN: \"$jwt\""

group_post_response=$(curl -i -X POST -b "jwt=$jwt" -H "Content-Type: application/json" -d '{"groupLeaderId": "2", "groupName": "Qool Quan Qlub", "groupUserEmails": ["ad@gmail.com", "brian@gmail.com"]}' "$url/groups")

echo -e "\n\n$group_post_response"
