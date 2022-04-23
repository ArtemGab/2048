const randomNumber = () => {
    return Math.random() < 0.8 ? 2 : 4;
};

const randomCell = () => {
    const one = Math.floor(Math.random() * 4);
    const two = Math.floor(Math.random() * 4);
    return [one, two];
};

const getStyled = (number: number) => {
    let style;
    switch (number) {
        case 0:
            style = "zero";
            break;
        case 2:
            style = "two";
            break;
        case 4:
            style = "four";
            break;
        case 8:
            style = "eight";
            break;
        case 16:
            style = "sixteen";
            break;
        case 32:
            style = "thirty-two";
            break;
        case 64:
            break;
        case 128:
            break;
        case 1000000:
            style = "million";
            break;
    }
    return style;
};

export { randomNumber, randomCell, getStyled };
