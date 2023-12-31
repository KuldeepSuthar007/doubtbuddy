import React from "react";
import style from "./Header.module.css";
import logo from "../../assets/image/logo.png";

import searchicon from "../../assets/image/search.png";


function Header() {

    return (
        <>
            <div className={style.header}>
                <div>
                    <div className={style.top}>
                        <img className={style.logo} src={logo} alt="" />
                    </div>
                </div>
                <div className={style.logoname}>
                    <p>DoubtBuddy</p>
                </div>
                <div className={style.bottom}>
                    <p>India's no.1 doubt solving platform</p>
                </div>

            </div>
            <div className={style.snav}>
                <div className={style.navads}>
                    <h2>Welcome to DoubtBuddy</h2>
                </div>
                <div className={style.search}>
                    <img src={searchicon} alt="" />
                    <input
                        type="text"
                        placeholder="Search "
                        className={style.serachinput}
                    />
                </div>

            </div>
        </>
    );
}

export default Header;
