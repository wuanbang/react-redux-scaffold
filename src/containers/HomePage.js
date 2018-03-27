/**
 * Created by yi.dai on 2017/12/18.
 */
import React, { Component } from 'react';
import {fetchTopics, testAction} from '../actions/index';
import { connect } from 'react-redux';
// import NavHeader from '../components/HomePage/NavHeader.js';
// import Content from '../components/HomePage/Content.js';
import Pages from '../components/HomePage/Pages';
import './HomePage.css';
import {checkToken} from '../util/common';
import '../common/style.css';

class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // const {dispatch} = this.props;
        // dispatch(testAction());

        checkToken();
    }

    render() {
        const {dispatch, fetchTopicsReducer} = this.props;

        return (
            <div className='homepage-content'>
                <Pages
                    props={this.props}
                    dispatch={dispatch}
                />
                <section className='section-part'>
                    <h1>Introduction</h1>
                    <div className='color-grey'>
                        Koa is a new web framework designed by the team behind Express, which aims to be a smaller, more expressive, and more robust foundation for web applications and APIs. Through leveraging generators Koa allows you to ditch callbacks and greatly increase error-handling. Koa does not bundle any middleware within core, and provides an elegant suite of methods that make writing servers fast and enjoyable.
                    </div>
                </section>
                <section className='section-part'>
                    <h1>Installation</h1>
                    <div className='color-grey'>
                        Koa requires node v7.6.0 or higher for ES2015 and async function support.
                    </div>
                    <div className='color-grey'>
                        You can quickly install a supported version of node with your favorite version manager:
                    </div>
                    <pre>
                        <code>
                            $ nvm install 7 <br></br>
                            $ npm i koa <br></br>
                            $ node my-koa-app.js
                        </code>
                    </pre>
                </section>
                <section className='section-part'>
                    <h1>Application</h1>
                    <div className='color-grey'>
                        A Koa application is an object containing an array of middleware functions which are composed and executed in a stack-like manner upon request. Koa is similar to many other middleware systems that you may have encountered such as Ruby's Rack, Connect, and so on - however a key design decision was made to provide high level "sugar" at the otherwise low-level middleware layer. This improves interoperability, robustness, and makes writing middleware much more enjoyable.

                        This includes methods for common tasks like content-negotiation, cache freshness, proxy support, and redirection among others. Despite supplying a reasonably large number of helpful methods Koa maintains a small footprint, as no middleware are bundled.

                        The obligatory hello world application:
                    </div>
                    <pre>
                        <code> 
                            const Koa = require('koa'); <br></br>
                            const app = new Koa(); <br></br>
                            app.use(async ctx =>  <br></br> 
                                ctx.body = 'Hello World'; <br></br>
                            });  <br></br>
                            app.listen(3000);
                        </code>
                    </pre>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(HomePage)
