import Container from "../components/Container";
import Feed from "../components/Feed";
import TopPosts from "../components/TopPosts";

export const Home = () => {
	return (
		<>
			<Container>
				<div className="grid grid-cols-3 gap-4">
					<div className="row-start-1 col-start-1">
						{/* <TopPosts /> */}
					</div>
					<Feed />
				</div>
			</Container>
		</>
	);
};
