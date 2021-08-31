import { Content } from "antd/lib/layout/layout";
import Title from "antd/lib/typography/Title";
import React from "react";
import s from "./PageNo.module.css";


const PageNo = () => {
    return (
        <div className={s.imgCoffe}>
            <Content style={{ textAlign: 'center', padding: '250px' }} >
                <Title style={{ color: 'white' }} level={2}>Sorry, this page is under construction</Title>
                <Title style={{ color: 'white' }} level={3}>Don't worry, our team will do everything on time</Title>
                <Title style={{ color: 'white' }} level={3}>Now we can have coffee</Title>
            </Content>
        </div>
    )
}

export default PageNo;