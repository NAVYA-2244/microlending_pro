
// import React, { useEffect } from "react";

// import ReactSpeedometer from "react-d3-speedometer";



// const CibilScoreGauge = (cibile_score) => {

//     const value = cibile_score.creditScores * 100;
//     const creditScores = String(value / 100);


//     const segmentStyles = {
//         bad: { color: "red" },
//         fair: { color: "orange" },
//         average: { color: "#ECDB23" },
//         good: { color: "#AEE228" },
//         excellent: { color: "#6AD72D" }

//     };


//     return (
//         <>


//             <div className="App">

//                 <ul style={{ listStyleType: "disc", display: "flex", justifyContent: "space-between" }}>
//                     <li style={segmentStyles.bad}>Bad</li>
//                     <li style={segmentStyles.fair}>Fair</li>
//                     <li style={segmentStyles.average}>Average</li>
//                     <li style={segmentStyles.good}>Good</li>
//                     <li style={segmentStyles.excellent}>Excellent</li>
//                 </ul>

//                 {/* Render SVG with transformation */}
//                 {/* <div className="d-flex justify-content-center">
//                     <svg width="10" height="5" viewBox="0 0 10 5">
//                         <path
//                             style={{
//                                 d: "path('M 5 0 C 3.333 -67.5 1.667 -135 0 -135 C -1.667 -135 -3.333 0 -5 0 C -3.333 0 -1.667 5 0 5 C 1.667 5 3.333 2.5 5 0')",
//                                 transform: "rotate(37deg)!impoartent"
//                             }}
//                             fill="#FF0000" // Change fill color as needed
//                         />
//                     </svg>
//                 </div> */}
//                 <div className="d-flex justify-content-center">
//                     <ReactSpeedometer
//                         width={300}
//                         height={200}
//                         transform="rotate(37deg)"
//                         paddingHorizontal={50}
//                         value={value}
//                         valueFormat="d"

//                         currentValueText={`credit score: ${creditScores}`}
//                         customSegmentLabels={[
//                             { text: "1-2", position: "INSIDE", color: "#555" },
//                             { text: "3-4", position: "INSIDE", color: "#555" },
//                             { text: "5-6", position: "INSIDE", color: "#555" },
//                             { text: "7-8", position: "INSIDE", color: "#555" },
//                             { text: "9-10", position: "INSIDE", color: "#555" },

//                         ]}

//                     />
//                 </div>
//             </div >

//         </>
//     );
// }
// export default CibilScoreGauge;
import React from "react";
import ReactSpeedometer from "react-d3-speedometer";

const CibilScoreGauge = ({ creditScores = 0 }) => {
    // Calculate the value for the speedometer
    const value = creditScores * 100;

    // Define segment styles
    const segmentStyles = {
        bad: { color: "red" },
        fair: { color: "orange" },
        average: { color: "#ECDB23" },
        good: { color: "#AEE228" },
        excellent: { color: "#6AD72D" },
    };

    return (
        <div className="App">
            <ul style={{ listStyleType: "disc", display: "flex", justifyContent: "space-between" }}>
                <li style={segmentStyles.bad}>Bad</li>
                <li style={segmentStyles.fair}>Fair</li>
                <li style={segmentStyles.average}>Average</li>
                <li style={segmentStyles.good}>Good</li>
                <li style={segmentStyles.excellent}>Excellent</li>
            </ul>

            <div className="d-flex justify-content-center">
                <div>
                    <ReactSpeedometer
                        transform="rotate(37deg)"
                        width={300}
                        height={200}
                        value={value}
                        needleTransition="easeQuadIn"
                        needleColor="steelblue"
                        textColor="#555"
                        currentValueText={`Credit Score: ${creditScores.toFixed(1)}`}
                        customSegmentLabels={[
                            { text: "1-2", position: "INSIDE", color: "#555" },
                            { text: "3-4", position: "INSIDE", color: "#555" },
                            { text: "5-6", position: "INSIDE", color: "#555" },
                            { text: "7-8", position: "INSIDE", color: "#555" },
                            { text: "9-10", position: "INSIDE", color: "#555" },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};

export default CibilScoreGauge;

