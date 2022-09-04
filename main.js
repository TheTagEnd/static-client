
const run = async () => {
    const code = document.getElementById('codeArea').innerText
    let language = document.getElementById('language').value
    if (language === "C++"){
        language = "cpp";
    }
    const encoded = btoa(code)
    const res = await fetch('http://api.thetagend.tech:3000',{
        method: "POST",
        headers : {
            'Accept':'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            language: language,
            code: encoded
        })
    })
    const output = await res.json()
    document.getElementById('terminal').innerHTML = `${output.output}`
}
const updatePlaceholder = () =>{
    const lang = document.getElementById('language').value
    let placeholder;
    switch (lang){
        case "python":
            placeholder = `print("Hello World in Python")
            `;
            break;
        case "C++":
            placeholder = `#include <iostream>
            using namespace std;
            int main() {
                cout << "Hello World in C++";
            return 0;
            }
            `;
            break;
        case "java":
            placeholder = `public class Main {
            public static void main(String[] args) {
                    System.out.println("Hello World in Java");
                }
            }`;
            break;
    }

    document.getElementById('codeArea').innerText = placeholder
}

const download = () => {
    const code = document.getElementById('codeArea').innerText
    const lang = document.getElementById('language').value
    let ext;
    switch (lang){
        case "python":
            ext = "py";
            break
        case "C++":
            ext = "cpp";
            break
        case "java":
            ext = "java";
            break
        default:
            ext = "txt"
    }
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(code));
    element.setAttribute('download', `code.${ext}`);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}


const insertTabAtCaret = (event) => {
    if(event.keyCode === 9){

        event.preventDefault();
        const range = window.getSelection().getRangeAt(0);

        const tabNode = document.createTextNode("\u00a0\u00a0\u00a0\u00a0");
        range.insertNode(tabNode);

        range.setStartAfter(tabNode);
        range.setEndAfter(tabNode);

    }
}
document.querySelector("#codeArea").addEventListener("keydown",insertTabAtCaret);
document.getElementById('dlButton').addEventListener('click', download);
document.getElementById('runButton').addEventListener('click',run);
document.getElementById('language').addEventListener('change',updatePlaceholder);