Creating the blogs application

blogs
    client (generated automatically)
    posts:      4000
    comments:   4001
    query:      4002
    moderation: 4003
    event-bus:  4005
    infra
        k8s

Run the command in blogs folder
    npx create-react-app client
    npm install axios

Run the command in every folder (except client)
    npm init -y
    npm install express cors axios nodemon

Change the "script" value in every folder's (except client) package.json file
    "scripts": {
        "start" : "nodemon index.js"
    }

Run
    npm start (in all 6 dirs in separate terminals)

Minikube - to tun Kubernetes
    minikube start
    minikube ip - 192.168.99.101

Docker build image
    docker build -t ps07/posts:0.0.1 .    (Run in posts dir)
    docker push ps07/posts:0.0.1

Kubernetes deployment (it creates a pod automatically)
    kubectl apply -f posts-depl.yaml     (Run in infra/k8s dir)
    kubectl get deployments
    kubectl get pods

Rebuild process (if the code is changed)
    Build the image again:  docker build -t ps07/posts .
    Push it to docker hub:  docker push ps07/posts
    kubectl rollout restart deployment posts-depl

Starting Project afreash
    Start kubernetes: minikube start
    Build and push images (if code is changed)
    Run all deployments : kubectl apply -f . (in infra/k8s dir)
    Check all deployments/services/pods are running file

Kubernetes service
    kubectl apply -f posts-srv.yaml     (Run in infra/k8s dir)
    kubectl get services

    NodePort service
        kubectl get services (check the 2nd {port} of NodePort service)
        NodePort: http://192.168.99.101:{port}/posts (connects browser to Node)
        Port: Internal NodePort service port (set in posts-srv.yaml)
        targetPort: Internal port of Pod that connects it to the NodePort service (set in posts-srv.yaml)

    ClusterIP service (communication between posts and event-bus pods)
        Create an image for event-bus and push it to Docker hub
        Create the deployment for event-bus
        Now we have pods for posts and event-bus created by thier deployments
        For communication between them we need to create ClusterIP service for both of them
        (ClusterIP service objects are added to both 'posts-depl.yaml' and 'event-bus-depl.yaml' files)
        We can see all the services: kubectl get services
        Wire it all up
            posts pod will communicate with event-bus ClusterIP service and
            event-bus pod will communicate with posts ClusterIP service
            this is done by requesting to http://{service_name}:{port}
        Do the Rebuild process for both posts and event-bus

    Load Balancer service
        React App -> Load Balancer -> Ingress Controller -> Pods
        Install Ingress: minikube addons enable ingress
        Run Ingress deployment: kubectl apply -f .\ingress-srv.yaml
        Add this line to C:\Windows\System32\drivers\etc\hosts file: 192.168.99.101 posts.com
        Now we can see our posts at http://posts.com/posts
        Update all React app files in 'client\src' dir
            replace localhost:{port} with posts.com
        Build an image: docker build -t ps07/client . (in client dir)
        Push it to docker hub: docker push ps07/client
        Run the deployment: kubectl apply -f client-depl.yaml (in infra\k8s dir)

Skaffold
    It automates the Rebuild process whenever some code is changed.
    Install Chocolatey
    Install Skaffold: choco install skaffold
    Run: skaffold dev (in blog dir) [run again if some errors prompt]
    Cleanup: skaffold delete