import {Bugfender} from '@bugfender/rn-bugfender';
export class bugRN {
  private static bugfender: typeof Bugfender;

  private constructor() {
    bugRN.bugfender = Bugfender;
    bugRN.bugfender.init({
      appKey: 'AbY2b4qfx89FM4Z8gCVl8WxZbtmDZTbB',
    });
  }
  public static getInstance() {
    if (bugRN.bugfender == null) {
      // eslint-disable-next-line no-new
      new bugRN();
    }
    return bugRN.bugfender;
  }
}
