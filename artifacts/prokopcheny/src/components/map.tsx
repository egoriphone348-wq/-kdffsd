import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

// Coords from 2GIS: https://2gis.ru/tomsk/firm/70000001093311593
const LAT = 56.333118;
const LNG = 84.840378;

export function InteractiveMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;

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
        scrollWheelZoom: false,
      });

      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      // Custom pin
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
    /* isolation:isolate creates a new stacking context so Leaflet's
       internal z-indexes (200–600) cannot bleed into other page sections */
    <div
      className="relative w-full h-full min-h-[320px]"
      style={{ isolation: "isolate" }}
    >
      <div
        ref={containerRef}
        className="absolute inset-0 border-4 border-border"
      />
    </div>
  );
}
