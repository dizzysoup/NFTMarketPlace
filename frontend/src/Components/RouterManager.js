import React, { Component  } from "react"
import LoginPage from '../Templates/LoginPages';
import MarketPage from "../Templates/NFTMarket/MarketPage";
import { Route } from "react-router-dom";
import AccountPage from "../Templates/Account/AccountPage";
import ProductDetailPage from "../Templates/NFTMarket/ProductDetailPage";
import Setting from "../Templates/Setting";
import Home_social from "../Templates/NFTSocialPlatform/Home_social";
import SocialHallMain from "../Templates/SocialHall/SocialHallMain";
import HomePage from "../Templates/Home/HomePage";
import TestingPage from "../Templates/TestingPage";

class RouterManager extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={HomePage}></Route>
                <Route path = "/MarketPage" component={ MarketPage }></Route> 
                <Route path="/LoginPage" component={LoginPage}></Route>
                <Route path="/AccountPage/:option/:address" component={AccountPage}></Route>
                <Route path="/Setting" component={ Setting }></Route>                
                <Route path="/assets/:creatorhash/:id" component={ProductDetailPage} />
                <Route exact path="/NFTSocial/:id" component={ Home_social } /> 
                <Route path="/SocialHall" component = { SocialHallMain } />              
                <Route path="/Test" component= { TestingPage } /> 
            </div>
        );
    }
}

export default RouterManager