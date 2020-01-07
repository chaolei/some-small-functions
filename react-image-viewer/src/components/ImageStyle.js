import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    position: fixed;
    display: ${props => props.visible? 'flex': 'none'};
    flex-direction: column;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    font-size: 10px;
`;
const TitleBar = styled.div`
    display: flex;
    width: 100%;
    height: 30px;
    line-height: 30px;
    flex-direction: row;
    justify-content: space-between;
    background: #000;
    color: #fff;
    font-size: 12px;
`;
const Content = styled.div` 
    position: relative;
    flex: 1;
    flex: auto;
    overflow: hidden;

    img{
        position: absolute;
        cursor: grab;
    }
`;
const CloseBtn = styled.div` 
    width: 30px;
    text-align: center;
    cursor: pointer;
    font-size: 16px;
    &:hover {
        background: #ccc; 
        color: #f00;
    }
`;

const Loading = styled.div` 
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translate(-50%, 0);
    height: 30px;
    line-height: 30px;
    color: #fff;
`;

const ImageOP = styled.div` 
    position: absolute;
    left: 50%;
    bottom: 15px;
    transform: translate(-50%, 0);
    height: 30px;
    line-height: 30px;
    color: #fff;
    padding: 0 10px;
    border-radius: 5px;
    background: rgba(0,0,0,0.6);
    user-select: none;

    span{
        margin: 0 4px;
        cursor: pointer;

        &:last-child{
            cursor: default;
            color: #dedede;
        }
    }
`;

export {Container, TitleBar, Content, CloseBtn, Loading, ImageOP};