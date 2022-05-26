import React, { Component } from "react";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { BiSend } from "react-icons/bi";
import { AiFillAudio } from "react-icons/ai";

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
        console.log('A name was submitted: ' + this.state.value);
        event.preventDefault();        
        this.list = this.list.concat([{
            name:"Tom",
            image:"https://imgur.com/Z5a96wR.png",
            message:this.state.value,  
        }])
        this.list = this.list.concat([{
            name:"Bot",
            image:"https://imgur.com/Z5a96wR.png",
            message:"Hello this is Tom", 
        }])
        console.log('object: %O', this.list)
        this.resetValue();
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
                        <div className="card">
                            <ul className="contractor_lists">                    
                                {this.list.map(content=>(
                                    <li>                            
                                        <div className="boxes">                            
                                            <div className="box1">
                                                <div className="top">
                                                    <h5>{content.name}</h5>
                                                    <span>{content.contacts}</span>
                                                </div>
                                                <div className="position">
                                                    <span><img src={content.image}/></span>
                                                    <div className="message">
                                                        <h6>{content.message}</h6>
                                                        <span></span>
                                                    </div>
                                                </div>        
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
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