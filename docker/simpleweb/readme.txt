Login to docker
    docker Login    (Fill in the username and password)

Build the image
tagged using -t to a name id/name:version (default value of version is 'latest')
    docker build -t ps07/simpleweb:latest .

Run it on http://192.168.99.100:5000/ 
The machine's port 5000 is mapped to the container's 5000 port (-p 5000:5000)
    docker run -p 5000:5000 ps07/simpleweb