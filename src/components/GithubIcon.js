import React from 'react';
import github_icon from '../images/github_icon.svg';
import { SvgIcon, Icon } from '@material-ui/core';

let GithubIcon = (props) => (
    <Icon style={{width: 32, height: 32}}>
        <img src={github_icon} alt="github" style={{width: 32}}/>
    </Icon>
)

export default GithubIcon;