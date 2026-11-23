"use client";

import { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import type { Map as MLMap, Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Power } from "@data/atlas";
import { capitalsOf } from "@/lib/atlas";

const BOUNDS: [[number, number], [number, number]] = [
  [60, 5],
  [98, 37.5],
];

/**
 * Base map: Natural Earth land, rivers and lakes (public domain). No modern borders, no glyph server.
 * URLs must be absolute: MapLibre fetches GeoJSON inside a web worker, where relative URLs fail.
 */
const style = (origin: string): maplibregl.StyleSpecification => ({
  version: 8,
  sources: {
    land: { type: "geojson", data: `${origin}/maps/land.geojson` },
    lakes: { type: "geojson", data: `${origin}/maps/lakes.geojson` },
    rivers: { type: "geojson", data: `${origin}/maps/rivers.geojson` },
    // Historical borders: Cliopatria (CC BY 4.0), see scripts/build-atlas-borders.mjs.
    borders: { type: "geojson", data: `${origin}/maps/borders.geojson` },
  },
  layers: [
    { id: "water", type: "background", paint: { "background-color": "#DCE2E6" } },
    { id: "land", type: "fill", source: "land", paint: { "fill-color": "#F4F1EA" } },
    { id: "lakes", type: "fill", source: "lakes", paint: { "fill-color": "#DCE2E6" } },
    { id: "rivers", type: "line", source: "rivers", paint: { "line-color": "#3E7CB1", "line-opacity": 0.45, "line-width": 1.2 } },
    // Hidden until the year filter is applied.
    { id: "borders-fill", type: "fill", source: "borders", filter: ["==", ["get", "powerId"], "__none__"], paint: { "fill-color": "#1A1A2E", "fill-opacity": 0.22 } },
    {
      id: "borders-line",
      type: "line",
      source: "borders",
      filter: ["==", ["get", "powerId"], "__none__"],
      paint: { "line-color": "#1A1A2E", "line-width": 1.5, "line-dasharray": [3, 2] },
    },
  ],
});

/**
 * The Atlas map. Loaded lazily (see AtlasExplorer) so MapLibre only downloads on this page.
 * Purely visual: everything it shows is also listed in text beside it.
 */
export default function AtlasMap({
  year,
  active,
  colours,
}: {
  year: number;
  active: Power[];
  colours: Map<string, string>;
}) {
  const container = useRef<HTMLDivElement>(null);
  const map = useRef<MLMap | null>(null);
  const markers = useRef<Marker[]>([]);
  const [failed, setFailed] = useState(false);
  const [styleReady, setStyleReady] = useState(false);

  useEffect(() => {
    if (!container.current) return;
    let instance: MLMap;
    try {
      // Served from /public (copied at build time); see scripts/copy-maplibre-worker.mjs.
      maplibregl.setWorkerUrl(`${window.location.origin}/vendor/maplibre/maplibre-gl-worker.mjs?v=${maplibregl.getVersion()}`);
      instance = new maplibregl.Map({
        container: container.current,
        style: style(window.location.origin),
        bounds: BOUNDS,
        maxBounds: [
          [50, -5],
          [108, 45],
        ],
        attributionControl: {
          compact: true,
          customAttribution: "Borders: Cliopatria, Seshat (CC BY 4.0) · Base map: Natural Earth (public domain)",
        },
        dragRotate: false,
        pitchWithRotate: false,
      });
    } catch {
      // No WebGL, or the map failed to start. The text list beside the map still has everything.
      queueMicrotask(() => setFailed(true));
      return;
    }
    instance.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
    instance.touchZoomRotate.disableRotation();
    instance.on("error", (e) => console.warn("Atlas map:", e.error?.message));
    instance.on("load", () => setStyleReady(true));
    map.current = instance;
    return () => {
      markers.current.forEach((m) => m.remove());
      markers.current = [];
      instance.remove();
      map.current = null;
    };
  }, []);

  // Show only the border snapshots for the selected year, coloured like each power's capital dot.
  useEffect(() => {
    const m = map.current;
    if (!m || !styleReady) return;
    const ids = active.map((p) => p.id);
    const filter: maplibregl.FilterSpecification = [
      "all",
      ["<=", ["get", "from"], year],
      [">=", ["get", "to"], year],
      ["in", ["get", "powerId"], ["literal", ids]],
    ];
    const colour: maplibregl.ExpressionSpecification | string =
      ids.length > 0
        ? (["match", ["get", "powerId"], ...ids.flatMap((id) => [id, colours.get(id) ?? "#1A1A2E"]), "#1A1A2E"] as unknown as maplibregl.ExpressionSpecification)
        : "#1A1A2E";
    m.setFilter("borders-fill", filter);
    m.setFilter("borders-line", filter);
    m.setPaintProperty("borders-fill", "fill-color", colour);
    m.setPaintProperty("borders-line", "line-color", colour);
  }, [year, active, colours, styleReady]);

  // Redraw capital markers when the year (and so the set of powers) changes.
  useEffect(() => {
    const m = map.current;
    if (!m) return;
    markers.current.forEach((mk) => mk.remove());
    markers.current = [];
    const seen = new Map<string, HTMLElement>();
    for (const power of active) {
      for (const place of capitalsOf(power)) {
        const colour = colours.get(power.id) ?? "#1A1A2E";
        const existing = seen.get(place.id);
        if (existing) {
          // Two powers share a capital (e.g. Pataliputra): list both on one marker.
          existing.querySelector("[data-label]")!.textContent += ` · ${power.name}`;
          continue;
        }
        const el = document.createElement("div");
        el.setAttribute("aria-hidden", "true");
        const left = place.labelSide === "left";
        el.className = `flex items-center gap-1.5 pointer-events-none ${left ? "flex-row-reverse text-right" : ""}`;
        el.innerHTML = `<span style="background:${colour}" class="block size-3 rounded-full border-2 border-white shadow"></span><span class="rounded bg-white/90 px-1.5 py-0.5 text-[12px] leading-tight text-[#1A1A2E] shadow-sm"><strong>${place.name}</strong><span data-label class="block text-[11px] text-[#4A4A58]">${power.name}</span></span>`;
        seen.set(place.id, el);
        markers.current.push(new maplibregl.Marker({ element: el, anchor: left ? "right" : "left", offset: [left ? 6 : -6, 0] }).setLngLat([place.lon, place.lat]).addTo(m));
      }
    }
  }, [active, colours]);

  if (failed) {
    return (
      <div className="flex h-full items-center justify-center p-6 text-center text-[15px] text-text-2">
        The map could not be shown in this browser. Every power and capital is listed in the panel beside it.
      </div>
    );
  }
  return <div ref={container} className="h-full w-full" />;
}
