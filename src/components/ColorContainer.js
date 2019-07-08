import React, {Component} from 'react';
import {Motion, spring} from 'react-motion';
import Delay from '../helpers/Delay';
import ColorBox from './ColorBox';

export default class ColorContainer extends Component {
    constructor(props){ 
        super(props);

        this.state = {
            colors: this.props.colors
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            colors: newProps.colors
        })
        this.forceUpdate();
    }

    render() {
        if (this.state.colors === undefined) {
            return <div>Waiting...</div>
        } 
        else {
            return (
                <div className="colorContainer">
                    {this.state.colors.map((item, key) => (
                        <Delay wait={key * 80}>
                            <ColorBox key={item} colorCode={item}/>
                        </Delay>
                    ))}
                </div>
            )
        }
    }
}