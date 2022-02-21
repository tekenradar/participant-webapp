import { studyAPI } from 'case-web-app-core';
import { FileDropzone } from 'case-web-ui';
import { CommonResponseComponentProps } from 'case-web-ui/build/components/survey/SurveySingleItemView/utils';
import React, { useEffect, useState } from 'react';
import { ResponseItem } from 'survey-engine/data_types';

interface EMfotoUploadProps extends CommonResponseComponentProps {
}

const EMfotoUpload: React.FC<EMfotoUploadProps> = (props) => {
  const [response, setResponse] = useState<ResponseItem | undefined>(props.prefill);
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileId, setFileId] = useState<string | undefined>();

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
    if (!fileId) {
      setResponse(undefined);
      return
    }
    const newResponse = {
      key: props.compDef.key ? props.compDef.key : 'no key found',
      value: fileId
    };
    setTouched(true);
    setResponse(newResponse);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileId])


  const uploadFile = async (file: File) => {
    try {
      setLoading(true);
      const resp = await studyAPI.uploadParticipantFileRequest('tekenradar', file)
      if (!resp || !resp.data || !resp.data.id) {
        setFileId(undefined);
        return;
      }
      if (fileId !== undefined) {
        await deleteFile(fileId);
      }
      setFileId(prev => resp.data.id)
    } catch (err: any) {
      console.error(err.error);
    } finally {
      setLoading(false);
    }
  }

  const deleteFile = async (fileIdToDelete: string) => {
    try {
      setLoading(false);
      await studyAPI.deleteParticipantFilesRequest('tekenradar', [fileIdToDelete])
      setFileId(undefined)
    } catch (err: any) {
      console.error(err.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <p>Hieronder kun je een afbeelding selecteren en uploaden. Je foto wordt direct geüpload zodra je op 'open' drukt.</p>
      <FileDropzone
        placeholderText='Klik hier om een bestand te uploaden'
        accept={['image/jpeg', 'image/png']}
        maxFiles={1}
        onDrop={(acceptedFiles, rejected, event) => {
          if (acceptedFiles.length > 0) {
            uploadFile(acceptedFiles[0])
          }
        }}
      />

      {loading ? <div className='text-center'>
        <div className="spinner-border text-primary mt-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div> : null}
      {fileId ? <div>
        <p className='mt-2 text-primary fw-bold'>Je afbeelding is geüpload.</p>
        <p> Wil je toch een andere afbeelding uploaden? Klik dan hierboven en selecteer een andere.
          Wil je de afbeelding verwijderen?</p>
        <button className='btn btn-outline-primary btn-sm' onClick={() => {
          if (window.confirm('Weet je zeker dat je de afbeelding weer wilt verwijderen?')) {
            deleteFile(fileId)
          }
        }}>Klik dan hier.</button>
      </div> : null}
    </div>

  );
};

export default EMfotoUpload;
