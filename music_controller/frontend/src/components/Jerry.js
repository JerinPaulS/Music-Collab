import React, { Component } from "react";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { BiSend } from "react-icons/bi";
import { AiFillAudio } from "react-icons/ai";
import { useState } from "react";
import { ContactsOutlined } from "@material-ui/icons";
import { useEffect } from 'react';
import { useSpeechSynthesis } from "react-speech-kit";
//import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
//import "/home/jerinpaul/Documents/Git/Music Colab/music_controller/frontend/static/css/index.css";

const initialList = [{
    name:"Bot",
    image:"https://imgur.com/Z5a96wR.png",
    message:"Hello this is Tom",  
    },
];

function Jerry() {
    let [textVal, setVal] = useState('');    
    const [list, setList] = React.useState(initialList);

    const resetValue = () => {
        setVal(() => "")
    }

    const handleSend = (event) => {
        console.log('A name was submitted: ' + textVal);
        event.preventDefault();
        if(textVal != ''){
            const newList = list.concat([{
                name:"Tom",
                image:"https://imgur.com/Z5a96wR.png",
                message:textVal,  
            }]);
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({        
                message: textVal,
                }),
            };
            
            fetch("/api/chat", requestOptions)
                .then((response) => response.json())
                .then((data) => newList.push({name:"Bot",
                    image:"https://imgur.com/Z5a96wR.png",
                    message:data.message}));
            
            resetValue();
            setList(newList);
            console.log(newList);
        }
    }

    return (
        <Grid 
            container
            justify="center"
            alignItems="center"
            direction="column"
            style={{ width: "100%", height: 900 }}
            spacing={10}
        >
            <Grid item>
                <Typography variant="h5" color="primary">
                    ChatBot
                </Typography>
            </Grid>
            <Grid item style={{ width: 500, height: 600, border: "0.4px solid gray", overflow: 'auto', behavior: 'smooth' }}>
                <div className="container">
                    <ul className="contractor_lists">                    
                        {list.map((content, index) =>(
                            <li>                            
                                <div class="incoming_msg">
                                    <div class="incoming_msg_img"> <img src={content.image}/> </div>
                                    <div class="received_msg">
                                        <div class="received_withd_msg">
                                            <p>{content.message}</p>
                                            <span class="time_date"> 11:01 AM    |    Yesterday</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </Grid>
            <Grid item style={{ width: 500, height: 100 }}>
                <Grid className="d-flex flex-row">
                    <TextField style={{width: "1000px"}} variant="outlined" fullWidth className="p-2" value={ textVal } label="Enter Message" onChange={(e) => { 
                        setVal(e.target.value);
                        }}
                        onKeyPress={(ev) => {
                            if (ev.key === 'Enter') {
                                handleSend(ev);
                                ev.preventDefault();
                            }
                        }}
                    />
                    <Button style={{marginRight: "0.5em", maxWidth: "50px", maxHeight: "50px", minWidth: "30px", minHeight: "30px"}} onClick={ handleSend } color="primary" variant="contained">
                        <div>
                            <BiSend />
                        </div>
                    </Button>
                    <Button style={{maxWidth: "50px", maxHeight: "50px", minWidth: "30px", minHeight: "30px"}} color="primary" variant="contained">
                            <div>
                                <AiFillAudio />
                            </div>
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
  };
  
export default Jerry;