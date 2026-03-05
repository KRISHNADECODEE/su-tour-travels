$UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

Invoke-WebRequest -Uri "https://upload.wikimedia.org/wikipedia/commons/6/64/Mussoorie.jpg" -OutFile "images\mussoorie.jpg" -UserAgent $UserAgent
Invoke-WebRequest -Uri "https://upload.wikimedia.org/wikipedia/commons/e/e4/Nainital_lake.jpg" -OutFile "images\nainital.jpg" -UserAgent $UserAgent
Invoke-WebRequest -Uri "https://upload.wikimedia.org/wikipedia/commons/a/ab/Tungnath%2C_Highest_Shiva_temple_in_the_world.jpg" -OutFile "images\chopta.jpg" -UserAgent $UserAgent
Invoke-WebRequest -Uri "https://upload.wikimedia.org/wikipedia/commons/6/69/Valley_of_flowers_national_park.jpg" -OutFile "images\valley.jpg" -UserAgent $UserAgent

Write-Host "Images downloaded successfully."
