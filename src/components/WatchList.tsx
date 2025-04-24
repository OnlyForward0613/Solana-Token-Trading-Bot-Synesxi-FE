const Watchlist = (watchList: any) => {
  console.log(watchList.watchList.length)

  return (
    watchList.watchList.length ?
    <div>
      {
        watchList.watchList.map((list:any, index: any) => {
          return <div key={index} className="text-black">{list}</div>
        })
      }
    </div> :
    <div>Nothing to Show watch list</div>
  )
}

export default Watchlist;