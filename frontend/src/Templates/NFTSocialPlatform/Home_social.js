import React, { Component } from "react";
import { Route } from "react-router-dom";
import Content_social from "./Content_social";
import SocialLayout from "./SocialLayout";


class Home_social extends Component {
   
    render() {
        return (          
            <SocialLayout >            
                <Route path="/NFTSocial/:address" component={ Content_social } />
            </SocialLayout>
        );
    }

}

export default Home_social