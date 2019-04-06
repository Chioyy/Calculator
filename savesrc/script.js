"use strict";

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: "0",
            validDot: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.fullClear = this.fullClear.bind(this);
        this.calculate = this.calculate.bind(this);
    }
    handleChange(a) {
        if (this.state.number.toString().length >= 14) {
            this.setState({
                number: this.state.number.toString().slice(0, -2) + a.target.textContent,
                validDot: this.state.validDot.toString().slice(0, -2) + a.target.textContent
            });
        }
        else if (this.state.number == "0" && isNaN(a.target.textContent) == false) {
            this.setState({
                number: a.target.textContent 
            });
        }
        else if (this.state.validDot == "0" && isNaN(a.target.textContent) == false) {}
        else if (this.state.validDot.includes(".") == true && a.target.textContent == ".") {}
        else if (isNaN(a.target.textContent) == true && a.target.textContent != "." &&             isNaN(this.state.number.toString().slice(-1)) == false) {
            this.setState({  
                number: this.state.number + a.target.textContent,
                validDot: ""
            });
        } 
        else if (isNaN(a.target.textContent) == false || isNaN(this.state.number.slice(-1)) == false) {
            this.setState({
                number: this.state.number + a.target.textContent,
                validDot: this.state.validDot + a.target.textContent
            });
        }
        else if (isNaN(a.target.textContent) == true || isNaN(this.state.number.slice(-1)) == true) {
            this.setState({
                number: this.state.number.slice(0, -1) + a.target.textContent,
                validDot: this.state.validDot.slice(0, -1) + a.target.textContent
            });
        }
    }
    componentDidMount() {
        this.setState({
            number: "0", 
            validDot: ""
        });
    }
    fullClear() {
        this.setState({
            number: "0", 
            validDot: ""
        });
    }
    calculate() {
        let numberString = this.state.number.toString().split("");
        if (isNaN(numberString[numberString.length - 1]) == true) {
            numberString.pop();
        }
        let numberArray = [];
        for (let i = 0; i < numberString.length; i++) {
            if (i == 0) {
                numberArray.push(numberString[i]);
            }
            else if (isNaN(numberArray[numberArray.length - 1]) == true && numberString[i] != ".") {
                numberArray.push(numberString[i]);
            }
            else if (isNaN(numberString[i]) == false || numberString[i] == ".") {
                numberArray[numberArray.length - 1] = numberArray[numberArray.length - 1] + numberString[i];
            }
            else {
                numberArray.push(numberString[i]);
            }
        }        
        for (let j = 0; j < numberString.length; j++) {
            if (numberArray[j] == "*") {
                numberArray[j] = (parseFloat(numberArray[j-1]) * parseFloat(numberArray[j+1])) * 1000 / 1000;
                numberArray.splice(j+1, 1);
                numberArray.splice(j-1, 1);
                j--;
            }
            else if (numberArray[j] == "/") {
                numberArray[j] = (parseFloat(numberArray[j-1]) / parseFloat(numberArray[j+1])) * 1000 / 1000;
                numberArray.splice(j+1, 1);
                numberArray.splice(j-1, 1);
                j--;
            }
        }
        for (let k = 0; k < numberString.length; k++) {
            if (numberArray[k] == "+") {
                numberArray[k] = (parseFloat(numberArray[k-1]) + parseFloat(numberArray[k+1])) * 1000 / 1000;
                numberArray.splice(k+1, 1);
                numberArray.splice(k-1, 1);
                k--;
            }
            else if (numberArray[k] == "-") {
                numberArray[k] = (parseFloat(numberArray[k-1]) - parseFloat(numberArray[k+1])) * 1000 / 1000;
                numberArray.splice(k+1, 1);
                numberArray.splice(k-1, 1);
                k--;
            }
        }
        if (typeof numberArray[0] == "string") {
            numberArray[0] = numberArray[0] * 10 / 10;
        } 
        if (numberArray[0].toFixed(numberArray[0].toString().length - numberArray[0].toFixed(0).toString.length).toString().split("").pop() == 0) {
            numberArray[0].toString().slice(0, -1);
        }
        console.log(numberArray[0].toString().length);
        console.log(numberArray[0].toString().substr(0, 13));
        if (numberArray[0].toString().length >= 14) {
            numberArray[0] = numberArray[0].toString().substr(0, 10);
        }
        this.setState({
            number: numberArray[0],
            validDot: this.state.number
        });
    }
    render() {
        document.body.style = "background: lightblue";
        return (
            <div id="calculator" className="border border-dark rounded">
                <div id="display" className="display">
                    <div className="displaynumber">{this.state.number}</div>
                </div>
                <div className="numbers">
                    <div id="seven" className="button" onClick={this.handleChange}><h3>7</h3></div>
                    <div id="eight" className="button" onClick={this.handleChange}><h3>8</h3></div>
                    <div id="nine" className="button" onClick={this.handleChange}><h3>9</h3></div>
                    <div id="add" className="button" onClick={this.handleChange}><h3>+</h3></div>
                    <div id="four" className="button" onClick={this.handleChange}><h3>4</h3></div>
                    <div id="five" className="button" onClick={this.handleChange}><h3>5</h3></div>
                    <div id="six" className="button" onClick={this.handleChange}><h3>6</h3></div>
                    <div id="subtract" className="button" onClick={this.handleChange}><h3>-</h3></div>
                    <div id="one" className="button" onClick={this.handleChange}><h3>1</h3></div>
                    <div id="two" className="button" onClick={this.handleChange}><h3>2</h3></div>
                    <div id="three" className="button" onClick={this.handleChange}><h3>3</h3></div>
                    <div id="multiply" className="button" onClick={this.handleChange}><h3>*</h3></div>
                    <div id="decimal" className="button" onClick={this.handleChange}><h3>.</h3></div>
                    <div id="zero" className="button" onClick={this.handleChange}><h3>0</h3></div>
                    <div id="divide" className="button" onClick={this.handleChange}><h3>/</h3></div>
                    <div id="equals" className="button" onClick={this.calculate}><h3>=</h3></div>
                    <div id="clear" className="button" onClick={this.fullClear}><h3>AC</h3></div>         
                </div>       
            </div>
        );
    }
}
const domContainer = document.querySelector("#container");
ReactDOM.render(React.createElement(Calculator), domContainer);