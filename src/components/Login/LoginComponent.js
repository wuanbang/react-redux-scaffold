/**
 * Created by yi.dai on 2018/2/26.
 */
import React, { Component } from 'react';
import './LoginComponent.css';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {loginAction} from '../../actions/index';
import { browserHistory } from 'react-router';
import { encryptPwd } from '../../util/common';

export default class LoginComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            'UserName': '',
            'errorTextForUserName': '',
            'Password': '',
            'errorTextForPassword': ''
        };
    }

    componentWillReceiveProps(newProps){
        const props = newProps.props;
        if(props.loginReducer && props.loginReducer.responseFlag === true) {
            // 登陆成功
            browserHistory.push('/homepage');
            localStorage.setItem('token', `${props.loginReducer.others.token ? props.loginReducer.others.token : ''}`);
        } else {
            this.setState({
                'errorTextForUserName': '用户名可能不存在',
                'errorTextForPassword': '密码错误'
            });
        }
    }

    encryptAndEncode(str) {
        return encodeURIComponent(encryptPwd(str));
    }

    handleLoginIn() {
        const dispatch = this.props.props.dispatch;

        if(this.state.UserName && this.state.Password) {
            //action
            console.log(encryptPwd(this.state.Password));

            dispatch(loginAction(this.encryptAndEncode(this.state.UserName), this.encryptAndEncode(this.state.Password)));
        }
    }

    render() {
        return(
            <div className='login-component'>
                <div className='login-form'>
                    <div>
                        <h1>Sign In</h1>
                    </div>
                    <div>
                        <TextField
                            id='UserName'
                            hintText="UserName Field"
                            floatingLabelText="UserName"
                            errorText={this.state.errorTextForUserName}
                            fullWidth={true}
                            onChange={(e, value) => {
                                if(!value) {
                                    this.setState({'errorTextForUserName': 'Please Input UserName'});
                                } else {
                                    this.setState({'errorTextForUserName': ''});
                                }
                                this.setState({'UserName': value});
                            }}
                        />
                    </div>
                    <div>
                        <TextField
                            id='Password'
                            hintText="Password Field"
                            floatingLabelText="Password"
                            errorText={this.state.errorTextForPassword}
                            fullWidth={true}
                            type="password"
                            onChange={(e, value) => {
                                if(!value) {
                                    this.setState({'errorTextForPassword': 'Please Input Password'});
                                } else {
                                    this.setState({'errorTextForPassword': ''});
                                }
                                this.setState({'Password': value});
                            }}
                        />
                    </div>
                    <div>
                        <RaisedButton
                            label="Login In"
                            primary={true}
                            className="login-button"
                            onClick={() => this.handleLoginIn()}
                        />
                    </div>
                </div>
            </div>
        );
    }
}