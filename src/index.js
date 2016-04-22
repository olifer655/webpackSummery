import './aa/aa.scss';
import generateText from './aa/aa';

let src  = document.createElement('div');

src.innerHTML = '<h1>this is the first page !</h1>';
document.body.appendChild(src);
src.appendChild(generateText());
