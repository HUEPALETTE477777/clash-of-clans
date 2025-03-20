import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Search = () => {
    const [searchType, setSearchType] = useState('player')
    const [playerTag, setPlayerTag] = useState('');
    const [clanTag, setClanTag] = useState('');
    const [playerData, setPlayerData] = useState(null);
    const [clanData, setClanData] = useState(null);
    const [error, setError] = useState(null);

    const searchPlayerHandler = async () => {
        if (!playerTag) {
            setError('Player tag is required!');
            return;
        }

        try {
            const response = await fetch(`http://localhost:4000/api/players/search/${playerTag}`);
            if (!response.ok) {
                throw new Error('Player not found or API request failed.');
            }
            const jsonData = await response.json();
            setPlayerData(jsonData);
            setError(null);
        } catch (error) {
            setError(error.message);
            setPlayerData(null);
        }
    };

    const searchClansHandler = async () => {
        if (!clanTag) {
            setError('Clan name or tag is required!');
            return;
        }

        try {
            const response = await fetch(`http://localhost:4000/api/clans/search/${clanTag}`);
            if (!response.ok) {
                throw new Error('Clan not found or API request failed.');
            }
            const jsonData = await response.json();
            setClanData(jsonData);
            setError(null);
        } catch (error) {
            setError(error.message);
            setClanData(null);
        }
    };

    const searchTypeHandler = (type) => {
        setSearchType(type);
        setPlayerData(null);
        setClanData(null);
        setError(null);
    }

    return (
        <>
            <div className="max-w-lg mx-auto">
                {searchType === 'player' && (
                    <>
                        <h1 className="text-2xl text-center my-2">SEARCH FOR PLAYERS</h1>
                        <div className="flex justify-center gap-4 p-2">
                            <button onClick={() => searchTypeHandler('player')} className={`p-2 ${searchType === 'player' ? 'bg-primary-light' : 'bg-gray-300'} text-white`}>
                                Player Search
                            </button>
                            <button onClick={() => searchTypeHandler('clan')} className={`p-2 ${searchType === 'clan' ? 'bg-primary-light' : 'bg-gray-300'} text-white`}>
                                Clan Search
                            </button>
                        </div>
                        <div className="flex flex-col gap-4">
                            <input
                                type="text"
                                value={playerTag}
                                onChange={(e) => setPlayerTag(e.target.value)}
                                placeholder="ENTER PLAYER TAG (NO '#')"
                                className="p-2 border border-gray-300 focus:outline-none"
                            />
                            <button onClick={searchPlayerHandler} className="p-2 bg-primary-light text-white">
                                Search Player
                            </button>
                        </div>
                    </>
                )}

                {searchType === 'clan' && (
                    <>
                        <h1 className="text-2xl text-center my-2">SEARCH FOR CLANS</h1>
                        <div className="flex justify-center gap-4 p-2">
                            <button onClick={() => searchTypeHandler('player')} className={`p-2 ${searchType === 'player' ? 'bg-primary-light' : 'bg-gray-300'} text-white`}>
                                Player Search
                            </button>
                            <button onClick={() => searchTypeHandler('clan')} className={`p-2 ${searchType === 'clan' ? 'bg-primary-light' : 'bg-gray-300'} text-white`}>
                                Clan Search
                            </button>
                        </div>
                        <div className="flex flex-col gap-4">
                            <input
                                type="text"
                                value={clanTag}
                                onChange={(e) => setClanTag(e.target.value)}
                                placeholder="ENTER A CLAN NAME"
                                className="p-2 border border-gray-300 focus:outline-none"
                            />
                            <button onClick={searchClansHandler} className="p-2 bg-primary-light text-white">
                                Search Clan
                            </button>
                        </div>
                    </>
                )}

                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </div>

            <div className="flex items-center justify-center gap-4">
                {playerData && (
                    <div className="mt-4 p-4 border">
                        <h3 className="text-xl font-semibold mb-2">Player Details</h3>
                        <p>Tag: <span>{playerData.tag}</span></p>
                        <p>Name: <span>{playerData.name}</span></p>
                        <p>Clan: {playerData.clan ? playerData.clan.name : 'N/A'}</p>
                        <p>Town Hall Level: {playerData.townHallLevel}</p>
                    </div>
                )}

                {clanData && clanData.items && (
                    <div className="mt-4 p-4 border">
                        <h3 className="text-xl font-semibold mb-2">Clan Details</h3>
                        <div className="grid grid-cols-6 gap-6">
                            {clanData.items.map((clan) => (
                                <div key={clan.tag} className="p-2 mb-2 border">
                                    <p>Name: {clan.name}</p>
                                    <p>Tag: {clan.tag}</p>
                                    <p>Level: {clan.clanLevel}</p>
                                    <p>Members: {clan.members}</p>
                                    <img src={clan.badgeUrls.small} />
                                    <Link
                                        to={`/clan/${clan.tag.replace('#', '')}`}
                                        className="bg-primary-light text-white p-2 mt-2 inline-block text-center"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Search;
