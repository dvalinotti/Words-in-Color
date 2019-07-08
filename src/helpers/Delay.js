import React, {Component, Fragment} from 'react';

export default class Delay extends Component{
    constructor(props) {
        super(props);
        this.state = {
            hidden: true
        }
    }

    componentWillMount() {
        let self = this;
        setTimeout(() => {
            self.setState({
                hidden: false
            })
        }, self.props.wait)
    }

    render() {
        return (
            <Fragment>
                {!this.state.hidden && this.props.children}
            </Fragment>
        )
    }

}