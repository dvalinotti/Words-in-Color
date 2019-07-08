import React, {Component} from 'react';
import { Box, Typography } from '@material-ui/core';
import {Motion, spring} from 'react-motion';

export default class ColorBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            colorCode: this.props.colorCode,
            textColor: undefined
        }
    }

    componentDidMount() {
        let rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.state.colorCode);
        let finRgb = {
            r: parseInt(rgb[1], 16),
            g: parseInt(rgb[2], 16),
            b: parseInt(rgb[3], 16)
        };
        console.log(finRgb.r * 299, finRgb.g * 587, finRgb.b * 114);
        let o = Math.round(((parseInt(finRgb.r * 299)) + (parseInt(finRgb.g * 587)) + (parseInt(finRgb.b * 114))) / 1000);
        console.log(o);
        let c = (o > 125) ? 'black' : 'white'
        this.setState({
            textColor: c
        })
    }

    contrastText(color) {
        
    }

    render() {
        return (
            <Motion
                defaultStyle={{scale: 0}}
                style={{scale: spring(1)}}
            >
                {style => (
                    <Box style={{
                        height: 150, 
                        width: 150, 
                        backgroundColor: `${this.state.colorCode}`,
                        margin: 10,
                        transform: `scale(${style.scale})`
                    }}>
                        <Typography variant="body1" style={{textAlign: "left", padding: 10, color: `${this.state.textColor}`}}>{this.state.colorCode}</Typography>    
                    </Box>
                )}
            </Motion>
        )
    }
}