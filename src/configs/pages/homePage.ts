import { PageConfig } from "case-web-app-core/build/types/pagesConfig"

export const homePage = (path: string): PageConfig => {
    return {
        path: path,
        pageKey: 'home',
        rows: [
            {
                key: 'row1',
                className: 'py-4',
                columns: [
                    {
                        key: 'col1',
                        className: 'col-12 col-md-4',
                        items: [
                            {
                                itemKey: '1',
                                config: {
                                    type: 'placeholder',
                                    label: 'content 1'
                                }
                            }
                        ]
                    },
                    {
                        key: 'col2',
                        className: 'col-12 col-md-4',
                        items: [
                            {
                                className: 'mt-2 mt-md-0',
                                itemKey: '2',
                                config: {
                                    type: 'placeholder',
                                    label: 'content 2'
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }
}