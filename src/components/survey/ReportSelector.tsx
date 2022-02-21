import { studyAPI } from 'case-web-app-core';
import { ReportHistory } from 'case-web-app-core/build/api/types/studyAPI';
import { RootState } from 'case-web-app-core/build/store/rootReducer';
import { getExternalOrLocalContentURL, LoadingPlaceholder, ReportCard } from 'case-web-ui';
import { CommonResponseComponentProps } from 'case-web-ui/build/components/survey/SurveySingleItemView/utils';
import { addMonths, format as formatDate } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ResponseItem } from 'survey-engine/data_types';

interface ReportSelectorProps extends CommonResponseComponentProps {
}

interface ReportDisplayProps {
  id: string;
  responseId: string;
  timestamp: number;
  reportName: string;
  cardIcon?: string;
  subtitle: string;
  // profile?: Profile;
  summary?: string;
  // data: Array<DataDisplay>;
}

interface DataDisplay {
  label?: string;
  value: string;
  useMarkdown?: boolean;
}

const studyKey = 'tekenradar';
const reportKeyFilter = 'TB';


const ReportSelector: React.FC<ReportSelectorProps> = (props) => {
  const [response, setResponse] = useState<ResponseItem | undefined>(props.prefill);
  const [touched, setTouched] = useState(false);

  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation(['reports']);
  const currentProfileID = useSelector((state: RootState) => state.app.surveyMode.profile?.id);
  const [reportHistory, setReportHistory] = useState<ReportHistory | undefined>();
  const [reportCardInfos, setReportCardInfos] = useState<ReportDisplayProps[]>([]);
  const [selectedReportID, setSelectedReportID] = useState<string | undefined>();

  useEffect(() => {
    fetchReportHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (touched) {
      const timer = setTimeout(() => {
        props.responseChanged(response);
      }, 200);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);


  useEffect(() => {
    if (!reportHistory || !reportHistory.reports) {
      setReportCardInfos([]);
      return
    }
    const reports = reportHistory.reports.map(report => {
      let t = report.timestamp;
      if (typeof (t) === "string") {
        t = parseInt(t);
      }
      return {
        ...report,
        timestamp: t
      }
    })

    const sortedReports = reports.sort((a, b) => b.timestamp - a.timestamp);
    const reportCards = sortedReports.map((report): ReportDisplayProps => {
      const icon = report.data?.find(d => d.key === 'icon');
      const summary = report.data?.find(d => d.key === 'summary');


      return {
        id: report.id,
        responseId: report.responseId,
        timestamp: report.timestamp,
        reportName: t(`reports:${report.key}.title`),
        cardIcon: icon ? getExternalOrLocalContentURL(t(`reports:icons.${icon}`)) : undefined,
        subtitle: formatDate(new Date(report.timestamp * 1000), 'Pp', { locale: props.dateLocales?.find(dl => dl.code === i18n.language)?.locale }),
        summary: summary ? resolveReportData(report.key, summary).value : undefined,
        // data: details,
      }
    });

    setReportCardInfos(reportCards);


    // Highlight selection:
    if (!response || !response.value) {
      return;
    }
    const rValue = response.value;
    const current = reportCards.find(r => r.responseId === rValue);
    if (current !== undefined) {
      setSelectedReportID(current.id);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language, reportHistory]);

  const fetchReportHistory = async () => {
    if (loading) { return; }
    setLoading(true);
    const now = new Date();
    try {
      const resp = await studyAPI.getReportsForUser(
        [studyKey],
        currentProfileID ? [currentProfileID] : undefined,
        reportKeyFilter,
        Math.floor(addMonths(now, -6).getTime() / 1000),
        undefined,
      );
      // console.log(resp.data)
      setReportHistory(resp.data);
    } catch (e: any) {
      console.error(e.response);
      return;
    } finally {
      setLoading(false);
    }
  }

  const resolveReportData = (reportKey: string, data: { key: string; value: string; dtype?: string }): DataDisplay => {
    const displayData: DataDisplay = {
      label: t(`reports:${reportKey}.${data.key}.label`),
      value: '',
      useMarkdown: false,
    }
    switch (data.dtype) {
      case 'rawMessage':
        displayData.useMarkdown = true
        displayData.value = data.value
        displayData.label = undefined
        break;
      case 'float':
        displayData.value = data.value
        break;
      case 'int':
        displayData.value = data.value
        break;
      case 'date':
        displayData.value = formatDate(new Date(parseInt(data.value) * 1000), 'Pp', { locale: props.dateLocales?.find(dl => dl.code === i18n.language)?.locale })
        break;
      case 'string':
        displayData.value = data.value
        break;
      default:
        displayData.value = t(`reports:${reportKey}.${data.key}.${data.value}`)
        break;
    }
    return displayData;
  }

  const loadingContent = () => <div>
    <LoadingPlaceholder
      color="secondary"
      minHeight={150}
    />
  </div>

  const renderContent = () => <div>
    <p className='fw-bold'>Alleen tekenbeten van de afgelopen 6 maanden worden getoond.</p>
    {
      (!loading && reportCardInfos.length < 1) ? <div className='p-2a bg-grey-2'>
        <p>In de afgelopen 6 maanden zijn er geen tekenbeetmeldingen voor deze persoon gedaan.</p>
      </div> : null
    }
    {
      reportCardInfos.map(report => {
        return <ReportCard
          key={report.id}
          avatars={[]}
          cardInfos={{
            reportName: report.reportName,
            subtitle: report.subtitle,
            summary: report.summary,
          }}
          reportID={report.id}
          onClick={(reportID: string) => {
            setSelectedReportID(reportID);

            const newResponse = {
              key: props.compDef.key ? props.compDef.key : 'no key found',
              value: report.responseId
            };
            setTouched(true);
            setResponse(newResponse);
          }}
          bgClassNameOverride={selectedReportID !== report.id ? 'bg-grey-2' : 'bg-grey-3'}
        />

      })
    }
  </div>


  return (
    <React.Fragment>
      {loading ? loadingContent() : renderContent()}
    </React.Fragment>
  );
};

export default ReportSelector;
