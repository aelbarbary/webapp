// versionUtils.ts
import packageJson from '../package.json'

export const getAppVersion = (): string => {
    return packageJson.version
}
