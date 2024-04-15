import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"

function Home() {
  const [players, setPlayers] = useState([]);
  const [playerId, setPlayerId] = useState("");
  const [userName, setUserName] = useState("");
  const [friendId, setFriendId] = useState("");
  const [message, setMessage] = useState("");
  const [friendCount, setFriendCount] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false); // State to track login status
  const [showPlayerList, setShowPlayerList] = useState(false); // State to control showing player list

  useEffect(() => {
    // Fetch all players when component mounts
    const fetchPlayers = async () => {
      try {
        const response = await axios.get("http://localhost:8090/api/v1/players/getall");
        setPlayers(response.data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchPlayers();
  }, []);

  const handleAddFriend = async () => {
    try {
      if (!playerId || !friendId) {
        setMessage("Both playerId and friendId are required to add a friend.");
        return;
      }
  
      const response = await axios.post("http://localhost:8090/api/v1/players/friends", {
        playerId: playerId,
        friendId: friendId,
      });
  
      if (response && response.data === "Friend added successfully.") {
        setMessage(response.data);
        setFriendCount(prevCount => prevCount + 1);
        setFriendId(""); // Clear the input field after adding friend
      } else {
        setMessage("An error occurred while adding a friend.");
      }
    } catch (error) {
      setMessage("An error occurred while adding a friend.");
    }
  };
  
  const handleRemoveFriend = async (friendId) => {
    try {
      const response = await axios.delete(`http://localhost:8090/api/v1/players/friends/${friendId}`);

      if (response && response.data) {
        setMessage(response.data);
        setFriendCount(prevCount => prevCount - 1);
      } else {
        setMessage("An error occurred while removing the friend.");
      }
    } catch (error) {
      setMessage("An error occurred while removing the friend.");
    }
  };

  const handleShowPlayerList = () => {
    setShowPlayerList(!showPlayerList);
  };

  return (
    <div className="container">
      <nav>
        <h2>Connecting Gamers</h2>
        <button onClick={handleShowPlayerList}>Show Player List</button>
      </nav>
      {showPlayerList && (
        <div className="grid-container">
          <div className="grid-item">
            <input
              type="text"
              placeholder="Enter Player ID"
              value={playerId}
              onChange={(e) => setPlayerId(e.target.value)}
            />
            <button onClick={handleAddFriend}>Add Friend</button>
          </div>
          <div className="grid-item">
            <h2>All Players</h2>
            <ul>
              {players.map(player => (
                <li key={player.id}>
                  <input value={player.id} type="hidden" name="friendId" id="friendId"/>
                  <img src={player.imageUrl} alt={player.userName} /> 
                  <div>{player.userName}</div>
                  <div>
                      <button className="addfriendbtn" onClick={() => setFriendId(player.userName)}>Add Friend</button>
                      <span style={{ margin: '0 10px' }}></span> 
                      <button  className="friendbtn"onClick={() => handleRemoveFriend(player.userName)}>Unfriend</button>
                  </div>

                </li>
              ))}
            </ul>
            <div>
              <input
                type="hidden"
                value={friendId} 
                onChange={(e) => setFriendId(e.target.value)} 
              />
            </div>
            {message && <p>{message}</p>}
            <p>Number of friends your cart: {friendCount}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
