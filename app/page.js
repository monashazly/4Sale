export default function Home() {
  return (
    <div className="bg-[url('/image.png')] bg-cover h-screen">
      <div className="bg-[#40618a] h-full bg-opacity-[0.7] backdrop-blur-sm flex flex-col gap-8">
        <h1 className="text-white text-3xl font-extrabold text-center mt-28">
          Money Exchange
        </h1>
        <div className=" bg-red-400 rounded-3xl min-w-[80%] mx-auto h-72 shadow-lg p-16">
          <div className="flex md:justify-between md:flex-row flex-col gap-4">
            <div className="flex-1">
              <label>Amount</label>
              <input type="number" className="w-full" />
            </div>
            <div className="flex-1">
              <label>From</label>
              <select className="w-full">
                <option>hi</option>
                <option>hi</option>
                <option>hi</option>
                <option>hi</option>
              </select>
            </div>
            <div className="flex-1">
              <label>To</label>
              <select className="w-full">
                <option>hi</option>
                <option>hi</option>
                <option>hi</option>
                <option>hi</option>
              </select>
            </div>
          </div>
          <button className="bg-[#38609b] text-white mt-5">Reset</button>
        </div>
      </div>
    </div>
  );
}
