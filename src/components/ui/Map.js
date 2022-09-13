import OlTileLayer from "ol/layer/Tile";
import OlMap from "ol/Map";
import { fromLonLat } from "ol/proj";
import OlOSM from "ol/source/OSM";
import OlView from "ol/View";
import React, { useEffect, useRef } from "react";
import "./Map.css";

export default function Map(props) {
	const mapElRef = useRef();

	const { center, zoom } = props;

	useEffect(() => {
		new OlMap({
			target: mapElRef.current.id,
			layers: [
				new OlTileLayer({
					source: new OlOSM(),
				}),
			],
			view: new OlView({
				center: fromLonLat([center.lng, center.lat]),
				zoom: zoom,
			}),
		});
	}, [center, zoom]);

	return <div ref={mapElRef} className="map" id={`map${props.placeId}`}></div>;
}
