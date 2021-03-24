import intrx from "../../src";

const inputFile = document.createElement('input');

inputFile.setAttribute('type', 'file');

const but = document.createElement('button');

but.innerHTML = 'TEST UPLOADING';

but.addEventListener('click', () => {
    const fileObj = inputFile.files[0];
    const form = new FormData();
    form.append('avatar', fileObj);
    intrx.post('http://localhost:3001/upload', {
        body: form
    }).subscribe(
        res => console.log(res),
        error => console.log(error)
    )
})

document.body.appendChild(but);

document.body.appendChild(inputFile);