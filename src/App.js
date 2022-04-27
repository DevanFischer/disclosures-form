import React, { useEffect, useContext, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes, useParams } from 'react-router-dom';
import axios from 'axios';

import './App.css';
import { clientTokens } from './static/client/client_tokens';
import { getManyChatToken } from './utils/getManyChatToken';
// MUI
import { Box } from '@mui/material';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});

  const { company, userId } = useParams();
  const mcToken = getManyChatToken(company, clientTokens);

  useEffect(() => {
    console.log(company, userId);
    console.log(mcToken);

    // Get user data from ManyChat. Takes in userId and mcToken
    const mcUrl = `https://api.manychat.com/fb/subscriber/getInfo?subscriber_id=${userId}`;
    const corsBypassUrl = `https://cors-anywhere.herokuapp.com/${mcUrl}`;
    const config = {
      method: 'GET',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json', Authorization: mcToken },
    };
    fetch(corsBypassUrl, config)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data.data);
        console.log(userData);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Box sx={{ background: 'red' }}>Hello from V2</Box>
      </header>
    </div>
  );
}

export default App;

//  Get disclosures from CGM
// def get_cgm_disclosures(user):
//     payload = {"Token": user["token"], "PackageID": user["package_id"], "ResidenceState": user["state"], "TribalResident": user["tribal"], "EligibilityProgram": user["benefit"]}  # Form request data

//     if user["test_or_live"] == "t":
//         url = "https://lifeline-preprod.cgmllc.net/api/v2/disclosuresconfiguration"
//     else:
//         url = "https://lifeline.cgmllc.net/api/v2/disclosuresconfiguration"

//     response = requests.post(url, headers={"Content-Type": "application/x-www-form-urlencoded"}, data=payload)  # Make request to CGM
//     response_json = json.loads(response.text)

//     if response_json["Status"] == "Failure":
//         print("CGM RESPONSE", json.dumps(response_json, indent=2))

//     user["ieh"] = str(response_json["CaptureIehForm"]).lower()  # Update User fields
//     user["items"] = response_json["DisclosureItems"]
//     return user
