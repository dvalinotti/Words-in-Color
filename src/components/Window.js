import React, {Component, div} from 'react';
import {Paper, Typography, TextField, Button, IconButton} from '@material-ui/core'
import ColorContainer from './ColorContainer'
import generateColor from '../helpers/Generator';
import GithubIcon from './GithubIcon';

export default class Window extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: undefined,
            prevInput: undefined,
            list: [],
            appRef: undefined
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.updateBackground = this.updateBackground.bind(this);
    }

    componentDidMount() {
        this.updateBackground(this.state.list[0])
        this.setState({
            appRef: this.props.appRef
        })
    }

    onChange(e) {
        const target = e.target;
        console.log(target.value);
        const colStr = target.colorString;
        console.log(colStr)
        let value = target.value;

        this.setState({
            input: value
        })
    }

    onSubmit(e) {
        let self = this;
        if (this.state.input !== this.state.prevInput) {
            self.setState({
                list: generateColor(self.state.input),
                prevInput: this.state.input
            }, () => {
                this.updateBackground(this.state.list[0])
                let colorPos = 1;
                setInterval(() => {
                    if (this.state.list.length - 1 > colorPos) {
                        this.updateBackground(this.state.list[colorPos])
                        colorPos++;
                    }
                    else {
                        this.updateBackground(this.state.list[colorPos])
                        colorPos = 0
                    }
                }, 3000)
            })
        }

    }

    updateBackground(color) {
        console.log(this.state);
        if (this.state.list !== undefined && this.state.appRef !== undefined) {
            console.log(this.state.appRef.current.style);
            let newRef = this.state.appRef;
            newRef.current.style.backgroundColor = color;
            this.setState({
                appRef: newRef
            })
        } else {
            return 'slategray'
        }
    }

    onClick() {
        window.open("https://github.com/dvalinotti/Words-in-Color", "_blank")
    }

    render() {
        return (
            <Paper style={{padding: 30}}>
                <div style={{display: "flex", justifyContent: "space-between"}} >
                    <div>
                        <Typography variant="h4" style={{textAlign: "left"}}>
                            Words in Color
                        </Typography>
                        <Typography variant="body2" color="textSecondary" style={{textAlign: "left"}}>
                            Type some words in the text field for a generated color palette.
                        </Typography>
                    </div>
                    <IconButton onClick={this.onClick}>
                        <GithubIcon/>
                    </IconButton>
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "baseline"
                }}>
                    <form noValidate autoComplete="off" style={{display: "flex", padding: '15px 15px 15px 0px', flexGrow: 8}} onSubmit={(e) => {
                        this.onSubmit(); e.preventDefault();
                    }}>
                        <TextField 
                            id="colorString"
                            name="colorString"
                            label="Input"
                            margin="normal"
                            variant="outlined"
                            onChange={this.onChange}
                            required
                            fullWidth
                            />
                    </form>
                    <Button variant="contained" color="primary" onClick={this.onSubmit} style={{flexGrow: 1, padding: '15px 16px'}}>Submit</Button>
                </div>
                <ColorContainer colors={this.state.list} />
            </Paper>
        )
    }
}