

const AppDecorator = (config) => {

    console.log(config.message);

    return (target) => {
         console.log("decorated ", target); 
    }
}

export default AppDecorator;