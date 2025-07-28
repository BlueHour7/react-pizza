import ContentLoader from "react-content-loader";

export const SkeletonPage = () => {
	const isMobile = window.innerWidth <= 1200;

	return (
		<div className="skeleton">
			<ContentLoader
				speed={2}
				width={isMobile ? 870 : 1120}
				height={isMobile ? 864 : 420}
				viewBox={`0 0 ${isMobile ? "870 864" : "1120 420"}`}
				backgroundColor="#f3f3f3"
				foregroundColor="#ecebeb"
				preserveAspectRatio="xMinYMin meet"
			>
				<circle
					cx={isMobile ? "450" : "200"}
					cy={isMobile ? "220" : "185"}
					r={isMobile ? "215" : "185"}
				/>
				<rect
					x={isMobile ? "350" : "700"}
					y={isMobile ? "470" : "10"}
					rx="10"
					ry="10"
					width={isMobile ? "180" : "200"}
					height={isMobile ? "40" : "46"}
				/>
				<rect
					x={isMobile ? "5" : "450"}
					y={isMobile ? "540" : "75"}
					rx="20"
					ry="20"
					width={isMobile ? "860" : "670"}
					height={isMobile ? "260" : "280"}
				/>
				<rect
					x={isMobile ? "5" : "450"}
					y={isMobile ? "825" : "380"}
					rx="10"
					ry="10"
					width="70"
					height="30"
				/>
				<rect
					x={isMobile ? "710" : "960"}
					y={isMobile ? "820" : "375"}
					rx="10"
					ry="10"
					width="160"
					height="40"
				/>
			</ContentLoader>
		</div>
	);
};

// для дестктопа
{
	/* <circle cx="200" cy="185" r="185" />
<rect x="700" y="10" rx="10" ry="10" width="200" height="46" />
<rect x="450" y="75" rx="20" ry="20" width="670" height="280" />
<rect x="450" y="380" rx="10" ry="10" width="70" height="30" />
<rect x="960" y="375" rx="10" ry="10" width="160" height="40" /> */
}

// для мобилок
{
	/* <circle cx="450" cy="220" r="215" />
<rect x="350" y="470" rx="10" ry="10" width="180" height="40" />
<rect x="5" y="540" rx="20" ry="20" width="860" height="260" />
<rect x="5" y="825" rx="10" ry="10" width="70" height="30" />
<rect x="710" y="820" rx="10" ry="10" width="160" height="40" /> */
}
