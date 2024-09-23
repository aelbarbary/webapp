#!/bin/bash

# Set the file path
file_path="/Users/admin/Documents/code/ai/marriage/marriage-api/src/settings/.env"


if [ -f "$file_path" ]; then
    # Use awk to replace the value of DJANGO_ENV
    awk -v new_value="DJANGO_ENV=\"dev\"" '{sub(/DJANGO_ENV="[a-zA-Z]+"/, new_value)} 1' "$file_path" > temp_file && mv temp_file "$file_path"
    echo "DJANGO_ENV has been set to 'dev'"
else
    echo "Error: File not found at $file_path"
fi

cd /Users/admin/Documents/code/ai/marriage/marriage-api/
chmod +x run.sh  
./run.sh &

cd /Users/admin/Documents/code/ai/marriage/marriage-website/
npm start



