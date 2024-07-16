# arm frontend

How to start

```
git clone <repo-url>

npm install

npm run dev
```

Containerization

```
podman build -t arm-fe .

podman run -p 8080:80 <image-id>
```