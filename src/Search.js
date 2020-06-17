import React from "react";


function Search({results}) {
    let [isLoading, setIsLoading] = React.useState(false)

    let [searchOffset, setSearchOffset] = React.useState(0)
    let [searchLimit, setSearchLimit] = React.useState(10)
    let [searchType, setSearchType] = React.useState('track')
    let [searchNeedle, setSearchNeedle] = React.useState('')

    React.useEffect(() => {
        if (searchNeedle.length > 3) {
            setIsLoading(true)
            fetchSearch()
                .then((r) => r.json())
                .then((r) => {
                    setIsLoading(false)
                    return r
                })
                .then((r) => results(r.tracks.items))
        }
    }, [searchNeedle, searchLimit, searchType, searchOffset])

    return (
        <div>
            <form onSubmit={handleSearch}>
                <label>
                    <input name="needle" />
                </label>
                <input type="hidden" name="offset" value={searchOffset} />
                <input type="submit" value="Search" />
                <button onClick={() => setSearchOffset(searchOffset+1)}>></button>
                <select name="limit" onChange={(e) => setSearchLimit(e.target.value)}>
                    <option value="10" selected>10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                </select>
                <select name="type" onChange={(e) => setSearchType(e.target.value)}>
                    <option value="track" selected>track</option>
                <option value="track,artist">track,artist</option>
                </select>
            </form>
            {isLoading && <p>Searching...</p>}
        </div>
    )

    function handleSearch(event) {
        event.preventDefault()
        setSearchNeedle(event.target.needle.value)
        setSearchOffset(event.target.offset.value)
        setSearchLimit(event.target.limit.value)
        setSearchType(event.target.type.value)
    }

    function fetchSearch() {
        return fetch(
            `https://api.spotify.com/v1/search?q=${searchNeedle}&offset=${searchOffset}&limit=${searchLimit}&type=${searchType}`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer BQA5OiIgJn2vKzN6HEZgvYi5Lg-cm6BlHvy5BDFfOuSRt-BZSnTDuoHj0SgACy4TuFZQbJastyfz7yCY30vvqBB4uohbM0G1HfFDd5qiw_QcveU34CxHcV0ExVqmkyutuqCDnD0JFa3b4w'
                }
            }
        )
    }

}

export default Search