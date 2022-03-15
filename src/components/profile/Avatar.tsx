export default function Avatar({ image }: { image: string | null }) {
	return (
		<>
			{image ? (
				<div className=" rounded-full w-48 h-48 flex flex-col place-content-center text-center">
					{image}
				</div>
			) : (
				<div className=" rounded-full bg-gradient-to-t from-teal-300 to-purple-300 w-48 h-48 flex flex-col place-content-center text-center">
					<button onClick={(e) => {
            
          }}>{image}</button>
				</div>
			)}
		</>
	);
}
