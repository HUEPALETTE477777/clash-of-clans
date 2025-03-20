import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const ClanDetail = () => {
    const { clanTag } = useParams();
    const [clanData, setClanData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClanDetails = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/clans/search/tag/${clanTag}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch clan details.');
                }
                const data = await response.json();
                setClanData(data);
            } catch (error) {
                setError(error.message);
            }
        };

        if (clanTag) {
            fetchClanDetails();
        }
    }, [clanTag]);

    // CRINGE COC API NAMES THEIR ROLES DIFFERENTLY
    const roleMapping = {
        coLeader: 'Co-leader',
        admin: 'Elder',
        leader: 'Leader'
    };

    if (error) return <p>Error: {error}</p>;
    if (!clanData) return <p>Loading clan details...</p>;

    return (
        <div className="p-6 bg-gray-50">
            <h1 className="text-3xl font-bold mb-4 text-center">{clanData.name} ({clanData.tag})</h1>
            <div className="flex items-center justify-center">
                <div>
                    <p>Level: {clanData.clanLevel}</p>
                    <p>Members: {clanData.members}</p>
                    <p>Description: {clanData.description}</p>
                    <p>Location: {clanData.location?.name || 'N/A'}</p>
                </div>
                <div>
                    <img src={clanData.badgeUrls.medium} />
                </div>
            </div>

            <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-4">Clan Members</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {clanData.memberList.map((member) => (
                        <div key={member.tag} className="p-4 border">
                            <p>Name: {member.name}</p>
                            <p>Tag: {member.tag}</p>
                            <p>Town Hall Level: {member.townHallLevel}</p>
                            <p>Role: {roleMapping[member.role]}</p> 
                            <p>Donations: {member.donations}</p>
                            <p>Received: {member.donationsReceived}</p>
                            <p>Exp Level: {member.expLevel}</p>
                            <p>Trophies: {member.trophies}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ClanDetail