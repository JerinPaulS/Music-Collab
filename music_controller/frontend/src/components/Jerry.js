import React, { Component } from "react";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { BiSend } from "react-icons/bi";
import { AiFillAudio } from "react-icons/ai";
import { ContactsOutlined } from "@material-ui/icons";
import { useEffect } from 'react';
//import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
//import "/home/jerinpaul/Documents/Git/Music Colab/music_controller/frontend/static/css/index.css";

export default class Jerry extends Component{
    
    constructor(props){
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSend = this.handleSend.bind(this);
        this.list = [{
            name:"Bot",
            image:"https://imgur.com/Z5a96wR.png",
            message:"Hello this is Tom",  
        },
        ];
    }

    resetValue = () => {
        this.setState({value: ''});
    }

    handleChange(event) {    
        this.setState({value: event.target.value});  
    }

    handleSend(event) {
        let temp;
        console.log('A name was submitted: ' + this.state.value);
        event.preventDefault();
        if(this.state.value != ''){
            this.list = this.list.concat([{
                name:"Tom",
                image:"https://imgur.com/Z5a96wR.png",
                message:this.state.value,  
            }]);
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({        
                message: this.state.value,
                }),
            };
            fetch("/api/chat", requestOptions)
                .then((response) => response.json())
                .then((data) => this.list.push({name:"Bot",
                    image:"https://imgur.com/Z5a96wR.png",
                    message:data.message}));
            this.resetValue();
        }
    }

    render(){
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
                            {this.list.map((content, index) =>(
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
                        <TextField style={{width: "1000px"}} variant="outlined" fullWidth className="p-2" value={this.state.value} label="Enter Message" onChange={this.handleChange}
                            onKeyPress={(ev) => {
                                if (ev.key === 'Enter') {
                                  this.handleSend(ev);
                                  ev.preventDefault();
                                }
                            }}
                        />
                        <Button style={{marginRight: "0.5em", maxWidth: "50px", maxHeight: "50px", minWidth: "30px", minHeight: "30px"}} onClick={this.handleSend} color="primary" variant="contained">
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
    }
}