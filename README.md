# RIDING-X-MAP

This project is a simple React application that displays a Leaflet map. It was bootstrapped with [Vite](https://vitejs.dev/).

## Development

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

The map appears at [localhost:5173](http://localhost:5173) by default.

## AMap Web Service API Key

To show nearby cafés on the map the app uses the AMap POI search API. You
need an AMap API key:

1. Register at [AMap Open Platform](https://lbs.amap.com/).
2. Create an application and enable the **Web服务 API** service to obtain an
   API key.
3. Copy `.env.example` to `.env` and put your key there:

```bash
cp .env.example .env
echo "VITE_AMAP_KEY=your_key" > .env
```

Start the dev server after setting the key:

```bash
npm run dev
```

