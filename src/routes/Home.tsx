import Container from "../components/Container";
import Feed from "../components/Feed";
import TopPosts from "../components/TopPosts";

export const Home = () => {
	const order = "desc";
	return (
		<>
			<Container>
				<div className="lg:grid lg:grid-cols-3 flex flex-col gap-4 place-items-center">
					<div className="row-start-1 col-start-1">{/* <TopPosts /> */}</div>
					<Feed url={`http://localhost:8000/api/v1/sounds?order=${order}`} />
				</div>
			</Container>
		</>
	);
};
