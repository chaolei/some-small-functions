import React, {PureComponent} from 'react';
import styled from 'styled-components';
import JsonPanel from './components/JsonPanel';
import {Words, Postion} from './components/Words';

const Container = styled.div`
    position: relative;
    width: 700px;
    height: 250px;
    margin: 0 auto;
    background: #333;
    color:red;
    text-align: center;
    font-size: 10px;
`;
const Title = styled.div`
    position: absolute;
    color:red;
    font-size: 12px;
`;


class JsonView extends PureComponent {
	constructor() {
		super();
		this.state = {};
	}

	render() {		
		return (
			<Container>
				{
                    Words.map((w, idx) => {
                        return <Title style={{left: `${Postion[idx] && Postion[idx].x || 0}px`, top: `${Postion[idx] && Postion[idx].y || 0}px`}} key={idx}>{w}</Title>
                    })
                }
			</Container>
		);
	}
}

export default JsonView;
