import { PageConfig, PageItem } from 'case-web-app-core/build/types/pagesConfig';
import React, { useEffect, useState } from 'react';
import { GenericPageItemProps } from '../utils';

interface NewsRouterProps extends GenericPageItemProps {
}

const NewsRouter: React.FC<NewsRouterProps> = (props) => {
  const [newsPages, setNewsPages] = useState<PageConfig[]>([]);

  useEffect(() => {
    const newsOverview: PageConfig = {
      path: '/nieuws/overzicht',
      pageKey: '/nieuws/overzicht',
      rows: [
        {
          key: 'r',
          columns: [{
            items: [{
              itemKey: 'overzicht',
              config: {
                type: 'placeholder',
                label: 'overzicht',
                height: 300
              }
            }]
          }]
        }
      ]
    };
    const newsOverview2: PageConfig = {
      path: '/nieuws/news1',
      pageKey: '/nieuws/news1',
      hideTitleBar: true,
      rows: [
        {
          key: 'r',
          columns: [{
            items: [{
              itemKey: 'overzicht',
              config: {
                type: 'placeholder',
                label: 'overzicht2',
                height: 300
              }
            }]
          }]
        }
      ]
    };
    setNewsPages([
      newsOverview,
      newsOverview2
    ]);
  }, [])

  const newsPageItem: PageItem = {
    itemKey: 'newsrouter',
    config: {
      type: 'router',
      pagesConfig: {
        pages: newsPages
      },
    }
  }

  return (
    <React.Fragment>
      {props.renderGenericItemFunc(newsPageItem)}
    </React.Fragment>
  );
};

export default NewsRouter;
