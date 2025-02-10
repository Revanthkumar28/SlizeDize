import { UniqePipe } from './uniqe.pipe';

describe('UniqePipe', () => {
  it('create an instance', () => {
    const pipe = new UniqePipe();
    expect(pipe).toBeTruthy();
  });
});
