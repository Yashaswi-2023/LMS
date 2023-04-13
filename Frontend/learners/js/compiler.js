var editor = ace.edit("editor");
editor.setTheme("ace/theme/cobalt");
editor.session.setMode("ace/mode/c_cpp");
editor.session.setUseWrapMode(true);
document.getElementById('editor').style.fontSize = '15px';


const outputResponse = document.getElementById('outputTextArea')
const textarea = document.querySelector('textarea')
let lang = document.getElementById('language')
let theme = document.getElementById('changeTheme')
let font = document.getElementById('fontSize')
const inputTextAreaContent = document.getElementById('input')



function changeLanguage() {
    langData = lang.options[lang.selectedIndex].value
    if (langData == "c" || langData == "cpp") editor.session.setMode("ace/mode/c_cpp");
    else if (langData == "cs") editor.session.setMode("ace/mode/csharp");
    else if (langData == "java") editor.session.setMode("ace/mode/java");
    else if (langData == "py") editor.session.setMode("ace/mode/python");
    else if (langData == "go") editor.session.setMode("ace/mode/golang");
    else if (langData == "js") editor.session.setMode("ace/mode/javascript");

}

function changeTheme() {
    let themeType = theme.options[theme.selectedIndex].value
    if (themeType == "dracula") editor.setTheme("ace/theme/dracula");
    else if (themeType == "xcode") editor.setTheme("ace/theme/xcode");
}


function executeCode(compiledResult) {
    outputResponse.value = compiledResult;
}

async function exec() {
    const codeData = editor.getSession().getValue()
    const langData = lang.options[lang.selectedIndex].value
    inputTextAreaContent.addEventListener('input', function handleChange(event) {
        inputTextAreaContent.value = event.target.value
    })
    const inputData = inputTextAreaContent.value;
    data = JSON.stringify({
        "code": codeData,
        "language": langData,
        "input": inputData
    })
    const URL = "https://cod-ey-api.vercel.app/";
    try {
        const fetchResult = await fetch(URL, {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
            body: data
        })
        const compiledResult = await fetchResult.json()
        executeCode(compiledResult.getOutput)
    } catch (e) {
        console.log(e);
    }
}