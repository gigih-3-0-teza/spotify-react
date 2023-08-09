export default function Banner({item}) {
    return (
        <div className="flex flex-wrap gap-5 my-8">
            <div className="md:basis-1/6 rounded-xl shadow-2xl overflow-hidden">
                <img loading="lazy" src={item.thumbnail} alt={item.name} className="w-1/2 mx-auto sm:w-full" />
            </div>
            <div className="md:mt-auto">
                <h6 className="text-sm">{item.type}</h6>
                <h1 className="text-4xl font-bold mb-3">{item.name}</h1>
                <h6 className="text-sm">{item.description}</h6>
            </div>
        </div>
    )
}
