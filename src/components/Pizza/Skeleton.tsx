import ContentLoader from "react-content-loader";

const Skeleton = () => (
	<ContentLoader
		speed={2}
		width={280}
		height={490}
		viewBox="0 0 280 490"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
	>
		<rect x="94" y="82" rx="0" ry="0" width="0" height="34" />
		<circle cx="140" cy="135" r="130" />
		<rect x="0" y="300" rx="10" ry="10" width="280" height="27" />
		<rect x="0" y="345" rx="10" ry="10" width="280" height="89" />
		<rect x="0" y="455" rx="10" ry="10" width="90" height="30" />
		<rect x="124" y="450" rx="25" ry="25" width="156" height="40" />
	</ContentLoader>
);

export default Skeleton;
