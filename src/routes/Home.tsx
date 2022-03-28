import Container from "../components/Container";
import Feed from "../components/Feed";
import TopPosts from "../components/TopPosts";

export const Home = () => {
	const order = "desc";

	return (
		<Container>
			<div className="lg:grid lg:auto-cols-max lg:grid-flow-col flex flex-col gap-4 auto-cols-max place-items-center mx-auto">
				<div className="row-start-1 col-start-1 place-self-start">
					{/* <TopPosts /> */}
				</div>
				<div className=" col-start-2 col-end-3">
					<Feed url={`http://localhost:8000/api/v1/sounds?order=${order}`} />
				</div>
			</div>
		</Container>
	);
};
