import React, { useState } from "react";
import axios from "axios";

function Profile() {
  const [profile, setProfile] = useState(null);

  async function getProfile() {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get("http://localhost:8080/me", {
        headers: {
          token: token,
        },
      });

      console.log(res.data);
      setProfile(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h2>Profile</h2>

      <button onClick={getProfile}>Fetch Profile</button>

      {profile ? (
        <div>
          <p>Username: {profile.data.username}</p>
          <p>Email: {profile.data.email}</p>
        </div>
      ) : (
        <p>No profile loaded.</p>
      )}
    </div>
  );
}

export default Profile;