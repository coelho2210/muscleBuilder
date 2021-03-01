import React, { useState, useEffect, useRef } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const MonthScroll = styled.ScrollView`
    width:100%;
    height:60px;

`;

const MonthButton = styled.TouchableHighlight`
    width:${props=>props.width};
    justify-content:center;
    align-items:center;
`;
const MonthItem = styled.View`
    width:90%;
    height:30px;
    background-color:#A9A9A9;
    border-radius:15px;
    justify-content:center;
    align-items:center;
`;
const MonthText = styled.Text``;

let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const screenWidth = Math.round(Dimensions.get('window').width);
let thirdW = screenWidth / 3;


export default (props) => {

    const MonthRef = useRef();

    const [selectedMonth, setSelectedMonth] = useState(props.selectedMonth);

    const handleScrollEnd = (e) => {
        let posX = e.nativeEvent.contentOffset.x;
        // alert(posX);
        let targetMonth = Math.round( posX / thirdW );
        // alert("Month: "+targetMonth);
        setSelectedMonth(targetMonth)
    }

    const scrollToMonth = (m) => {
        let posX = m * thirdW;
        MonthRef.current.scrollTo({x:posX,y:0, animated:true});
    }

    useEffect(()=>{
        props.setSelectedMonth(selectedMonth);
    }, [selectedMonth]);

    useEffect(()=>{
        setTimeout(()=>{
            scrollToMonth(selectedMonth);
        }, 10);
    },[props.setSelectedMonth]);

    return (
        <MonthScroll
            ref={MonthRef}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            snapToInterval={thirdW}
            contentContainerStyle={{paddingLeft:thirdW, paddingRight:thirdW}}
            onMomentumScrollEnd={handleScrollEnd}
        >
            {months.map((m, k)=>(
                <MonthButton key={k} width={thirdW} onPress={()=>setSelectedMonth(k)} underlayColor="transparent" >
                    <MonthItem style={k==selectedMonth?{
                        backgroundColor:'#CCC',
                        width:'100%',
                        height:40
                    }:{}}>
                        <MonthText>{m}</MonthText>
                    </MonthItem>

                </MonthButton>
            ))}
        </MonthScroll>
    )
}