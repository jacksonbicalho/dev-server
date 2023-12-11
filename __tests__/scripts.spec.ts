import { version } from '@scripts';
import { packageJson } from '@src/utils';

describe('scripts', () => {
  describe('version', () => {
    it('should version toBeDefined', () => {
      expect(version).toBeDefined();
    });

    const currentMock = jest.spyOn(version, 'current');
    const readMock = jest.spyOn(packageJson, 'read');

    afterAll(() => {
      currentMock.mockRestore();
      readMock.mockRestore();
    });

    describe('current', () => {
      it('should current toBeDefined', () => {
        expect(version.current).toBeDefined();
      });


      it('should return current Version', () => {
        readMock.mockReturnValue({
          version: '0.0.100-dev'
        });
        expect(version.current()).toEqual('0.0.100-dev');
        expect(readMock).toHaveBeenCalled();
      });
    });

    describe('increment', () => {
      it('should increment toBeDefined', () => {
        expect(version.increment).toBeDefined();
      });

      it('should return new version incremented with prerelease', () => {
        currentMock.mockReturnValue('0.0.25-test');

        const newVersionValue = version.increment({
          release: 'prerelease',
          identifier: 'test',
          identifierBase: false
        });

        expect(currentMock).toHaveBeenCalled();
        expect(newVersionValue).toEqual('0.0.26-test');
      });

      it('should return patch version incremented without prelease', () => {
        currentMock.mockReturnValue('0.0.25-test');
        const newVersionValue = version.increment({
          release: 'patch'
        });

        expect(currentMock).toHaveBeenCalled();
        expect(newVersionValue).toEqual('0.0.26');
      });

      it('should return patch version incremented', () => {
        currentMock.mockReturnValue('0.0.120');
        const newVersionValue = version.increment({
          release: 'patch'
        });

        expect(currentMock).toHaveBeenCalled();
        expect(newVersionValue).toEqual('0.0.121');
      });

      it('should return minor version incremented without prelease', () => {
        currentMock.mockReturnValue('0.1.25-test');
        const newVersionValue = version.increment({
          release: 'minor'
        });

        expect(currentMock).toHaveBeenCalled();
        expect(newVersionValue).toEqual('0.2.0');
      });

      it('should return minor version incremented', () => {
        currentMock.mockReturnValue('0.1.9-test');
        const newVersionValue = version.increment({
          release: 'minor'
        });

        expect(currentMock).toHaveBeenCalled();
        expect(newVersionValue).toEqual('0.2.0');
      });

      it('should return major version incremented without prelease', () => {
        currentMock.mockReturnValue('0.1.25-test');
        const newVersionValue = version.increment({
          release: 'major'
        });

        expect(currentMock).toHaveBeenCalled();
        expect(newVersionValue).toEqual('1.0.0');
      });

      it('should return major version incremented', () => {
        currentMock.mockReturnValue('0.1.999-test');
        const newVersionValue = version.increment({
          release: 'major'
        });

        expect(currentMock).toHaveBeenCalled();
        expect(newVersionValue).toEqual('1.0.0');
      });
    });

    describe('clean', () => {
      it('should clean toBeDefined', () => {
        expect(version.clean).toBeDefined();
      });

      it('should return version clean', () => {
        expect(version.clean('2.3.0-beta')).toEqual('2.3.0');
        expect(version.clean('2.4.9-beta.2333')).toEqual('2.4.9');
      });
    });
  });
});
