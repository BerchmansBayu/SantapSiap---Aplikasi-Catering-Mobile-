const colors = {
    green: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`, 
    orange: (opacity = 1) => `rgba(255, 152, 0, ${opacity})`, 
    yellow: (opacity = 1) => `rgba(255, 193, 7, ${opacity})`, 
    white: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, 
    brown: (opacity = 1) => `rgba(121, 85, 72, ${opacity})`, 
    lightGrey: (opacity = 1) => `rgba(211, 211, 211, ${opacity})`,
    black: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    darkGrey: (opacity = 1) => `rgba(105, 105, 105, ${opacity})`,
    red: (opacity = 1) => `rgba(244, 67, 54, ${opacity})`,
    grey: (opacity = 1) => `rgba(128, 128, 128, ${opacity})`,
}

export default colors;
