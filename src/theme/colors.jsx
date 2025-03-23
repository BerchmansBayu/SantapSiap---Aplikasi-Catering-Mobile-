const colors = {
    green: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`, 
    orange: (opacity = 1) => `rgba(255, 152, 0, ${opacity})`, 
    yellow: (opacity = 1) => `rgba(255, 193, 7, ${opacity})`, 
    white: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, 
    brown: (opacity = 1) => `rgba(121, 85, 72, ${opacity})`, 
    lightGrey: (opacity = 1) => `rgba(211, 211, 211, ${opacity})`,
    black: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
}

export default colors;
