import { push } from './router';

export default function LinkButton({ $main, initialState }) {
    this.state = initialState;

    const $linkButton = document.createElement('button');
    $main.appendChild($linkButton);

    this.render = () => {
        $linkButton.innerHTML = this.state.text;
    }
    
    this.render();

    $linkButton.addEventListener('click', () => {
        push(this.state.link);
    })
}