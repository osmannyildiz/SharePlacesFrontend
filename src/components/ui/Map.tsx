import OlTileLayer from "ol/layer/Tile";
import OlMap from "ol/Map";
import { fromLonLat } from "ol/proj";
import OlOSM from "ol/source/OSM";
import OlView from "ol/View";
import { useEffect, useRef } from "react";
import "./Map.scss";

interface Props {
	placeId: string;
	center: {
		lat: number;
		lng: number;
	};
	zoom: number;
}

export default function Map(props: Props) {
	const mapElRef = useRef<HTMLDivElement | null>(null);

	const { center, zoom } = props;

	useEffect(() => {
		new OlMap({
			target: mapElRef.current?.id,
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

	return <div ref={mapElRef} className="map" id={`map-${props.placeId}`}></div>;
}
