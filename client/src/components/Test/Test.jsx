import React from 'react'

// css
import './Test.css'

export const Test = ({currentUser}) => {
  return (
    <div className="welcome-container">
        <h1 style={{color: "blue"}}>Welcome, <span style={{color: "#f08614"}}>{currentUser.name} !</span></h1>
        <div class="welcome-wrapper">
            <span>P</span>
            <span>l</span>
            <span>e</span>
            <span>a</span>
            <span>s</span>

            <span>e</span>
            <span>_</span>
            <span>S</span>
            <span>e</span>
            <span>l</span>

            <span>e</span>
            <span>c</span>
            <span>t</span>
            <span>_</span>
            <span>A</span>
           
            <span>_</span>
            <span>C</span>
            <span>h</span>
            <span>a</span>

            <span>t</span>
            <span>_</span>
            <span>T</span>
            <span>o</span>
            <span>_</span>

            <span >S</span>
            <span>t</span>
            <span>a</span>
            <span>r</span>
            <span>t</span>

            <span>_</span>            
            <span>M</span>
            <span>e</span>
            <span>s</span>
            <span>s</span>
            
            <span>a</span>
            <span>g</span>
            <span>i</span>
            <span>n</span>
            <span>g</span>
        </div>
    </div>
  )
}