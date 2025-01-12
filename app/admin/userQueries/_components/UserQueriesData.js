'use client';

import Spinner from '@/app/_components/Spinner';
import Button from '@/app/_components/Button';
import useUserQueries from '@/app/_hooks/useUserQueries';
import UserQuery from './UserQuery';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { format } from 'date-fns';

function UserQueriesData() {
  const { data, error, isLoading, mutate } = useUserQueries();

  const date = format(new Date(), 'dd MMM yyyy');

  const handleDownloadAll = () => {
    const docDefinition = {
      pageMargins: [80, 80, 80, 10],
      content: [
        { text: `User Queries (${date})`, style: 'header' },
        ...data.map((query) => ({
          stack: [
            { text: `Query ID: ${query.id}`, style: 'fieldName' },
            { text: `Name: ${query.name}`, style: 'fieldValue' },
            { text: `Phone: ${query.phone}`, style: 'fieldValue' },
            { text: `Email: ${query.email}`, style: 'fieldValue' },
            { text: `Subject: ${query.subject}`, style: 'fieldValue' },
            { text: `Description: ${query.description}`, style: 'fieldValue' },
          ],
          margin: [0, 0, 0, 20],
        })),
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 15],
        },
        fieldName: {
          fontSize: 15,
          bold: true,
          margin: [0, 0, 0, 1],
        },
        fieldValue: {
          fontSize: 15,
          margin: [0, 0, 0, 1],
        },
      },
      defaultStyle: {
        lineHeight: 1.5,
      },
    };

    pdfMake.createPdf(docDefinition).download(`UserQueries(${date}).pdf`);
  };

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <div className="text-center mt-20 text-3xl">Error Loading Queries!</div>
    );

  if (data?.length === 0)
    return (
      <div>
        <div className="text-center mt-48 text-3xl">No Queries Found</div>
        <div className="flex justify-center mt-5">
          <Button onClick={() => window.location.reload()}>Refresh</Button>
        </div>
      </div>
    );

  return (
    <div className="mb-32">
      <h1 className="text-center text-4xl my-10">User Queries</h1>
      <div className="flex justify-center mb-5">
        <Button onClick={handleDownloadAll}>Download All</Button>
      </div>
      <div id="queries-container">
        {data.map((query) => (
          <div key={query.id} className="bg-primary-950">
            <UserQuery query={query} mutate={mutate} data={data} hideActions />
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserQueriesData;
