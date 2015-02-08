import {React} from "globals/react";
import {Router, Link} from "globals/react-router";

var i18n = {
    Title: {
        en: "Dashboard",
        pt: "Painel"
    },
    SignOutButton: {
        en: "Sign Out",
        pt: "Sair"
    }
};

export var Dashboard = React.createClass({
    mixins: [Router.State],

    getInitialState: function() {
        var state = { params: this.getParams() };
        return state;
    },

    getI18N: function(key) {
        try {
            return i18n[key][this.state.params.lang]
        } catch(err) {
            console.error(err);
            console.error(key);
        }
    },

    linkTo: function(link) {
        return "/" + this.state.params.lang + "/" + link;
    },

    render: function() {
        return (
            <div>
                <h1>{this.getI18N("Title")}</h1>
                <Link to={this.linkTo("sign-in")} className="">{this.getI18N("SignOutButton")}</Link>
            </div>
        );
    }
});

