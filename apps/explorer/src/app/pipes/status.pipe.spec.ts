import { StatusPipe } from './status.pipe';

describe('StatusPipe', () => {
  const pipe = new StatusPipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('should return Alive', () => {
    expect(pipe.transform(0)).toEqual('Alive');
  });
  it('should return Dead', () => {
    expect(pipe.transform(1)).toEqual('Dead');
  });
});
