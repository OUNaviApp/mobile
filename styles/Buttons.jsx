import styled from "styled-components";

export const Button = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "libre_baskervillebold";
    font-size: 18px;
    border: 3px solid white;
    border-radius: 50px;
    background-color: #016a4f;
    color: white;
    width: 50px;
    height: 50px;
`;

export const ButtonLong = styled(Button)`
    width: 100px;
`;

export const ButtonLongLong = styled(Button)`
    width: 260px;
`;

export const ButtonHazard = styled(Button)`
    font-size: 25px;
    background-color: yellow;
    color: #016a4f;
    width: 50px;
    height: 50px;
`;

export const ButtonMenu = styled(ButtonLongLong)`
    background-color: white;
    color: #016a4f;
`;
