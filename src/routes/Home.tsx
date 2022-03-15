import Container from "../components/Container";
import Playback from "../components/Playback";
import TopPosts from "../components/TopPosts";
import UploadSound from "../components/UploadSound";

export const Home = () => {
	return (
		<>
			<Container>
				<div className="grid grid-cols-3 gap-4">
					<div className="row-start-1 col-start-1">
						<TopPosts />
					</div>
					<Playback />
				</div>
			</Container>
		</>
	);
};
