import { GetServerSideProps } from 'next';
import { ThemeProvider } from 'styled-components';

import QuizScreen from '@screens/Quiz';

export default function QuizDaGaleraPage({ externalDb }) {
  return (
    <ThemeProvider theme={externalDb.theme}>
      <QuizScreen externalDatabase={externalDb} />
    </ThemeProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const [projectName, githubUser] = context.query.id.split('___');

  const response = await fetch(
    `${`https://${projectName}.${githubUser}.vercel.app/api/db`}`
  );
  const externalDb = await response.json();

  return {
    props: { externalDb },
  };
};
