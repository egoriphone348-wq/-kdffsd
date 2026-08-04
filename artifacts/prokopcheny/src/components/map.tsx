import { useEffect, useRef } from "react";

// Coords from 2GIS: https://2gis.ru/tomsk/firm/70000001093311593
const LAT = 56.333118;
const LNG = 84.840378;

export function InteractiveMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;

    // Dynamically import leaflet to avoid SSR issues
    import("leaflet").then((L) => {
      // Fix default icon paths (broken in bundlers)
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(containerRef.current!, {
        center: [LAT, LNG],
        zoom: 16,
        zoomControl: true,
        scrollWheelZoom: false, // disabled by default, enabled on click
      });

      mapRef.current = map;

      // OpenStreetMap tiles — free, no API key needed
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      // Custom icon with accent colour
      const icon = L.divIcon({
        className: "",
        html: `<div style="
          width:36px;height:44px;
          background:hsl(14,45%,35%);
          border-radius:50% 50% 50% 0;
          transform:rotate(-45deg);
          border:3px solid #fff;
          box-shadow:0 2px 8px rgba(0,0,0,.4);
          display:flex;align-items:center;justify-content:center;
        "><div style="transform:rotate(45deg);font-size:18px;line-height:1;">🔥</div></div>`,
        iconSize: [36, 44],
        iconAnchor: [18, 44],
        popupAnchor: [0, -46],
      });

      L.marker([LAT, LNG], { icon })
        .addTo(map)
        .bindPopup(
          `<div style="font-family:'PT Serif',serif;text-align:center;padding:4px 8px">
            <strong style="font-size:15px">#ПроКопчёный</strong><br/>
            <span style="font-size:12px;color:#555">ул. Звёздная, 7<br/>с. Кафтанчиково</span><br/>
            <a href="tel:+79009228585" style="font-size:13px;color:hsl(14,45%,35%);font-weight:bold">+7 900 922-85-85</a>
          </div>`,
          { maxWidth: 200 }
        )
        .openPopup();

      // Enable scroll zoom only after user interaction
      map.on("click", () => map.scrollWheelZoom.enable());
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[300px]">
      {/* Leaflet CSS */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
      <div
        ref={containerRef}
        className="w-full h-full min-h-[300px] border-4 border-border"
        style={{ zIndex: 0 }}
      />
    </div>
  );
}
