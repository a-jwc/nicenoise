const posts = [
	{ title: "Smol kick", author: "user1" },
	{ title: "vocal duet", author: "user2" },
	{ title: "pop shuv", author: "user3" },
];

export default function TopPosts() {
	return (
		<aside className="flex flex-col border-4 m-4 w-48 p-4 text-white">
			<h1 className="text-lg font-bold">Top Posts</h1>
			<ol className="pl-2" start={1}>
				{posts.map((post) => (
					<li key={post.title}>
						<a href="#">
							<h3>{post.title}</h3>
						</a>
						<a href="#">
							<p>{post.author}</p>
						</a>
					</li>
				))}
			</ol>
		</aside>
	);
}
