import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Widget from '@components/Widget';
import QuizLogo from '@components/QuizLogo';
import QuizBackground from '@components/QuizBackground';
import Footer from '@components/Footer';
import GitHubCorner from '@components/GitHubCorner';
import Input from '@components/Input';
import Button from '@components/Button';
import QuizContainer from '@components/QuizContainer';
import db from '../db.json';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>{db.title}</title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                router.push(`/quiz?name=${name}`);
              }}
            >
              <Input
                name='username'
                onChange={(event) => setName(event.target.value)}
                placeholder='Diz ai seu nome'
              />
              <Button type='submit' disabled={name.length === 0}>
                {`Jogar: ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <p>{db.description}</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl='https://github.com/LucasDibz' />
    </QuizBackground>
  );
}
