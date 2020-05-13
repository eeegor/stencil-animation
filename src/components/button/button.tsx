import '@proyecto26/animatable-component';
import ANIMATIONS from '@proyecto26/animatable-component/dist/collection/animations'
import { Component, h, Element, State } from '@stencil/core';

const options = {
  duration: 500,
  easing: 'ease-in-out'
}

@Component({
  tag: 'app-button',
  styleUrl: 'button.css',
  shadow: true
})
export class Button {
  @Element() el!: HTMLElement;
  @State() finished: boolean = false

  animateComponentIn() {
    const element = this.el.shadowRoot.querySelectorAll('.button')[0];
    const animation = element.animate(ANIMATIONS.fadeInLeft, options)
    element.classList.remove('hidden');
    animation.play();
    animation.onfinish = () => {
      this.finished = true
      console.log('ready!')
    }
  }

  animateComponentOut() {
    const element = this.el.shadowRoot.querySelectorAll('.button')[0];
    const animation = element.animate(ANIMATIONS.fadeOutRight, options)
    animation.play();
    animation.onfinish = () => {
      console.log('ready!')
      this.finished = false
      element.classList.add('hidden');
    }
  }

  render() {
    console.log(ANIMATIONS)
    return (
      <div>
        <animatable-component>
          <div class="button hidden">
            <slot></slot>
          </div>
        </animatable-component>

        <div>
          <button disabled={this.finished} onClick={() => this.animateComponentIn()}>
            Start
          </button>

          <button disabled={!this.finished} onClick={() => this.animateComponentOut()}>
            End
          </button>
        </div>
      </div>
    );
  }
}
