import React from "react";

const skills = ["Node JS", "Java", "MongoDb"];

const Skills = () => {
    return (
        <>
            <div style={{ display: 'flex', gap: '20px',justifyContent:"center",alignItems:"center" }}>
                {
                    skills.map((x, index) => (
                        <div 
                            key={index} 
                            style={{ 
                                width: "100px", 
                                height: "100px", 
                                borderRadius: "50%", 
                                display: "flex", 
                                alignItems: "center", 
                                justifyContent: "center", 
                                backgroundColor: "#f0f0f0", 
                                border: "2px solid #ccc",
                                marginTop:"50px"
                            }}
                        >
                            {x}
                        </div>
                    ))
                }
            </div>
        </>
    );
}

export default Skills;
