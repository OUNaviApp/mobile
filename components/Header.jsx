import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ButtonMenu } from "../styles/Buttons";

export function Header() {
    const loc = useLocation();
    return (
        <View className="header flex row">
            {/*<td><img className="App-logo" src={logo} alt="logo" /></td>*/}
            <View className="menuitem">
                <ButtonMenu>
                    {loc.pathname === "/resolve" ? (
                        <Link to="/index">Back</Link>
                    ) : (
                        <Link to="/resolve">Resolve</Link>
                    )}
                </ButtonMenu>
            </View>
            <View className="menuitem">
                <ButtonMenu>
                    {loc.pathname === "/announce" ? (
                        <Link to="/index">Back</Link>
                    ) : (
                        <Link to="/announce">General Announcement</Link>
                    )}
                </ButtonMenu>
            </View>
            <View className="menuitem">
                <ButtonMenu>
                    {loc.pathname === "/maintenance" ? (
                        <Link to="/index">Back</Link>
                    ) : (
                        <Link to="/maintenance">Maintenance Issues</Link>
                    )}
                </ButtonMenu>
            </View>
        </View>
    );
}
