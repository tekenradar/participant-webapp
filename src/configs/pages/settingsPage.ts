import { PageConfig } from "case-web-app-core/build/types/pagesConfig"

export const settingsPage = (path: string): PageConfig => {
  return {
    path: path,
    pageKey: 'settings',
    rows: []
  }
}
