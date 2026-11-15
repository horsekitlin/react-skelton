import { createTheme } from '@mui/material/styles';
import defaultTheme from '../defaultTheme';

// 取出可序列化的部分（函式以字串代替），並排除 MUI 內部欄位與 9.x 才有的 motion
const serializable = (theme) => {
  const plain = JSON.parse(JSON.stringify(theme, (_key, value) => (typeof value === 'function' ? '[Function]' : value)));
  delete plain.internal_cache;
  delete plain.motion;
  delete plain.breakpoints.internal_mediaKeys;
  return plain;
};

describe('defaultTheme', () => {
  it('should match the default values of createTheme()', () => {
    expect(serializable(defaultTheme)).toEqual(serializable(createTheme()));
  });

  it('should expose the six semantic palette colors with four tokens each', () => {
    const colors = ['primary', 'secondary', 'error', 'warning', 'info', 'success'];

    colors.forEach((name) => {
      expect(Object.keys(defaultTheme.palette[name])).toEqual(expect.arrayContaining(['main', 'light', 'dark', 'contrastText']));
    });
  });
});
