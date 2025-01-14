import FrameView from '../../canvas/view/FrameView';
import { View } from '../../common';
import CssRule from '../model/CssRule';

export default class CssRuleView extends View<CssRule> {
  config: any;

  constructor(o: any = {}) {
    super(o);
    this.config = o.config || {};
    const { model } = this;
    this.listenTo(model, 'change', this.render);
    this.listenTo(model, 'destroy remove', this.remove);
    this.listenTo(model.get('selectors'), 'change', this.render);
    model.setView(this);
  }

  get frameView(): FrameView {
    return this.config.frameView;
  }

  remove() {
    super.remove();
    this.model.removeView(this);
    return this;
  }

  updateStyles() {
    this.render();
  }

  /** @ts-ignore */
  tagName() {
    return 'style';
  }

  render() {
    const { model, el } = this;
    const important = model.get('important');
    el.innerHTML = model.toCSS({ important });
    return this;
  }
}
