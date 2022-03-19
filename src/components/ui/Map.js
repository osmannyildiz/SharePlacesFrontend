import React, { useEffect, useRef } from "react";
import "./Map.css";

export default function Map(props) {
	const mapElRef = useRef();

	const { center, zoom } = props;

	useEffect(() => {
		new window.ol.Map({
			target: mapElRef.current.id,
			layers: [
				new window.ol.layer.Tile({
					source: new window.ol.source.OSM(),
				}),
			],
			view: new window.ol.View({
				center: window.ol.proj.fromLonLat([center.lng, center.lat]),
				zoom: zoom,
			}),
		});
	}, [center, zoom]);

	return <div ref={mapElRef} className="map" id={`map${props.placeId}`}></div>;
}
