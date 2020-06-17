import React from "react";


function ListDisplay({list, handleAction}) {
    if (list.length === 0) {
        return (<p>No results :(</p>)
    }

    const listItems = list.map((item) =>
        <tr key={item.id}>
            <td><img src={item.album.images[2].url} /></td>
            <td>{item.artists.map((i) => i.name).join(', ')}</td>
            <td>{item.name}</td>
            <td>{item.duration_ms / 1000}s</td>
            <td><button onClick={handleAction} id={item.id}>*</button></td>
        </tr>
    );

    return (
        <table>
            <thead>
                <tr>
                    <td>Pochette</td>
                    <td>Artiste(s)</td>
                    <td>Titre</td>
                    <td>Durée</td>
                </tr>
            </thead>
            <tbody>
                {listItems}
            </tbody>
        </table>
    )
}

export default ListDisplay