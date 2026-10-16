# AFFIRION — Landing v2

Статический лендинг по макету `reference/original.png`. Сборка не нужна.

## Запуск

```
python -m http.server 8000
```

(глобус грузит three.js с jsDelivr и текстуру через fetch, поэтому нужен HTTP, а не `file://`).

## Устройство

- `index.html`, `styles.css` — вёрстка, адаптив: 1240 / 1080 / 900 / 720 px.
- `globe.js` — WebGL-глобус в hero (three.js 0.160, текстура NASA Black Marble `assets/earth-night.jpg`). Если WebGL/CDN недоступны — через 6 с показывается статичный `assets/earth-hero-large.webp`.
- `sky.js` — звёзды и падающие звёзды в hero, пыль поверх страницы (реагирует на скролл). При reduced-motion — статичные звёзды без пыли.
- `assets/photos/sat-*.webp` — тайлы дашборда: настоящие снимки Landsat/Sentinel-1 с «запечёнными» аналитическими слоями (тепловые очаги, маска затопления, псевдо-NDVI).
- `app.js` — модалки, форма «Запросить демо» (копирует текст заявки, на сервер не отправляет), мобильное меню, слайдер «до/после», появление блоков.
- `assets/photos/` — фото отраслей и тайлов дашборда с Wikimedia Commons (Public domain / CC BY / CC BY-SA). Атрибуция — `assets/photos/CREDITS.md`, ссылка в футере.
- `assets/earth-horizon-clean.webp` — процедурный фон финального блока.

Цифры в дашборде (327 очагов, −12,4 %) — демонстрационные.
